import { useRouter } from "next/router";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import WorkspaceSuccess from "@/components/Workspace/WorkspaceSuccess";
import Seo from "@/components/Seo";

export default function WorkspaceSuccessPage() {
  const { query, isReady } = useRouter();
  return (
    <div className="bg-black">
      <Seo title="Booking Confirmation" noindex />
      <Navbar />
      {isReady && <WorkspaceSuccess paymentReference={String(query.ref || "")} />}
      <Footer />
    </div>
  );
}
