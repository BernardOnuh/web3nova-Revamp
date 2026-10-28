import Internship from "@/components/Internship/InternshipPage";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/ContactUs";
import Seo from "@/components/Seo";

export default function InternshipPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Seo title="SIWES Internship" path="/internship" description="Hands-on SIWES and industrial training internships at Web3Nova in Akure. Work on real tech and Web3 projects with mentors." />
      <Navbar />
      
      {/* Main Page Content */}
      <div className="relative z-10">
        <Internship />
      </div>

      <CTASection />
      <Footer />
    </div>
  );
}
