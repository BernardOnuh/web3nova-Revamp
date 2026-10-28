import SuccessPage from "@/components/Internship/SuccessPage";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function InternshipSuccessPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Seo title="Application Received" noindex />
      <Navbar />
      
      <div className="relative z-10">
        <SuccessPage />
      </div>

      <Footer />
    </div>
  );
}