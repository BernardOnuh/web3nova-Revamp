// ===================================================================
// components/Services/TechStack.jsx
// ===================================================================

function TechStack({ darkMode }) {
    const techStack = [
      "Solidity", "Hardhat", "Ethers.js", "Web3.js", "Next.js", 
      "React", "TypeScript", "IPFS", "The Graph", "Wagmi", 
      "RainbowKit", "OpenZeppelin", "Chainlink", "Polygon", "Ethereum"
    ];
  
    return (
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 
            className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Tech Stack <span style={{ color: '#4A90E2' }}>&</span> Tools
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="relative px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer hover:scale-110 overflow-hidden group"
              style={{ 
                backgroundColor: index % 3 === 0 ? '#88B9E6' : index % 3 === 1 ? '#FDB913' : '#4A90E2',
                color: index % 3 === 1 ? '#000' : '#fff',
                fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: `0 4px 15px ${index % 3 === 0 ? '#88B9E6' : index % 3 === 1 ? '#FDB913' : '#4A90E2'}40`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{tech}</span>
            </span>
          ))}
        </div>
      </section>
    );
  }
  
  export default TechStack;
  