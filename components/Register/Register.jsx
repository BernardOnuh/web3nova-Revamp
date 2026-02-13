"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Server, Palette, Rocket, Sparkles, ChevronDown, ChevronUp, 
  Check, ArrowRight, ArrowLeft, User, Mail, Phone, MapPin, Github, Wallet 
} from "lucide-react";

// ✅ Base URL of your Render API
const API_BASE = process.env.NEXT_PUBLIC_API_URL; // 

// ===================================================================
// BackgroundEffects Component
// ===================================================================
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
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
      `}</style>
    </>
  );
}

// ===================================================================
// Step 1: Course Selection
// ===================================================================
function Step1({ onNext, formData, setFormData }) {
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(false);

   const courses = [
    {
      id: "rust",
      title: "Rust Blockchain Protocol Development",
      icon: <Code className="w-6 h-6" />,
      color: "#4A90E2",
      short: "Master-class for blockchain protocol engineering with Rust.",
      long: "Dive deep into memory-safe systems programming while building high-performance blockchain nodes, P2P layers, and consensus engines. You will architect real protocols used in production networks.",
      level: "Advanced",
    },
    {
      id: "backend",
      title: "Backend Development (Web2 Advanced)",
      icon: <Server className="w-6 h-6" />,
      color: "#FDB913",
      short: "Build powerful server-side apps with Python, Django & more.",
      long: "Learn to design scalable REST & GraphQL APIs, handle authentication, optimise databases, deploy with Docker/K8s, and integrate Web3 tooling where needed.",
      level: "Advanced",
    },
    {
      id: "frontend",
      title: "Frontend Development (Web2 Advanced)",
      icon: <Palette className="w-6 h-6" />,
      color: "#88B9E6",
      short: "Modern React, advanced JavaScript (ES6), CSS & tooling.",
      long: "Master component architecture, state management, TypeScript, unit/e2e testing, CI/CD, performance tuning, and connecting to smart-contract backends.",
      level: "Advanced",
    },
    {
      id: "launchpad",
      title: "Web2 Launchpad",
      icon: <Rocket className="w-6 h-6" />,
      color: "#FDB913",
      short: "Fundamentals of web dev with HTML5, CSS & modern frameworks.",
      long: "Perfect starter track: semantic HTML, responsive CSS, JavaScript essentials, Git/GitHub, and your first hosted projects. Graduate ready for advanced stacks.",
      level: "Beginner",
    },
    {
      id: "solidity",
      title: "Solidity (Web3 Development)",
      icon: <Sparkles className="w-6 h-6" />,
      color: "#4A90E2",
      short: "Smart-contracts & dApp development with Solidity.",
      long: "Write, test, and deploy secure contracts; integrate front-ends via Ethers.js; learn upgradable patterns, gas optimisation, and audited best practices.",
      level: "Intermediate",
    },
  ];


  const toggleExpand = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  // ✅ New: Create draft application
  const handleNext = async () => {
    if (!formData.course) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: formData.course }),
      });

      if (!res.ok) throw new Error("Failed to create application");
      const data = await res.json();

      // Save returned ID and token
      setFormData({
        ...formData,
        appId: data.id,
        appToken: data["x-app-token"],
      });

      onNext();
    } catch (err) {
      alert("Error creating application: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
       <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-block px-6 py-2 rounded-full mb-4 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 border border-yellow-400/20">
          <span className="font-semibold text-sm bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
            Course Selection
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent">
          Choose Your Track
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select the program that matches your goals and experience level
        </p>
      </motion.div>

      <div className="grid gap-4 mb-12">
        {courses.map((c, index) => {
          const isOpen = !!expanded[c.id];
          const isSelected = formData.course === c.id;
          
          return (
            <motion.label
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex cursor-pointer flex-col rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 ${
                isSelected
                  ? "border-blue-400 bg-blue-400/10 scale-[1.02]"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <input
                type="radio"
                name="course"
                value={c.id}
                checked={isSelected}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="sr-only"
              />

              <div className="flex items-start gap-4">
                <div 
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-black transition-all duration-300 ${
                    isSelected ? 'scale-110' : ''
                  }`}
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {c.title}
                      </h3>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ 
                        backgroundColor: `${c.color}20`,
                        color: c.color 
                      }}>
                        {c.level}
                      </div>
                    </div>
                    
                    <div
                      className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "border-blue-400 bg-blue-400"
                          : "border-gray-600 group-hover:border-gray-500"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-black" />}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {c.short}
                  </p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-white/10 mt-3">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {c.long}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(c.id);
                    }}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-300 hover:text-white focus:outline-none"
                    style={{ color: c.color }}
                  >
                    {isOpen ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>

              {isSelected && (
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-50 blur-lg -z-10"
                  style={{ background: `radial-gradient(circle, ${c.color}, transparent)` }}
                />
              )}
            </motion.label>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={!formData.course || loading}
          className={`relative group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            formData.course && !loading
              ? "bg-gradient-to-r from-blue-400 to-yellow-400 text-black hover:scale-105 shadow-2xl cursor-pointer"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Connecting..." : "Continue to Next Step"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// Step 2: Personal Information
// ===================================================================
function Step2({ onNext, onBack, formData, setFormData }) {
  const [loading, setLoading] = useState(false);

   const isValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.trim() &&
    formData.country.trim() &&
    formData.state.trim() &&
    formData.city.trim() &&
    formData.gender;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ New: Save personal info to API
  const handleNext = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/applications/${formData.appId}/personal`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-app-token": formData.appToken,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            venue: formData.venue,
            github: formData.github,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            gender: formData.gender,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save personal info");
      onNext();
    } catch (err) {
      alert("Error saving personal info: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-block px-6 py-2 rounded-full mb-4 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 border border-yellow-400/20">
          <span className="font-semibold text-sm bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
            Personal Information
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent">
          Tell Us About Yourself
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We need some basic information to process your application
        </p>
      </motion.div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+234 xxx xxx xxxx"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Select Venue
            </label>
            <select
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="online">Online</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub Profile (Optional)
            </label>
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Country, State, City */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Nigeria"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Lagos"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Ikeja"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Gender</label>
            <div className="flex gap-6">
              {['male', 'female'].map((g) => (
                <label key={g} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.gender === g ? 'border-blue-400 bg-blue-400' : 'border-gray-600 group-hover:border-gray-500'
                  }`}>
                    {formData.gender === g && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="capitalize">{g}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-all duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isValid || loading}
          className={`relative group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            isValid && !loading
              ? "bg-gradient-to-r from-blue-400 to-yellow-400 text-black hover:scale-105 shadow-2xl cursor-pointer"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Saving..." : "Continue"}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// Step 3: Final Details
// ===================================================================
function Step3({ onBack, formData, setFormData }) {
  const [loading, setLoading] = useState(false);

  const isValid = formData.inspiration.trim().length > 10 && /^0x[a-fA-F0-9]{40}$/.test(formData.wallet);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ New: Finalize application
  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/applications/${formData.appId}/final`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-app-token": formData.appToken,
          },
          body: JSON.stringify({
            duration: "3 months",
            motivation: formData.inspiration,
            walletAddress: formData.wallet,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to finalize registration");
      alert("✅ Registration complete!");
    } catch (err) {
      alert("Error completing registration: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
     <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-block px-6 py-2 rounded-full mb-4 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 border border-yellow-400/20">
          <span className="font-semibold text-sm bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider">
            Final Details
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent">
          Almost There!
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Just a few more details and you're all set
        </p>
      </motion.div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
        <div className="space-y-6">
          {/* Training Time */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Training Duration</label>
            <div className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white">
              3 Months
            </div>
          </div>

          {/* Inspiration */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              What inspired or motivated you to start writing code?
            </label>
            <textarea
              name="inspiration"
              value={formData.inspiration}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Share your story... (minimum 10 characters)"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-2">
              {formData.inspiration.length}/10 characters minimum
            </p>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Wallet Address
            </label>
            <input
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              type="text"
              pattern="^0x[a-fA-F0-9]{40}$"
              required
              placeholder="0x..."
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-mono text-sm"
            />
            <div className="mt-3 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
              <p className="text-sm text-gray-300 mb-2">
                <strong>Important:</strong> MetaMask address only. Do not close this tab until redirected.
              </p>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Don't have a wallet? Create one here →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-all duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`relative group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            isValid && !loading
              ? "bg-gradient-to-r from-blue-400 to-yellow-400 text-black hover:scale-105 shadow-2xl cursor-pointer"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting..." : (
            <>
              <Sparkles className="w-5 h-5" />
              Complete Registration
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ===================================================================
// Main Registration Component (unchanged visuals)
// ===================================================================
export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    course: "",
    fullName: "",
    email: "",
    phone: "",
    venue: "online",
    github: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    inspiration: "",
    wallet: "",
    appId: "",
    appToken: "",
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

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
            {/* Progress Bar (unchanged) */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-400">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex justify-center">
                  <Step1 onNext={() => setCurrentStep(2)} formData={formData} setFormData={setFormData} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex justify-center">
                  <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} formData={formData} setFormData={setFormData} />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="flex justify-center">
                  <Step3 onBack={() => setCurrentStep(2)} formData={formData} setFormData={setFormData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}
