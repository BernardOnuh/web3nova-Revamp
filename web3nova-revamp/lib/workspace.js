// Shared workspace (co-working space) config used by the page, the admin and the API routes.
// Prices live here so the server, not the browser, decides what to charge.
import { formatNaira, priceBreakdown } from "@/lib/bootcamp";

export { formatNaira, priceBreakdown };

export const SPACE_NAME = "Web3Nova Workspace";
export const SEAT_CAPACITY = 60;
export const OPEN_LABEL = "7:30am";
export const CLOSE_LABEL = "8:00pm";
export const CLOSE_MINUTES = 20 * 60; // seat passes end at 8pm, Lagos time
export const MAX_DAYS_AHEAD = 90;

export const DURATIONS = [
  { id: "day", title: "Daily", days: 1, unit: "day" },
  { id: "week", title: "Weekly", days: 7, unit: "week" },
  { id: "month", title: "Monthly", days: 30, unit: "month" },
];

export const SEAT_PLANS = [
  {
    id: "basic",
    title: "Basic",
    short: "A seat in the shared workspace.",
    features: ["Shared workspace seat", `Open ${OPEN_LABEL} – ${CLOSE_LABEL}`],
    prices: { day: 2000, week: 10000, month: 37500 },
  },
  {
    id: "premium",
    title: "Premium",
    short: "AC ventilated room with a TV, monitor and keyboard access.",
    features: ["AC ventilated room", "TV", "Monitor & keyboard access"],
    prices: { day: 2500, week: 12500, month: 45000 },
  },
  {
    id: "family",
    title: "Friends & Family",
    short: "Special rate for friends and family of Web3Nova.",
    features: ["Needs a coupon code", `Open ${OPEN_LABEL} – ${CLOSE_LABEL}`],
    prices: { day: 1500, week: 7500, month: 29750 },
    needsCoupon: true,
  },
];

// The event space is its own room, booked by date and start time, one event at a time.
export const EVENT_SPACE = {
  id: "event",
  title: "Event Space",
  short: "Host a meetup, workshop or hangout.",
  options: [
    { id: "6h", title: "6 hours", hours: 6, price: 45000 },
    { id: "12h", title: "12 hours", hours: 12, price: 75000 },
  ],
  firstStartHour: 7,
  lastEndHour: 23,
};

export const findPlan = (id) => SEAT_PLANS.find((p) => p.id === id);
export const findDuration = (id) => DURATIONS.find((d) => d.id === id);
export const findEventOption = (id) => EVENT_SPACE.options.find((o) => o.id === id);

export function eventStartHours(optionId) {
  const opt = findEventOption(optionId);
  if (!opt) return [];
  const hours = [];
  for (let h = EVENT_SPACE.firstStartHour; h + opt.hours <= EVENT_SPACE.lastEndHour; h++) hours.push(h);
  return hours;
}

// ---- Dates. Nigeria is UTC+1 all year (no daylight saving). ----
const LAGOS_OFFSET_MS = 60 * 60 * 1000;
const lagosNow = () => new Date(Date.now() + LAGOS_OFFSET_MS);

export const lagosToday = () => lagosNow().toISOString().slice(0, 10);
export const lagosMinutesNow = () => {
  const d = lagosNow();
  return d.getUTCHours() * 60 + d.getUTCMinutes();
};

export function addDays(date, n) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export const isIsoDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v)) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));

// Seat passes can start today until closing time, otherwise from tomorrow.
export const earliestSeatStart = () =>
  lagosMinutesNow() < CLOSE_MINUTES ? lagosToday() : addDays(lagosToday(), 1);

export const seatEndDate = (start, durationId) => addDays(start, (findDuration(durationId)?.days || 1) - 1);

// ISO timestamps (with the +01:00 offset) for an event that starts at `hour` on `date`.
export function eventWindow(date, hour, hours) {
  const start = new Date(`${date}T00:00:00+01:00`).getTime() + hour * 3600e3;
  return { start: new Date(start).toISOString(), end: new Date(start + hours * 3600e3).toISOString() };
}

export function formatHour(h) {
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:00${h < 12 || h === 24 ? "am" : "pm"}`;
}

// "Tue 15 Dec 2026" (or "Tue 15 Dec" with { year: false })
export function formatDate(date, opts = {}) {
  const d = new Date(`${date}T12:00:00Z`);
  const part = (o) => d.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" });
  return [part({ weekday: "short" }), d.getUTCDate(), part({ month: "short" }), opts.year === false ? "" : d.getUTCFullYear()]
    .filter(Boolean)
    .join(" ");
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  }).replace(" ", "");
}

export function priceFor({ kind, plan, duration }) {
  if (kind === "event") return findEventOption(duration)?.price || 0;
  return findPlan(plan)?.prices[duration] || 0;
}

// Human labels for a booking row (from the database or the checkout form).
export function describeBooking(b) {
  if (b.kind === "event") {
    const opt = findEventOption(b.duration);
    return {
      planTitle: EVENT_SPACE.title,
      durationTitle: opt?.title || b.duration,
      when: b.event_start
        ? `${formatDate(b.start_date)}, ${formatTime(b.event_start)} – ${formatTime(b.event_end)}`
        : formatDate(b.start_date),
    };
  }
  const plan = findPlan(b.plan);
  const dur = findDuration(b.duration);
  const range =
    b.start_date === b.end_date
      ? formatDate(b.start_date)
      : `${formatDate(b.start_date, { year: false })} – ${formatDate(b.end_date)}`;
  return {
    planTitle: plan?.title || b.plan,
    durationTitle: dur?.title || b.duration,
    when: `${range}, ${OPEN_LABEL} – ${CLOSE_LABEL} daily`,
  };
}
