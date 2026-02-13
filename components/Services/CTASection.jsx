
// ===================================================================
// components/Services/CTASection.jsx
// ===================================================================

function CTASection() {
    return (
      <section className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div 
          className="relative rounded-3xl p-16 overflow-hidden"
          style={{ backgroundColor: '#4A90E2' }}
        >
          {/* Glossy gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div 
              className="inline-block px-6 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-sm"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-white font-semibold">🚀 Ready to Build?</span>
            </div>
            <h2 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Let's Create an <span style={{ color: '#FDB913' }}>Amazing</span>
              <br />
              Web3 Project Together!
            </h2>
            <p 
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Transform your vision into reality with cutting-edge blockchain technology
            </p>
            <button 
              className="relative px-12 py-4 text-lg font-bold rounded-lg transition-all duration-300 hover:scale-105 overflow-hidden group"
              style={{ backgroundColor: '#FDB913', color: '#000', fontFamily: 'Space Grotesk, sans-serif', boxShadow: '0 8px 30px rgba(253, 185, 19, 0.4)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Contact Me</span>
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  export default CTASection;