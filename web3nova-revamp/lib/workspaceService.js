// Server-only workspace logic: seat availability, event slots, coupons, payment
// confirmation, reminders and the admin overview.
import crypto from "crypto";
import { db, rowToBooking, rowToCoupon } from "@/lib/workspaceDb";
import { getTransactionByPaymentReference } from "@/lib/monnify";
import { sendWorkspaceConfirmation, sendWorkspaceReminder } from "@/lib/mailer";
import { notifyAdmins, escapeHtml } from "@/lib/telegram";
import { COUPON_DAY_PRICES, SEAT_CAPACITY, addDays, describeBooking, formatNaira, lagosToday } from "@/lib/workspace";

export const REFERENCE_PREFIX = "W3N-WS-";
// An unpaid checkout holds its seat (and coupon) this long, so two people can't pay for the last seat.
const HOLD_MINUTES = 30;

// ---- Availability ----

export async function seatsFree(startDate, endDate) {
  const sql = await db();
  const rows = await sql`
    SELECT count(b.ref)::int AS used
    FROM generate_series(${startDate}::date, ${endDate}::date, interval '1 day') AS d
    LEFT JOIN ws_bookings b
      ON b.kind = 'seat'
     AND d::date BETWEEN b.start_date AND b.end_date
     AND (b.status = 'paid' OR (b.status = 'pending' AND b.created_at > now() - make_interval(mins => ${HOLD_MINUTES})))
    GROUP BY d`;
  const busiest = Math.max(0, ...rows.map((r) => r.used));
  return Math.max(0, SEAT_CAPACITY - busiest);
}

export async function eventsOn(date) {
  const sql = await db();
  const rows = await sql`
    SELECT event_start, event_end FROM ws_bookings
    WHERE kind = 'event' AND start_date = ${date}::date
      AND (status = 'paid' OR (status = 'pending' AND created_at > now() - make_interval(mins => ${HOLD_MINUTES})))
    ORDER BY event_start`;
  return rows.map((r) => ({ start: new Date(r.event_start).toISOString(), end: new Date(r.event_end).toISOString() }));
}

export async function eventClashes(start, end) {
  const sql = await db();
  const rows = await sql`
    SELECT 1 FROM ws_bookings
    WHERE kind = 'event' AND event_start < ${end}::timestamptz AND event_end > ${start}::timestamptz
      AND (status = 'paid' OR (status = 'pending' AND created_at > now() - make_interval(mins => ${HOLD_MINUTES})))
    LIMIT 1`;
  return rows.length > 0;
}

// ---- Coupons (one code = one payment) ----

const COUPON_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const normalizeCoupon = (c) => String(c || "").trim().toUpperCase().replace(/\s+/g, "");

function newCouponCode() {
  let s = "";
  for (let i = 0; i < 6; i++) s += COUPON_ALPHABET[crypto.randomInt(COUPON_ALPHABET.length)];
  return `FF-${s}`;
}

export async function createCoupons(count = 1, note = "", createdBy = "", dayPrice = null) {
  const sql = await db();
  const n = Math.min(20, Math.max(1, Number(count) || 1));
  const price = COUPON_DAY_PRICES.includes(Number(dayPrice)) ? Number(dayPrice) : null;
  const codes = [];
  while (codes.length < n) {
    const code = newCouponCode();
    const rows = await sql`
      INSERT INTO ws_coupons (code, note, created_by, day_price)
      VALUES (${code}, ${note || null}, ${createdBy || null}, ${price})
      ON CONFLICT (code) DO NOTHING RETURNING code`;
    if (rows.length) codes.push(code);
  }
  return codes;
}

// Usable = exists, not used, and not held by someone else's unfinished checkout.
export async function couponStatus(code) {
  const sql = await db();
  const [c] = await sql`SELECT * FROM ws_coupons WHERE code = ${normalizeCoupon(code)}`;
  if (!c) return { status: "invalid" };
  if (c.used_at) return { status: "used" };
  if (c.reserved_at && Date.now() - new Date(c.reserved_at).getTime() < HOLD_MINUTES * 60e3) return { status: "held" };
  return { status: "ok", dayPrice: c.day_price };
}

export async function reserveCoupon(code, ref) {
  const sql = await db();
  const rows = await sql`
    UPDATE ws_coupons SET reserved_ref = ${ref}, reserved_at = now()
    WHERE code = ${normalizeCoupon(code)} AND used_at IS NULL
      AND (reserved_at IS NULL OR reserved_at < now() - make_interval(mins => ${HOLD_MINUTES}))
    RETURNING code, day_price`;
  return rows[0] || null;
}

export async function releaseCoupon(code, ref) {
  const sql = await db();
  await sql`UPDATE ws_coupons SET reserved_ref = NULL, reserved_at = NULL WHERE code = ${normalizeCoupon(code)} AND reserved_ref = ${ref}`;
}

export async function revokeCoupon(code) {
  const sql = await db();
  const rows = await sql`DELETE FROM ws_coupons WHERE code = ${normalizeCoupon(code)} AND used_at IS NULL RETURNING code`;
  return rows.length > 0;
}

export async function listCoupons({ unusedOnly = false, limit = 200 } = {}) {
  const sql = await db();
  const rows = unusedOnly
    ? await sql`SELECT * FROM ws_coupons WHERE used_at IS NULL ORDER BY created_at DESC LIMIT ${limit}`
    : await sql`SELECT * FROM ws_coupons ORDER BY created_at DESC LIMIT ${limit}`;
  return rows.map(rowToCoupon);
}

// ---- Bookings ----

export const newReference = () => `${REFERENCE_PREFIX}${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

export async function insertPendingBooking(b) {
  const sql = await db();
  await sql`
    INSERT INTO ws_bookings
      (ref, kind, plan, duration, name, email, phone, start_date, end_date, event_start, event_end,
       coupon, voucher, program_fee, service_charge, total)
    VALUES
      (${b.ref}, ${b.kind}, ${b.plan}, ${b.duration}, ${b.name}, ${b.email}, ${b.phone},
       ${b.start_date}::date, ${b.end_date}::date, ${b.event_start || null}, ${b.event_end || null},
       ${b.coupon || null}, ${b.voucher || null}, ${b.program_fee}, ${b.service_charge}, ${b.total})`;
}

export async function deleteBooking(ref) {
  const sql = await db();
  await sql`DELETE FROM ws_bookings WHERE ref = ${ref} AND status = 'pending'`;
}

export async function getBooking(ref) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM ws_bookings WHERE ref = ${ref}`;
  return rowToBooking(row);
}

function adminSummary(b) {
  const d = describeBooking(b);
  return [
    `<b>New workspace payment</b>`,
    `${escapeHtml(b.name)} · ${escapeHtml(b.phone)}`,
    `${escapeHtml(d.planTitle)} – ${escapeHtml(d.durationTitle)}`,
    escapeHtml(d.when),
    `Paid ${formatNaira(b.amount_paid ?? b.total)}${b.coupon ? ` · coupon ${escapeHtml(b.coupon)}` : ""}${b.voucher ? ` · voucher ${escapeHtml(b.voucher)}` : ""}`,
  ].join("\n");
}

// Checks the payment with Monnify and, the first time it's confirmed, marks the booking
// paid, uses up the coupon and sends the emails. Safe to call from the webhook and the
// success page at the same time.
export async function confirmBooking(ref) {
  const booking = await getBooking(ref);
  if (!booking || booking.status === "paid") return booking;

  const tx = await getTransactionByPaymentReference(ref);
  const amountPaid = Number(tx.amountPaid || 0);
  const sql = await db();

  if (tx.paymentStatus !== "PAID" || amountPaid < booking.total) {
    if (["FAILED", "EXPIRED", "REVERSED"].includes(tx.paymentStatus)) {
      await sql`UPDATE ws_bookings SET status = 'failed' WHERE ref = ${ref} AND status = 'pending'`;
      if (booking.coupon) await releaseCoupon(booking.coupon, ref);
    }
    return { ...booking, paymentStatus: tx.paymentStatus };
  }

  const [row] = await sql`
    UPDATE ws_bookings SET status = 'paid', paid_at = now(), amount_paid = ${amountPaid}
    WHERE ref = ${ref} AND status <> 'paid' RETURNING *`;
  if (!row) return getBooking(ref); // someone else confirmed it first

  const paid = rowToBooking(row);
  if (paid.coupon) {
    await sql`UPDATE ws_coupons SET used_ref = ${ref}, used_at = now() WHERE code = ${paid.coupon} AND used_at IS NULL`;
  }
  await notifyAdmins(adminSummary(paid));
  try {
    await sendWorkspaceConfirmation(paid);
  } catch (err) {
    // The payment is recorded; a failed email shouldn't make Monnify retry forever.
    console.error("[workspace] confirmation email failed", ref, err.message);
    await notifyAdmins(`Could not email ${escapeHtml(paid.email)} their confirmation (${escapeHtml(ref)}).`);
  }
  return paid;
}

// ---- Reminders (run daily by the cron) ----

export async function sendDueReminders() {
  const sql = await db();
  const today = lagosToday();
  const tomorrow = addDays(today, 1);

  // Someone who already bought a pass starting the next day has renewed, so skip them.
  const finalRows = await sql`
    SELECT * FROM ws_bookings b
    WHERE b.kind = 'seat' AND b.status = 'paid' AND b.duration <> 'hour'
      AND b.end_date = ${today}::date AND b.reminded_final_at IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM ws_bookings n WHERE n.kind = 'seat' AND n.status = 'paid'
          AND lower(n.email) = lower(b.email) AND n.start_date = b.end_date + 1)`;
  const earlyRows = await sql`
    SELECT * FROM ws_bookings b
    WHERE b.kind = 'seat' AND b.status = 'paid' AND b.duration IN ('week', 'month')
      AND b.end_date = ${tomorrow}::date AND b.reminded_early_at IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM ws_bookings n WHERE n.kind = 'seat' AND n.status = 'paid'
          AND lower(n.email) = lower(b.email) AND n.start_date = b.end_date + 1)`;

  const sent = { today: [], tomorrow: [], failed: [] };
  for (const [rows, when, column] of [
    [finalRows, "today", "final"],
    [earlyRows, "tomorrow", "early"],
  ]) {
    for (const row of rows) {
      const b = rowToBooking(row);
      try {
        await sendWorkspaceReminder(b, when);
        if (column === "final") await sql`UPDATE ws_bookings SET reminded_final_at = now() WHERE ref = ${b.ref}`;
        else await sql`UPDATE ws_bookings SET reminded_early_at = now() WHERE ref = ${b.ref}`;
        sent[when].push(b);
      } catch (err) {
        console.error("[workspace] reminder failed", b.ref, err.message);
        sent.failed.push(b);
      }
    }
  }
  return sent;
}

// ---- Admin overview ----

export async function todayStats() {
  const sql = await db();
  const today = lagosToday();
  const [seats] = await sql`
    SELECT count(*)::int AS used FROM ws_bookings
    WHERE kind = 'seat' AND status = 'paid' AND ${today}::date BETWEEN start_date AND end_date`;
  const [money] = await sql`
    SELECT
      coalesce(sum(program_fee) FILTER (WHERE (paid_at AT TIME ZONE 'Africa/Lagos')::date = ${today}::date), 0)::int AS today,
      coalesce(sum(program_fee) FILTER (WHERE date_trunc('month', paid_at AT TIME ZONE 'Africa/Lagos') = date_trunc('month', ${today}::date)), 0)::int AS month,
      coalesce(sum(program_fee), 0)::int AS all_time
    FROM ws_bookings WHERE status = 'paid'`;
  const [expiring] = await sql`
    SELECT count(*)::int AS n FROM ws_bookings
    WHERE kind = 'seat' AND status = 'paid' AND duration <> 'hour' AND end_date = ${today}::date`;
  const events = await sql`
    SELECT * FROM ws_bookings WHERE kind = 'event' AND status = 'paid' AND start_date = ${today}::date ORDER BY event_start`;
  const [coupons] = await sql`SELECT count(*)::int AS n FROM ws_coupons WHERE used_at IS NULL`;
  return {
    today,
    capacity: SEAT_CAPACITY,
    seatsUsed: seats.used,
    expiringToday: expiring.n,
    revenueToday: money.today,
    revenueMonth: money.month,
    revenueAll: money.all_time,
    eventsToday: events.map(rowToBooking),
    unusedCoupons: coupons.n,
  };
}

export async function listBookings(limit = 1000) {
  const sql = await db();
  const rows = await sql`SELECT * FROM ws_bookings ORDER BY created_at DESC LIMIT ${limit}`;
  return rows.map(rowToBooking);
}

export async function expiringOn(date) {
  const sql = await db();
  const rows = await sql`
    SELECT * FROM ws_bookings
    WHERE kind = 'seat' AND status = 'paid' AND duration <> 'hour' AND end_date = ${date}::date ORDER BY name`;
  return rows.map(rowToBooking);
}
