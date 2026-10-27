// Admin only (protected by proxy.js): point the Telegram bot at this site's webhook.
import { telegram } from "@/lib/telegram";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const info = await telegram("getWebhookInfo");
      return res.status(200).json({ url: info.url, pending: info.pending_update_count, lastError: info.last_error_message || null });
    }
    if (req.method === "POST") {
      const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
      if (!secret) return res.status(400).json({ error: "Set TELEGRAM_WEBHOOK_SECRET in Vercel first" });
      const site = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
      const url = `${site}/api/workspace/telegram`;
      await telegram("setWebhook", { url, secret_token: secret, allowed_updates: ["message"] });
      await telegram("setMyCommands", {
        commands: [
          { command: "coupon", description: "Create a Friends & Family coupon code" },
          { command: "coupons", description: "List unused coupon codes" },
          { command: "revoke", description: "Delete an unused coupon code" },
          { command: "today", description: "Seats, events and money today" },
          { command: "expiring", description: "Passes ending today at 8pm" },
        ],
      });
      return res.status(200).json({ ok: true, url });
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[workspace/admin/telegram]", err);
    return res.status(502).json({ error: err.message });
  }
}
