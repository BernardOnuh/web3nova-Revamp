import crypto from "crypto";
import { BOOTCAMP_NAME, findCourse, findLocation, priceBreakdown } from "@/lib/bootcamp";
import { initTransaction } from "@/lib/monnify";
import { REFERENCE_PREFIX } from "@/lib/bootcampPayment";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, max = 120) => String(v ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = clean(req.body?.name);
  const email = clean(req.body?.email).toLowerCase();
  const phone = clean(req.body?.phone, 30);
  const school = clean(req.body?.school, 150);
  const course = findCourse(req.body?.courseId);
  const location = findLocation(req.body?.locationId);

  if (!name || !EMAIL_RE.test(email) || !phone || !school || !course || !location) {
    return res.status(400).json({ error: "Please fill in all fields correctly." });
  }

  const paymentReference = `${REFERENCE_PREFIX}${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;

  const { price, fee, total } = priceBreakdown(location.price);

  try {
    const tx = await initTransaction({
      amount: total,
      customerName: name,
      customerEmail: email,
      paymentReference,
      paymentDescription: `${BOOTCAMP_NAME} – ${course.title} (${location.title})`,
      // Monnify appends ?paymentReference=... to this URL
      redirectUrl: `${siteUrl}/bootcamp/success/${paymentReference}`,
      metaData: {
        name,
        phone,
        school,
        courseId: course.id,
        locationId: location.id,
        programFee: String(price),
        serviceCharge: String(fee),
        total: String(total),
      },
    });
    return res.status(200).json({ checkoutUrl: tx.checkoutUrl, paymentReference });
  } catch (err) {
    console.error("[bootcamp/checkout]", err);
    return res.status(502).json({ error: "Could not start payment. Please try again." });
  }
}
