// Sitemap for search engines, built from the list of public pages below.
import { SITE } from "@/lib/seo";

const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/bootcamp", changefreq: "weekly", priority: "0.9" },
  { path: "/workspace", changefreq: "weekly", priority: "0.9" },
  { path: "/training", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  { path: "/opportunities", changefreq: "daily", priority: "0.7" },
  { path: "/internship", changefreq: "monthly", priority: "0.6" },
  { path: "/internship/apply", changefreq: "monthly", priority: "0.5" },
  { path: "/hiring", changefreq: "monthly", priority: "0.5" },
  { path: "/register", changefreq: "monthly", priority: "0.5" },
];

export async function getServerSideProps({ res }) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) => `  <url><loc>${SITE.url}${p.path === "/" ? "" : p.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
