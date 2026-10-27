import Head from "next/head";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import WorkspaceBooking from "@/components/Workspace/WorkspaceBooking";

export default function WorkspacePage() {
  return (
    <div className="bg-black">
      <Head>
        <title>Book a Workspace Seat | Web3Nova</title>
        <meta name="description" content="Book a seat at the Web3Nova Workspace by the day, week or month, or reserve the event space." />
      </Head>
      <Navbar />
      <WorkspaceBooking />
      {/* Room for the sticky mobile pay bar */}
      <div className="pb-28 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
