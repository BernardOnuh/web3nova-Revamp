// Public: is this Friends & Family coupon code usable?
import { couponStatus } from "@/lib/workspaceService";
import { formatNaira } from "@/lib/workspace";

const MESSAGES = {
  ok: "Coupon applied",
  invalid: "That coupon code doesn't exist",
  used: "That coupon code has already been used",
  held: "That coupon code is being used in another checkout. Try again in 30 minutes.",
};

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { status, dayPrice } = await couponStatus(req.query.code);
    const message = dayPrice ? `Coupon applied: daily pass for ${formatNaira(dayPrice)}` : MESSAGES[status];
    return res.status(200).json({ valid: status === "ok", message, prices: dayPrice ? { day: dayPrice } : null });
  } catch (err) {
    console.error("[workspace/coupon]", err);
    return res.status(503).json({ error: "Could not check the coupon right now" });
  }
}
