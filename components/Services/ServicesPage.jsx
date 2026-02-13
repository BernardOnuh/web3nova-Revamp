import React from "react";
import {
  Code2,
  Blocks,
  Wallet,
  Shield,
  Zap,
  Globe,
  Server,
  Database,
  Lock,
  Key,
  Coins,
  CloudLightning,
  Network,
  Cpu,
  Box,
  Link2,
  Layers,
  Cloud,
  HardDrive,
  FileCode,
} from "lucide-react";

// ===================================================================
// BackgroundEffects Component
// ===================================================================
function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 animate-grid-flow"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
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
      <div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-twinkle"
        style={{ backgroundColor: "#4A90E2" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full animate-twinkle delay-1000"
        style={{ backgroundColor: "#FDB913" }}
      />
      <div
        className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full animate-twinkle delay-2000"
        style={{ backgroundColor: "#88B9E6" }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full animate-twinkle delay-1500"
        style={{ backgroundColor: "#4A90E2" }}
      />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 50px) scale(1.1);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 40px) scale(1.15);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.2);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        @keyframes gradient-shift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100px, 100px);
          }
        }
        @keyframes grid-flow {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 12s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

// ===================================================================
// TechTicker Component
// ===================================================================
function TechTicker() {
  const techStack = [
    { name: "Solidity", icon: <Code2 className="w-4 h-4" /> },
    { name: "Hardhat", icon: <Box className="w-4 h-4" /> },
    { name: "Foundry", icon: <Cpu className="w-4 h-4" /> },
    { name: "Truffle", icon: <FileCode className="w-4 h-4" /> },
    { name: "Remix", icon: <Code2 className="w-4 h-4" /> },
    { name: "Ethers.js", icon: <Blocks className="w-4 h-4" /> },
    { name: "Web3.js", icon: <Globe className="w-4 h-4" /> },
    { name: "Viem", icon: <Zap className="w-4 h-4" /> },
    { name: "Wagmi", icon: <CloudLightning className="w-4 h-4" /> },
    { name: "RainbowKit", icon: <Wallet className="w-4 h-4" /> },
    { name: "WalletConnect", icon: <Link2 className="w-4 h-4" /> },
    { name: "MetaMask", icon: <Wallet className="w-4 h-4" /> },
    { name: "Coinbase Wallet", icon: <Wallet className="w-4 h-4" /> },
    { name: "Phantom", icon: <Wallet className="w-4 h-4" /> },
    { name: "Trust Wallet", icon: <Shield className="w-4 h-4" /> },
    { name: "Thirdweb", icon: <Layers className="w-4 h-4" /> },
    { name: "Moralis", icon: <Server className="w-4 h-4" /> },
    { name: "Alchemy", icon: <CloudLightning className="w-4 h-4" /> },
    { name: "Infura", icon: <Cloud className="w-4 h-4" /> },
    { name: "QuickNode", icon: <Zap className="w-4 h-4" /> },
    { name: "Reown", icon: <Key className="w-4 h-4" /> },
    { name: "Web3Auth", icon: <Lock className="w-4 h-4" /> },
    { name: "Magic Link", icon: <Key className="w-4 h-4" /> },
    { name: "Privy", icon: <Shield className="w-4 h-4" /> },
    { name: "Dynamic", icon: <Lock className="w-4 h-4" /> },
    { name: "Ethereum", icon: <Network className="w-4 h-4" /> },
    { name: "Polygon", icon: <Network className="w-4 h-4" /> },
    { name: "Arbitrum", icon: <Network className="w-4 h-4" /> },
    { name: "Optimism", icon: <Network className="w-4 h-4" /> },
    { name: "Base", icon: <Network className="w-4 h-4" /> },
    { name: "Avalanche", icon: <Network className="w-4 h-4" /> },
    { name: "BNB Chain", icon: <Network className="w-4 h-4" /> },
    { name: "Solana", icon: <Zap className="w-4 h-4" /> },
    { name: "Uniswap", icon: <Coins className="w-4 h-4" /> },
    { name: "Aave", icon: <Coins className="w-4 h-4" /> },
    { name: "Compound", icon: <Coins className="w-4 h-4" /> },
    { name: "IPFS", icon: <HardDrive className="w-4 h-4" /> },
    { name: "Arweave", icon: <Database className="w-4 h-4" /> },
    { name: "The Graph", icon: <Network className="w-4 h-4" /> },
    { name: "Ceramic", icon: <Database className="w-4 h-4" /> },
    { name: "OpenZeppelin", icon: <Shield className="w-4 h-4" /> },
    { name: "Chainlink", icon: <Link2 className="w-4 h-4" /> },
    { name: "Next.js", icon: <Code2 className="w-4 h-4" /> },
    { name: "React", icon: <Code2 className="w-4 h-4" /> },
    { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
    { name: "TailwindCSS", icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <section
      className="sticky top-16 md:top-20 z-40 py-6 overflow-hidden"
      style={{ backgroundColor: "#4A90E2" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />

      <div className="flex animate-scroll whitespace-nowrap relative z-10">
        {[...techStack, ...techStack].map((tech, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-6 text-white font-bold text-lg hover:text-yellow-300 transition-colors duration-300"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="inline-flex items-center justify-center w-6 h-6 bg-white/10 rounded-full backdrop-blur-sm">
              {tech.icon}
            </span>
            {tech.name}
            <span className="mx-2 text-white/50">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// TestimonialsSection Component
// ===================================================================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "WriterLDN",
      role: "CEO, Copy Writer",
      image: "WL",
      content:
        "Web3Nova help Revamped our website and optimized our SEO, helping us in reaching a broader audience.",
      project: "Website Revamp",
      color: "#4A90E2",
    },
    {
      name: "Future Edge Technologies",
      role: "CEO, Crypto Trading",
      image: "FE",
      content:
        "web3Nova developed an efficient cross-chain swap and trading bot.",
      project: "Trading Platform and Bot",
      color: "#FDB913",
    },
    {
      name: "Aboki",
      role: "Founder",
      image: "A",
      content:
        "Web3Nova built our entire platform and system from scratch to a fully functional product.",
      project: "Crypto Trading Platform",
      color: "#88B9E6",
    },
  ];

  return (
    <section className="relative z-10 py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full mb-4 bg-yellow-500/10 border border-yellow-500/20">
            <span
              className="text-yellow-400 font-semibold text-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              💬 Client Success Stories
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Trusted by forward-thinking companies worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "both",
              }}
            >
              <div className="relative h-full rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 0 40px ${testimonial.color}40` }}
                />

                {/* Quote Icon */}
                <div
                  className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-20"
                  style={{ backgroundColor: testimonial.color }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: testimonial.color,
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {testimonial.image}
                </div>

                {/* Content */}
                <p
                  className="text-gray-300 leading-relaxed mb-6 italic"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <h4
                    className="text-white font-bold mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className="text-gray-400 text-sm mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {testimonial.role}
                  </p>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${testimonial.color}20`,
                      color: testimonial.color,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {testimonial.project}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" },
            { value: "$2M+", label: "Value Secured" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-gray-400 text-sm"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// ServicesGrid Component - Enhanced
// ===================================================================
function ServicesGrid() {
  const services = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: "Smart Contract Development",
      description:
        "Build secure and efficient smart contracts on Ethereum, Polygon, and other EVM chains.",
      color: "#4A90E2",
      number: "01",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "DApp Development",
      description:
        "Create decentralized applications with seamless Web3 integration and user experience.",
      color: "#FDB913",
      number: "02",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "Wallet Integration",
      description:
        "Connect your app with MetaMask, WalletConnect, and other popular Web3 wallets.",
      color: "#88B9E6",
      number: "03",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Security Audits",
      description:
        "Comprehensive smart contract audits to ensure your protocol is secure and battle-tested.",
      color: "#4A90E2",
      number: "04",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "DeFi Solutions",
      description:
        "Build decentralized finance protocols including DEXs, lending platforms, and yield farms.",
      color: "#FDB913",
      number: "05",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "NFT Marketplaces",
      description:
        "Create custom NFT platforms with minting, trading, and royalty management features.",
      color: "#88B9E6",
      number: "06",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      title: "Web3 Backend",
      description:
        "Build robust backend infrastructure with IPFS, The Graph, and decentralized storage.",
      color: "#4A90E2",
      number: "07",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      title: "Blockchain Integration",
      description:
        "Integrate blockchain technology into existing applications and business processes.",
      color: "#FDB913",
      number: "08",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Token Economics",
      description:
        "Design sustainable tokenomics models for your Web3 project and community.",
      color: "#88B9E6",
      number: "09",
    },
  ];

  return (
    <section className="relative z-10 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full mb-4 bg-blue-500/10 border border-blue-500/20">
            <span
              className="text-blue-400 font-semibold text-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              ⚡ What We Offer
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Comprehensive Web3 solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {/* Card */}
              <div className="relative h-full rounded-3xl p-8 transition-all duration-500 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 backdrop-blur-sm overflow-hidden group-hover:scale-105 group-hover:shadow-2xl">
                {/* Animated Background Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.color}15, transparent 70%)`,
                  }}
                />

                {/* Glowing Border Effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 40px ${service.color}40`,
                  }}
                />

                {/* Number Badge */}
                <div
                  className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.color}20`,
                    color: service.color,
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {service.number}
                </div>

                {/* Accent Line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 group-hover:w-2"
                  style={{
                    backgroundColor: service.color,
                    boxShadow: `0 0 20px ${service.color}`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 overflow-hidden group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: service.color }}
                  >
                    {/* Glossy Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent" />

                    {/* Icon */}
                    <div className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Animated Ring */}
                    <div
                      className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      style={{ borderColor: service.color }}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold mb-3 text-white transition-colors duration-300"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-gray-400 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-300"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="relative inline-flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3 overflow-hidden"
                    style={{
                      color: service.color,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    <span className="relative z-10">Explore Service</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>

                    {/* Underline Effect */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: service.color }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p
            className="text-gray-400 mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Can't find what you're looking for?
          </p>
          <button
            className="relative px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 overflow-hidden group/cta"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              boxShadow: "0 8px 32px rgba(74, 144, 226, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000" />
            <span className="relative">Request Custom Solution</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// TechStack Component - Slanted Carousel
// ===================================================================
function TechStack() {
  const techStack = [
    { name: "Solidity", color: "#88B9E6" },
    { name: "Hardhat", color: "#FDB913" },
    { name: "Ethers.js", color: "#4A90E2" },
    { name: "Web3.js", color: "#88B9E6" },
    { name: "Next.js", color: "#FDB913" },
    { name: "React", color: "#4A90E2" },
    { name: "TypeScript", color: "#88B9E6" },
    { name: "IPFS", color: "#FDB913" },
    { name: "The Graph", color: "#4A90E2" },
    { name: "Wagmi", color: "#88B9E6" },
    { name: "RainbowKit", color: "#FDB913" },
    { name: "OpenZeppelin", color: "#4A90E2" },
    { name: "Chainlink", color: "#88B9E6" },
    { name: "Polygon", color: "#FDB913" },
    { name: "Ethereum", color: "#4A90E2" },
  ];

  return (
    <section className="relative z-10 py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Tech Stack <span style={{ color: "#4A90E2" }}>&</span> Tools
          </h2>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Powered by cutting-edge technology
          </p>
        </div>

        {/* Slanted 3D Carousel Container */}
        <div className="relative" style={{ perspective: "1500px" }}>
          {/* Row 1 - Moving Right */}
          <div
            className="mb-8 overflow-hidden"
            style={{
              transform: "rotateX(15deg) rotateY(-5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex animate-slide-right gap-6 py-4">
              {[...techStack.slice(0, 5), ...techStack.slice(0, 5)].map(
                (tech, index) => (
                  <div
                    key={`row1-${index}`}
                    className="relative flex-shrink-0 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden group"
                    style={{
                      backgroundColor: tech.color,
                      color: tech.color === "#FDB913" ? "#000" : "#fff",
                      fontFamily: "Space Grotesk, sans-serif",
                      boxShadow: `0 8px 32px ${tech.color}60`,
                      minWidth: "200px",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">{tech.name}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Row 2 - Moving Left */}
          <div
            className="mb-8 overflow-hidden"
            style={{
              transform: "rotateX(15deg) rotateY(5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex animate-slide-left gap-6 py-4">
              {[...techStack.slice(5, 10), ...techStack.slice(5, 10)].map(
                (tech, index) => (
                  <div
                    key={`row2-${index}`}
                    className="relative flex-shrink-0 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden group"
                    style={{
                      backgroundColor: tech.color,
                      color: tech.color === "#FDB913" ? "#000" : "#fff",
                      fontFamily: "Space Grotesk, sans-serif",
                      boxShadow: `0 8px 32px ${tech.color}60`,
                      minWidth: "200px",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">{tech.name}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Row 3 - Moving Right */}
          <div
            className="overflow-hidden"
            style={{
              transform: "rotateX(15deg) rotateY(-5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex animate-slide-right-slow gap-6 py-4">
              {[...techStack.slice(10, 15), ...techStack.slice(10, 15)].map(
                (tech, index) => (
                  <div
                    key={`row3-${index}`}
                    className="relative flex-shrink-0 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden group"
                    style={{
                      backgroundColor: tech.color,
                      color: tech.color === "#FDB913" ? "#000" : "#fff",
                      fontFamily: "Space Grotesk, sans-serif",
                      boxShadow: `0 8px 32px ${tech.color}60`,
                      minWidth: "200px",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">{tech.name}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes slide-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes slide-right-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide-right {
          animation: slide-right 25s linear infinite;
        }
        .animate-slide-left {
          animation: slide-left 25s linear infinite;
        }
        .animate-slide-right-slow {
          animation: slide-right-slow 30s linear infinite;
        }

        .animate-slide-right:hover,
        .animate-slide-left:hover,
        .animate-slide-right-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// CTASection Component - Enhanced
// ===================================================================
function CTASection() {
  return (
    <section className="relative z-10 py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Card */}
        <div
          className="relative rounded-[3rem] p-12 md:p-16 overflow-hidden max-w-5xl mx-auto"
          style={{
            background: "linear-gradient(135deg, #4A90E2 0%, #88B9E6 100%)",
            boxShadow: "0 20px 60px rgba(74, 144, 226, 0.4)",
          }}
        >
          {/* Glossy Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent" />

          {/* Floating Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            {/* Badge */}
            <div
              className="inline-block px-6 py-2 rounded-full mb-6 bg-white/20 backdrop-blur-sm border border-white/30"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-white font-semibold flex items-center gap-2">
                <span>🚀</span>
                Ready to Build?
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Let's Create an <span className="text-yellow-400">Amazing</span>
              <br />
              Web3 Project Together!
            </h2>

            {/* Description */}
            <p
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Transform your vision into reality with cutting-edge blockchain
              technology
            </p>

            {/* CTA Button */}
            <button
              className="group relative px-12 py-5 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "#FDB913",
                color: "#000",
                fontFamily: "Space Grotesk, sans-serif",
                boxShadow: "0 8px 30px rgba(253, 185, 19, 0.5)",
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="relative flex items-center gap-3">
                Contact Me
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

// ===================================================================
// Main ServicesPage Component
// ===================================================================
export default function ServicesPage() {
  return (
    <div className="min-h-screen relative transition-colors duration-500 bg-black">
      <BackgroundEffects />

      {/* Add spacing for fixed navbar */}
      <div className="h-20 md:h-24"></div>

      <TechTicker />
      <TestimonialsSection />
      <ServicesGrid />
      <TechStack />
      <CTASection />

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");
      `}</style>
    </div>
  );
}
