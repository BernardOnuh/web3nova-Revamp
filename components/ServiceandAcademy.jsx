import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Rocket,
  ArrowRight,
  Code,
  Palette,
  Users,
  Zap,
} from "lucide-react";

// Background Effects Component
function BackgroundEffects() {
  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 50px) scale(1.1); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.15); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.2); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, 100px); }
        }
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 20s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: `linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            }}
          />
        </div>

        {/* Floating glossy orbs */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-float-slow opacity-30"
          style={{ background: "radial-gradient(circle, #4A90E2, transparent)" }}
        />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl animate-float-medium opacity-25"
          style={{ background: "radial-gradient(circle, #FDB913, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-float-fast opacity-20"
          style={{ background: "radial-gradient(circle, #4A90E2, transparent)" }}
        />

        {/* Glossy gradient mesh */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/20 to-transparent animate-gradient-shift" />
        </div>

        {/* Shiny particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-twinkle" style={{ backgroundColor: "#4A90E2" }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full animate-twinkle delay-1000" style={{ backgroundColor: "#FDB913" }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full animate-twinkle delay-2000" style={{ backgroundColor: "#88B9E6" }} />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full animate-twinkle delay-1500" style={{ backgroundColor: "#4A90E2" }} />
      </div>
    </>
  );
}

const OverviewSplit = () => {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, 0.05, 0.9],
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      id="training"
      className="relative bg-[#0C0C0C] py-12 md:py-16 overflow-hidden scroll-mt-20"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-10 md:mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
          >
            <Zap className="w-4 h-4 text-[#FFC933]" />
            <span className="text-sm text-gray-300 font-['Inter']">
              Your Path to Success
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']"
          >
            Two Ways to{" "}
            <span className="bg-gradient-to-r from-[#2B6EFF] to-[#FFC933] bg-clip-text text-transparent">
              Transform
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base text-gray-400 max-w-2xl mx-auto font-['Inter']"
          >
            Whether you're ready to learn or ready to build, Web3Nova has you
            covered with world-class education and premium digital solutions.
          </motion.p>
        </motion.div>

        {/* Split Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          {/* Academy Card */}
          <motion.div
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            className="group relative"
          >
            <motion.div
              variants={cardHoverVariants}
              className="relative h-full bg-gradient-to-br from-[#2B6EFF]/10 to-[#71A6FF]/5 rounded-2xl border border-[#2B6EFF]/20 p-6 md:p-8 overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#2B6EFF]/0 to-[#2B6EFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(43, 110, 255, 0.15), transparent)",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 30px rgba(43, 110, 255, 0.3)",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#2B6EFF] to-[#71A6FF] mb-4 shadow-lg shadow-[#2B6EFF]/30"
                >
                  <GraduationCap className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-['Space_Grotesk']">
                  Academy
                </h3>

                <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed font-['Inter']">
                  Master Web2 and Web3 development through hands-on learning.
                  From UI/UX design to blockchain development, we prepare you
                  for the future of tech.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Code, text: "Comprehensive Web3 Curriculum" },
                    { icon: Users, text: "Industry Expert Mentorship" },
                    { icon: Zap, text: "Real-World Project Experience" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#2B6EFF]/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-[#71A6FF]" />
                      </div>
                      <span className="text-gray-300 text-sm font-['Inter']">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <a 
                  href="https://docs.google.com/forms/d/1Is6m8-p8jPW7mgbdWuyI0P2TBIb_s0RNk0tgV3UuX6U" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn w-full py-3 rounded-xl bg-gradient-to-r from-[#2B6EFF] to-[#71A6FF] text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#2B6EFF]/30 hover:shadow-[#2B6EFF]/50 transition-all font-['Inter'] text-sm"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </a>

                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500 font-['Inter']">
                    Next cohort starts January 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Services Card */}
          <motion.div
            variants={itemVariants}
            initial="rest"
            whileHover="hover"
            className="group relative"
          >
            <motion.div
              variants={cardHoverVariants}
              className="relative h-full bg-gradient-to-br from-[#FFC933]/10 to-[#FFC933]/5 rounded-2xl border border-[#FFC933]/20 p-6 md:p-8 overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#FFC933]/0 to-[#FFC933]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(255, 201, 51, 0.15), transparent)",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 30px rgba(255, 201, 51, 0.3)",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFC933] to-[#FFB300] mb-4 shadow-lg shadow-[#FFC933]/30"
                >
                  <Rocket className="w-7 h-7 text-[#0C0C0C]" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-['Space_Grotesk']">
                  Services
                </h3>

                <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed font-['Inter']">
                  Transform your vision into reality with our premium design and
                  development services. We build digital experiences that scale
                  and captivate.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Palette, text: "World-Class UI/UX Design" },
                    { icon: Code, text: "Full-Stack Development" },
                    { icon: Zap, text: "Blockchain Integration" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#FFC933]/20 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-[#FFC933]" />
                      </div>
                      <span className="text-gray-300 text-sm font-['Inter']">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/services" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn w-full py-3 rounded-xl bg-gradient-to-r from-[#FFC933] to-[#FFB300] text-[#0C0C0C] font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#FFC933]/30 hover:shadow-[#FFC933]/50 transition-all font-['Inter'] text-sm"
                  >
                    <span>View Our Work</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500 font-['Inter']">
                    50+ projects delivered worldwide
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="text-gray-500 text-xs mb-6 font-['Inter']">
            Trusted by forward-thinking organizations
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "95%", label: "Success Rate" },
              { value: "500+", label: "Alumni Network" },
              { value: "24/7", label: "Support" },
              { value: "100%", label: "Job Ready" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="relative group"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2B6EFF] to-[#FFC933] bg-clip-text text-transparent mb-1 font-['Space_Grotesk']">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 font-['Inter']">
                  {stat.label}
                </div>

                <motion.div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#2B6EFF]/0 to-[#FFC933]/0 group-hover:from-[#2B6EFF]/10 group-hover:to-[#FFC933]/10 transition-all duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewSplit;