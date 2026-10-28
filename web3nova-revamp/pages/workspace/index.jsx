import Seo from "@/components/Seo";
import { ORGANIZATION, SITE } from "@/lib/seo";
import { DURATIONS, EVENT_SPACE, SEAT_CAPACITY, SEAT_PLANS } from "@/lib/workspace";

const offer = (name, price, unitText) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "NGN",
  url: `${SITE.url}/workspace`,
  ...(unitText && { priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "NGN", unitText } }),
});

// Friends & Family prices need a coupon, so they're left out of public listings.
const WORKSPACE_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/workspace#space`,
  name: "Web3Nova Workspace",
  description: `A ${SEAT_CAPACITY}-seat co-working space in Akure with Basic and Premium (AC room, TV, monitor and keyboard) seats, plus an event space.`,
  url: `${SITE.url}/workspace`,
  image: `${SITE.url}/og/workspace.png`,
  parentOrganization: { "@id": ORGANIZATION["@id"] },
  address: ORGANIZATION.address,
  priceRange: "₦500 – ₦75,000",
  currenciesAccepted: "NGN",
  paymentAccepted: "Card, Bank transfer, USSD",
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:30",
    closes: "20:00",
  }],
  makesOffer: [
    ...SEAT_PLANS.filter((p) => !p.needsCoupon).flatMap((p) =>
      DURATIONS.filter((d) => p.prices[d.id]).map((d) => offer(`${p.title} seat, ${d.title.toLowerCase()}`, p.prices[d.id], d.unit.toUpperCase()))
    ),
    ...EVENT_SPACE.options.map((o) => offer(`${EVENT_SPACE.title}, ${o.title}`, o.price)),
  ],
};
import Navbar from "@/components/Hero/navbar";
import Footer from "@/components/Footer";
import WorkspaceBooking from "@/components/Workspace/WorkspaceBooking";

export default function WorkspacePage() {
  return (
    <div className="bg-black">
      <Seo
        title="Co-working Space in Akure: Book a Seat"
        path="/workspace"
        image="/og/workspace.png"
        description="Book a desk at the Web3Nova Workspace in Akure from ₦500 an hour, ₦2,000 a day or ₦37,500 a month. Premium AC room, event space for hire. Open daily 7:30am to 8pm."
        jsonLd={WORKSPACE_LD}
      />
      <Navbar />
      <WorkspaceBooking />
      {/* Room for the sticky mobile pay bar */}
      <div className="pb-28 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
