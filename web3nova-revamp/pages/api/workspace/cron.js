// Runs daily from vercel.json: emails people whose pass ends today (or tomorrow, for
// weekly and monthly passes) and sends the admins a Telegram summary.
import { sendDueReminders, todayStats } from "@/lib/workspaceService";
import { notifyAdmins, escapeHtml } from "@/lib/telegram";
import { formatNaira } from "@/lib/workspace";

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const sent = await sendDueReminders();
    const s = await todayStats();
    await notifyAdmins(
      [
        `<b>Workspace daily summary (${s.today})</b>`,
        `Seats in use: ${s.seatsUsed}/${s.capacity}`,
        `Paid today: ${formatNaira(s.revenueToday)} · This month: ${formatNaira(s.revenueMonth)}`,
        `Renewal reminders sent: ${sent.today.length} ending today, ${sent.tomorrow.length} ending tomorrow`,
        ...(sent.failed.length ? [`Failed to email: ${sent.failed.map((b) => escapeHtml(b.email)).join(", ")}`] : []),
      ].join("\n")
    );
    return res.status(200).json({
      ok: true,
      endingToday: sent.today.length,
      endingTomorrow: sent.tomorrow.length,
      failed: sent.failed.length,
    });
  } catch (err) {
    console.error("[workspace/cron]", err);
    return res.status(500).json({ error: "Reminder run failed" });
  }
}
