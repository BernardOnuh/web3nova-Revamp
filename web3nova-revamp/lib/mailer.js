// Server-only email helper (SMTP via nodemailer, e.g. Gmail with an app password).
import nodemailer from "nodemailer";
import { BOOTCAMP_NAME, BOOTCAMP_DURATION, formatNaira } from "@/lib/bootcamp";

function transporter() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const escape = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export async function sendBootcampConfirmation({
  name,
  email,
  course,
  location,
  school,
  amount,
  programFee,
  serviceCharge,
  paymentReference,
}) {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const rows = [
    ["Program", BOOTCAMP_NAME],
    ["Duration", BOOTCAMP_DURATION],
    ["Course", course],
    ["Location", location],
    ["School", school],
    ["Program fee", formatNaira(programFee)],
    ["Service charge", formatNaira(serviceCharge)],
    ["Total paid", formatNaira(amount)],
    ["Payment reference", paymentReference],
  ];

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
    <h2 style="color:#2E7BD1">Welcome to Web3Nova, ${escape(name)}! 🎉</h2>
    <p>Your payment was successful and your seat in the <b>${BOOTCAMP_NAME}</b> is confirmed.
    This is a ${BOOTCAMP_DURATION} intensive program.</p>
    <table style="border-collapse:collapse;width:100%;margin:16px 0">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px;border:1px solid #eee;color:#555">${k}</td><td style="padding:8px;border:1px solid #eee"><b>${escape(v)}</b></td></tr>`
        )
        .join("")}
    </table>
    <p>We'll reach out shortly with your onboarding details, schedule and community links.</p>
    <p>Keep this email as your receipt.</p>
    <p>— The Web3Nova Team</p>
  </div>`;

  const text = [
    `Welcome to Web3Nova, ${name}!`,
    `Your payment was successful and your seat in the ${BOOTCAMP_NAME} (${BOOTCAMP_DURATION}) is confirmed.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "We'll reach out shortly with your onboarding details.",
    "— The Web3Nova Team",
  ].join("\n");

  const t = transporter();
  await t.sendMail({
    from,
    to: email,
    subject: "You're in! Web3Nova 16-Week Bootcamp – Payment Confirmed",
    text,
    html,
  });

  if (process.env.BOOTCAMP_ADMIN_EMAIL) {
    await t.sendMail({
      from,
      to: process.env.BOOTCAMP_ADMIN_EMAIL,
      subject: `New bootcamp payment: ${name} (${course}, ${location})`,
      text: [`Name: ${name}`, `Email: ${email}`, ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n"),
    });
  }
}
