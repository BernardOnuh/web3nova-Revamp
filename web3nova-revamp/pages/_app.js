import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import BootcampModal from "@/components/BootcampModal";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"   // 👈 crucial for Tailwind to see `dark` class
      defaultTheme="system"
      enableSystem={true}
    >
      <Component {...pageProps} />
      <BootcampModal />
    </ThemeProvider>
  );
}
