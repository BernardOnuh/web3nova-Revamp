import React from 'react';
import { 
  Code2, Blocks, Wallet, Shield, Zap, Globe, 
  Server, Database, Lock, Key, Coins, 
  CloudLightning, Network, Cpu, Box,
  Link2, Layers, Cloud, HardDrive, FileCode
} from 'lucide-react';

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
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
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
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-twinkle" style={{ backgroundColor: "#4A90E2" }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full animate-twinkle delay-1000" style={{ backgroundColor: "#FDB913" }} />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full animate-twinkle delay-2000" style={{ backgroundColor: "#88B9E6" }} />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full animate-twinkle delay-1500" style={{ backgroundColor: "#4A90E2" }} />

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
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, 100px); }
        }
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 20s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

export default BackgroundEffects;  // ← ADD THIS LINE