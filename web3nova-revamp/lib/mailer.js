// Server-only email helper (SMTP via nodemailer, e.g. Gmail with an app password).
import nodemailer from "nodemailer";
import { BOOTCAMP_NAME, BOOTCAMP_DURATION, formatNaira } from "@/lib/bootcamp";
import { SPACE_NAME, describeBooking } from "@/lib/workspace";

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

// ---- Workspace ----

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://www.web3nova.org";

export function renewUrl(b) {
  const q = new URLSearchParams({ plan: b.plan, duration: b.duration, name: b.name, email: b.email, phone: b.phone });
  return `${siteUrl()}/workspace?${q}`;
}

function workspaceRows(b) {
  const d = describeBooking(b);
  return [
    ["Space", d.planTitle],
    ["Plan", d.durationTitle],
    ["When", d.when],
    ...(b.coupon ? [["Coupon", b.coupon]] : []),
    ["Fee", formatNaira(b.program_fee)],
    ["Service charge", formatNaira(b.service_charge)],
    ["Total paid", formatNaira(b.amount_paid ?? b.total)],
    ["Payment reference", b.ref],
  ];
}

const table = (rows) => `
    <table style="border-collapse:collapse;width:100%;margin:16px 0">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px;border:1px solid #eee;color:#555">${k}</td><td style="padding:8px;border:1px solid #eee"><b>${escape(v)}</b></td></tr>`
        )
        .join("")}
    </table>`;

const button = (href, label) =>
  `<p style="margin:20px 0"><a href="${escape(href)}" style="background:#2E7BD1;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:bold;display:inline-block">${label}</a></p>`;

export async function sendWorkspaceConfirmation(b) {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const rows = workspaceRows(b);
  const isEvent = b.kind === "event";
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
    <h2 style="color:#2E7BD1">You're booked, ${escape(b.name)}!</h2>
    <p>Your payment was successful and your ${isEvent ? "event space booking" : "seat"} at the <b>${SPACE_NAME}</b> is confirmed.</p>
    ${table(rows)}
    <p>Show this email at the front desk when you arrive.</p>
    <p>— The Web3Nova Team</p>
  </div>`;
  const text = [
    `You're booked, ${b.name}!`,
    `Your payment was successful and your booking at the ${SPACE_NAME} is confirmed.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Show this email at the front desk when you arrive.",
    "— The Web3Nova Team",
  ].join("\n");

  const t = transporter();
  await t.sendMail({ from, to: b.email, subject: `Booking confirmed – ${SPACE_NAME}`, text, html });

  if (process.env.WORKSPACE_ADMIN_EMAIL) {
    await t.sendMail({
      from,
      to: process.env.WORKSPACE_ADMIN_EMAIL,
      subject: `New workspace booking: ${b.name} (${describeBooking(b).planTitle})`,
      text: [`Name: ${b.name}`, `Email: ${b.email}`, `Phone: ${b.phone}`, ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n"),
    });
  }
}

// `when` is "today" (expires at 8pm today) or "tomorrow".
export async function sendWorkspaceReminder(b, when) {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const d = describeBooking(b);
  const url = renewUrl(b);
  const headline =
    when === "today" ? "Your workspace pass ends today at 8:00pm" : "Your workspace pass ends tomorrow at 8:00pm";
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
    <h2 style="color:#2E7BD1">${headline}</h2>
    <p>Hi ${escape(b.name)}, your <b>${escape(d.planTitle)} (${escape(d.durationTitle)})</b> pass at the ${SPACE_NAME} is about to expire.</p>
    <p>Renew now to keep your seat for your next visit.</p>
    ${button(url, "Renew my pass")}
    <p style="color:#555;font-size:13px">Current pass: ${escape(d.when)}</p>
    <p>— The Web3Nova Team</p>
  </div>`;
  const text = [
    headline,
    "",
    `Hi ${b.name}, your ${d.planTitle} (${d.durationTitle}) pass at the ${SPACE_NAME} is about to expire.`,
    `Renew here: ${url}`,
    "",
    "— The Web3Nova Team",
  ].join("\n");

  await transporter().sendMail({ from, to: b.email, subject: `${headline} – renew now`, text, html });
}
