// Site-wide SEO settings shared by the <Seo> component, the sitemap and structured data.
export const SITE = {
  name: "Web3Nova",
  url: "https://www.web3nova.org",
  locale: "en_NG",
  twitter: "@web3_nova",
  image: "/og/default.png",
  description:
    "Web3Nova is a tech and Web3 hub in Akure, Nigeria: bootcamps, internships, a co-working space, events and blockchain development services.",
  sameAs: ["https://x.com/web3_nova", "https://t.me/theweb3novaorg"],
};

export const absoluteUrl = (path = "/") => (path.startsWith("http") ? path : `${SITE.url}${path === "/" ? "" : path}`);

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/og/logo.png`,
  description: SITE.description,
  sameAs: SITE.sameAs,
  address: { "@type": "PostalAddress", addressLocality: "Akure", addressRegion: "Ondo", addressCountry: "NG" },
};
