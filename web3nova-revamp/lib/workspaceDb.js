// Server-only Postgres (Neon) access for the workspace. Never import this from a component.
// Tables are created on first use, so a fresh database needs no manual setup.
import { neon } from "@neondatabase/serverless";

let client = null;
let ready = null;

function connect() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("Database is not configured (DATABASE_URL)");
  if (!client) client = neon(url);
  return client;
}

async function migrate(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS ws_bookings (
      ref text PRIMARY KEY,
      kind text NOT NULL,
      plan text NOT NULL,
      duration text NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL,
      start_date date NOT NULL,
      end_date date NOT NULL,
      event_start timestamptz,
      event_end timestamptz,
      coupon text,
      program_fee integer NOT NULL,
      service_charge integer NOT NULL,
      total integer NOT NULL,
      amount_paid integer,
      status text NOT NULL DEFAULT 'pending',
      created_at timestamptz NOT NULL DEFAULT now(),
      paid_at timestamptz,
      reminded_early_at timestamptz,
      reminded_final_at timestamptz
    )`;
  await sql`CREATE INDEX IF NOT EXISTS ws_bookings_dates ON ws_bookings (kind, start_date, end_date)`;
  await sql`CREATE INDEX IF NOT EXISTS ws_bookings_email ON ws_bookings (email)`;
  await sql`
    CREATE TABLE IF NOT EXISTS ws_coupons (
      code text PRIMARY KEY,
      note text,
      created_by text,
      created_at timestamptz NOT NULL DEFAULT now(),
      reserved_ref text,
      reserved_at timestamptz,
      used_ref text,
      used_at timestamptz
    )`;
}

export async function db() {
  const sql = connect();
  if (!ready) {
    ready = migrate(sql).catch((err) => {
      ready = null;
      throw err;
    });
  }
  await ready;
  return sql;
}

// `date` columns come back as JS Dates at local midnight; keep them as YYYY-MM-DD strings.
const toDay = (v) => {
  if (!(v instanceof Date)) return v ? String(v).slice(0, 10) : v;
  const p = (n) => String(n).padStart(2, "0");
  return `${v.getFullYear()}-${p(v.getMonth() + 1)}-${p(v.getDate())}`;
};
const toIso = (v) => (v instanceof Date ? v.toISOString() : v);

export function rowToBooking(r) {
  if (!r) return null;
  return {
    ...r,
    start_date: toDay(r.start_date),
    end_date: toDay(r.end_date),
    event_start: toIso(r.event_start),
    event_end: toIso(r.event_end),
    created_at: toIso(r.created_at),
    paid_at: toIso(r.paid_at),
    reminded_early_at: toIso(r.reminded_early_at),
    reminded_final_at: toIso(r.reminded_final_at),
  };
}

export function rowToCoupon(r) {
  return {
    ...r,
    created_at: toIso(r.created_at),
    reserved_at: toIso(r.reserved_at),
    used_at: toIso(r.used_at),
  };
}
