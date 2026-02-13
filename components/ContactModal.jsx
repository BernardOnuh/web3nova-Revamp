import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, X, Clock, Video, Send } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("book");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    timeframe: "",
    services: [],
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = () => console.log("Form submitted:", formData);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0C0C] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="sticky top-0 z-10 bg-[#0C0C0C] border-b border-white/10 px-6 pt-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("book")}
              className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                activeTab === "book"
                  ? "bg-white text-[#0C0C0C]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Book a call
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                activeTab === "contact"
                  ? "bg-white text-[#0C0C0C]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6 md:p-8">
          {activeTab === "book" ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3
                  className="text-sm text-gray-400 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Web3Nova
                </h3>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Discovery Call with Web3Nova
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#2B6EFF]" />
                    <span
                      className="text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      30 min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-[#2B6EFF]" />
                    <span
                      className="text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Web conferencing details provided upon confirmation
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 relative">
                <h3
                  className="text-2xl font-bold text-[#0C0C0C] mb-6 text-center"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Select a Day
                </h3>
                <div className="flex items-center justify-between mb-6">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span
                    className="text-lg font-semibold text-[#0C0C0C]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    October 2025
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-semibold text-gray-500 py-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {day}
                      </div>
                    )
                  )}
                  {[...Array(35)].map((_, i) => {
                    const date = i + 1;
                    const isAvailable = [
                      7, 8, 9, 10, 11, 12, 14, 15, 16, 17,
                    ].includes(date);
                    return (
                      <button
                        key={i}
                        disabled={!isAvailable}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                          isAvailable
                            ? "bg-[#2B6EFF]/10 text-[#2B6EFF] hover:bg-[#2B6EFF] hover:text-white"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {date <= 31 ? date : ""}
                      </button>
                    );
                  })}
                </div>

                <div className="text-center">
                  <p
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Select a date to view available time slots
                  </p>
                </div>

                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-[#2B6EFF] to-[#71A6FF] text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
                  <p
                    className="text-xs font-bold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Powered by Calendly
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Your budget"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  <input
                    type="text"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    placeholder="Est. Timeframe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-white mb-4 font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    What do you need help with?
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {["Design", "Animation", "Development"].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-6 py-4 rounded-xl border-2 font-medium transition-all ${
                          formData.services.includes(service)
                            ? "border-[#2B6EFF] bg-[#2B6EFF]/10 text-[#2B6EFF]"
                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about your project"
                  rows={6}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2B6EFF] transition-colors resize-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#2B6EFF] to-[#71A6FF] text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#2B6EFF]/30 hover:shadow-[#2B6EFF]/50 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
