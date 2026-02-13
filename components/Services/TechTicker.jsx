// components/Services/TechTicker.jsx
import { 
    Code2, Blocks, Wallet, Shield, Zap, Globe, 
    Server, Database, Lock, Key, Coins, 
    CloudLightning, Network, Cpu, Box,
    Link2, Layers, Cloud, HardDrive, FileCode
  } from 'lucide-react';
  
  function TechTicker() {
    const techStack = [
      // Smart Contract & Blockchain
      { name: "Solidity", icon: <Code2 className="w-4 h-4" /> },
      { name: "Hardhat", icon: <Box className="w-4 h-4" /> },
      { name: "Foundry", icon: <Cpu className="w-4 h-4" /> },
      { name: "Truffle", icon: <FileCode className="w-4 h-4" /> },
      { name: "Remix", icon: <Code2 className="w-4 h-4" /> },
      
      // Web3 Libraries
      { name: "Ethers.js", icon: <Blocks className="w-4 h-4" /> },
      { name: "Web3.js", icon: <Globe className="w-4 h-4" /> },
      { name: "Viem", icon: <Zap className="w-4 h-4" /> },
      { name: "Wagmi", icon: <CloudLightning className="w-4 h-4" /> },
      { name: "RainbowKit", icon: <Wallet className="w-4 h-4" /> },
      
      // Wallet Integration
      { name: "WalletConnect", icon: <Link2 className="w-4 h-4" /> },
      { name: "MetaMask", icon: <Wallet className="w-4 h-4" /> },
      { name: "Coinbase Wallet", icon: <Wallet className="w-4 h-4" /> },
      { name: "Phantom", icon: <Wallet className="w-4 h-4" /> },
      { name: "Trust Wallet", icon: <Shield className="w-4 h-4" /> },
      
      // Web3 Platforms & SDKs
      { name: "Thirdweb", icon: <Layers className="w-4 h-4" /> },
      { name: "Moralis", icon: <Server className="w-4 h-4" /> },
      { name: "Alchemy", icon: <CloudLightning className="w-4 h-4" /> },
      { name: "Infura", icon: <Cloud className="w-4 h-4" /> },
      { name: "QuickNode", icon: <Zap className="w-4 h-4" /> },
      
      // Authentication & Identity
      { name: "Reown", icon: <Key className="w-4 h-4" /> },
      { name: "Web3Auth", icon: <Lock className="w-4 h-4" /> },
      { name: "Magic Link", icon: <Key className="w-4 h-4" /> },
      { name: "Privy", icon: <Shield className="w-4 h-4" /> },
      { name: "Dynamic", icon: <Lock className="w-4 h-4" /> },
      
      // Blockchain Networks
      { name: "Ethereum", icon: <Network className="w-4 h-4" /> },
      { name: "Polygon", icon: <Network className="w-4 h-4" /> },
      { name: "Arbitrum", icon: <Network className="w-4 h-4" /> },
      { name: "Optimism", icon: <Network className="w-4 h-4" /> },
      { name: "Base", icon: <Network className="w-4 h-4" /> },
      { name: "Avalanche", icon: <Network className="w-4 h-4" /> },
      { name: "BNB Chain", icon: <Network className="w-4 h-4" /> },
      { name: "Solana", icon: <Zap className="w-4 h-4" /> },
      
      // DeFi Protocols
      { name: "Uniswap", icon: <Coins className="w-4 h-4" /> },
      { name: "Aave", icon: <Coins className="w-4 h-4" /> },
      { name: "Compound", icon: <Coins className="w-4 h-4" /> },
      
      // Storage & Infrastructure
      { name: "IPFS", icon: <HardDrive className="w-4 h-4" /> },
      { name: "Arweave", icon: <Database className="w-4 h-4" /> },
      { name: "The Graph", icon: <Network className="w-4 h-4" /> },
      { name: "Ceramic", icon: <Database className="w-4 h-4" /> },
      
      // Development Tools
      { name: "OpenZeppelin", icon: <Shield className="w-4 h-4" /> },
      { name: "Chainlink", icon: <Link2 className="w-4 h-4" /> },
      
      // Frontend & Framework
      { name: "Next.js", icon: <Code2 className="w-4 h-4" /> },
      { name: "React", icon: <Code2 className="w-4 h-4" /> },
      { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
      { name: "TailwindCSS", icon: <Layers className="w-4 h-4" /> }
    ];
  
    return (
      <section className="relative py-6 overflow-hidden" style={{ backgroundColor: '#4A90E2' }}>
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
        
        {/* Scrolling ticker */}
        <div className="flex animate-scroll whitespace-nowrap relative z-10">
          {[...techStack, ...techStack].map((tech, index) => (
            <span 
              key={index} 
              className="inline-flex items-center gap-2 px-6 text-white font-bold text-lg hover:text-yellow-300 transition-colors duration-300"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
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
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
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
  
  export default TechTicker;