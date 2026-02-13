"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Step3() {
  const router = useRouter();

  const [form, setForm] = useState({
    trainingTime: "3 Months",
    inspiration: "",
    wallet: "",
  });

  const isValid =
    form.inspiration.trim().length > 10 &&
    /^0x[a-fA-F0-9]{40}$/.test(form.wallet);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: send to backend / payment gateway
    router.push("/register/success");
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
          {/* ----  header  ---- */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center md:text-left"
          >
            <p className="text-sm text-gray-400">Other Information — Step 3 of 3</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1 bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] bg-clip-text text-transparent">
              Final details
            </h1>
            <div className="h-1 w-12 bg-[#0058F5] mt-3 rounded-full mx-auto md:mx-0" />
          </motion.div>

          {/* ----  fields  ---- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-5"
          >
            {/* Training Time */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Training Time</label>
              <div className="rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white">
                3 Months
              </div>
            </motion.div>

            {/* Inspiration */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">
                What inspired or motivated you to start writing code?
              </label>
              <textarea
                name="inspiration"
                value={form.inspiration}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
              <p className="text-xs text-gray-400 mt-1">Min. 10 characters</p>
            </motion.div>

            {/* Wallet Address */}
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2">Paste Wallet Address</label>
              <input
                name="wallet"
                value={form.wallet}
                onChange={handleChange}
                type="text"
                pattern="^0x[a-fA-F0-9]{40}$"
                required
                className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0058F5]"
              />
              <div className="mt-2 text-xs text-gray-400">
                MetaMask address only. Do <strong>not</strong> close this tab until redirect.
              </div>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-[#0058F5] hover:underline"
              >
                Don’t have a wallet? Create one here →
              </a>
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
              Check Out
            </motion.button>
          </div>
        </form>
      </main>
    </>
  );
}