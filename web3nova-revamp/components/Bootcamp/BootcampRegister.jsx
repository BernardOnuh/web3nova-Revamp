"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Smartphone, Palette, Brain, Sparkles, Cpu, MapPin, Wifi,
  User, Mail, Phone, School, ArrowRight, Loader2, Check,
  ShieldCheck, MailCheck, Rocket, Users, ChevronDown, Lock, Zap,
} from "lucide-react";
import { COURSES, LOCATIONS, formatNaira, priceBreakdown } from "@/lib/bootcamp";
import { BootcampBackground, fontVars } from "./theme";

const DRAFT_KEY = "w3n_bootcamp_draft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISPLAY = "font-[family-name:var(--font-display)]";

const COURSE_STYLE = {
  "web-dev": { icon: Globe, color: "#38BDF8", label: "Web Development" },
  "mobile-dev": { icon: Smartphone, color: "#22C55E", label: "Mobile App Development" },
  "ui-ux": { icon: Palette, color: "#FF4D9D", label: "UI/UX Design" },
  "ai-automation": { icon: Brain, color: "#A78BFA", label: "AI & Automation" },
  "smart-contracts": { icon: Sparkles, color: "#60A5FA", label: "Smart Contracts" },
  "zk-rust": { icon: Cpu, color: "#FB923C", label: "ZK, Rust & Protocols" },
};
const LOCATION_ICON = { "onsite-akure": MapPin, online: Wifi };

const SCHOOL_SUGGESTIONS = [
  "Federal University of Technology, Akure (FUTA)",
  "Adekunle Ajasin University, Akungba (AAUA)",
  "Olusegun Agagu University of Science and Technology (OAUSTECH)",
  "Rufus Giwa Polytechnic, Owo",
  "Federal Polytechnic, Ado-Ekiti",
  "Secondary school",
  "Graduate / Not in school",
];

const PERKS = [
  { icon: Rocket, title: "Build real projects", text: "Ship work you can show off in your portfolio." },
  { icon: Users, title: "Learn with a crew", text: "Mentors, classmates and the Web3Nova community." },
  { icon: Zap, title: "Step by step", text: "A clear weekly path from basics to building." },
];

const FAQS = [
  { q: "Do I need experience?", a: "Not for the beginner-friendly tracks: they start from the basics. Intermediate and advanced tracks are best if you've coded before." },
  { q: "How do I pay?", a: "Securely through Monnify, by card, bank transfer or USSD. You'll get a confirmation email once your payment goes through." },
  { q: "On-site or online?", a: "On-site classes hold in Akure. Online classes are live and virtual, so you can join from anywhere." },
];

const glass = "bg-white/[0.04] backdrop-blur-xl border border-white/10";
const inputClass =
  "w-full rounded-2xl bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all";

function StepHeading({ n, title, done, hint }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span
        className={`mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${DISPLAY} ${done ? "bg-green-400 text-black" : "bg-gradient-to-br from-blue-500 to-blue-700 text-white"}`}
      >
        {done ? <Check className="w-4 h-4" strokeWidth={3} /> : n}
      </span>
      <div>
        <h2 className={`text-[22px] md:text-2xl font-bold leading-tight tracking-tight ${DISPLAY}`}>{title}</h2>
        {hint && <p className="text-sm text-gray-400 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, error, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2 text-gray-200">{label}</span>
      <span className="relative block">
        <Icon className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input className={`${inputClass} ${error ? "border-red-400/70" : ""}`} {...props} />
      </span>
      {error && <span className="block text-xs text-red-400 mt-1.5">{error}</span>}
    </label>
  );
}

export default function BootcampRegister() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", school: "", courseId: "", locationId: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const courseRef = useRef(null);
  const locationRef = useRef(null);
  const detailsRef = useRef(null);

  // Keep the form filled in if someone leaves for payment and comes back.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (saved) setForm((f) => ({ ...f, ...saved }));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const course = COURSES.find((c) => c.id === form.courseId);
  const courseStyle = course && COURSE_STYLE[course.id];
  const location = LOCATIONS.find((l) => l.id === form.locationId);
  const minPrice = Math.min(...LOCATIONS.map((l) => l.price));
  const breakdown = location && priceBreakdown(location.price);

  const errors = {
    name: !form.name.trim() && "Enter your full name",
    email: !EMAIL_RE.test(form.email.trim()) && "Enter a valid email so we can send your confirmation",
    phone: form.phone.replace(/\D/g, "").length < 10 && "Enter a valid phone number",
    school: !form.school.trim() && "Tell us your school (or pick Graduate)",
  };
  const detailsDone = !Object.values(errors).some(Boolean);
  const isValid = course && location && detailsDone;
  const missing = !course ? "Pick a track" : !location ? "Pick online or on-site" : !detailsDone ? "Fill in your details" : null;

  const scrollTo = (ref) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const handleChange = (e) => set(e.target.name, e.target.value);
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));
  const showError = (name) => touched[name] && errors[name];

  const pickCourse = (id) => set("courseId", id);
  const pickLocation = (id) => {
    set("locationId", id);
    if (!detailsDone) scrollTo(detailsRef);
  };

  const handlePay = async (e) => {
    e?.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, phone: true, school: true });
      scrollTo(!course ? courseRef : !location ? locationRef : detailsRef);
      return;
    }
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bootcamp/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error || "Could not start payment");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const payLabel = breakdown ? `Pay ${formatNaira(breakdown.total)}` : "Continue";

  return (
    <div className={`${fontVars} relative isolate min-h-screen text-white font-[family-name:var(--font-body)] antialiased`}>
      <BootcampBackground />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16">
        {/* Hero (CSS fade so it's visible before JS loads on slow phones) */}
        <header className="bc-fade text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-yellow-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-yellow-400" />
            </span>
            Enrolling now · 4-month intensive
          </span>

          <h1 className={`${DISPLAY} font-bold tracking-[-0.03em] leading-[0.95] text-[2.9rem] sm:text-6xl md:text-7xl mb-5`}>
            Learn tech.
            <span className="block bg-gradient-to-r from-[#5AA9FF] via-[#9CC8FF] to-[#FDB913] bg-clip-text text-transparent pb-1">
              Build real things.
            </span>
          </h1>
          <p className="text-gray-300 text-[16px] md:text-xl leading-relaxed max-w-xl mx-auto">
            The Web3Nova <b className="text-white font-semibold">16-week bootcamp</b>. Pick a track, choose how you learn, and start building.
          </p>

          {/* Quick facts */}
          <div className={`${glass} mt-7 mx-auto max-w-md grid grid-cols-3 rounded-2xl divide-x divide-white/10`}>
            {[
              ["16", "weeks"],
              [String(COURSES.length), "tracks"],
              [`₦${minPrice / 1000}k`, "from"],
            ].map(([big, small]) => (
              <div key={small} className="py-3">
                <p className={`${DISPLAY} text-2xl font-bold leading-none`}>{big}</p>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1">{small}</p>
              </div>
            ))}
          </div>

          {/* Perks: swipeable on phones, grid on larger screens */}
          <div className="mt-6 -mx-4 px-4 sm:mx-auto sm:px-0 flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:overflow-visible max-w-4xl text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <div key={title} className={`${glass} snap-start shrink-0 w-[72%] sm:w-auto rounded-2xl p-4`}>
                <span className="w-9 h-9 rounded-xl bg-yellow-400/15 text-yellow-300 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </span>
                <p className={`${DISPLAY} font-semibold`}>{title}</p>
                <p className="text-sm text-gray-400 leading-snug mt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </header>

        <form onSubmit={handlePay} className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-12 min-w-0">
            {/* Step 1: Track */}
            <section ref={courseRef} className="scroll-mt-24">
              <StepHeading n={1} title="Pick your track" hint="Tap one to see what you'll learn." done={!!course} />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {COURSES.map((c) => {
                  const { icon: Icon, color, label } = COURSE_STYLE[c.id] || { icon: Sparkles, color: "#60A5FA", label: c.title };
                  const active = form.courseId === c.id;
                  return (
                    <motion.button
                      type="button"
                      key={c.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => pickCourse(c.id)}
                      aria-pressed={active}
                      className={`relative text-left rounded-2xl p-3.5 sm:p-4 min-h-[124px] flex flex-col transition-all border backdrop-blur-xl ${active ? "bg-white/[0.09]" : "bg-white/[0.04] border-white/10 active:bg-white/[0.08] hover:border-white/25"}`}
                      style={active ? { borderColor: color, boxShadow: `0 0 0 1px ${color}, 0 12px 36px -12px ${color}` } : undefined}
                    >
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}26`, color }}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className={`${DISPLAY} font-semibold text-[15px] sm:text-base leading-tight pr-5`}>{label}</p>
                      <span className="mt-auto pt-2 text-[11px] font-medium" style={{ color }}>
                        {c.level}
                      </span>
                      {active && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: color }}>
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected track details */}
              <AnimatePresence mode="wait">
                {course && (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`${glass} mt-3 rounded-2xl p-4 flex items-start gap-3`}
                    style={{ borderColor: `${courseStyle.color}55` }}
                  >
                    <courseStyle.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: courseStyle.color }} />
                    <div className="min-w-0">
                      <p className={`${DISPLAY} font-semibold`}>{course.title}</p>
                      <p className="text-sm text-gray-300 leading-relaxed mt-0.5">{course.short}</p>
                      {!location && (
                        <button type="button" onClick={() => scrollTo(locationRef)} className="mt-2 text-sm font-semibold inline-flex items-center gap-1" style={{ color: courseStyle.color }}>
                          Next: how you&apos;ll learn <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Step 2: Location */}
            <section ref={locationRef} className="scroll-mt-24">
              <StepHeading n={2} title="How do you want to learn?" done={!!location} />
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {LOCATIONS.map((l) => {
                  const Icon = LOCATION_ICON[l.id] || MapPin;
                  const active = form.locationId === l.id;
                  return (
                    <motion.button
                      type="button"
                      key={l.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => pickLocation(l.id)}
                      aria-pressed={active}
                      className={`relative text-left rounded-2xl border p-4 sm:p-5 flex flex-col backdrop-blur-xl transition-all ${active ? "border-blue-400 bg-blue-500/15 shadow-[0_12px_36px_-12px_rgba(74,144,226,0.9)]" : "border-white/10 bg-white/[0.04] hover:border-white/25"}`}
                    >
                      <span className="w-10 h-10 rounded-xl bg-blue-400/15 text-blue-300 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className={`${DISPLAY} font-semibold text-base sm:text-lg leading-tight pr-5`}>{l.title}</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">{l.short}</p>
                      <p className={`${DISPLAY} mt-auto pt-3 text-[22px] sm:text-2xl font-bold text-yellow-400 leading-none`}>{formatNaira(l.price)}</p>
                      <p className="text-[11px] text-gray-500 mt-1">+ {formatNaira(priceBreakdown(l.price).fee)} service charge</p>
                      {active && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-400 text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Details */}
            <section ref={detailsRef} className="scroll-mt-24">
              <StepHeading n={3} title="Your details" hint="Your confirmation email goes here." done={detailsDone} />
              <div className={`${glass} rounded-3xl p-4 sm:p-6 space-y-5`}>
                <Field icon={User} label="Full name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                  autoComplete="name" placeholder="e.g. Tolu Adebayo" error={showError("name")} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field icon={Mail} label="Email" type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                    autoComplete="email" inputMode="email" autoCapitalize="none" placeholder="you@example.com" error={showError("email")} />
                  <Field icon={Phone} label="Phone (WhatsApp)" type="tel" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                    autoComplete="tel" inputMode="tel" placeholder="0803 000 0000" error={showError("phone")} />
                </div>
                <Field icon={School} label="School you're coming from" name="school" list="w3n-schools" value={form.school} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Start typing your school…" error={showError("school")} />
                <datalist id="w3n-schools">
                  {SCHOOL_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
                </datalist>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className={`${DISPLAY} text-xl font-bold mb-4`}>Quick questions</h2>
              <div className="space-y-2">
                {FAQS.map((f, i) => (
                  <div key={f.q} className={`${glass} rounded-2xl`}>
                    <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium" aria-expanded={openFaq === i}>
                      {f.q}
                      <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-4 text-sm text-gray-400 leading-relaxed overflow-hidden">
                          {f.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Desktop summary */}
          <aside className={`${glass} hidden lg:block sticky top-28 rounded-3xl p-6`}>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Your plan</p>
            <h3 className={`${DISPLAY} text-lg font-bold mb-5`}>16-Week Bootcamp</h3>
            <dl className="space-y-3 text-sm mb-6">
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Track</dt><dd className="text-right font-medium">{course?.title || "—"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Location</dt><dd className="text-right font-medium">{location?.title || "—"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Duration</dt><dd className="text-right font-medium">4 months</dd></div>
            </dl>
            {breakdown && (
              <dl className="space-y-2 text-sm border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Program fee</dt><dd>{formatNaira(breakdown.price)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Service charge</dt><dd>{formatNaira(breakdown.fee)}</dd></div>
              </dl>
            )}
            <div className="flex justify-between items-baseline border-t border-white/10 pt-4 mb-5">
              <span className="text-gray-400">Total</span>
              <span className={`${DISPLAY} text-3xl font-bold text-yellow-400`}>{breakdown ? formatNaira(breakdown.total) : "—"}</span>
            </div>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <PayButton loading={loading} ready={isValid} label={payLabel} />
            <p className="text-xs text-center mt-3 text-gray-500">{missing || "You'll be redirected to Monnify to pay."}</p>
            <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-xs text-gray-400">
              <p className="flex items-center gap-2"><Lock className="w-4 h-4 text-green-400" /> Secure payment by Monnify</p>
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-400" /> Card, bank transfer or USSD</p>
              <p className="flex items-center gap-2"><MailCheck className="w-4 h-4 text-green-400" /> Instant email confirmation</p>
            </div>
          </aside>

          {/* Mobile sticky pay bar */}
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#05070d]/90 backdrop-blur-xl px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 truncate">{missing || `${courseStyle.label} · ${location.title}`}</p>
                <p className={`${DISPLAY} text-xl font-bold text-yellow-400 leading-tight`}>
                  {breakdown ? formatNaira(breakdown.total) : <>from {formatNaira(minPrice)}</>}
                </p>
                {breakdown && (
                  <p className="text-[11px] text-gray-500 leading-tight">
                    {formatNaira(breakdown.price)} + {formatNaira(breakdown.fee)} service charge
                  </p>
                )}
              </div>
              <div className="shrink-0">
                <PayButton loading={loading} ready={isValid} label={payLabel} compact />
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        html, body { background: #05070d; }
        @keyframes bc-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .bc-fade { animation: bc-fade 0.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .bc-fade { animation: none; } }
      `}</style>
    </div>
  );
}

function PayButton({ loading, ready, label, compact }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${DISPLAY} inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 ${compact ? "px-5 py-3.5 text-base" : "w-full px-6 py-4 text-lg"} ${ready ? "bg-gradient-to-r from-[#4A90E2] to-[#FDB913] text-black hover:scale-[1.03] shadow-[0_10px_40px_-10px_rgba(253,185,19,0.8)]" : "bg-white/10 text-white hover:bg-white/15"} ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
    >
      {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Redirecting…</> : <>{label} <ArrowRight className="w-5 h-5" /></>}
    </button>
  );
}
