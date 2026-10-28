import ServicesPage from '@/components/Services/ServicesPage';
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from '@/components/Hero/navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function Services() {
  return(
  <div>
  <Seo title="Blockchain and Web Development Services" path="/services" description="Smart contracts, dApps, websites and mobile apps built by the Web3Nova team. Turn your idea into a working product with blockchain and modern web technology." />
  <Navigation/>
  <ServicesPage />
  <Footer/>
  </div>
)
};