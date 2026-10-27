import { useRouter } from "next/router";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import BootcampSuccess from "@/components/Bootcamp/BootcampSuccess";

export default function BootcampSuccessPage() {
  const { query, isReady } = useRouter();
  return (
    <div className="bg-black">
      <Navbar />
      {isReady && <BootcampSuccess paymentReference={String(query.ref || "")} />}
      <Footer />
    </div>
  );
}
