"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  RefreshCw, Users, CalendarClock, Wallet, Ticket, Search, Copy, Trash2, Plus, Send, Loader2,
  CheckCircle2, AlertTriangle, PartyPopper, BellRing, Bot,
} from "lucide-react";
import { describeBooking, formatDate, formatNaira, lagosToday } from "@/lib/workspace";

const card = "bg-zinc-900/70 border border-zinc-800 rounded-2xl";

const FILTERS = [
  { id: "active", label: "In now" },
  { id: "ending", label: "Ending today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "events", label: "Events" },
  { id: "expired", label: "Expired" },
  { id: "unpaid", label: "Unpaid" },
  { id: "all", label: "All" },
];

function bookingState(b, today) {
  if (b.status !== "paid") return b.status === "failed" ? "failed" : "unpaid";
  if (b.end_date < today) return "expired";
  if (b.start_date > today) return "upcoming";
  return b.end_date === today ? "ending" : "active";
}

const STATE_BADGE = {
  active: "bg-green-500/15 text-green-300",
  ending: "bg-yellow-500/15 text-yellow-300",
  upcoming: "bg-blue-500/15 text-blue-300",
  expired: "bg-zinc-700/50 text-zinc-400",
  unpaid: "bg-zinc-700/50 text-zinc-400",
  failed: "bg-red-500/15 text-red-300",
};
const STATE_LABEL = { active: "In now", ending: "Ends 8pm today", upcoming: "Upcoming", expired: "Expired", unpaid: "Not paid", failed: "Failed" };

function Stat({ icon: Icon, label, value, sub }) {
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2"><Icon className="w-4 h-4" /> {label}</div>
      <p className="text-2xl font-semibold text-white leading-none">{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-1.5">{sub}</p>}
    </div>
  );
}

export default function WorkspaceAdmin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("bookings");
  const [filter, setFilter] = useState("active");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const [newCoupon, setNewCoupon] = useState({ count: 1, note: "" });
  const [created, setCreated] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/workspace/admin/data");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not load data");
      setData(d);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, [load]);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  };

  const call = async (key, url, opts, onDone) => {
    setBusy(key);
    try {
      const r = await fetch(url, { headers: { "Content-Type": "application/json" }, ...opts });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Request failed");
      await onDone?.(d);
    } catch (err) {
      flash(err.message);
    } finally {
      setBusy("");
    }
  };

  const createCoupons = (e) => {
    e.preventDefault();
    call("coupon", "/api/workspace/admin/coupons", { method: "POST", body: JSON.stringify(newCoupon) }, async (d) => {
      setCreated(d.codes);
      setNewCoupon({ count: 1, note: "" });
      await load();
    });
  };
  const deleteCoupon = (code) =>
    call(`del-${code}`, `/api/workspace/admin/coupons?code=${encodeURIComponent(code)}`, { method: "DELETE" }, async () => {
      flash(`Deleted ${code}`);
      await load();
    });
  const connectTelegram = () =>
    call("telegram", "/api/workspace/admin/telegram", { method: "POST" }, () => flash("Telegram bot connected. Send /help to it."));
  const runReminders = () =>
    call("remind", "/api/workspace/admin/reminders", { method: "POST" }, async (d) => {
      flash(`Reminders sent: ${d.endingToday} ending today, ${d.endingTomorrow} ending tomorrow${d.failed ? `, ${d.failed} failed` : ""}`);
      await load();
    });
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      flash("Copied");
    } catch {
      flash("Could not copy");
    }
  };

  const today = data?.stats.today || lagosToday();
  const bookings = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.bookings || [])
      .map((b) => ({ ...b, state: bookingState(b, today), d: describeBooking(b) }))
      .filter((b) => {
        if (filter === "events") return b.kind === "event" && b.status === "paid";
        if (filter === "active") return b.status === "paid" && (b.state === "active" || b.state === "ending");
        if (filter === "unpaid") return b.state === "unpaid" || b.state === "failed";
        if (filter !== "all" && b.state !== filter) return false;
        return true;
      })
      .filter((b) => !q || [b.name, b.email, b.phone, b.ref, b.coupon].some((v) => String(v || "").toLowerCase().includes(q)));
  }, [data, filter, query, today]);

  const s = data?.stats;
  const setup = data?.setup;
  const missingSetup = setup && [
    !setup.monnify && "Monnify keys (MONNIFY_API_KEY, MONNIFY_SECRET_KEY, MONNIFY_CONTRACT_CODE)",
    !setup.email && "Email login (SMTP_USER, SMTP_PASS)",
    !setup.telegram && "Telegram bot (TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET)",
    setup.telegram && !setup.telegramAdmins && "Your Telegram ID in TELEGRAM_ADMIN_IDS",
    !setup.cron && "CRON_SECRET, so the daily reminder job can run",
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Workspace admin</h1>
            <p className="text-sm text-zinc-400">{formatDate(today)} · Lagos time</p>
          </div>
          <div className="flex gap-2">
            <button onClick={runReminders} disabled={busy === "remind"}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800 disabled:opacity-50">
              {busy === "remind" ? <Loader2 className="w-4 h-4 animate-spin" /> : <BellRing className="w-4 h-4" />} Send due reminders
            </button>
            <button onClick={load} disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-sm font-medium hover:bg-zinc-200 disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </header>

        {notice && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-white text-black px-4 py-2 text-sm shadow-lg">{notice}</div>}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200 flex gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
          </div>
        )}

        {missingSetup?.length > 0 && (
          <div className={`${card} p-4 mb-6`}>
            <p className="font-medium mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400" /> Still to set up in Vercel</p>
            <ul className="text-sm text-zinc-300 list-disc pl-5 space-y-1">
              {missingSetup.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        )}

        {s && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <Stat icon={Users} label="Seats in use today" value={`${s.seatsUsed}/${s.capacity}`} sub={`${s.capacity - s.seatsUsed} free`} />
              <Stat icon={CalendarClock} label="Ending today" value={s.expiringToday} sub="at 8:00pm" />
              <Stat icon={Wallet} label="Paid today" value={formatNaira(s.revenueToday)} />
              <Stat icon={Wallet} label="This month" value={formatNaira(s.revenueMonth)} />
              <Stat icon={Wallet} label="All time" value={formatNaira(s.revenueAll)} sub="fees, before service charge" />
              <Stat icon={Ticket} label="Unused coupons" value={s.unusedCoupons} />
            </div>

            {s.eventsToday.length > 0 && (
              <div className={`${card} p-4 mb-6`}>
                <p className="font-medium mb-2 flex items-center gap-2"><PartyPopper className="w-4 h-4 text-purple-300" /> Events today</p>
                {s.eventsToday.map((e) => (
                  <p key={e.ref} className="text-sm text-zinc-300">{describeBooking(e).when} · {e.name} · {e.phone}</p>
                ))}
              </div>
            )}

            <div className="flex gap-1 mb-4 border-b border-zinc-800">
              {[["bookings", "Bookings"], ["coupons", "Coupons"], ["telegram", "Telegram & reminders"]].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`px-4 py-2 text-sm -mb-px border-b-2 ${tab === id ? "border-white text-white" : "border-transparent text-zinc-400 hover:text-white"}`}>
                  {label}
                </button>
              ))}
            </div>

            {tab === "bookings" && (
              <section>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {FILTERS.map((f) => (
                    <button key={f.id} onClick={() => setFilter(f.id)}
                      className={`rounded-full px-3 py-1.5 text-sm ${filter === f.id ? "bg-white text-black" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"}`}>
                      {f.label}
                    </button>
                  ))}
                  <label className="relative ml-auto w-full sm:w-64">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, email, ref"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-sm outline-none focus:border-zinc-600" />
                  </label>
                </div>

                <p className="text-xs text-zinc-500 mb-2">{bookings.length} booking{bookings.length === 1 ? "" : "s"}</p>
                <div className="space-y-2">
                  {bookings.map((b) => (
                    <div key={b.ref} className={`${card} p-4 grid md:grid-cols-[1.3fr_1.4fr_auto] gap-2 md:gap-4 md:items-center`}>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{b.name}</p>
                        <p className="text-xs text-zinc-400 truncate">
                          <a href={`tel:${b.phone}`} className="hover:text-white">{b.phone}</a> · <a href={`mailto:${b.email}`} className="hover:text-white">{b.email}</a>
                        </p>
                      </div>
                      <div className="min-w-0 text-sm">
                        <p>{b.d.planTitle} · {b.d.durationTitle}{b.coupon && <span className="ml-2 text-xs text-pink-300">{b.coupon}</span>}</p>
                        <p className="text-xs text-zinc-400">{b.d.when}</p>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-2 justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-xs ${STATE_BADGE[b.state]}`}>{STATE_LABEL[b.state]}</span>
                        <span className="text-sm font-medium">{formatNaira(b.amount_paid ?? b.total)}</span>
                      </div>
                      <p className="md:col-span-3 text-[11px] text-zinc-600 break-all">
                        {b.ref} · booked {new Date(b.created_at).toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}
                        {b.reminded_final_at && " · reminded today"}
                        {b.reminded_early_at && " · reminded a day early"}
                      </p>
                    </div>
                  ))}
                  {!bookings.length && <p className="text-sm text-zinc-500 py-10 text-center">Nothing here yet.</p>}
                </div>
              </section>
            )}

            {tab === "coupons" && (
              <section className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
                <form onSubmit={createCoupons} className={`${card} p-4 space-y-3`}>
                  <p className="font-medium">Create Friends &amp; Family codes</p>
                  <p className="text-xs text-zinc-400">Each code works for one payment. You can also send /coupon to the Telegram bot.</p>
                  <label className="block text-sm">
                    <span className="text-zinc-400 text-xs">How many</span>
                    <input type="number" min={1} max={20} value={newCoupon.count}
                      onChange={(e) => setNewCoupon((c) => ({ ...c, count: e.target.value }))}
                      className="mt-1 w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 outline-none focus:border-zinc-600" />
                  </label>
                  <label className="block text-sm">
                    <span className="text-zinc-400 text-xs">Who it&apos;s for (optional)</span>
                    <input value={newCoupon.note} maxLength={120} placeholder="e.g. Tolu's sister"
                      onChange={(e) => setNewCoupon((c) => ({ ...c, note: e.target.value }))}
                      className="mt-1 w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 outline-none focus:border-zinc-600" />
                  </label>
                  <button disabled={busy === "coupon"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-sm font-medium hover:bg-zinc-200 disabled:opacity-50">
                    {busy === "coupon" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Create
                  </button>
                  {created.length > 0 && (
                    <div className="rounded-lg bg-black border border-green-500/30 p-3 space-y-1">
                      {created.map((c) => (
                        <button type="button" key={c} onClick={() => copy(c)} className="w-full flex items-center justify-between font-mono text-green-300 hover:text-green-200">
                          {c} <Copy className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  )}
                </form>

                <div className="space-y-2">
                  {data.coupons.map((c) => {
                    const held = !c.used_at && c.reserved_at && Date.now() - new Date(c.reserved_at).getTime() < 30 * 60e3;
                    return (
                      <div key={c.code} className={`${card} px-4 py-3 flex flex-wrap items-center gap-3`}>
                        <button onClick={() => copy(c.code)} className="font-mono text-sm hover:text-zinc-300 inline-flex items-center gap-2">
                          {c.code} <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        </button>
                        <span className="text-xs text-zinc-400 flex-1 min-w-0 truncate">
                          {c.note || "No note"} · made {new Date(c.created_at).toLocaleDateString("en-GB")} {c.created_by ? `by ${c.created_by}` : ""}
                        </span>
                        {c.used_at ? (
                          <span className="rounded-full px-2.5 py-1 text-xs bg-zinc-700/50 text-zinc-300">Used {new Date(c.used_at).toLocaleDateString("en-GB")}</span>
                        ) : held ? (
                          <span className="rounded-full px-2.5 py-1 text-xs bg-yellow-500/15 text-yellow-300">In a checkout</span>
                        ) : (
                          <>
                            <span className="rounded-full px-2.5 py-1 text-xs bg-green-500/15 text-green-300">Unused</span>
                            <button onClick={() => deleteCoupon(c.code)} disabled={busy === `del-${c.code}`} aria-label={`Delete ${c.code}`}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                  {!data.coupons.length && <p className="text-sm text-zinc-500 py-10 text-center">No coupon codes yet.</p>}
                </div>
              </section>
            )}

            {tab === "telegram" && (
              <section className="grid md:grid-cols-2 gap-4">
                <div className={`${card} p-5 space-y-3`}>
                  <p className="font-medium flex items-center gap-2"><Bot className="w-4 h-4" /> Telegram bot</p>
                  <ol className="text-sm text-zinc-300 list-decimal pl-5 space-y-1.5">
                    <li>In Telegram, message <b>@BotFather</b>, send <code>/newbot</code> and copy the token.</li>
                    <li>In Vercel, set <code>TELEGRAM_BOT_TOKEN</code> and a random <code>TELEGRAM_WEBHOOK_SECRET</code>, then redeploy.</li>
                    <li>Click <b>Connect bot</b> below.</li>
                    <li>Message your bot. It replies with your Telegram ID: add it to <code>TELEGRAM_ADMIN_IDS</code> and redeploy.</li>
                  </ol>
                  <p className="text-sm">
                    Status: {setup.telegram ? <span className="text-green-300 inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> token set</span> : <span className="text-yellow-300">not set up</span>}
                    {" · "}{setup.telegramAdmins} admin{setup.telegramAdmins === 1 ? "" : "s"}
                  </p>
                  <button onClick={connectTelegram} disabled={!setup.telegram || busy === "telegram"}
                    className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-sm font-medium hover:bg-zinc-200 disabled:opacity-40">
                    {busy === "telegram" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Connect bot
                  </button>
                  <p className="text-xs text-zinc-500">Bot commands: /coupon, /coupon 5 note, /coupons, /revoke CODE, /today, /expiring. Admins also get a message for every payment and a daily summary.</p>
                </div>
                <div className={`${card} p-5 space-y-3`}>
                  <p className="font-medium flex items-center gap-2"><BellRing className="w-4 h-4" /> Renewal reminders</p>
                  <p className="text-sm text-zinc-300">Every day at about 5pm, everyone whose pass ends at 8pm that day gets a renewal email. Weekly and monthly members also get one the day before. People who already renewed are skipped.</p>
                  <p className="text-sm">Daily job: {setup.cron ? <span className="text-green-300">on</span> : <span className="text-yellow-300">set CRON_SECRET in Vercel to turn it on</span>}</p>
                  <button onClick={runReminders} disabled={busy === "remind"}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800 disabled:opacity-50">
                    {busy === "remind" ? <Loader2 className="w-4 h-4 animate-spin" /> : <BellRing className="w-4 h-4" />} Send due reminders now
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        {!s && loading && <p className="text-zinc-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</p>}
      </div>
    </div>
  );
}
