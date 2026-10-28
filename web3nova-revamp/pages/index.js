import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import About from "@/components/About/AboutPage";
import Training from "@/components/Training/Training";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import HeroSection from "@/components/HeroSection";
import OverviewSplit from "@/components/ServiceandAcademy";
import PartnersSection from "@/components/partners";
import TestimonialsSection from "@/components/Testimonial";
import CTASection from "@/components/ContactUs";
import Footer from "@/components/Footer";

import Web3NovaHomepage from "@/components/Hero";
import Navigation from "@/components/Hero/navbar";
import Seo from "@/components/Seo";
import { ORGANIZATION, SITE } from "@/lib/seo";

const WEBSITE = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, publisher: { "@id": ORGANIZATION["@id"] } };
export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={[ORGANIZATION, WEBSITE]} />
      <Navigation />
      <Web3NovaHomepage />

      {/* Add id here for smooth scrolling */}
      <section id="training" className="scroll-mt-20">
        <span id="services" className="absolute -mt-20"></span>
        <OverviewSplit />
      </section>

      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
