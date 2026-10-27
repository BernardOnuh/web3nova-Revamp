// Server-only Monnify helpers. Never import this from a component.
import crypto from "crypto";

const BASE_URL =
  process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com"; // live: https://api.monnify.com

function credentials() {
  const apiKey = process.env.MONNIFY_API_KEY;
  const secretKey = process.env.MONNIFY_SECRET_KEY;
  const contractCode = process.env.MONNIFY_CONTRACT_CODE;
  if (!apiKey || !secretKey || !contractCode) {
    throw new Error("Monnify is not configured");
  }
  return { apiKey, secretKey, contractCode };
}

async function getAccessToken() {
  const { apiKey, secretKey } = credentials();
  const r = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString("base64")}`,
    },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.requestSuccessful) {
    throw new Error(data.responseMessage || "Monnify auth failed");
  }
  return data.responseBody.accessToken;
}

export async function initTransaction({
  amount,
  customerName,
  customerEmail,
  paymentReference,
  paymentDescription,
  redirectUrl,
  metaData,
}) {
  const { contractCode } = credentials();
  const token = await getAccessToken();
  const r = await fetch(
    `${BASE_URL}/api/v1/merchant/transactions/init-transaction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        customerName,
        customerEmail,
        paymentReference,
        paymentDescription,
        currencyCode: "NGN",
        contractCode,
        redirectUrl,
        paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD"],
        metaData,
      }),
    }
  );
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.requestSuccessful) {
    throw new Error(data.responseMessage || "Could not start payment");
  }
  return data.responseBody; // { checkoutUrl, transactionReference, ... }
}

// Source of truth for payment status: always re-check with Monnify.
export async function getTransactionByPaymentReference(paymentReference) {
  const token = await getAccessToken();
  const r = await fetch(
    `${BASE_URL}/api/v2/merchant/transactions/query?paymentReference=${encodeURIComponent(paymentReference)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.requestSuccessful) {
    throw new Error(data.responseMessage || "Could not verify payment");
  }
  return data.responseBody; // { paymentStatus, amountPaid, customer, metaData, ... }
}

export function isValidWebhookSignature(rawBody, signature) {
  const { secretKey } = credentials();
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
