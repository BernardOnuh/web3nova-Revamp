import HiringSection from "@/components/Hiring/Hiring";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from '@/components/Hero/navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function Services() {
  return(
  <div>
  <Seo title="Careers" path="/hiring" description="Launch your career in tech and Web3 with hands-on experience at Web3Nova. We're looking for passionate people ready to make an impact." />
  <Navigation/>
  <HiringSection />
  <Footer/>
  </div>
)
};