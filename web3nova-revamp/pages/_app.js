import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"   // 👈 crucial for Tailwind to see `dark` class
      defaultTheme="system"
      enableSystem={true}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
