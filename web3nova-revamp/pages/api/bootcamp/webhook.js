// Monnify webhook: set this URL in the Monnify dashboard
// (Developer → Webhook URLs → Transaction completion): https://<your-site>/api/bootcamp/webhook
// It handles both bootcamp registrations and workspace bookings.
import { getTransactionByPaymentReference, isValidWebhookSignature } from "@/lib/monnify";
import { REFERENCE_PREFIX, toRegistration } from "@/lib/bootcampPayment";
import { sendBootcampConfirmation } from "@/lib/mailer";
import { REFERENCE_PREFIX as WORKSPACE_PREFIX, confirmBooking } from "@/lib/workspaceService";

// Signature is computed over the raw body, so disable Next's JSON parser.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await readRawBody(req);
  let validSignature = false;
  try {
    validSignature = isValidWebhookSignature(rawBody, req.headers["monnify-signature"]);
  } catch (err) {
    console.error("[bootcamp/webhook]", err);
    return res.status(500).json({ error: "Webhook not configured" });
  }
  if (!validSignature) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const ref = event?.eventData?.paymentReference || "";

  if (event?.eventType === "SUCCESSFUL_TRANSACTION" && ref.startsWith(WORKSPACE_PREFIX)) {
    try {
      await confirmBooking(ref); // re-checks with Monnify itself
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[workspace/webhook]", err);
      return res.status(500).json({ error: "Processing failed" });
    }
  }

  // Ignore other events and payments that aren't bootcamp registrations.
  if (event?.eventType !== "SUCCESSFUL_TRANSACTION" || !ref.startsWith(REFERENCE_PREFIX)) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  try {
    // Don't trust the webhook payload alone; confirm with Monnify.
    const reg = toRegistration(await getTransactionByPaymentReference(ref));
    if (!reg.paid) {
      console.warn("[bootcamp/webhook] not fully paid", ref, reg.status, reg.amount);
      return res.status(200).json({ ok: true, paid: false });
    }
    await sendBootcampConfirmation(reg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[bootcamp/webhook]", err);
    // Non-2xx makes Monnify retry later.
    return res.status(500).json({ error: "Processing failed" });
  }
}
