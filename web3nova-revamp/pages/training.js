// pages/index.js
import Training from '../components/Training/Training';
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from '@/components/Hero/navbar';
import Footer from '@/components/Footer';
import Seo from "@/components/Seo";

const HomePage = () => {
  return (
       <div className="bg-black">
         <Seo title="Tech and Web3 Training" path="/training" description="Learn web development, mobile apps, UI/UX design, AI automation and smart contracts with Web3Nova, on-site in Akure or online. Join the 16-week bootcamp." />
      <Navigation />
      <Training />
      <Footer/>
      {/* Add other sections as needed */}
    </div>
  );
};

export default HomePage;