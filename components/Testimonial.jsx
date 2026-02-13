import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const TestimonialsSection = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeTab, setActiveTab] = useState("students");
  const [currentIndex, setCurrentIndex] = useState(0);

  const studentTestimonials = [
    {
      name: "Marvellous",
      role: "Blockchain developer",
      company: "Web3Nova",
      image: "./tiwa.jpg",
      rating: 5,
      text: "Web3Nova gave me the opportunity to be part of a community of developers that help3d me upskill my career as a blockchain developer.",
      achievement: "Upskill my career as a blockchain developer.",
    },
    {
      name: "Adebanjo Abraham",
      role: "Blockchain Developer",
      company: "Web3Nova",
      image: "./Abraham.jpg",
      rating: 5,
      text: "The curriculum is world-class. I learned Solidity, React, and smart contract security in just 12 weeks. Best investment I ever made.",
      achievement:
        "Web3nova transformed from an aspiring blockchain developer to an experienced blockchain developer, which lead me to build and co-founded a startup called paycrypt (paycrypt.org)",
    },
    {
      name: "Afolabi Emmanuel",
      role: "Blockchain Developer",
      company: "Web3Nova",
      image: "Emmanuel.jpg",
      rating: 5,
      text: "At Web3nova, I’ve built connections, turned a month-long project into a 24‑hour sprint, learned to earn while learning, and discovered expertise isn’t reserved for “big” moments.",
      achievement: "Turning 3weeks project into 3days project",
    },
    {
      name: "Adedamola",
      role: "Frontend Developer",
      company: "Web3Nova",
      image: "./Adedamola.jpg",
      rating: 5,
      text: "My time at Web3Nova as help me in leveling up my frontend`, communication and networking skills",
      achievement: "Improved my frontend skills and landed frontend dev jobs",
    },
  ];

  const clientTestimonials = [
    {
      name: "WriterLDN",
      role: "CEO",
      company: "WriterLDN",
      image: "./WriterLDN.jpg",
      rating: 5,
      text: "Web3Nova help Revamped our website and optimized our SEO, helping us in reaching a broader audience.",
      achievement: "200+ new customers",
    },
    {
      name: "Future Edge Technologies",
      role: "Founder",
      company: "Future Edge Technologies",
      image: "./FutureEdge.jpg",
      rating: 5,
      text: "web3Nova developed an efficient cross-chain swap and trading bot.",
      achievement: "Swift and Efficient trading",
    },
    {
      name: "Aboki",
      role: "Founder",
      company: "Aboki",
      image: "./Aboki.jpg",
      rating: 5,
      text: "Web3Nova built our entire platform and system from scratch to a fully functional product.",
      achievement: "Process over $20k+ in volume.",
    },
    {
      name: "Tonance",
      role: "CEO",
      company: "Tonance",
      image: "./Tonance.jpg",
      rating: 5,
      text: "Help build a mini app exchange",
      achievement: "Sustainable system that was to accomodate 200,000+ users. ",
    },
  ];

  const activeTestimonials =
    activeTab === "students" ? studentTestimonials : clientTestimonials;

  return (
    <div
      ref={sectionRef}
      id="alumniandsuccess"
      className="relative bg-[#0C0C0C] py-16 md:py-24 overflow-hidden"
    >
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(50px, 50px) scale(1.1); } }
        @keyframes float-medium { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-40px, 40px) scale(1.15); } }
        @keyframes float-fast { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.2); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes gradient-shift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(100px, 100px); } }
        @keyframes grid-flow { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 50px); } }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              animation: "grid-flow 20s linear infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "-8rem",
            width: "24rem",
            height: "24rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.3,
            background: "radial-gradient(circle, #4A90E2, transparent)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            width: "20rem",
            height: "20rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.25,
            background: "radial-gradient(circle, #FDB913, transparent)",
            animation: "float-medium 15s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "33%",
            width: "18rem",
            height: "18rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.2,
            background: "radial-gradient(circle, #4A90E2, transparent)",
            animation: "float-fast 12s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, transparent, rgba(59, 130, 246, 0.2), transparent)",
              animation: "gradient-shift 20s ease-in-out infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#4A90E2",
            animation: "twinkle 3s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "33%",
            right: "33%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#FDB913",
            animation: "twinkle 3s ease-in-out infinite 1s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "33%",
            left: "50%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#88B9E6",
            animation: "twinkle 3s ease-in-out infinite 2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "66%",
            right: "25%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#4A90E2",
            animation: "twinkle 3s ease-in-out infinite 1.5s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="text-center mb-12"
        >
          <motion.div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-4">
            <Star className="w-4 h-4 text-[#FFC933]" fill="#FFC933" />
            <span className="text-sm text-gray-300 font-['Inter']">
              Success Stories
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">
            Hear from Our{" "}
            <span className="bg-gradient-to-r from-[#2B6EFF] to-[#FFC933] bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-['Inter']">
            Real stories from students who transformed their careers and clients
            who achieved remarkable results.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1">
            <button
              onClick={() => {
                setActiveTab("students");
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "students"
                  ? "bg-[#2B6EFF] text-white shadow-lg shadow-[#2B6EFF]/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="font-semibold text-sm font-['Inter']">
                Students
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("clients");
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "clients"
                  ? "bg-[#FFC933] text-[#0C0C0C] shadow-lg shadow-[#FFC933]/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="font-semibold text-sm font-['Inter']">
                Clients
              </span>
            </button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-16 h-16 text-white" fill="white" />
            </div>
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#FFC933]"
                  fill="#FFC933"
                />
              ))}
            </div>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed relative z-10 font-['Inter']">
              "{activeTestimonials[currentIndex].text}"
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2B6EFF]/20 to-[#FFC933]/20 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#FFC933]" />
              <span className="text-sm text-gray-300 font-['Inter']">
                {activeTestimonials[currentIndex].achievement}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2B6EFF] to-[#71A6FF] flex items-center justify-center text-3xl shadow-lg">
                {activeTestimonials[currentIndex].image}
              </div> */}
              <img
                src={activeTestimonials[currentIndex].image}
                alt="pfp"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold text-white mb-1 font-['Space_Grotesk']">
                  {activeTestimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-400 font-['Inter']">
                  {activeTestimonials[currentIndex].role} at{" "}
                  {activeTestimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + activeTestimonials.length) %
                    activeTestimonials.length
                )
              }
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <div className="flex items-center space-x-2">
              {activeTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-gradient-to-r from-[#2B6EFF] to-[#FFC933]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev + 1) % activeTestimonials.length
                )
              }
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "50+", label: "Success Stories" },
            { value: "5+", label: "Partner Companies" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2B6EFF] to-[#FFC933] bg-clip-text text-transparent mb-1 font-['Space_Grotesk']">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-['Inter']">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
