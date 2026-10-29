// Telegram bot webhook. Admins (TELEGRAM_ADMIN_IDS) can create coupon codes and check the
// workspace from Telegram. Connect it from the workspace admin page.
import { adminIds, escapeHtml, sendTelegram } from "@/lib/telegram";
import {
  createCoupons, expiringOn, listCoupons, revokeCoupon, seatsFree, todayStats,
} from "@/lib/workspaceService";
import { COUPON_DAY_PRICES, describeBooking, formatNaira, formatTime, lagosToday } from "@/lib/workspace";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://www.web3nova.org";

const HELP = [
  "<b>Web3Nova Workspace bot</b>",
  "",
  "/coupon – create 1 Friends &amp; Family coupon code",
  "/coupon Tolu – create a code with a note (who it's for)",
  "/coupon 5 Church group – create 5 codes at once",
  "/coupon1000 Tolu – a code that makes a daily pass ₦1,000 (works with a number and note too)",
  "/coupons – list codes that haven't been used",
  "/revoke FF-XXXXXX – delete an unused code",
  "/today – seats in use, events and money today",
  "/expiring – passes that end today at 8pm",
].join("\n");

async function reply(chatId, from, text) {
  const [cmd, ...rest] = text.trim().split(/\s+/);
  const command = cmd.toLowerCase().replace(/@.*$/, "");
  const args = rest.join(" ");

  const special = command.match(/^\/coupon(\d+)$/);
  if (special && !COUPON_DAY_PRICES.includes(Number(special[1]))) {
    return `There's no ₦${escapeHtml(special[1])} code. Use /coupon or ${COUPON_DAY_PRICES.map((p) => `/coupon${p}`).join(", ")}.`;
  }
  if (command === "/coupon" || command === "/newcoupon" || special) {
    const dayPrice = special ? Number(special[1]) : null;
    const m = args.match(/^(\d{1,2})\b\s*(.*)$/);
    const count = m ? Number(m[1]) : 1;
    const note = (m ? m[2] : args).slice(0, 120);
    const who = from.username ? `@${from.username}` : String(from.id);
    const codes = await createCoupons(count, note, `telegram:${who}`, dayPrice);
    return [
      `<b>${codes.length} coupon code${codes.length > 1 ? "s" : ""} created</b>${note ? ` for ${escapeHtml(note)}` : ""}`,
      "",
      ...codes.map((c) => `<code>${c}</code>`),
      "",
      dayPrice
        ? `Each code works for one Friends &amp; Family payment at ${siteUrl()}/workspace. A daily pass costs ${formatNaira(dayPrice)} with it (weekly and monthly stay at the normal Friends &amp; Family price).`
        : `Each code works for one Friends &amp; Family payment at ${siteUrl()}/workspace`,
    ].join("\n");
  }

  if (command === "/coupons") {
    const coupons = await listCoupons({ unusedOnly: true, limit: 40 });
    if (!coupons.length) return "No unused coupon codes. Send /coupon to create one.";
    return [
      `<b>${coupons.length} unused code${coupons.length > 1 ? "s" : ""}</b>`,
      ...coupons.map((c) => `<code>${c.code}</code>${c.day_price ? ` (${formatNaira(c.day_price)}/day)` : ""}${c.note ? ` – ${escapeHtml(c.note)}` : ""}`),
    ].join("\n");
  }

  if (command === "/revoke") {
    if (!args) return "Send it like this: /revoke FF-XXXXXX";
    return (await revokeCoupon(args))
      ? `Deleted <code>${escapeHtml(args.toUpperCase())}</code>.`
      : "That code doesn't exist or has already been used.";
  }

  if (command === "/today") {
    const s = await todayStats();
    const free = await seatsFree(lagosToday(), lagosToday());
    return [
      `<b>Today (${s.today})</b>`,
      `Seats in use: ${s.seatsUsed}/${s.capacity} (${free} free to book)`,
      `Passes ending at 8pm: ${s.expiringToday}`,
      `Events: ${s.eventsToday.length ? s.eventsToday.map((e) => `${escapeHtml(e.name)} ${formatTime(e.event_start)}–${formatTime(e.event_end)}`).join(", ") : "none"}`,
      `Paid today: ${formatNaira(s.revenueToday)}`,
      `This month: ${formatNaira(s.revenueMonth)}`,
      `Unused coupons: ${s.unusedCoupons}`,
    ].join("\n");
  }

  if (command === "/expiring") {
    const rows = await expiringOn(lagosToday());
    if (!rows.length) return "No passes end today.";
    return [
      `<b>${rows.length} pass${rows.length > 1 ? "es" : ""} ending today at 8pm</b>`,
      ...rows.map((b) => `${escapeHtml(b.name)} · ${escapeHtml(b.phone)} · ${escapeHtml(describeBooking(b).planTitle)} ${escapeHtml(describeBooking(b).durationTitle)}`),
    ].join("\n");
  }

  return HELP;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers["x-telegram-bot-api-secret-token"] !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const msg = req.body?.message;
  const text = msg?.text;
  // Always answer 200, or Telegram keeps re-sending the same update.
  if (!msg || !text) return res.status(200).json({ ok: true });

  const chatId = msg.chat.id;
  const from = msg.from || {};
  try {
    if (!adminIds().includes(String(from.id))) {
      await sendTelegram(
        chatId,
        `You're not a workspace admin yet. Your Telegram ID is <code>${from.id}</code>. Add it to TELEGRAM_ADMIN_IDS in Vercel to get access.`
      );
    } else {
      await sendTelegram(chatId, await reply(chatId, from, text));
    }
  } catch (err) {
    console.error("[workspace/telegram]", err);
    await sendTelegram(chatId, "Something went wrong. Please try again.").catch(() => {});
  }
  return res.status(200).json({ ok: true });
}
