// Server-only: who gets an email copy of every payment. Managed from the workspace admin page;
// addresses in WORKSPACE_ADMIN_EMAIL / BOOTCAMP_ADMIN_EMAIL (comma-separated) also get one.
import { db } from "@/lib/workspaceDb";

export const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;
export const MAX_NOTIFY_EMAILS = 20;

const splitEnv = (v) => String(v || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

export async function listNotifyEmails() {
  const sql = await db();
  const rows = await sql`SELECT email, added_at FROM ws_notify_emails ORDER BY added_at`;
  return rows.map((r) => ({ email: r.email, added_at: r.added_at instanceof Date ? r.added_at.toISOString() : r.added_at }));
}

// Returns false if the list is full.
export async function addNotifyEmail(email) {
  const sql = await db();
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM ws_notify_emails`;
  if (n >= MAX_NOTIFY_EMAILS) return false;
  await sql`INSERT INTO ws_notify_emails (email) VALUES (${email.trim().toLowerCase()}) ON CONFLICT (email) DO NOTHING`;
  return true;
}

export async function removeNotifyEmail(email) {
  const sql = await db();
  const rows = await sql`DELETE FROM ws_notify_emails WHERE email = ${String(email || "").trim().toLowerCase()} RETURNING email`;
  return rows.length > 0;
}

// Everyone to copy on a payment: the env var's addresses plus the admin-page list.
// Without a database (bootcamp-only setups) it falls back to the env var.
export async function paymentRecipients(envName) {
  let saved = [];
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
    try {
      saved = (await listNotifyEmails()).map((r) => r.email);
    } catch (err) {
      console.error("[notifyEmails]", err);
    }
  }
  return [...new Set([...splitEnv(process.env[envName]), ...saved])];
}
