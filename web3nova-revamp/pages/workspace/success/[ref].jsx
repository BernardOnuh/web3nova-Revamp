import { useRouter } from "next/router";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import WorkspaceSuccess from "@/components/Workspace/WorkspaceSuccess";

export default function WorkspaceSuccessPage() {
  const { query, isReady } = useRouter();
  return (
    <div className="bg-black">
      <Navbar />
      {isReady && <WorkspaceSuccess paymentReference={String(query.ref || "")} />}
      <Footer />
    </div>
  );
}
