// Admin only (protected by proxy.js): everything the admin page shows.
import { listBookings, listCoupons, todayStats } from "@/lib/workspaceService";
import { adminIds, telegramConfigured } from "@/lib/telegram";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const [stats, bookings, coupons] = await Promise.all([todayStats(), listBookings(), listCoupons()]);
    return res.status(200).json({
      stats,
      bookings,
      coupons,
      setup: {
        database: true,
        monnify: !!(process.env.MONNIFY_API_KEY && process.env.MONNIFY_SECRET_KEY && process.env.MONNIFY_CONTRACT_CODE),
        email: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
        telegram: telegramConfigured() && !!process.env.TELEGRAM_WEBHOOK_SECRET,
        telegramAdmins: adminIds().length,
        cron: !!process.env.CRON_SECRET,
      },
    });
  } catch (err) {
    console.error("[workspace/admin/data]", err);
    return res.status(503).json({ error: err.message.includes("DATABASE_URL") ? "No database connected yet. Add Neon Postgres in Vercel (Storage tab)." : "Could not load data" });
  }
}
