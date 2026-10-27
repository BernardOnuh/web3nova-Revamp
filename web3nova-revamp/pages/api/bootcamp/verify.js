import { getTransactionByPaymentReference } from "@/lib/monnify";
import { REFERENCE_PREFIX, toRegistration } from "@/lib/bootcampPayment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ref = String(req.query.ref || "");
  if (!ref.startsWith(REFERENCE_PREFIX)) {
    return res.status(400).json({ error: "Invalid payment reference" });
  }

  try {
    const reg = toRegistration(await getTransactionByPaymentReference(ref));
    // Only return what the success page needs to display.
    return res.status(200).json({
      paid: reg.paid,
      status: reg.status,
      name: reg.name,
      course: reg.course,
      location: reg.location,
      amount: reg.amount,
      paymentReference: reg.paymentReference,
    });
  } catch (err) {
    console.error("[bootcamp/verify]", err);
    return res.status(502).json({ error: "Could not verify payment yet" });
  }
}
