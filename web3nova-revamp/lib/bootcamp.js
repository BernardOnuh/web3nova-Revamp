// Shared bootcamp config used by the page and the API routes.
// Prices live here so the server, not the browser, decides what to charge.

export const BOOTCAMP_NAME = "Web3Nova 16-Week Intensive Bootcamp";
export const BOOTCAMP_DURATION = "16 weeks (4 months)";

export const COURSES = [
  {
    id: "web-dev",
    title: "Web Development",
    level: "Beginner friendly",
    short: "Build modern websites and full-stack apps with React, Next.js and Node.js.",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    level: "Beginner friendly",
    short: "Design and ship iOS & Android apps from a single codebase.",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    level: "Beginner friendly",
    short: "Design beautiful, easy-to-use apps and websites in Figma.",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    level: "Intermediate",
    short: "Build AI agents and automate workflows with modern AI tools.",
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts (Web3 Development)",
    level: "Intermediate",
    short: "Write, test and deploy secure smart contracts with Solidity.",
  },
  {
    id: "zk-rust",
    title: "ZK, Rust & Protocol Engineering",
    level: "Advanced",
    short: "Master Rust, zero-knowledge proofs and blockchain protocol engineering.",
  },
];

export const LOCATIONS = [
  {
    id: "onsite-akure",
    title: "On-site – Akure",
    short: "Learn in person with mentors and classmates.",
    price: 70000,
  },
  {
    id: "online",
    title: "Online",
    short: "Learn from anywhere with live virtual classes.",
    price: 100000,
  },
];

// Monnify's processing fee, passed on to the student so Web3Nova receives the full
// program price. The method isn't known until checkout, so we use the highest rate
// (card). Check these against the rates on your Monnify contract.
export const SERVICE_CHARGE = { rate: 0.015, cap: 2000 };

// Grossed up so that after Monnify deducts its fee, the full price is left.
export function priceBreakdown(price) {
  const { rate, cap } = SERVICE_CHARGE;
  const fee = Math.min(cap, Math.ceil((price * rate) / (1 - rate)));
  return { price, fee, total: price + fee };
}

export const findCourse = (id) => COURSES.find((c) => c.id === id);
export const findLocation = (id) => LOCATIONS.find((l) => l.id === id);

export const formatNaira = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG")}`;
