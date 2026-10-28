import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Seo from "@/components/Seo";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"   // 👈 crucial for Tailwind to see `dark` class
      defaultTheme="system"
      enableSystem={true}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Defaults; each page's <Seo> overrides these */}
      <Seo isDefault />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
