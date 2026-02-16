import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Web3NovaHomepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a] text-white font-sans relative overflow-hidden">
      
      {/* Enhanced Grid Pattern with Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(46, 123, 209, 0.08) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(46, 123, 209, 0.08) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      {/* Gradient Overlay for depth */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 10, 0.6) 100%)',
        }}
      ></div>

      {/* Animated accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2E7BD1] to-transparent animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent animate-pulse-slow"></div>

      {/* Large glossy orb - LEFT SIDE - Primary Blue */}
      <div 
        className="absolute -left-[15%] md:-left-[10%] top-[10%] md:top-[15%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full animate-float-1"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(46, 123, 209, 0.4), rgba(46, 123, 209, 0.25), rgba(46, 123, 209, 0.15), transparent)',
          backdropFilter: 'blur(80px)',
          border: '2px solid rgba(46, 123, 209, 0.25)',
          boxShadow: '0 30px 120px rgba(46, 123, 209, 0.35), inset 0 0 100px rgba(46, 123, 209, 0.2)',
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
        }}
      >
        {/* Glass reflection */}
        <div 
          className="absolute top-[15%] left-[20%] w-[200px] md:w-[250px] h-[200px] md:h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)',
            filter: 'blur(50px)',
          }}
        ></div>
      </div>

      {/* Top right glossy orb - Sky Blue */}
      <div 
        className="absolute -right-[15%] md:right-[5%] top-[5%] md:top-[10%] w-[350px] md:w-[450px] h-[350px] md:h-[450px] rounded-full animate-float-2"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(146, 180, 228, 0.35), rgba(146, 180, 228, 0.22), rgba(146, 180, 228, 0.15), transparent)',
          backdropFilter: 'blur(70px)',
          border: '2px solid rgba(146, 180, 228, 0.25)',
          boxShadow: '0 30px 130px rgba(146, 180, 228, 0.3), inset 0 0 100px rgba(146, 180, 228, 0.15)',
          transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
        }}
      >
        {/* Glass highlight */}
        <div 
          className="absolute top-[10%] left-[25%] w-[150px] md:w-[180px] h-[150px] md:h-[180px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent)',
            filter: 'blur(40px)',
          }}
        ></div>
      </div>

      {/* Bottom right glossy orb - Sun Yellow */}
      <div 
        className="absolute -right-[10%] md:right-[8%] bottom-[5%] md:bottom-[15%] w-[320px] md:w-[380px] h-[320px] md:h-[380px] rounded-full animate-float-3"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 184, 0, 0.45), rgba(255, 184, 0, 0.3), rgba(255, 184, 0, 0.18), transparent)',
          backdropFilter: 'blur(60px)',
          border: '2px solid rgba(255, 184, 0, 0.3)',
          boxShadow: '0 30px 120px rgba(255, 184, 0, 0.4), inset 0 0 90px rgba(255, 184, 0, 0.2)',
          transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.04}px)`,
        }}
      >
        {/* Glass shine */}
        <div 
          className="absolute top-[12%] left-[18%] w-[120px] md:w-[140px] h-[120px] md:h-[140px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25), transparent)',
            filter: 'blur(30px)',
          }}
        ></div>
      </div>

      {/* Floating particles for mobile */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-[#2E7BD1] rounded-full animate-float-particle-1 blur-sm"></div>
      <div className="absolute top-[40%] right-[15%] w-3 h-3 bg-[#FFB800] rounded-full animate-float-particle-2 blur-sm"></div>
      <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-[#92B4E4] rounded-full animate-float-particle-3 blur-sm"></div>
      <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-[#2E7BD1] rounded-full animate-float-particle-1 blur-sm"></div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 py-16 md:py-20 max-w-5xl mx-auto text-center min-h-screen">
        {/* Badge */}
        <div 
          className="mb-8 md:mb-10 inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-[#2E7BD1]/40 rounded-full transition-all duration-300 hover:scale-105 hover:border-[#2E7BD1]/60 shadow-xl animate-glow"
          style={{
            boxShadow: '0 8px 32px rgba(46, 123, 209, 0.2)',
          }}
        >
          <span className="text-xs md:text-sm font-medium">Learn, Build and Earn<span className="font-bold mx-1 md:mx-2 text-[#FFB800]">With</span> Web3Nova</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-[1.15] tracking-tight animate-fade-in"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            textShadow: '0 4px 30px rgba(46, 123, 209, 0.5), 0 0 60px rgba(46, 123, 209, 0.2)'
          }}
        >
          Learn, Build &<br />
          Grow <br />
          <span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E7BD1] via-[#92B4E4] to-[#FFB800] animate-gradient"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
            }}
          >
            with Web3Nova
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl leading-relaxed px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-md border border-white/15 shadow-2xl animate-fade-in-up">
        Web3Nova is your launchpad into the world of Web3. Whether you&apos;re looking to start a career in blockchain development through our 16-week hands-on bootcamp, or seeking expert-led design and development services for your Web3 project.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link 
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-[#2E7BD1] via-[#3a8de8] to-[#92B4E4] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in-up inline-block text-center"
            style={{
              boxShadow: '0 12px 50px rgba(46, 123, 209, 0.5)',
            }}
          >
            <span className="relative z-10 text-sm md:text-base">Join Next Cohort</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a5a9f] via-[#2E7BD1] to-[#1a5a9f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <button 
            className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-[#FFB800]/10 via-[#FFB800]/15 to-[#FFB800]/10 backdrop-blur-xl border-2 border-[#FFB800]/40 text-[#FFB800] font-semibold rounded-xl hover:bg-[#FFB800]/20 hover:border-[#FFB800]/60 transition-all duration-300 hover:scale-105 animate-fade-in-up"
            style={{
              boxShadow: '0 8px 32px rgba(255, 184, 0, 0.2)',
            }}
          >
            <span className="relative z-10 text-sm md:text-base">Explore Services</span>
            <div className="absolute inset-0 bg-[#FFB800]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </main>

      {/* Custom animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        @keyframes float-1 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          33% { 
            transform: translate(30px, -40px) scale(1.05);
          }
          66% { 
            transform: translate(-20px, -20px) scale(0.98);
          }
        }

        @keyframes float-2 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          33% { 
            transform: translate(-40px, 30px) scale(1.03);
          }
          66% { 
            transform: translate(20px, -30px) scale(0.97);
          }
        }

        @keyframes float-3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% { 
            transform: translate(-30px, -40px) scale(1.08) rotate(5deg);
          }
        }

        @keyframes float-particle-1 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
          }
        }

        @keyframes float-particle-2 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-40px) translateX(-20px);
            opacity: 0.9;
          }
        }

        @keyframes float-particle-3 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(30px) translateX(-15px);
            opacity: 0.7;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(46, 123, 209, 0.2);
          }
          50% {
            box-shadow: 0 8px 40px rgba(46, 123, 209, 0.4);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-float-1 {
          animation: float-1 20s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 18s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 22s ease-in-out infinite;
        }

        .animate-float-particle-1 {
          animation: float-particle-1 8s ease-in-out infinite;
        }

        .animate-float-particle-2 {
          animation: float-particle-2 10s ease-in-out infinite;
        }

        .animate-float-particle-3 {
          animation: float-particle-3 12s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 5s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}