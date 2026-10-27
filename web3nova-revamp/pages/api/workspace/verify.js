// Used by the success page. Also confirms the booking, in case the webhook is slow.
import { REFERENCE_PREFIX, confirmBooking } from "@/lib/workspaceService";
import { describeBooking } from "@/lib/workspace";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ref = String(req.query.ref || "");
  if (!ref.startsWith(REFERENCE_PREFIX)) {
    return res.status(400).json({ error: "Invalid payment reference" });
  }

  try {
    const b = await confirmBooking(ref);
    if (!b) return res.status(404).json({ error: "Booking not found" });
    const d = describeBooking(b);
    // Only return what the success page needs to display.
    return res.status(200).json({
      paid: b.status === "paid",
      status: b.paymentStatus || b.status,
      name: b.name,
      planTitle: d.planTitle,
      durationTitle: d.durationTitle,
      when: d.when,
      amount: b.amount_paid ?? b.total,
      paymentReference: b.ref,
    });
  } catch (err) {
    console.error("[workspace/verify]", err);
    return res.status(502).json({ error: "Could not verify payment yet" });
  }
}
