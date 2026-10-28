import Head from "next/head";
import { SITE, absoluteUrl } from "@/lib/seo";

// Title, description, canonical URL, social previews and optional JSON-LD for a page.
// Keys let a page override the defaults set in _app. The defaults (isDefault) leave out the
// canonical URL, so pages without their own <Seo> don't all point at the homepage.
export default function Seo({ title, description = SITE.description, path = "/", image = SITE.image, noindex = false, type = "website", jsonLd, isDefault = false }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name}: Learn, Build and Earn in Tech and Web3`;
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  const blocks = jsonLd ? [].concat(jsonLd) : [];

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      {!noindex && !isDefault && <link key="canonical" rel="canonical" href={url} />}

      <meta key="og:site_name" property="og:site_name" content={SITE.name} />
      <meta key="og:locale" property="og:locale" content={SITE.locale} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta key="og:description" property="og:description" content={description} />
      {!isDefault && <meta key="og:url" property="og:url" content={url} />}
      <meta key="og:image" property="og:image" content={img} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:image:alt" property="og:image:alt" content={fullTitle} />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content={SITE.twitter} />
      <meta key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={img} />

      {blocks.map((data, i) => (
        <script key={`jsonld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
    </Head>
  );
}
