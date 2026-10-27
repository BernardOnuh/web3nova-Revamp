// Server-only Telegram Bot API helpers for the workspace admin bot.
const token = () => process.env.TELEGRAM_BOT_TOKEN;

export const telegramConfigured = () => !!token();

// Telegram user IDs allowed to use the bot, e.g. TELEGRAM_ADMIN_IDS=12345678,87654321
export const adminIds = () =>
  String(process.env.TELEGRAM_ADMIN_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

export async function telegram(method, body) {
  if (!token()) throw new Error("Telegram is not configured (TELEGRAM_BOT_TOKEN)");
  const r = await fetch(`https://api.telegram.org/bot${token()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const data = await r.json().catch(() => ({}));
  if (!data.ok) throw new Error(data.description || `Telegram ${method} failed`);
  return data.result;
}

export const sendTelegram = (chatId, text) =>
  telegram("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true });

// Best effort: a Telegram outage must never break a payment or a reminder run.
export async function notifyAdmins(text) {
  if (!telegramConfigured()) return;
  const results = await Promise.allSettled(adminIds().map((id) => sendTelegram(id, text)));
  results
    .filter((r) => r.status === "rejected")
    .forEach((r) => console.error("[telegram] notify failed", r.reason?.message));
}
