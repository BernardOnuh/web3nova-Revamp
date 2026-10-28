import Navigation from '@/components/Hero/navbar';
import OpportunitiesPage from '@/components/Opportunities/OpportunitiesPage';
import Footer from '@/components/Footer';
import Seo from "@/components/Seo";

export default function Opportunities() {
  return (
    <div>
      <Seo title="Hackathons and Opportunities" path="/opportunities" description="Hackathons, grants and opportunities in tech and Web3, posted as they open. Compete, build and win with the Web3Nova community." />
      <Navigation />
      <OpportunitiesPage />
      <Footer />
    </div>
  );
}
