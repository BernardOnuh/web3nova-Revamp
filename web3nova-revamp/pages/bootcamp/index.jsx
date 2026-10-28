import Seo from "@/components/Seo";
import { ORGANIZATION, SITE } from "@/lib/seo";
import { BOOTCAMP_NAME, COURSES, LOCATIONS } from "@/lib/bootcamp";

const COURSE_LD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: BOOTCAMP_NAME,
  description: `A 4-month intensive bootcamp in Akure and online. Tracks: ${COURSES.map((c) => c.title).join(", ")}. Learn, build and earn.`,
  url: `${SITE.url}/bootcamp`,
  provider: { "@type": "Organization", "@id": ORGANIZATION["@id"], name: SITE.name, sameAs: SITE.url },
  inLanguage: "en",
  offers: LOCATIONS.map((l) => ({
    "@type": "Offer",
    category: "Paid",
    name: l.title,
    price: l.price,
    priceCurrency: "NGN",
    url: `${SITE.url}/bootcamp`,
    availability: "https://schema.org/LimitedAvailability",
  })),
  hasCourseInstance: [
    { "@type": "CourseInstance", courseMode: "Onsite", courseWorkload: "P16W", location: { "@type": "Place", name: "Web3Nova, Akure", address: ORGANIZATION.address } },
    { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "P16W" },
  ],
};
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import BootcampRegister from "@/components/Bootcamp/BootcampRegister";

export default function BootcampPage() {
  return (
    <div className="bg-black">
      <Seo
        title="16-Week Tech Bootcamp in Akure and Online"
        path="/bootcamp"
        image="/og/bootcamp.png"
        description="Join Web3Nova's 4-month intensive bootcamp: web development, mobile apps, UI/UX, AI automation, smart contracts or ZK and Rust. On-site in Akure from ₦70,000 or online. Only 30 spots."
        jsonLd={COURSE_LD}
      />
      <Navbar />
      <BootcampRegister />
      {/* Room for the sticky mobile pay bar */}
      <div className="pb-28 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
