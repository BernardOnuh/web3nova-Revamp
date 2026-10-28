"use client";
import About from "@/components/About/AboutPage";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/Services/BackgroundEffects";
import Seo from "@/components/Seo";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      <Seo title="About Us" path="/about" description="Web3Nova merges tech and Web3 education with real projects. Meet the team building a community of developers, designers and creators in Akure, Nigeria." />
      {/* Background Animation Layer */}
      <BackgroundEffects />
      <Navbar />
      
      {/* Main Page Content */}
      <div className="relative z-10">
        <About />
      </div>
      <Footer />
    </div>
  );
}