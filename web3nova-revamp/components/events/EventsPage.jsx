import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Play, ExternalLink, Sparkles } from 'lucide-react';

// ===================================================================
// BackgroundEffects Component
// ===================================================================
function BackgroundEffects() {
  return (
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
    </div>
  );
}

// ===================================================================
// HeroSection Component
// ===================================================================
function HeroSection() {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Web3Nova <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">Events</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Join us at workshops, meetups, and conferences 
          </p>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// PartnersCarousel Component - TechTicker Style (Fixed Alignment)
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
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      
      {/* Scrolling ticker */}
      <div className="flex animate-scroll-partners whitespace-nowrap relative z-10">
        {duplicatedPartners.map((partner, index) => (
          <span 
            key={index} 
            className="inline-flex items-center gap-3 px-8 text-black font-bold text-lg hover:text-blue-600 transition-colors duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  width={32}
                  height={32}
                  className="object-contain max-w-full max-h-full"
                  style={{ objectFit: 'contain' }}
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
// EventsTimeline Component
// ===================================================================   
function EventsTimeline() {
  const events = [
    {
      video: "https://www.youtube.com/embed/ZHEBcTTnrTY",
      name: "Base Batches 2.0 Hacker House",
      date: "November 2025",
      location: "Akure",
      attendees: "70+",
      xLink: "https://x.com/web3_nova/status/1985266700565017051",
      description: "Builders coming together to participate in the hackathon Base Batches 2.0.",
      color: "#FDB913"
    },
    {
      video: "https://www.youtube.com/embed/OfeXlX8r--M",
      name: "SUI on Campus FUTA Workshop",
      date: "September 2025",
      location: "FUTA, Akure",
      attendees: "80+",
      xLink: "https://x.com/web3_nova/status/1970811022782181823",
      description: "An engaging workshop introducing students to SUI blockchain technology, covering smart contracts and decentralized applications.",
      color: "#4A90E2"
    },
    {
      video: "https://www.youtube.com/embed/FeNlIFMtpZk",
      name: "Avax Builders Workshop",
      date: "August 2025",
      location: "FUTA, Akure",
      attendees: "40+",
      xLink: "https://x.com/web3_nova/status/1946214960066859358",
      description: "An engaging workshop introducing Avax L1 and NFTs wrapping up with paint and sip.",
      color: "#4A90E2"
    },
    {
      video: "https://www.youtube.com/embed/rOSsVTRAo00",
      name: "Farcaster Meetup",
      date: "August 2025",
      location: "Akure",
      attendees: "50+",
      xLink: "https://x.com/web3_nova/status/1960754143607267542",
      description: "Community gathering focused on Farcaster protocol, exploring decentralized social networking.",
      color: "#FDB913"
    },
    {
      video: "https://www.youtube.com/embed/x5bABfUCNjU",
      name: "Avalanche Workshop",
      date: "June 2025",
      location: "Akure",
      attendees: "65+",
      xLink: "https://x.com/web3_nova/status/1947194757652070749",
      description: "Deep dive into Avalanche blockchain ecosystem, featuring subnet development and cross-chain capabilities.",
      color: "#88B9E6"
    },
    {
      video: "https://www.youtube.com/embed/cOiMfXCZk9g",
      name: "Base Batches 1.0 Hacker House",
      date: "May 2025",
      location: "Akure",
      attendees: "100+",
      xLink: "https://x.com/web3_nova/status/1919359225660047643",
      description: "Intensive hacker house event on Base L2 blockchain, bringing developers together to build innovative projects.",
      color: "#4A90E2"
    },
    {
      video: "https://www.youtube.com/embed/N4Y0CBuQH3M",
      name: "DEVCON Workshop",
      date: "February 2025",
      location: "Akure",
      attendees: "70+",
      xLink: "https://x.com/web3_nova/status/1885406092647178367",
      description: "Post-DEVCON workshop sharing insights from the global Ethereum conference and protocol updates.",
      color: "#FDB913"
    },
    {
      video: "https://www.youtube.com/embed/TgSjjvs2ky8",
      name: "Base Hacker Workshop",
      date: "October 2024",
      location: "Akure",
      attendees: "60+",
      xLink: "https://x.com/baseakure/status/1845184532414333066",
      description: "Introduction to building on Base, Coinbase's Layer 2 solution, covering smart contract deployment, gas optimization, and integrating Base into existing Web3 applications.",
      color: "#88B9E6"
    }
  ];


  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full mb-4 bg-yellow-500/10 border border-yellow-500/20">
            <span className="text-yellow-400 font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              🎉 Past Events
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Event <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">Highlights</span>
          </h2>
        </div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {index % 2 === 0 ? (
                  <>
                    <div className="relative rounded-3xl overflow-hidden aspect-video bg-black/50 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <iframe
                        src={event.video}
                        title={event.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${event.color}20`, color: event.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {event.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <Users className="w-4 h-4" />
                          {event.attendees}
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {event.description}
                      </p>

                      <Link href={event.xLink} target="_blank" rel="noopener noreferrer">
                        <button 
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: event.color, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          View on X
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4 md:order-1">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${event.color}20`, color: event.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {event.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          <Users className="w-4 h-4" />
                          {event.attendees}
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {event.description}
                      </p>

                      <Link href={event.xLink} target="_blank" rel="noopener noreferrer">
                        <button 
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: event.color, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          View on X
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </Link>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden aspect-video bg-black/50 border border-white/10 group-hover:border-white/20 transition-all duration-300 md:order-2">
                      <iframe
                        src={event.video}
                        title={event.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// Gallery Component
// ===================================================================
function Gallery() {
  const images = [
    '/avalanche-workshop.jpg',
    '/facaster-meet.png',
    '/base-batches-2.jpg',
    '/devcon.jpg',
    '/web3conference.png',
    '/sui1.jpg',
    '/sui2.jpg',
    '/class.png',
  ];

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Event <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Moments captured from our amazing events
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Image src={image} alt={`Event ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// Main EventsPage Component
// ===================================================================
export default function EventsPage() {
  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundEffects />
      
      <div className="h-20 md:h-24"></div>
      
      <HeroSection />
      <PartnersCarousel />
      <EventsTimeline />
      <Gallery />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}