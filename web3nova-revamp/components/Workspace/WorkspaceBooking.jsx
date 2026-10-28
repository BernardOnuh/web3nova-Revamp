"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Minus, Plus, Armchair, Monitor, HeartHandshake, PartyPopper, User, Mail, Phone, Ticket, CalendarDays, Clock,
  ArrowRight, Loader2, Check, Lock, ShieldCheck, MailCheck, Wifi, Users, BellRing,
} from "lucide-react";
import {
  DURATIONS, EVENT_SPACE, MAX_DAYS_AHEAD, SEAT_CAPACITY, SEAT_PLANS, CLOSE_LABEL, OPEN_LABEL,
  addDays, earliestSeatStart, formatDate, formatHour, formatNaira, lagosToday, maxHoursFrom, planDurations,
  priceBreakdown, seatEndDate,
} from "@/lib/workspace";
import { BootcampBackground, fontVars } from "@/components/Bootcamp/theme";

const DRAFT_KEY = "w3n_workspace_draft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISPLAY = "font-[family-name:var(--font-display)]";

const SPACES = [
  ...SEAT_PLANS.map((p) => ({ ...p, kind: "seat", from: p.prices.hour || p.prices.day, per: p.prices.hour ? "/hr" : "/day" })),
  { ...EVENT_SPACE, kind: "event", from: EVENT_SPACE.options[0].price, per: "/6 hrs", features: ["Its own room", "6 or 12 hours"] },
];
const SPACE_STYLE = {
  basic: { icon: Armchair, color: "#38BDF8" },
  premium: { icon: Monitor, color: "#FDB913" },
  family: { icon: HeartHandshake, color: "#FF4D9D" },
  event: { icon: PartyPopper, color: "#A78BFA" },
};

const glass = "bg-white/[0.04] backdrop-blur-xl border border-white/10";
const inputClass =
  "w-full rounded-2xl bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all [color-scheme:dark]";

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

function Field({ icon: Icon, label, error, children, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2 text-gray-200">{label}</span>
      <span className="relative block">
        <Icon className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input className={`${inputClass} ${error ? "border-red-400/70" : ""}`} {...props} />
        {children}
      </span>
      {error && <span className="block text-xs text-red-400 mt-1.5">{error}</span>}
    </label>
  );
}

function Chip({ active, onClick, color = "#4A90E2", children, disabled }) {
  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`relative text-left rounded-2xl border p-4 backdrop-blur-xl transition-all ${disabled ? "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.02]" : active ? "bg-white/[0.09]" : "border-white/10 bg-white/[0.04] hover:border-white/25"}`}
      style={active ? { borderColor: color, boxShadow: `0 0 0 1px ${color}, 0 12px 36px -12px ${color}` } : undefined}
    >
      {children}
      {active && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: color }}>
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </span>
      )}
    </motion.button>
  );
}

export default function WorkspaceBooking() {
  const [form, setForm] = useState({
    space: "", duration: "", date: "", startHour: "", hours: 1, name: "", email: "", phone: "", coupon: "", voucher: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avail, setAvail] = useState({ loading: false });
  const [coupon, setCoupon] = useState({ state: "idle" }); // idle | checking | ok | bad
  const [voucher, setVoucher] = useState({ state: "idle" }); // idle | checking | ok | bad
  const spaceRef = useRef(null);
  const durationRef = useRef(null);
  const dateRef = useRef(null);
  const detailsRef = useRef(null);

  // Keep the form filled in if someone leaves for payment and comes back.
  // Renewal emails link here with the old plan prefilled:
  // /workspace?plan=basic&duration=week&name=…&email=…&phone=…
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    } catch {}
    const q = new URLSearchParams(window.location.search);
    const fromUrl = {};
    for (const key of ["name", "email", "phone"]) {
      const v = q.get(key)?.trim();
      if (v) fromUrl[key] = v.slice(0, 120);
    }
    // Shareable promo links: /workspace?plan=basic&duration=day&voucher=RESUMPTION
    if (q.get("voucher")) fromUrl.voucher = q.get("voucher").trim().toUpperCase().slice(0, 30);
    const space = SPACES.find((s) => s.id === q.get("plan"));
    if (space) {
      fromUrl.space = space.id;
      const ok = space.kind === "event" ? EVENT_SPACE.options.some((o) => o.id === q.get("duration")) : !!space.prices[q.get("duration")];
      if (ok) fromUrl.duration = q.get("duration");
    }
    const merged = { ...(saved || {}), ...fromUrl };
    // Old saved dates are useless once they've passed.
    if (merged.date && merged.date < lagosToday()) merged.date = "";
    delete merged.startHour;
    if (Object.keys(merged).length) setForm((f) => ({ ...f, ...merged }));
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const space = SPACES.find((s) => s.id === form.space);
  const style = space && SPACE_STYLE[space.id];
  const isEvent = space?.kind === "event";
  const durationOptions = isEvent
    ? EVENT_SPACE.options.map((o) => ({ id: o.id, title: o.title, price: o.price }))
    : space
      ? planDurations(space).map((d) => {
          const discounted = voucher.state === "ok" && voucher.plan === space.id ? voucher.prices[d.id] : undefined;
          return {
            id: d.id, title: d.title, hourly: !!d.hourly,
            price: discounted || space.prices[d.id], full: discounted ? space.prices[d.id] : null,
            note: d.hourly ? "per hour" : d.days > 1 ? `${d.days} days` : "1 day",
          };
        })
      : [];
  const canUseVoucher = space?.kind === "seat" && !space.needsCoupon;
  const duration = durationOptions.find((d) => d.id === form.duration);
  const voucherApplied = canUseVoucher && !!duration?.full;
  const isHourly = !!duration?.hourly;
  const needsTime = isEvent || isHourly;
  const hours = Math.max(1, Number(form.hours) || 1);
  const breakdown = duration && priceBreakdown(isHourly ? duration.price * hours : duration.price);
  const minDate = isEvent ? lagosToday() : earliestSeatStart();
  const maxDate = addDays(lagosToday(), MAX_DAYS_AHEAD);
  const dateOk = form.date && form.date >= minDate && form.date <= maxDate;

  // Live seat count / free event times for the chosen date.
  useEffect(() => {
    if (!space || !duration || !dateOk) {
      setAvail({ loading: false });
      return;
    }
    const ctrl = new AbortController();
    setAvail({ loading: true });
    const q = new URLSearchParams({ kind: space.kind, duration: duration.id, date: form.date });
    fetch(`/api/workspace/availability?${q}`, { signal: ctrl.signal })
      .then((r) => r.json().then((d) => (r.ok ? d : Promise.reject(new Error(d.error)))))
      .then((d) => setAvail({ loading: false, ...d }))
      .catch((err) => err.name !== "AbortError" && setAvail({ loading: false, error: err.message || "Could not check availability" }));
    return () => ctrl.abort();
  }, [space?.kind, duration?.id, form.date, dateOk]); // eslint-disable-line react-hooks/exhaustive-deps

  // Drop a start time that's no longer free.
  useEffect(() => {
    if (needsTime && avail.startHours && form.startHour !== "" && !avail.startHours.includes(Number(form.startHour))) {
      setForm((f) => ({ ...f, startHour: "" }));
    }
  }, [avail.startHours, needsTime, form.startHour]);

  // Hourly passes must end by closing time.
  useEffect(() => {
    if (isHourly && form.startHour !== "" && hours > maxHoursFrom(Number(form.startHour))) {
      setForm((f) => ({ ...f, hours: maxHoursFrom(Number(f.startHour)) }));
    }
  }, [isHourly, form.startHour, hours]);

  // Check the coupon as it's typed.
  useEffect(() => {
    const code = form.coupon.trim();
    if (!space?.needsCoupon || code.length < 6) {
      setCoupon({ state: "idle" });
      return;
    }
    setCoupon({ state: "checking" });
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/workspace/coupon?code=${encodeURIComponent(code)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) => setCoupon({ state: d.valid ? "ok" : "bad", message: d.message || d.error }))
        .catch((err) => err.name !== "AbortError" && setCoupon({ state: "bad", message: "Could not check the code" }));
    }, 400);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [form.coupon, space?.needsCoupon]);

  // Check the voucher as it's typed.
  useEffect(() => {
    const code = form.voucher.trim();
    if (!canUseVoucher || code.length < 3) {
      setVoucher({ state: "idle" });
      return;
    }
    setVoucher({ state: "checking" });
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/workspace/voucher?code=${encodeURIComponent(code)}&plan=${space.id}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) => setVoucher(d.valid ? { state: "ok", ...d } : { state: "bad", message: d.message || d.error }))
        .catch((err) => err.name !== "AbortError" && setVoucher({ state: "bad", message: "Could not check the code" }));
    }, 400);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [form.voucher, canUseVoucher, space?.id]);

  const timeChosen = !needsTime || (form.startHour !== "" && avail.startHours?.includes(Number(form.startHour)));
  const seatsLeft = !isEvent && typeof avail.free === "number" ? avail.free : null;
  const whenDone = !!(dateOk && timeChosen && !avail.loading && !avail.error && (isEvent || seatsLeft > 0));

  const errors = {
    name: !form.name.trim() && "Enter your full name",
    email: !EMAIL_RE.test(form.email.trim()) && "Enter a valid email so we can send your confirmation",
    phone: form.phone.replace(/\D/g, "").length < 10 && "Enter a valid phone number",
    coupon: space?.needsCoupon && coupon.state !== "ok" && (coupon.state === "bad" ? coupon.message : "Enter the coupon code you were given"),
  };
  const detailsDone = !Object.values(errors).some(Boolean);
  const isValid = space && duration && whenDone && detailsDone;
  const missing = !space
    ? "Pick a space"
    : !duration
      ? isEvent ? "Pick 6 or 12 hours" : "Pick how long"
      : !dateOk
        ? "Pick a date"
        : !timeChosen
          ? "Pick a start time"
          : seatsLeft === 0
            ? "No seats left on those dates"
            : !detailsDone
              ? "Fill in your details"
              : null;

  const scrollTo = (ref) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const handleChange = (e) => set(e.target.name, e.target.value);
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));
  const showError = (name) => touched[name] && errors[name];

  const pickSpace = (id) => {
    const next = SPACES.find((s) => s.id === id);
    setForm((f) => ({
      ...f,
      space: id,
      // Keep daily/weekly/monthly when switching between seat plans.
      duration: next.kind === "event" ? (EVENT_SPACE.options.some((o) => o.id === f.duration) ? f.duration : "") : next.prices[f.duration] ? f.duration : "",
      startHour: "",
    }));
    if (!form.duration) scrollTo(durationRef);
  };
  const pickDuration = (id) => {
    set("duration", id);
    if (!form.date) {
      set("date", minDate);
      scrollTo(dateRef);
    }
  };

  const handlePay = async (e) => {
    e?.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, phone: true, coupon: true });
      scrollTo(!space ? spaceRef : !duration ? durationRef : !whenDone ? dateRef : detailsRef);
      return;
    }
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/workspace/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: space.kind,
          plan: space.id,
          duration: duration.id,
          date: form.date,
          startHour: form.startHour === "" ? undefined : Number(form.startHour),
          hours: isHourly ? hours : undefined,
          name: form.name,
          email: form.email,
          phone: form.phone,
          coupon: space.needsCoupon ? form.coupon : undefined,
          voucher: voucherApplied ? form.voucher : undefined,
        }),
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
  const endDate = !isEvent && !isHourly && duration && dateOk ? seatEndDate(form.date, duration.id) : null;
  const whenText = !dateOk
    ? "—"
    : isEvent
      ? form.startHour !== ""
        ? `${formatDate(form.date)}, ${formatHour(Number(form.startHour))} – ${formatHour(Number(form.startHour) + EVENT_SPACE.options.find((o) => o.id === duration?.id)?.hours || 0)}`
        : formatDate(form.date)
      : isHourly
        ? form.startHour !== ""
          ? `${formatDate(form.date)}, ${formatHour(Number(form.startHour))} – ${formatHour(Number(form.startHour) + hours)}`
          : formatDate(form.date)
      : endDate && endDate !== form.date
        ? `${formatDate(form.date, { year: false })} – ${formatDate(endDate, { year: false })}`
        : formatDate(form.date);

  return (
    <div className={`${fontVars} relative isolate min-h-screen text-white font-[family-name:var(--font-body)] antialiased`}>
      <BootcampBackground />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16">
        {/* Hero (CSS fade so it's visible before JS loads on slow phones) */}
        <header className="ws-fade text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-green-400/10 border border-green-400/30 text-green-300 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
            </span>
            Open daily · {OPEN_LABEL} – {CLOSE_LABEL}
          </span>

          <h1 className={`${DISPLAY} font-bold tracking-[-0.03em] leading-[0.95] text-[2.9rem] sm:text-6xl md:text-7xl mb-5`}>
            Your desk.
            <span className="block bg-gradient-to-r from-[#5AA9FF] via-[#9CC8FF] to-[#FDB913] bg-clip-text text-transparent pb-1">
              Your focus.
            </span>
          </h1>
          <p className="text-gray-300 text-[16px] md:text-xl leading-relaxed max-w-xl mx-auto">
            Book a seat at the <b className="text-white font-semibold">Web3Nova Workspace</b> by the day, week or month, or reserve the event space.
          </p>

          <div className={`${glass} mt-7 mx-auto max-w-md grid grid-cols-3 rounded-2xl divide-x divide-white/10`}>
            {[
              [String(SEAT_CAPACITY), "seats"],
              ["7:30", "to 8pm"],
              [formatNaira(SEAT_PLANS[0].prices.hour), "per hour"],
            ].map(([big, small]) => (
              <div key={small} className="py-3">
                <p className={`${DISPLAY} text-2xl font-bold leading-none`}>{big}</p>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1">{small}</p>
              </div>
            ))}
          </div>
        </header>

        <form onSubmit={handlePay} className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div className="space-y-12 min-w-0">
            {/* Step 1: Space */}
            <section ref={spaceRef} className="scroll-mt-24">
              <StepHeading n={1} title="Pick your space" done={!!space} />
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {SPACES.map((s) => {
                  const { icon: Icon, color } = SPACE_STYLE[s.id];
                  return (
                    <Chip key={s.id} active={form.space === s.id} onClick={() => pickSpace(s.id)} color={color}>
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}26`, color }}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className={`${DISPLAY} font-semibold text-[15px] sm:text-lg leading-tight pr-5`}>{s.title}</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">{s.short}</p>
                      <ul className="hidden sm:block mt-2 space-y-0.5">
                        {s.features.map((f) => (
                          <li key={f} className="text-xs text-gray-300 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 shrink-0" style={{ color }} /> {f}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-[11px] text-gray-500">from</p>
                      <p className={`${DISPLAY} text-xl sm:text-2xl font-bold leading-none`} style={{ color }}>
                        {formatNaira(s.from)}
                        <span className="text-xs font-medium text-gray-400">{s.per}</span>
                      </p>
                    </Chip>
                  );
                })}
              </div>
              {space?.needsCoupon && (
                <p className="mt-3 text-sm text-pink-200/90 flex items-start gap-2">
                  <Ticket className="w-4 h-4 mt-0.5 shrink-0" /> Friends &amp; Family needs a coupon code from the Web3Nova team. You&apos;ll enter it in step 4.
                </p>
              )}
            </section>

            {/* Step 2: Duration */}
            <section ref={durationRef} className="scroll-mt-24">
              <StepHeading n={2} title={isEvent ? "How long is your event?" : "How long do you need it?"} done={!!duration}
                hint={space ? undefined : "Pick a space first."} />
              {space && (
                <div className={`grid gap-2.5 sm:gap-3 ${isEvent ? "grid-cols-2" : durationOptions.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                  {durationOptions.map((d) => (
                    <Chip key={d.id} active={form.duration === d.id} onClick={() => pickDuration(d.id)} color={style.color}>
                      <p className={`${DISPLAY} font-semibold text-[15px] sm:text-lg leading-tight pr-5`}>{d.title}</p>
                      {d.note && <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{d.note}</p>}
                      {d.full && <p className="mt-2 text-xs text-gray-500 line-through leading-none">{formatNaira(d.full)}</p>}
                      <p className={`${DISPLAY} ${d.full ? "mt-1" : "mt-3"} text-lg sm:text-2xl font-bold text-yellow-400 leading-none`}>
                        {formatNaira(d.price)}{d.hourly && <span className="text-xs font-medium text-gray-400">/hr</span>}
                      </p>
                    </Chip>
                  ))}
                </div>
              )}
              {canUseVoucher && (
                <div className="mt-4 max-w-sm">
                  <Field icon={Ticket} label="Voucher code (optional)" name="voucher" value={form.voucher}
                    onChange={(e) => set("voucher", e.target.value.toUpperCase())}
                    autoCapitalize="characters" autoComplete="off" placeholder="Enter voucher code"
                    error={voucher.state === "bad" && voucher.message}>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                      {voucher.state === "checking" && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                      {voucher.state === "ok" && <Check className="w-5 h-5 text-green-400" strokeWidth={3} />}
                    </span>
                  </Field>
                  {voucher.state === "ok" && (
                    <p className="text-xs text-green-300 mt-1.5">
                      {voucher.code} applied: {Object.entries(voucher.prices).map(([id, price]) => `${DURATIONS.find((x) => x.id === id)?.title} ${formatNaira(price)}`).join(", ")}
                      {duration && !voucherApplied && ` (not for ${duration.title})`}
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Step 3: Date / time */}
            <section ref={dateRef} className="scroll-mt-24">
              <StepHeading n={3} title={needsTime ? "Pick a date and start time" : "When do you start?"} done={whenDone}
                hint={isHourly ? `Hourly passes end by ${CLOSE_LABEL}.` : !isEvent && duration ? `Passes run ${OPEN_LABEL} – ${CLOSE_LABEL} each day.` : undefined} />
              {duration && (
                <div className={`${glass} rounded-3xl p-4 sm:p-6 space-y-4`}>
                  <Field icon={CalendarDays} label={isEvent ? "Event date" : isHourly ? "Date" : "Start date"} type="date" name="date"
                    value={form.date} min={minDate} max={maxDate} onChange={handleChange}
                    error={form.date && !dateOk ? `Pick a date from ${formatDate(minDate)}` : null} />

                  {dateOk && !isEvent && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      {avail.loading ? (
                        <span className="flex items-center gap-2 text-gray-400"><Loader2 className="w-4 h-4 animate-spin" /> Checking seats…</span>
                      ) : avail.error ? (
                        <span className="text-red-400">{avail.error}</span>
                      ) : seatsLeft !== null && (
                        <span className={`flex items-center gap-2 font-medium ${seatsLeft === 0 ? "text-red-400" : seatsLeft <= 10 ? "text-yellow-300" : "text-green-300"}`}>
                          <Users className="w-4 h-4" />
                          {seatsLeft === 0 ? "Fully booked. Try another start date." : `${seatsLeft} of ${SEAT_CAPACITY} seats free`}
                        </span>
                      )}
                      {endDate && (
                        <span className="text-gray-300">Ends {formatDate(endDate)} at {CLOSE_LABEL}</span>
                      )}
                    </div>
                  )}

                  {dateOk && needsTime && (
                    <div>
                      <span className="block text-sm font-medium mb-2 text-gray-200">Start time</span>
                      {avail.loading ? (
                        <span className="flex items-center gap-2 text-sm text-gray-400"><Loader2 className="w-4 h-4 animate-spin" /> Checking free times…</span>
                      ) : avail.error ? (
                        <span className="text-sm text-red-400">{avail.error}</span>
                      ) : avail.startHours?.length ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {avail.startHours.map((h) => {
                            const active = String(form.startHour) === String(h);
                            return (
                              <button type="button" key={h} onClick={() => { set("startHour", h); if (isEvent) scrollTo(detailsRef); }} aria-pressed={active}
                                className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 py-2.5 text-sm font-semibold transition ${active ? "text-black" : "border-white/10 bg-black/30 text-gray-200 hover:border-white/30"}`}
                                style={active ? { backgroundColor: style.color, borderColor: style.color } : undefined}>
                                <Clock className="hidden sm:block w-3.5 h-3.5 shrink-0" />{formatHour(h)}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-sm text-red-400">
                          {isEvent ? "The event space is fully booked that day." : "No start times left today."} Try another date.
                        </span>
                      )}
                    </div>
                  )}

                  {dateOk && isHourly && form.startHour !== "" && (
                    <div>
                      <span className="block text-sm font-medium mb-2 text-gray-200">How many hours?</span>
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label="Fewer hours" disabled={hours <= 1} onClick={() => set("hours", hours - 1)}
                          className="w-11 h-11 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center disabled:opacity-30">
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className={`${DISPLAY} text-2xl font-bold w-24 text-center`}>{hours} hr{hours === 1 ? "" : "s"}</span>
                        <button type="button" aria-label="More hours" disabled={hours >= maxHoursFrom(Number(form.startHour))} onClick={() => set("hours", hours + 1)}
                          className="w-11 h-11 rounded-xl border border-white/10 bg-black/30 flex items-center justify-center disabled:opacity-30">
                          <Plus className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-300">
                          {formatHour(Number(form.startHour))} – {formatHour(Number(form.startHour) + hours)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Step 4: Details */}
            <section ref={detailsRef} className="scroll-mt-24">
              <StepHeading n={4} title="Your details" hint="Your confirmation and renewal reminders go here." done={detailsDone} />
              <div className={`${glass} rounded-3xl p-4 sm:p-6 space-y-5`}>
                <Field icon={User} label="Full name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                  autoComplete="name" placeholder="e.g. Tolu Adebayo" error={showError("name")} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field icon={Mail} label="Email" type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                    autoComplete="email" inputMode="email" autoCapitalize="none" placeholder="you@example.com" error={showError("email")} />
                  <Field icon={Phone} label="Phone (WhatsApp)" type="tel" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                    autoComplete="tel" inputMode="tel" placeholder="0803 000 0000" error={showError("phone")} />
                </div>
                {space?.needsCoupon && (
                  <Field icon={Ticket} label="Friends & Family coupon code" name="coupon" value={form.coupon}
                    onChange={(e) => set("coupon", e.target.value.toUpperCase())} onBlur={handleBlur}
                    autoCapitalize="characters" autoComplete="off" placeholder="FF-XXXXXX"
                    error={(touched.coupon || coupon.state === "bad") && errors.coupon}>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                      {coupon.state === "checking" && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                      {coupon.state === "ok" && <Check className="w-5 h-5 text-green-400" strokeWidth={3} />}
                    </span>
                  </Field>
                )}
                {coupon.state === "ok" && space?.needsCoupon && <p className="text-xs text-green-300 -mt-3">{coupon.message}</p>}
              </div>
            </section>

            {/* What you get */}
            <section className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: Wifi, title: "Ready to work", text: "Come in, sit down and get things done." },
                { icon: MailCheck, title: "Instant confirmation", text: "Your booking lands in your email right after you pay." },
                { icon: BellRing, title: "Renewal reminders", text: "We email you before your pass runs out." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className={`${glass} rounded-2xl p-4`}>
                  <span className="w-9 h-9 rounded-xl bg-yellow-400/15 text-yellow-300 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className={`${DISPLAY} font-semibold`}>{title}</p>
                  <p className="text-sm text-gray-400 leading-snug mt-0.5">{text}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Desktop summary */}
          <aside className={`${glass} hidden lg:block sticky top-28 rounded-3xl p-6`}>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Your booking</p>
            <h3 className={`${DISPLAY} text-lg font-bold mb-5`}>Web3Nova Workspace</h3>
            <dl className="space-y-3 text-sm mb-6">
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Space</dt><dd className="text-right font-medium">{space?.title || "—"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-400">Plan</dt><dd className="text-right font-medium">{duration ? `${duration.title}${isHourly ? ` (${hours} hr${hours === 1 ? "" : "s"})` : ""}` : "—"}</dd></div>
              {voucherApplied && <div className="flex justify-between gap-4"><dt className="text-gray-400">Voucher</dt><dd className="text-right font-medium text-green-300">{form.voucher.trim()} (−{formatNaira(duration.full - duration.price)})</dd></div>}
              <div className="flex justify-between gap-4"><dt className="text-gray-400">When</dt><dd className="text-right font-medium">{whenText}</dd></div>
            </dl>
            {breakdown && (
              <dl className="space-y-2 text-sm border-t border-white/10 pt-4 mb-4">
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Fee</dt><dd>{formatNaira(breakdown.price)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Service charge</dt><dd>{formatNaira(breakdown.fee)}</dd></div>
              </dl>
            )}
            <div className="flex justify-between items-baseline border-t border-white/10 pt-4 mb-5">
              <span className="text-gray-400">Total</span>
              <span className={`${DISPLAY} text-3xl font-bold text-yellow-400`}>{breakdown ? formatNaira(breakdown.total) : "—"}</span>
            </div>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <PayButton loading={loading} ready={!!isValid} label={payLabel} />
            <p className="text-xs text-center mt-3 text-gray-300">{missing || "You'll be redirected to Monnify to pay."}</p>
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
                <p className="text-xs font-medium text-gray-200 truncate">{missing || `${space.title} · ${duration.title}`}</p>
                <p className={`${DISPLAY} text-xl font-bold text-yellow-400 leading-tight`}>
                  {breakdown ? formatNaira(breakdown.total) : <>from {formatNaira(SEAT_PLANS[0].prices.hour)}/hr</>}
                </p>
                {breakdown && (
                  <p className="text-[11px] text-gray-300 leading-tight whitespace-nowrap">
                    incl. {formatNaira(breakdown.fee)} service fee
                  </p>
                )}
              </div>
              <div className="shrink-0">
                <PayButton loading={loading} ready={!!isValid} label={payLabel} compact />
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        html, body { background: #05070d; }
        @keyframes ws-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .ws-fade { animation: ws-fade 0.6s ease-out both; }
        @keyframes ws-sheen { 0% { left: -60%; } 60%, 100% { left: 130%; } }
        .ws-sheen { animation: ws-sheen 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ws-fade, .ws-sheen { animation: none; } }
      `}</style>
    </div>
  );
}

function PayButton({ loading, ready, label, compact }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${DISPLAY} group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full font-bold text-white tracking-tight transition-all duration-300 active:scale-[0.97] ${compact ? "pl-5 pr-2 py-2 text-[17px]" : "w-full pl-6 pr-2 py-2 text-lg"} ${ready ? "bg-gradient-to-r from-[#1E5FB4] via-[#2563EB] to-[#4F46E5] shadow-[0_10px_30px_-6px_rgba(37,99,235,0.75)] ring-1 ring-white/20 hover:shadow-[0_14px_40px_-6px_rgba(79,70,229,0.9)] hover:brightness-110" : "bg-gradient-to-r from-[#1E5FB4] to-[#2563EB] ring-1 ring-white/10 hover:brightness-110"} ${loading ? "opacity-80 cursor-wait" : "cursor-pointer"}`}
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
    >
      {ready && !loading && <span aria-hidden className="ws-sheen absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />}

      {loading ? (
        <span className="relative flex items-center gap-2 py-2.5 pr-4"><Loader2 className="w-5 h-5 animate-spin" /> Redirecting…</span>
      ) : (
        <>
          <span className="relative flex items-center gap-2 whitespace-nowrap">
            {ready && <Lock className="w-4 h-4 opacity-90" strokeWidth={2.5} />}
            {label}
          </span>
          <span className={`relative flex items-center justify-center rounded-full bg-white text-[#2563EB] transition-transform duration-300 group-hover:translate-x-0.5 ${compact ? "w-9 h-9" : "w-11 h-11"}`}>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </span>
        </>
      )}
    </button>
  );
}
