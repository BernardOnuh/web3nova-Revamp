// Server-only: public voucher codes anyone can use (unlike one-use Friends & Family coupons).
// Kept off the client so codes can't be read from the page's JavaScript.
// Each voucher sets a lower price for some durations of one plan.
const VOUCHERS = {
  RESUMPTION: { plan: "basic", prices: { day: 1500 } },
};

export const normalizeVoucher = (c) => String(c || "").trim().toUpperCase().replace(/\s+/g, "");

export function findVoucher(code) {
  const id = normalizeVoucher(code);
  return VOUCHERS[id] ? { code: id, ...VOUCHERS[id] } : null;
}

// The discounted price, or null if the voucher doesn't cover this plan and duration.
export function voucherPrice(code, plan, duration) {
  const v = findVoucher(code);
  return v && v.plan === plan && v.prices[duration] ? v.prices[duration] : null;
}
