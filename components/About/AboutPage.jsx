import React, { useState, useEffect } from "react";
import { Shield, Eye, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "../Services/BackgroundEffects";

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const testimonials = [
    {
      text: "Web3Nova helped us unlock blockchain learning for our global team. The experience was seamless and inspiring.",
      author: "David Johnson",
      role: "CEO",
      company: "Paal AI",
    },
    {
      text: "Their mix of creativity, security, and tech mastery is unmatched in the Web3 education space.",
      author: "Sarah Chen",
      role: "CTO",
      company: "BlockChain Ventures",
    },
    {
      text: "We built our first dApp with Web3Nova's mentorship — they turn learning into real-world innovation.",
      author: "Michael Ross",
      role: "Founder",
      company: "DeFi Learners",
    },
  ];

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <BackgroundEffects />
      {/* 🌌 Cosmic Background */}
      <div className="absolute inset-0 -z-10 bg-[#000000]" />
      
      {/* Mouse Interactive Gradient Overlay */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 88, 240, 0.15), transparent 60%)`,
        }}
      />
      
      {/* Large Glowing Orbs with Mouse Interaction */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Left Blue Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#1e3a8a]/40 via-[#1e40af]/20 to-transparent blur-3xl"
          style={{ 
            top: '-10%', 
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 0.5,
              ease: "easeOut",
            },
            y: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        />
        
        {/* Bottom Right Yellow/Gold Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#a16207]/40 via-[#ca8a04]/20 to-transparent blur-3xl"
          style={{ 
            bottom: '-15%', 
            right: '-15%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: -mousePosition.x * 0.3,
            y: -mousePosition.y * 0.3,
          }}
          transition={{
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
            opacity: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
            x: {
              duration: 0.6,
              ease: "easeOut",
            },
            y: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
        />
        
        {/* Middle Blue Accent */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#0058F0]/30 via-[#227AFF]/15 to-transparent blur-3xl"
          style={{ 
            top: '40%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
            x: (mousePosition.x - 50) * 0.4,
            y: (mousePosition.y - 50) * 0.4,
          }}
          transition={{
            scale: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            },
            opacity: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            },
            x: {
              duration: 0.7,
              ease: "easeOut",
            },
            y: {
              duration: 0.7,
              ease: "easeOut",
            },
          }}
        />
      </div>

      {/* ✨ Interactive Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const distanceX = Math.abs(mousePosition.x - randomX);
          const distanceY = Math.abs(mousePosition.y - randomY);
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const influence = Math.max(0, 1 - distance / 50);
          
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/20 blur-sm"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${randomY}%`,
                left: `${randomX}%`,
              }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.1 + influence * 0.3, 0.4 + influence * 0.4, 0.1 + influence * 0.3],
                scale: [1 + influence * 0.5, 1.5 + influence * 0.5, 1 + influence * 0.5],
                x: (mousePosition.x - randomX) * influence * 0.3,
              }}
              transition={{
                y: {
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                },
                opacity: {
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                },
                scale: {
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                },
                x: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 text-white leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">Web3Nova</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Empowering creators and learners to build the decentralized future.
        </motion.p>

      {/* Our Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold mb-8 text-left"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our Story
            </h2>
            <div className="text-left">
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Web3Nova started as a bold idea to merge Web3 education and
              real-world innovation. We wanted to make blockchain learning
              accessible, hands-on, and exciting.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Today, we're building an ecosystem that empowers developers,
              designers, and dreamers to explore decentralized technologies and
              create scalable solutions for the world.
            </p>
            </div>
          </motion.div>

         <motion.div
  className="relative group"
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  whileHover={{ scale: 1.05 }}
>
  <motion.img
    src="/web3conference.png"
    alt=""
    className="rounded-4xl shadow-lg w-full h-auto object-cover"
    transition={{ duration: 0.3 }}
    whileHover={{ filter: 'brightness(1.2) contrast(1.1)' }}
  />
</motion.div>

        </div>
      </section>

      {/* Core Values Section (joined cards) */}
    <section className="py-32 px-6 relative overflow-hidden">
  <div className="max-w-7xl mx-auto text-center">
    <motion.h2
      className="text-5xl md:text-6xl font-bold mb-20 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      Our Core Values
    </motion.h2>

    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-24">
      {[
        {
          title: "Transparency",
          desc: "Clear processes, open communication, and verifiable blockchain solutions ensure trust at every step.",
          gradient: "from-[#0058F0] to-[#88B9E6]",
          glowColor: "rgba(0, 88, 240, 0.4)",
          icon: (
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="grad1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0058F0"/>
                  <stop offset="1" stopColor="#88B9E6"/>
                </linearGradient>
              </defs>
            </svg>
          ),
        },
        {
          title: "Security",
          desc: "Robust encryption, secure smart contracts, and best practices protect your assets and data.",
          gradient: "from-[#FDB913] to-[#FFD52D]",
          glowColor: "rgba(253, 185, 19, 0.4)",
          icon: (
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="url(#grad2)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="grad2" x1="3" y1="12.5" x2="21" y2="12.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDB913"/>
                  <stop offset="1" stopColor="#FFD52D"/>
                </linearGradient>
              </defs>
            </svg>
          ),
        },
        {
          title: "Creativity",
          desc: "Innovative design, cutting-edge development, and user-first thinking bring your Web3 vision to life.",
          gradient: "from-[#4A90E2] to-[#0058F0]",
          glowColor: "rgba(74, 144, 226, 0.4)",
          icon: (
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#grad3)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="#1a1a1a" opacity="0.3"/>
              <defs>
                <linearGradient id="grad3" x1="2" y1="11.51" x2="22" y2="11.51" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4A90E2"/>
                  <stop offset="1" stopColor="#0058F0"/>
                </linearGradient>
              </defs>
            </svg>
          ),
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="group flex-1 p-10 bg-gray-900/50 border border-gray-800/50 backdrop-blur-xl rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            y: -12,
            scale: 1.02,
          }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
          style={{
            boxShadow: `0 0 40px rgba(0, 88, 240, 0.15)`,
          }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          {/* Animated gradient border on hover */}
          <motion.div
            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${item.gradient} p-[2px]`}
            initial={{ opacity: 0 }}
          >
            <div className="w-full h-full bg-gray-900 rounded-2xl" />
          </motion.div>

          {/* Glowing orb effect on hover */}
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
            style={{
              background: item.glowColor,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.div 
              className="flex justify-center items-center mx-auto mb-6 text-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-2xl font-semibold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
          {/* Stats */}
        {/* Stats */}
<section>
  <div className="grid md:grid-cols-3 gap-10 border-t border-gray-800 pt-12">
    {[
      { value: "70+", label: "Projects Delivered" },
      { value: "35+", label: "Tokens Launched" },
      { value: "10+", label: "Blockchain Solutions Implemented" },
    ].map((stat, i) => (
      <motion.div
        key={i}
        className="group flex flex-col items-center relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
      >
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0058F0]/20 to-[#FFD52D]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
        
        <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] bg-clip-text text-transparent relative z-10">
          {stat.value}
        </div>
        <div className="text-gray-400 text-sm tracking-wide group-hover:text-gray-300 transition-colors duration-300 relative z-10">
          {stat.label}
        </div>
      </motion.div>
    ))}
  </div>
</section>
{/* Testimonials */}
<section className="py-32 px-6 relative overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#0058F0]/10 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FFD52D]/10 rounded-full blur-3xl" />
  
  <div className="max-w-6xl mx-auto text-center relative z-10">
    <motion.h2
      className="text-5xl md:text-6xl font-bold mb-20 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      What Our Partners Say
    </motion.h2>

    <motion.div
      key={currentTestimonial}
      className="group relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-800/50 min-h-[400px] shadow-[0_0_40px_rgba(0,88,240,0.15)] hover:shadow-[0_0_60px_rgba(0,88,240,0.25)] transition-all duration-500"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] p-[2px]">
        <div className="w-full h-full bg-gray-900/95 rounded-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Quote icon */}
        <div className="mb-6 flex justify-center">
          <svg className="w-12 h-12 text-[#0058F0] opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </div>

        {/* Star rating */}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#starGrad)"
                stroke="url(#starGrad)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="starGrad" x1="2" y1="11.51" x2="22" y2="11.51">
                  <stop stopColor="#FFD52D"/>
                  <stop offset="1" stopColor="#FDB913"/>
                </linearGradient>
              </defs>
            </motion.svg>
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light italic">
          "{testimonials[currentTestimonial].text}"
        </p>

        {/* Author info */}
        <div className="flex items-center justify-center space-x-4">
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0058F0] to-[#FFD52D] flex items-center justify-center text-white font-bold text-xl shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {testimonials[currentTestimonial].author[0]}
          </motion.div>
          <div className="text-left">
            <div className="font-semibold text-xl text-white">
              {testimonials[currentTestimonial].author}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {testimonials[currentTestimonial].role}
            </div>
            <div className="text-sm text-[#0058F0] font-medium">
              {testimonials[currentTestimonial].company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Navigation controls */}
    <div className="flex items-center justify-center gap-8 mt-12">
      {/* Previous button */}
      <motion.button
        onClick={prevTestimonial}
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-gray-900/70 hover:bg-gray-800/70 rounded-full border border-gray-800/50 hover:border-[#0058F0]/70 transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,88,240,0.3)]"
      >
        <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-[#0058F0]" />
      </motion.button>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentTestimonial
                ? "bg-gradient-to-r from-[#0058F0] to-[#FFD52D] w-12 shadow-lg"
                : "bg-gray-700 w-3 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <motion.button
        onClick={nextTestimonial}
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-gray-900/70 hover:bg-gray-800/70 rounded-full border border-gray-800/50 hover:border-[#0058F0]/70 transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,88,240,0.3)]"
      >
        <ChevronRight className="w-6 h-6 text-gray-400 hover:text-[#0058F0]" />
      </motion.button>
    </div>
  </div>
</section>
      </section>
    </div>
  );
};

export default AboutPage;