"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Step2() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    venue: "online",
    github: "",
    country: "",
    state: "",
    city: "",
    gender: "",
  });

  const isValid =
    form.fullName.trim() &&
    form.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim() &&
    form.country.trim() &&
    form.state.trim() &&
    form.city.trim() &&
    form.gender;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    router.push("/register/step3");
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");
        body { font-family: "Space Grotesk", sans-serif; }
      `}</style>

      <main className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#020617] text-white flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center md:text-left"
          >
            <p className="text-sm text-gray-400">Personal Information — Step 2 of 3</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1 bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] bg-clip-text text-transparent">
              Tell us about yourself
            </h1>
            <div className="h-1 w-12 bg-[#0058F5] mt-3 rounded-full mx-auto md:mx-0" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-5"
          >
            {/* Full Name */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
            </motion.div>

            {/* Venue */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Select Venue</label>
              <select
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              >
                <option value="online">Online</option>
                <option value="onsite">On-site</option>
              </select>
            </motion.div>

            {/* GitHub */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">GitHub Profile</label>
              <input
                name="github"
                value={form.github}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
            </motion.div>

            {/* Country / State / City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
                />
              </motion.div>
            </div>

            {/* Gender */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-[#0058F5] bg-gray-800 border-gray-600 focus:ring-[#0058F5]"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-[#0058F5] bg-gray-800 border-gray-600 focus:ring-[#0058F5]"
                  />
                  Female
                </label>
              </div>
            </motion.div>
          </motion.div>

          {/* ----  buttons  ---- */}
          <div className="mt-10 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm hover:bg-gray-800 transition"
            >
              Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!isValid}
              className={`rounded-lg px-6 py-3 font-semibold transition ${
                isValid
                  ? "bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] text-black hover:opacity-90"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue →
            </motion.button>
          </div>
        </form>
      </main>
    </>
  );
}