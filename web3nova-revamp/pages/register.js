// pages/index.js
import Footer from '@/components/Footer.jsx';
import Register from '../components/Register/Register.jsx';
import Navbar from '@/components/Hero/navbar';
import Seo from "@/components/Seo";


const HomePage = () => {
  return (
       <>
         <Seo title="Apply for a Program" path="/register" description="Apply for a Web3Nova training program. Pick the track that matches your goals and experience level." />
        <Navbar />
        <div className="mt-15">
      <Register />
      </div>
      <Footer />
      {/* Add other sections as needed */}
    </>
  );
};

export default HomePage;