// pages/events.js
import Navigation from '@/components/Hero/navbar';
import EventsPage from '@/components/events/EventsPage'; // The new component
import Footer from '@/components/Footer';
import Seo from "@/components/Seo";

export default function Events() {
  return (
    <div>
      <Seo title="Events, Workshops and Meetups" path="/events" description="Workshops, meetups, hackathons and conferences hosted by Web3Nova and partners like Base, Sui, Avalanche and Lisk in Akure and across Nigeria." />
      <Navigation />
      <EventsPage />
      <Footer />
    </div>
  );
}