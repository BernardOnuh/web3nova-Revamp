import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, X, Clock, Video, Send } from "lucide-react";
import ContactModal from "./ContactModal";

// const ContactModal = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("book");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     budget: "",
//     timeframe: "",
//     services: [],
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleServiceToggle = (service) => {
//     setFormData((prev) => ({
//       ...prev,
//       services: prev.services.includes(service)
//         ? prev.services.filter((s) => s !== service)
//         : [...prev.services, service],
//     }));
//   };

//   const handleSubmit = () => console.log("Form submitted:", formData);

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0C0C] rounded-2xl shadow-2xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
//         >
//           <X className="w-5 h-5 text-white" />
//         </button>

//         <div className="sticky top-0 z-10 bg-[#0C0C0C] border-b border-white/10 px-6 pt-6">
//           <div className="flex gap-2">
//             <button
//               onClick={() => setActiveTab("book")}
//               className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
//                 activeTab === "book"
//                   ? "bg-white text-[#0C0C0C]"
//                   : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
//               }`}
//               style={{ fontFamily: "'Inter', sans-serif" }}
//             >
//               Book a call
//             </button>
//             <button
//               onClick={() => setActiveTab("contact")}
//               className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
//                 activeTab === "contact"
//                   ? "bg-white text-[#0C0C0C]"
//                   : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
//               }`}
//               style={{ fontFamily: "'Inter', sans-serif" }}
//             >
//               Contact Us
//             </button>
//           </div>
//         </div>

//         <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6 md:p-8">
//           {activeTab === "book" ? (
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="text-center mb-8">
//                 <h3
//                   className="text-sm text-gray-400 mb-2"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   Web3Nova
//                 </h3>
//                 <h2
//                   className="text-3xl md:text-4xl font-bold text-white mb-4"
//                   style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//                 >
//                   Discovery Call with Web3Nova
//                 </h2>
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-5 h-5 text-[#2B6EFF]" />
//                     <span
//                       className="text-sm"
//                       style={{ fontFamily: "'Inter', sans-serif" }}
//                     >
//                       30 min
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Video className="w-5 h-5 text-[#2B6EFF]" />
//                     <span
//                       className="text-sm"
//                       style={{ fontFamily: "'Inter', sans-serif" }}
//                     >
//                       Web conferencing details provided upon confirmation
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl p-8 relative">
//                 <h3
//                   className="text-2xl font-bold text-[#0C0C0C] mb-6 text-center"
//                   style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//                 >
//                   Select a Day
//                 </h3>
//                 <div className="flex items-center justify-between mb-6">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
//                   <span
//                     className="text-lg font-semibold text-[#0C0C0C]"
//                     style={{ fontFamily: "'Space Grotesk', sans-serif" }}
//                   >
//                     October 2025
//                   </span>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-7 gap-2 mb-4">
//                   {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
//                     (day) => (
//                       <div
//                         key={day}
//                         className="text-center text-xs font-semibold text-gray-500 py-2"
//                         style={{ fontFamily: "'Inter', sans-serif" }}
//                       >
//                         {day}
//                       </div>
//                     )
//                   )}
//                   {[...Array(35)].map((_, i) => {
//                     const date = i + 1;
//                     const isAvailable = [
//                       7, 8, 9, 10, 11, 12, 14, 15, 16, 17,
//                     ].includes(date);
//                     return (
//                       <button
//                         key={i}
//                         disabled={!isAvailable}
//                         className={`aspect-square rounded-lg text-sm font-medium transition-all ${
//                           isAvailable
//                             ? "bg-[#2B6EFF]/10 text-[#2B6EFF] hover:bg-[#2B6EFF] hover:text-white"
//                             : "text-gray-300 cursor-not-allowed"
//                         }`}
//                         style={{ fontFamily: "'Inter', sans-serif" }}
//                       >
//                         {date <= 31 ? date : ""}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="text-center">
//                   <p
//                     className="text-sm text-gray-500"
//                     style={{ fontFamily: "'Inter', sans-serif" }}
//                   >
//                     Select a date to view available time slots
//                   </p>
//                 </div>

//                 <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#2B6EFF] to-[#71A6FF] text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
//                   <p
//                     className="text-xs font-bold"
//                     style={{ fontFamily: "'Inter', sans-serif" }}
//                   >
//                     Powered by Calendly
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="space-y-6">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Your name"
//                   className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Email Address"
//                   className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 />

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleInputChange}
//                     placeholder="Your budget"
//                     className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
//                     style={{ fontFamily: "'Inter', sans-serif" }}
//                   />
//                   <input
//                     type="text"
//                     name="timeframe"
//                     value={formData.timeframe}
//                     onChange={handleInputChange}
//                     placeholder="Est. Timeframe"
//                     className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
//                     style={{ fontFamily: "'Inter', sans-serif" }}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="block text-white mb-4 font-medium"
//                     style={{ fontFamily: "'Inter', sans-serif" }}
//                   >
//                     What do you need help with?
//                   </label>
//                   <div className="grid md:grid-cols-3 gap-4">
//                     {["Design", "Animation", "Development"].map((service) => (
//                       <button
//                         key={service}
//                         type="button"
//                         onClick={() => handleServiceToggle(service)}
//                         className={`px-6 py-4 rounded-xl border-2 font-medium transition-all ${
//                           formData.services.includes(service)
//                             ? "border-[#2B6EFF] bg-[#2B6EFF]/10 text-[#2B6EFF]"
//                             : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
//                         }`}
//                         style={{ fontFamily: "'Inter', sans-serif" }}
//                       >
//                         {service}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   placeholder="Tell us a bit about your project"
//                   rows={6}
//                   className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors resize-none"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 />

//                 <motion.button
//                   type="button"
//                   onClick={handleSubmit}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-4 bg-gradient-to-r from-[#2B6EFF] to-[#71A6FF] text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#2B6EFF]/30 hover:shadow-[#2B6EFF]/50 transition-all"
//                   style={{ fontFamily: "'Inter', sans-serif" }}
//                 >
//                   <span>Send Message</span>
//                   <Send className="w-5 h-5" />
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

const CTASection = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      ref={sectionRef}
      id="bookacall"
      className="relative bg-[#0C0C0C] py-12 md:py-16 overflow-hidden"
    >
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(50px, 50px) scale(1.1); } }
        @keyframes float-medium { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-40px, 40px) scale(1.15); } }
        @keyframes float-fast { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.2); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes gradient-shift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(100px, 100px); } }
        @keyframes grid-flow { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 50px); } }
      `}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(74, 144, 226, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 144, 226, 0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              animation: "grid-flow 20s linear infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "-8rem",
            width: "24rem",
            height: "24rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.3,
            background: "radial-gradient(circle, #4A90E2, transparent)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            width: "20rem",
            height: "20rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.25,
            background: "radial-gradient(circle, #FDB913, transparent)",
            animation: "float-medium 15s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "33%",
            width: "18rem",
            height: "18rem",
            borderRadius: "9999px",
            filter: "blur(80px)",
            opacity: 0.2,
            background: "radial-gradient(circle, #4A90E2, transparent)",
            animation: "float-fast 12s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, transparent, rgba(59, 130, 246, 0.2), transparent)",
              animation: "gradient-shift 20s ease-in-out infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#4A90E2",
            animation: "twinkle 3s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "33%",
            right: "33%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#FDB913",
            animation: "twinkle 3s ease-in-out infinite 1s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "33%",
            left: "50%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#88B9E6",
            animation: "twinkle 3s ease-in-out infinite 2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "66%",
            right: "25%",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#4A90E2",
            animation: "twinkle 3s ease-in-out infinite 1.5s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1547] via-[#2B2966] to-[#0a0a1f]">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#2B6EFF]/40 to-[#71A6FF]/20 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#FFC933]/30 to-[#2B6EFF]/20 blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 opacity-10">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
                className="absolute inset-0"
              />
            </div>
          </div>

          <div className="relative z-10 py-12 md:py-16 px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFC933]" />
              <span
                className="text-xs text-white/90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Let's Build Something Amazing
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ready to build that
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                awesome product?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Let's discuss your project and turn your vision into reality. Book
              a free consultation call today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white text-[#0C0C0C] font-bold text-base shadow-2xl hover:shadow-white/30 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>Book a call</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#FFC933]" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#2B6EFF]" />
                <span>No Commitment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#71A6FF]" />
                <span>24hr Response Time</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p
            className="text-xs text-gray-500 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join 500+ satisfied clients and students
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-[#FFC933]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span
              className="ml-2 text-xs text-gray-400"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              4.9/5 from 200+ reviews
            </span>
          </div>
        </motion.div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CTASection;
