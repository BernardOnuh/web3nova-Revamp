// Public: which discounted prices does this voucher code give?
import { findVoucher } from "@/lib/vouchers";
import { findPlan } from "@/lib/workspace";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const v = findVoucher(req.query.code);
  if (!v || (req.query.plan && req.query.plan !== v.plan)) {
    return res.status(200).json({ valid: false, message: "That voucher code isn't valid for this plan" });
  }
  return res.status(200).json({ valid: true, code: v.code, plan: v.plan, prices: v.prices, planTitle: findPlan(v.plan)?.title });
}
