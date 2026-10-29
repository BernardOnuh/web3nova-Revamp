// Admin only (protected by proxy.js): create or delete coupon codes from the admin page.
import { createCoupons, revokeCoupon } from "@/lib/workspaceService";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const note = String(req.body?.note || "").slice(0, 120);
      const codes = await createCoupons(req.body?.count, note, "admin page", req.body?.dayPrice);
      return res.status(200).json({ codes });
    }
    if (req.method === "DELETE") {
      const ok = await revokeCoupon(req.query.code);
      return ok ? res.status(200).json({ ok }) : res.status(404).json({ error: "Code not found or already used" });
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[workspace/admin/coupons]", err);
    return res.status(503).json({ error: "Could not update coupons" });
  }
}
