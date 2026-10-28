import ApplicationForm from "@/components/Internship/ApplicationForm";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Seo title="Apply for the SIWES Internship" path="/internship/apply" description="Apply for a SIWES internship at Web3Nova in Akure and gain hands-on experience in tech and Web3." />
      <Navbar />
      
      <div className="relative z-10">
        <ApplicationForm />
      </div>

      <Footer />
    </div>
  );
}
