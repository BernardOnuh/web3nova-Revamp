import Attendance from "@/components/Internship/attendance";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

export default function AttendancePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Seo title="Intern Attendance" noindex />
      <Navbar />
      <div className="relative z-10">
        <Attendance />
      </div>
      <Footer />
    </div>
  );
}
