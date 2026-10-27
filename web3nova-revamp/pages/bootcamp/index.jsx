import Head from "next/head";
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import BootcampRegister from "@/components/Bootcamp/BootcampRegister";

export default function BootcampPage() {
  return (
    <div className="bg-black">
      <Head>
        <title>Join the 16-Week Bootcamp | Web3Nova</title>
      </Head>
      <Navbar />
      <BootcampRegister />
      {/* Room for the sticky mobile pay bar */}
      <div className="pb-28 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
