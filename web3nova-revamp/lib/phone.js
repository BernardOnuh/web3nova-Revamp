// Phone helpers for WhatsApp links (wa.me needs digits only, with country code).

// digits: expected length of the national number (without the leading 0).
export const COUNTRIES = [
  { code: "234", name: "Nigeria", flag: "🇳🇬", digits: [10] },
  { code: "233", name: "Ghana", flag: "🇬🇭", digits: [9] },
  { code: "254", name: "Kenya", flag: "🇰🇪", digits: [9] },
  { code: "256", name: "Uganda", flag: "🇺🇬", digits: [9] },
  { code: "255", name: "Tanzania", flag: "🇹🇿", digits: [9] },
  { code: "250", name: "Rwanda", flag: "🇷🇼", digits: [9] },
  { code: "27", name: "South Africa", flag: "🇿🇦", digits: [9] },
  { code: "237", name: "Cameroon", flag: "🇨🇲", digits: [9] },
  { code: "229", name: "Benin", flag: "🇧🇯", digits: [8, 10] },
  { code: "228", name: "Togo", flag: "🇹🇬", digits: [8] },
  { code: "225", name: "Côte d'Ivoire", flag: "🇨🇮", digits: [10] },
  { code: "221", name: "Senegal", flag: "🇸🇳", digits: [9] },
  { code: "20", name: "Egypt", flag: "🇪🇬", digits: [10] },
  { code: "971", name: "UAE", flag: "🇦🇪", digits: [9] },
  { code: "44", name: "United Kingdom", flag: "🇬🇧", digits: [10] },
  { code: "1", name: "USA / Canada", flag: "🇺🇸", digits: [10] },
  { code: "91", name: "India", flag: "🇮🇳", digits: [10] },
];

export const findCountry = (code) => COUNTRIES.find((c) => c.code === code);

// Longest codes first so "+254…" doesn't match "+25…" style prefixes wrongly.
const BY_CODE_LENGTH = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);

// Guess the country from an international number ("+254…", "00254…").
export function detectCountry(raw) {
  const s = String(raw).trim();
  if (!/^(\+|00)/.test(s)) return null;
  const d = s.replace(/\D/g, "").replace(/^00/, "");
  return BY_CODE_LENGTH.find((c) => d.startsWith(c.code))?.code || null;
}

// Returns { intl, problem } where intl is digits-only for wa.me, or "" if unusable.
export function toWhatsApp(raw, countryCode) {
  const country = findCountry(countryCode);
  let d = String(raw).replace(/\D/g, "");
  if (/^\s*00/.test(raw)) d = d.replace(/^00/, "");
  if (!d) return { intl: "", problem: "No phone number" };
  if (d.startsWith(countryCode) && d.length > countryCode.length + 6) d = d.slice(countryCode.length);
  d = d.replace(/^0+/, "");
  if (!country) return { intl: countryCode + d, problem: "" };
  if (country.digits.includes(d.length)) return { intl: countryCode + d, problem: "" };
  const want = Math.min(...country.digits);
  return {
    intl: "",
    problem:
      d.length < want
        ? `Too short for ${country.name}. Fix the number or pick another country.`
        : `Too long for ${country.name}. Fix the number or pick another country.`,
  };
}
