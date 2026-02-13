import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Users, Award, ArrowRight } from "lucide-react";

// ===================================================================
// BackgroundEffects Component
// ===================================================================
function BackgroundEffects() {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            }}
          />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-float-slow opacity-30" style={{ background: "radial-gradient(circle, #4A90E2, transparent)" }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl animate-float-medium opacity-25" style={{ background: "radial-gradient(circle, #FDB913, transparent)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-float-fast opacity-20" style={{ background: "radial-gradient(circle, #4A90E2, transparent)" }} />
      </div>

      <style jsx>{`
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
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
      `}</style>
    </>
  );
}

// ===================================================================
// HeroSection Component
// ===================================================================
function HeroSection() {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block px-6 py-2 rounded-full mb-6 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 border border-yellow-400/20">
            <span className="font-semibold text-sm bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider flex items-center gap-2 justify-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Web3.0 Made Simple
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Join <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">2,000+ Students</span>
            <br />
            Building the Decentralized Future
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            We empower Web3 learners and startups — removing barriers and helping you build confidently in the decentralized ecosystem.
          </p>

          {/* CTA Button */}
          <div className="relative inline-block mb-16">
            {/* Glowing effect behind button */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #4A90E2, #FDB913)' }} />
            
            {/* Decorative particles */}
            <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
            <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
            <div className="absolute -bottom-2 -left-3 w-2 h-2 rounded-full bg-yellow-300 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }} />
            <div className="absolute -bottom-3 -right-2 w-3 h-3 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }} />
            
            <Link href="/register">
              <span 
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 overflow-hidden shadow-2xl hover:shadow-[0_0_60px_rgba(74,144,226,0.8)] cursor-pointer" 
                style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #FDB913 100%)', color: '#000', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping opacity-0 group-hover:opacity-100" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Join the Next Cohort
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </span>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { number: "2,000+", label: "Students Trained" },
              { number: "50+", label: "Workshops Held" },
              { number: "15+", label: "Partner Networks" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// FeaturesSection Component
// ===================================================================
function FeaturesSection() {
  const features = [
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      title: "Scholarship Placements",
      description: "Get placed in top Web3 programs and opportunities",
      color: "#4A90E2"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      title: "Free Accommodation",
      description: "Onsite accommodation and feeding provided",
      color: "#FDB913"
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      title: "Community & Hackathons",
      description: "Join our vibrant Web3 community and win prizes",
      color: "#88B9E6"
    }
  ];

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full mb-4 bg-yellow-500/10 border border-yellow-500/20">
            <span className="text-yellow-400 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              ✨ What We Offer
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Everything You <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">Need to Succeed</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 p-8"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-black font-bold"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// PartnersCarousel Component
// ===================================================================
function PartnersCarousel() {
  const partners = [
    { name: 'Base', logo: '/base.svg' },
    { name: 'Avalanche', logo: '/avalanche-log.png' },
    { name: 'Farcaster', logo: '/farcaster-log.png' },
    { name: 'DevCon', logo: '/devcon-log.png' },
    { name: 'Sui', logo: '/sui.svg' },
    { name: 'Lisk', logo: '/lisk.svg' },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative z-10 py-6 overflow-hidden" style={{ backgroundColor: '#FDB913' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      
      <div className="flex animate-scroll-partners whitespace-nowrap relative z-10">
        {duplicatedPartners.map((partner, index) => (
          <span 
            key={index} 
            className="inline-flex items-center gap-3 px-8 text-black font-bold text-lg hover:text-blue-600 transition-colors duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="object-contain max-w-full max-h-full"
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                />
              </div>
            </span>
            <span className="font-bold">{partner.name}</span>
            <span className="mx-2 text-black/50">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll-partners { 
          animation: scroll-partners 40s linear infinite; 
          width: fit-content;
          display: flex;
        }
        .animate-scroll-partners:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// Main Component
// ===================================================================
export default function TrainingPage() {
  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundEffects />
      
      <div className="h-20 md:h-24"></div>
      
      <HeroSection />
      <PartnersCarousel />
      <FeaturesSection />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}