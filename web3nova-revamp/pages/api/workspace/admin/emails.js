// Admin only (protected by proxy.js): the list of addresses that get an email for every payment.
import { EMAIL_RE, MAX_NOTIFY_EMAILS, addNotifyEmail, removeNotifyEmail } from "@/lib/notifyEmails";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const email = String(req.body?.email || "").trim().toLowerCase();
      if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "That doesn't look like an email address" });
      if (!(await addNotifyEmail(email))) return res.status(400).json({ error: `You can add up to ${MAX_NOTIFY_EMAILS} addresses` });
      return res.status(200).json({ ok: true });
    }
    if (req.method === "DELETE") {
      const ok = await removeNotifyEmail(req.query.email);
      return ok ? res.status(200).json({ ok }) : res.status(404).json({ error: "That address isn't on the list" });
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[workspace/admin/emails]", err);
    return res.status(503).json({ error: "Could not update the email list" });
  }
}
