// Shared look for the bootcamp pages: site fonts + a fixed, full-screen background
// so the page never falls back to flat black while scrolling on mobile.
import { Inter, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const fontVars = `${display.variable} ${body.variable}`;

export function BootcampBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-[#05070d]">
      {/* Grid, the site's signature motif */}
      <div
        className="absolute inset-0 opacity-[0.18] bc-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,144,226,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,226,.35) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 100%)",
        }}
      />
      {/* Colour glows */}
      <div className="absolute -top-24 -left-24 w-[22rem] h-[22rem] md:w-[34rem] md:h-[34rem] rounded-full blur-[90px] opacity-40 bc-float-a" style={{ background: "#2E7BD1" }} />
      <div className="absolute top-[40%] -right-28 w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] rounded-full blur-[90px] opacity-25 bc-float-b" style={{ background: "#FDB913" }} />
      <div className="absolute -bottom-28 left-1/4 w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] rounded-full blur-[100px] opacity-25 bc-float-a" style={{ background: "#7C3AED" }} />
      {/* Soft vignette keeps text readable */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(5,7,13,.75) 100%)" }} />

      <style jsx>{`
        @keyframes bc-float-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,40px) scale(1.1); } }
        @keyframes bc-float-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,30px) scale(1.12); } }
        @keyframes bc-grid { from { background-position: 0 0, 0 0; } to { background-position: 36px 36px, 36px 36px; } }
        .bc-float-a { animation: bc-float-a 18s ease-in-out infinite; }
        .bc-float-b { animation: bc-float-b 14s ease-in-out infinite; }
        .bc-grid { animation: bc-grid 12s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bc-float-a, .bc-float-b, .bc-grid { animation: none; }
        }
      `}</style>
    </div>
  );
}
