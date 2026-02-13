// ===================================================================
// components/Services/HeroSection.jsx
// ===================================================================

function HeroSection({ darkMode }) {
    return (
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div 
          className="inline-block px-6 py-2 rounded-full mb-6 relative overflow-hidden"
          style={{ backgroundColor: '#88B9E6', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <h1 
          className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Services I <span style={{ color: '#4A90E2' }}>Provide</span>
        </h1>
        <p 
          className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Building the decentralized future with cutting-edge blockchain solutions
        </p>
  
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        `}</style>
      </section>
    );
  }
  
  export default HeroSection;
  