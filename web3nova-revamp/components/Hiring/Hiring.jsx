import { motion } from "framer-motion";
import { Users, TrendingUp, Sparkles, ExternalLink, Clock, Zap, Award } from "lucide-react";

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
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}

export default function HiringSection() {
  const roles = [
    {
      id: "social-media",
      title: "Social Media Manager",
      icon: <Users className="w-6 h-6" />,
      color: "#4A90E2",
      description: "Build and manage our brand's online presence across multiple platforms. Create engaging content and grow our community.",
      skills: ["Content Creation", "Community Management", "Analytics", "Brand Strategy"],
      responsibilities: [
        "Develop and execute social media strategies",
        "Create engaging content across platforms",
        "Monitor and respond to community engagement",
      ],
      link : "https://docs.google.com/forms/d/e/1FAIpQLScsgLj37aZO5cHCnRe9ZD8z22wGE1InFrYHzRsDsuyXvT1BaA/viewform",
    },
    {
      id: "growth",
      title: "Growth Manager",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#FDB913",
      description: "Drive user acquisition, retention, and product expansion. Analyze data and implement growth strategies.",
      skills: ["Growth Strategy", "Data Analysis", "User Acquisition", "A/B Testing"],
      responsibilities: [
        "Design and implement growth experiments",
        "Analyze metrics and optimize funnels",
        "Drive user acquisition and retention",
      ],
      link : "https://docs.google.com/forms/d/e/1FAIpQLSefWFGhNYYwfwwRKjxBDo7NyqA3dujB9-cywRdZUKx33BWRvA/viewform",
    },
  ];

  const benefits = [
    { icon: <Award className="w-5 h-5" />, text: "Competitive Compensation" },
    { icon: <Clock className="w-5 h-5" />, text: "Flexible Schedule" },
    { icon: <Zap className="w-5 h-5" />, text: "Real-World Experience" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");
        body { font-family: "Space Grotesk", sans-serif; }
      `}</style>

      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        <BackgroundEffects />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6 py-20">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >

              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent">
                Join Our Team
              </h1>
              
              <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed mb-2">
                Launch your career in tech and Web3 with hands-on experience
              </p>
              
              <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
                Seeking passionate individuals ready to make an impact in digital innovation
              </p>
            </motion.div>

            {/* Benefits Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10"
                >
                  <div className="text-blue-400">{benefit.icon}</div>
                  <span className="text-gray-300 text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Role Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {role.title}
                      </h3>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                        <span className="text-green-400 text-xs font-semibold">PAID INTERNSHIP</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-base leading-relaxed mb-6">
                    {role.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Key Responsibilities</p>
                    <ul className="space-y-2">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {role.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${role.color}20`,
                          color: role.color 
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={role.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-black hover:scale-105 shadow-lg transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(to right, ${role.color}, ${role.color}dd)` 
                      }}
                    >
                      Apply Now
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      
                      <div 
                        className="absolute -inset-0.5 rounded-xl opacity-50 blur-md -z-10 group-hover/btn:opacity-75 transition-opacity duration-300"
                        style={{ 
                          background: `linear-gradient(to right, ${role.color}, ${role.color}dd)` 
                        }}
                      />
                    </a>
                  </div>

                  <div 
                    className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-50 blur-lg -z-10 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle, ${role.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                <span>🌍 Remote-friendly</span>
                <span>•</span>
                <span>📈 Growth opportunities</span>
                <span>•</span>
                <span>🤝 Collaborative culture</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}