import {
  EVENT_SPACE, MAX_DAYS_AHEAD, SPACE_NAME, addDays, describeBooking, earliestSeatStart, eventStartHours,
  eventWindow, findDuration, findEventOption, findPlan, hourlyStartHours, isIsoDate, lagosToday, maxHoursFrom,
  priceBreakdown, priceFor, seatEndDate,
} from "@/lib/workspace";
import { initTransaction } from "@/lib/monnify";
import { normalizeVoucher, voucherPrice } from "@/lib/vouchers";
import {
  deleteBooking, eventClashes, insertPendingBooking, newReference, normalizeCoupon, releaseCoupon,
  reserveCoupon, seatsFree,
} from "@/lib/workspaceService";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, max = 120) => String(v ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const kind = req.body?.kind === "event" ? "event" : "seat";
  const name = clean(req.body?.name);
  const email = clean(req.body?.email).toLowerCase();
  const phone = clean(req.body?.phone, 30);
  const date = clean(req.body?.date, 10);

  if (!name || !EMAIL_RE.test(email) || !phone) {
    return res.status(400).json({ error: "Please fill in your name, email and phone number." });
  }
  if (!isIsoDate(date) || date > addDays(lagosToday(), MAX_DAYS_AHEAD)) {
    return res.status(400).json({ error: "Please pick a valid date." });
  }

  const ref = newReference();
  let booking;
  let coupon = "";
  let couponDayPrice = null;

  try {
    if (kind === "event") {
      const opt = findEventOption(req.body?.duration);
      const hour = Number(req.body?.startHour);
      if (!opt || !eventStartHours(opt.id).includes(hour)) {
        return res.status(400).json({ error: "Please pick the event length and start time." });
      }
      const w = eventWindow(date, hour, opt.hours);
      if (new Date(w.start).getTime() <= Date.now()) {
        return res.status(400).json({ error: "That start time has already passed." });
      }
      if (await eventClashes(w.start, w.end)) {
        return res.status(409).json({ error: "The event space is already booked for that time. Pick another time." });
      }
      booking = { kind, plan: EVENT_SPACE.id, duration: opt.id, start_date: date, end_date: date, event_start: w.start, event_end: w.end };
    } else {
      const plan = findPlan(req.body?.plan);
      const duration = findDuration(req.body?.duration);
      if (!plan || !duration || !plan.prices[duration.id]) return res.status(400).json({ error: "Please pick a plan." });
      if (date < earliestSeatStart()) {
        return res.status(400).json({ error: "That date has passed. Passes for today end at 8pm." });
      }
      const end = seatEndDate(date, duration.id);
      if ((await seatsFree(date, end)) < 1) {
        return res.status(409).json({ error: "All 60 seats are taken for those dates. Try another start date." });
      }
      if (plan.needsCoupon) {
        coupon = normalizeCoupon(req.body?.coupon);
        const reserved = coupon && (await reserveCoupon(coupon, ref));
        if (!reserved) {
          coupon = "";
          return res.status(400).json({ error: "That coupon code is not valid, or has already been used." });
        }
        couponDayPrice = reserved.day_price;
      }
      booking = { kind, plan: plan.id, duration: duration.id, start_date: date, end_date: end, coupon };
      if (duration.hourly) {
        const hour = Number(req.body?.startHour);
        const hours = Number(req.body?.hours);
        if (!hourlyStartHours(date).includes(hour) || !Number.isInteger(hours) || hours < 1 || hours > maxHoursFrom(hour)) {
          if (coupon) await releaseCoupon(coupon, ref);
          return res.status(400).json({ error: "Please pick a start time and how many hours (ending by 8pm)." });
        }
        const w = eventWindow(date, hour, hours);
        booking = { ...booking, event_start: w.start, event_end: w.end, hours };
      }
    }

    let basePrice = priceFor(booking);
    if (couponDayPrice && booking.duration === "day") basePrice = couponDayPrice;
    const voucher = kind === "seat" ? normalizeVoucher(req.body?.voucher) : "";
    if (voucher) {
      const discounted = voucherPrice(voucher, booking.plan, booking.duration);
      if (!discounted) {
        if (coupon) await releaseCoupon(coupon, ref);
        return res.status(400).json({ error: "That voucher code doesn't apply to this plan." });
      }
      basePrice = discounted;
      booking.voucher = voucher;
    }

    const { price, fee, total } = priceBreakdown(basePrice);
    booking = { ...booking, ref, name, email, phone, program_fee: price, service_charge: fee, total };
    await insertPendingBooking(booking);
  } catch (err) {
    console.error("[workspace/checkout]", err);
    if (coupon) await releaseCoupon(coupon, ref).catch(() => {});
    return res.status(503).json({ error: "Bookings are unavailable right now. Please try again shortly." });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
  const d = describeBooking(booking);

  try {
    const tx = await initTransaction({
      amount: booking.total,
      customerName: name,
      customerEmail: email,
      paymentReference: ref,
      paymentDescription: `${SPACE_NAME} – ${d.planTitle} (${d.durationTitle})`,
      // Monnify appends ?paymentReference=... to this URL
      redirectUrl: `${siteUrl}/workspace/success/${ref}`,
      metaData: { kind, plan: booking.plan, duration: booking.duration, date, phone },
    });
    return res.status(200).json({ checkoutUrl: tx.checkoutUrl, paymentReference: ref });
  } catch (err) {
    console.error("[workspace/checkout]", err);
    await deleteBooking(ref).catch(() => {});
    if (coupon) await releaseCoupon(coupon, ref).catch(() => {});
    return res.status(502).json({ error: "Could not start payment. Please try again." });
  }
}
