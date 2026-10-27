// Public: how many seats are free for a pass, or which event start times are taken on a day.
import {
  MAX_DAYS_AHEAD, SEAT_CAPACITY, addDays, earliestSeatStart, eventStartHours, eventWindow,
  findDuration, findEventOption, isIsoDate, lagosToday, seatEndDate,
} from "@/lib/workspace";
import { eventsOn, seatsFree } from "@/lib/workspaceService";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const { kind, duration, date } = req.query;
  if (!isIsoDate(date) || date > addDays(lagosToday(), MAX_DAYS_AHEAD)) {
    return res.status(400).json({ error: "Pick a valid date" });
  }

  try {
    if (kind === "event") {
      const opt = findEventOption(duration);
      if (!opt || date < lagosToday()) return res.status(400).json({ error: "Pick a valid date" });
      const booked = await eventsOn(date);
      const now = Date.now();
      const startHours = eventStartHours(opt.id).filter((h) => {
        const w = eventWindow(date, h, opt.hours);
        if (new Date(w.start).getTime() <= now) return false;
        return !booked.some((b) => b.start < w.end && b.end > w.start);
      });
      return res.status(200).json({ booked, startHours });
    }

    if (!findDuration(duration) || date < earliestSeatStart()) {
      return res.status(400).json({ error: "Pick a valid date" });
    }
    const free = await seatsFree(date, seatEndDate(date, duration));
    return res.status(200).json({ free, capacity: SEAT_CAPACITY, endDate: seatEndDate(date, duration) });
  } catch (err) {
    console.error("[workspace/availability]", err);
    return res.status(503).json({ error: "Could not check availability right now" });
  }
}
