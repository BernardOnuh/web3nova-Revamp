// Admin only (protected by proxy.js): send any due renewal reminders now.
import { sendDueReminders } from "@/lib/workspaceService";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const sent = await sendDueReminders();
    return res.status(200).json({ endingToday: sent.today.length, endingTomorrow: sent.tomorrow.length, failed: sent.failed.length });
  } catch (err) {
    console.error("[workspace/admin/reminders]", err);
    return res.status(503).json({ error: "Could not send reminders" });
  }
}
