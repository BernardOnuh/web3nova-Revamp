import { useRouter } from "next/router";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import BootcampSuccess from "@/components/Bootcamp/BootcampSuccess";
import Seo from "@/components/Seo";

export default function BootcampSuccessPage() {
  const { query, isReady } = useRouter();
  return (
    <div className="bg-black">
      <Seo title="Payment Confirmation" noindex />
      <Navbar />
      {isReady && <BootcampSuccess paymentReference={String(query.ref || "")} />}
      <Footer />
    </div>
  );
}
