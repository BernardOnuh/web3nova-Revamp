import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Copy, Link2, Trash2, Search, ClipboardPaste, RotateCcw, AlertCircle } from "lucide-react";
import DeskLayout from "@/components/Desk/DeskLayout";
import { COURSES } from "@/lib/bootcamp";
import { COUNTRIES, detectCountry, toWhatsApp } from "@/lib/phone";

// Contacts stay in this browser only (localStorage). Nothing is sent to a server.
const KEYS = {
  contacts: "w3n_outreach_contacts",
  sent: "w3n_outreach_sent",
  tpl: "w3n_outreach_tpl",
  country: "w3n_outreach_country",
};

const DEFAULT_TPL = `Hi {name} 👋

Thank you for registering your interest in the *Web3Nova Bootcamp* earlier. Good news: our *new cohort starts on Monday, 16th November 2026!* 🚀

📚 *16 weeks (4 months) of intensive, hands-on training*
You signed up for *{track}*, and you can also choose from Web Development, Mobile App Development, UI/UX Design, AI & Automation, Smart Contracts, or ZK & Rust.

💰 *Fee*
• On-site (Akure): *₦70,000*
• Online: *₦150,000*

💡 *Learn. Build. Earn.*
We don't just teach, we make sure you can build real things and start earning from your skills. If you follow every instruction your tutors give throughout the 4 months and you still don't start earning, *you can ask for a refund.*

⚠️ *We're only taking 30 people* for this cohort, to keep classes small and give everyone real attention from mentors.

👉 Secure your spot here (your details are already filled in):
{link}

Any questions? Just reply to this message. 💙
— The Web3Nova Team`;

const FUTA = "Federal University of Technology, Akure (FUTA)";

const store = {
  get(k, fallback) {
    try {
      const v = localStorage.getItem(k);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
};

// ---------- Parsing pasted sheet rows ----------

// Google Sheets copies as TSV; cells with line breaks are wrapped in quotes.
function parseTsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === "\t") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

const DATE_START = /^\s*\d{1,2}\/\d{1,2}\/\d{2,4}/;

// Text copied from elsewhere (e.g. chat) loses the tabs; columns are split by 3+ spaces.
function parseSpaced(text) {
  const groups = [];
  for (const line of text.split(/\r?\n/)) {
    if (DATE_START.test(line) || !groups.length) groups.push(line);
    else groups[groups.length - 1] += " " + line;
  }
  return groups.map((g) => g.split(/\s{3,}|\t/).map((c) => c.replace(/^"|"$/g, "")));
}

function trackToCourse(text) {
  const t = String(text).toLowerCase();
  if (t.includes("mobile")) return "mobile-dev";
  if (t.includes("ui") || t.includes("ux") || t.includes("design")) return "ui-ux";
  if (t.includes("blockchain") || t.includes("smart")) return "smart-contracts";
  if (t.includes("zk") || t.includes("rust")) return "zk-rust";
  if (/\bai\b|automation/.test(t)) return "ai-automation";
  if (t.includes("web")) return "web-dev";
  return "";
}

const titleCase = (s) =>
  String(s).trim().replace(/\s+/g, " ").toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());

// Columns from the bootcamp Google Form:
// timestamp | name | email | phone | level | track | goals | hours | location
// Also accepts simple rows: name | phone | track | location
function rowsToContacts(rows, defaultCountry) {
  return rows
    .filter((r) => !/timestamp|full name|^name$/i.test(r[0] + " " + r[1]))
    .map((r) => {
      const c = r.map((x) => String(x ?? "").trim());
      const form = DATE_START.test(c[0]);
      const [name, email, phone, track, place] = form
        ? [c[1], c[2], c[3], c[5], c[8]]
        : [c[0], "", c[1], c[2], c[3]];
      return {
        name: titleCase(name),
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email.toLowerCase() : "",
        phone,
        country: detectCountry(phone) || defaultCountry,
        courseId: trackToCourse(track),
        trackText: track,
        place: place || "",
      };
    })
    .filter((p) => p.name || p.phone);
}

const contactId = (p) => p.phone.replace(/\D/g, "") || p.name.toLowerCase();

// Merge new contacts in, skipping duplicates (same phone, or same name if no phone).
function mergeContacts(existing, incoming) {
  const byId = new Map(existing.map((p) => [p.id, p]));
  let added = 0, dupes = 0;
  for (const p of incoming) {
    const id = contactId(p);
    if (byId.has(id)) { dupes++; continue; }
    byId.set(id, { ...p, id });
    added++;
  }
  return { list: [...byId.values()], added, dupes };
}

// ---------- Page ----------

export default function Outreach() {
  const [contacts, setContacts] = useState([]);
  const [sent, setSent] = useState({});
  const [tpl, setTpl] = useState(DEFAULT_TPL);
  const [defaultCountry, setDefaultCountry] = useState("234");
  const [paste, setPaste] = useState("");
  const [pasteMsg, setPasteMsg] = useState("");
  const [filter, setFilter] = useState("todo");
  const [query, setQuery] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [toast, setToast] = useState("");
  const [origin, setOrigin] = useState("https://www.web3nova.org");

  useEffect(() => {
    setContacts(store.get(KEYS.contacts, []));
    setSent(store.get(KEYS.sent, {}));
    setTpl(store.get(KEYS.tpl, DEFAULT_TPL));
    setDefaultCountry(store.get(KEYS.country, "234"));
    if (!/localhost|127\.0\.0\.1/.test(window.location.host)) setOrigin(window.location.origin);
  }, []);

  const saveContacts = (list) => { setContacts(list); store.set(KEYS.contacts, list); };
  const saveSent = (s) => { setSent(s); store.set(KEYS.sent, s); };
  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 1600); };

  const enriched = useMemo(
    () =>
      contacts.map((p) => {
        const course = COURSES.find((c) => c.id === p.courseId);
        return { ...p, ...toWhatsApp(p.phone, p.country), trackLabel: course?.title || p.trackText || "our bootcamp" };
      }),
    [contacts]
  );

  const payLink = (p) => {
    const q = new URLSearchParams();
    if (p.name) q.set("name", p.name);
    if (p.phone) q.set("phone", p.phone);
    if (p.email) q.set("email", p.email);
    if (/futa/i.test(p.place)) q.set("school", FUTA);
    if (p.courseId) q.set("course", p.courseId);
    q.set("location", /online/i.test(p.place) ? "online" : "onsite-akure");
    return `${origin}/bootcamp?${q.toString()}`;
  };
  const message = (p) =>
    tpl.replaceAll("{name}", p.name).replaceAll("{track}", p.trackLabel).replaceAll("{link}", payLink(p));
  const waLink = (p) => `https://wa.me/${p.intl}?text=${encodeURIComponent(message(p))}`;

  const addFromPaste = () => {
    const rows = paste.includes("\t") ? parseTsv(paste) : parseSpaced(paste);
    const { list, added, dupes } = mergeContacts(contacts, rowsToContacts(rows, defaultCountry));
    saveContacts(list);
    setPasteMsg(`Added ${added} contact${added === 1 ? "" : "s"}${dupes ? `, skipped ${dupes} duplicate${dupes === 1 ? "" : "s"}` : ""}.`);
    if (added) setPaste("");
  };

  const update = (id, patch) => saveContacts(contacts.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const remove = (id) => saveContacts(contacts.filter((p) => p.id !== id));
  const markSent = (id, on) => {
    const next = { ...sent };
    if (on) next[id] = new Date().toISOString(); else delete next[id];
    saveSent(next);
  };
  const copy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); flash(`${label} copied`); }
    catch { flash("Couldn't copy"); }
  };

  const counts = {
    all: enriched.length,
    todo: enriched.filter((p) => !sent[p.id]).length,
    sent: enriched.filter((p) => sent[p.id]).length,
    fix: enriched.filter((p) => !p.intl).length,
  };
  const q = query.trim().toLowerCase();
  const visible = enriched.filter((p) => {
    if (q && !`${p.name} ${p.phone} ${p.trackLabel} ${p.email}`.toLowerCase().includes(q)) return false;
    if (filter === "todo") return !sent[p.id];
    if (filter === "sent") return !!sent[p.id];
    if (filter === "fix") return !p.intl;
    return true;
  });

  const input = "w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500";
  const btn = "inline-flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 whitespace-nowrap";

  return (
    <DeskLayout title="WhatsApp outreach">
      <p className="text-sm text-zinc-400 -mt-3 mb-6 max-w-2xl">
        Paste people from the sign-up sheet, then tap <b className="text-white">Send</b> to open WhatsApp with a personal message and pay link.
        Contacts are kept only in this browser.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          ["Contacts", counts.all, "text-white"],
          ["Not sent", counts.todo, "text-amber-300"],
          ["Sent", counts.sent, "text-emerald-400"],
          ["Check number", counts.fix, counts.fix ? "text-red-400" : "text-zinc-500"],
        ].map(([label, n, color]) => (
          <div key={label} className="bg-zinc-950 border border-zinc-900 rounded p-4">
            <div className={`text-2xl font-semibold ${color}`}>{n}</div>
            <div className="text-xs text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mb-8">
        {/* 1. Paste */}
        <section className="bg-zinc-950 border border-zinc-900 rounded p-4">
          <h2 className="font-semibold mb-1">1. Add contacts</h2>
          <p className="text-xs text-zinc-500 mb-3">
            Copy rows from the Google Sheet (select the cells → Copy) and paste here. Duplicates are skipped.
          </p>
          <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={6}
            placeholder={"Paste rows here…\nTimestamp | Name | Email | Phone | Level | Track | Goals | Hours | Location"}
            className={`${input} font-mono text-xs`} />
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <label className="text-xs text-zinc-400">Default country</label>
            <select value={defaultCountry} onChange={(e) => { setDefaultCountry(e.target.value); store.set(KEYS.country, e.target.value); }}
              className="bg-zinc-950 border border-zinc-800 rounded px-2 py-2 text-sm">
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} (+{c.code})</option>)}
            </select>
            <button type="button" onClick={addFromPaste} disabled={!paste.trim()}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded bg-white text-black font-medium disabled:opacity-40">
              <ClipboardPaste size={14} /> Add contacts
            </button>
          </div>
          {pasteMsg && <p className="text-xs text-emerald-400 mt-2">{pasteMsg}</p>}
          <p className="text-[11px] text-zinc-600 mt-2">Numbers starting with + (e.g. +254…) use their own country automatically.</p>
        </section>

        {/* 2. Template */}
        <section className="bg-zinc-950 border border-zinc-900 rounded p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold">2. Message</h2>
            <button type="button" onClick={() => { setTpl(DEFAULT_TPL); store.set(KEYS.tpl, DEFAULT_TPL); }} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1">
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          <p className="text-xs text-zinc-500 mb-3">
            <code className="text-amber-300">{"{name}"}</code>, <code className="text-amber-300">{"{track}"}</code> and{" "}
            <code className="text-amber-300">{"{link}"}</code> (their personal pay link) are filled in for each person.
          </p>
          <textarea value={tpl} onChange={(e) => { setTpl(e.target.value); store.set(KEYS.tpl, e.target.value); }} rows={12} className={`${input} text-[13px] leading-relaxed`} />
        </section>
      </div>

      {/* 3. Send */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="font-semibold mr-2">3. Send</h2>
          {[
            ["todo", "Not sent"],
            ["sent", "Sent"],
            ["fix", "Check number"],
            ["all", "All"],
          ].map(([key, label]) => (
            <button key={key} type="button" onClick={() => setFilter(key)}
              className={`text-xs px-3 py-1.5 rounded-full border ${filter === key ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-400 hover:text-white"}`}>
              {label} <span className="opacity-60">{counts[key]}</span>
            </button>
          ))}
          <div className="relative flex-1 min-w-[180px] sm:max-w-xs ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className={`${input} pl-8`} />
          </div>
        </div>

        <div className="space-y-2">
          {visible.map((p) => {
            const isSent = !!sent[p.id];
            return (
              <div key={p.id} className={`bg-zinc-950 border rounded p-3 sm:p-4 ${p.intl ? "border-zinc-900" : "border-red-900/60"} ${isSent ? "opacity-60" : ""}`}>
                <div className="flex flex-wrap items-start gap-3">
                  <input type="checkbox" checked={isSent} onChange={(e) => markSent(p.id, e.target.checked)}
                    aria-label={`Mark ${p.name} as messaged`} className="mt-1 w-5 h-5 accent-emerald-500 cursor-pointer" />
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-medium">{p.name || "No name"}</div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 mt-0.5">
                      <span className="text-sky-300">{p.trackLabel}</span>
                      {p.place && <span>{p.place}</span>}
                      {p.email && <span>{p.email}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <select value={p.country} onChange={(e) => update(p.id, { country: e.target.value })}
                        aria-label="Country" className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs">
                        {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} +{c.code}</option>)}
                      </select>
                      <input defaultValue={p.phone} onBlur={(e) => e.target.value !== p.phone && update(p.id, { phone: e.target.value })}
                        aria-label="Phone" inputMode="tel" className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs w-40" />
                    </div>
                    {p.problem && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {p.problem}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <a href={p.intl ? waLink(p) : undefined} target="_blank" rel="noopener noreferrer"
                      onClick={() => p.intl && markSent(p.id, true)} aria-disabled={!p.intl}
                      className={`inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 text-sm px-4 py-2 rounded font-medium ${p.intl ? "bg-[#25D366] text-black hover:brightness-110" : "bg-zinc-900 text-zinc-600 pointer-events-none"}`}>
                      <MessageCircle size={15} /> Send
                    </a>
                    <button type="button" onClick={() => copy(message(p), "Message")} className={btn} title="Copy message"><Copy size={14} /></button>
                    <button type="button" onClick={() => copy(payLink(p), "Pay link")} className={btn} title="Copy pay link"><Link2 size={14} /></button>
                    <button type="button" onClick={() => remove(p.id)} className={`${btn} hover:text-red-400`} title="Remove"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
          {!visible.length && (
            <p className="text-sm text-zinc-500 py-8 text-center">
              {contacts.length ? "No one in this list." : "No contacts yet. Paste rows from the sheet above."}
            </p>
          )}
        </div>

        {contacts.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span>Opening WhatsApp marks a person as sent. Untick if you didn&apos;t send.</span>
            <button type="button"
              onClick={() => { if (!confirmClear) { setConfirmClear(true); setTimeout(() => setConfirmClear(false), 4000); return; } saveContacts([]); saveSent({}); setConfirmClear(false); }}
              className="ml-auto text-red-400 hover:text-red-300">
              {confirmClear ? "Click again to delete all contacts" : "Delete all contacts"}
            </button>
          </div>
        )}
      </section>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white text-black text-sm font-medium px-4 py-2 rounded-full shadow-lg z-50">{toast}</div>
      )}
    </DeskLayout>
  );
}
