// ===================================================================
// components/Services/ServicesGrid.jsx
// ===================================================================

function ServicesGrid({ darkMode }) {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Smart Contract Development",
      description: "Build secure and efficient smart contracts on Ethereum, Polygon, and other EVM chains."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "DApp Development",
      description: "Create decentralized applications with seamless Web3 integration and user experience."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Wallet Integration",
      description: "Connect your app with MetaMask, WalletConnect, and other popular Web3 wallets."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Security Audits",
      description: "Comprehensive smart contract audits to ensure your protocol is secure and battle-tested."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "DeFi Solutions",
      description: "Build decentralized finance protocols including DEXs, lending platforms, and yield farms."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "NFT Marketplaces",
      description: "Create custom NFT platforms with minting, trading, and royalty management features."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: "Web3 Backend",
      description: "Build robust backend infrastructure with IPFS, The Graph, and decentralized storage."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: "Blockchain Integration",
      description: "Integrate blockchain technology into existing applications and business processes."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Token Economics",
      description: "Design sustainable tokenomics models for your Web3 project and community."
    }
  ];

  return (
    <section className={`relative z-10 container mx-auto px-6 py-20 ${darkMode ? 'bg-transparent' : 'bg-gray-50'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl p-8 transition-all duration-300 border ${
              darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white border-gray-100 hover:shadow-xl'
            }`}
          >
            {/* Glossy overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Left accent line with glow */}
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full shadow-lg" style={{ backgroundColor: '#4A90E2', boxShadow: '0 0 20px #4A90E2' }} />
            
            {/* Icon with glossy effect */}
            <div 
              className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 overflow-hidden group-hover:scale-110"
              style={{ backgroundColor: '#4A90E2' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent" />
              <div className="text-white relative z-10">
                {service.icon}
              </div>
            </div>
            
            <h3 
              className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {service.title}
            </h3>
            <p 
              className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {service.description}
            </p>
            <button 
              className="flex items-center font-semibold group-hover:gap-2 transition-all duration-300"
              style={{ color: '#4A90E2', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Learn more
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesGrid;

