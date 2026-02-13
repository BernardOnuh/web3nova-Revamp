"use client";

import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

export default function Success() {
  const router = useRouter();

  /* ----  confetti dots  ---- */
  const confetti = [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 6 + 4,
    d: Math.random() * 2 + 0.5,
  }));

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");
        body { font-family: "Space Grotesk", sans-serif; }
      `}</style>

      <main className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* ----  confetti  ---- */}
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              className="absolute rounded-full bg-gradient-to-br from-[#0058F0] to-[#FFD52D]"
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.s, height: c.s }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -200 }}
              transition={{ duration: c.d + 1, ease: "easeOut", delay: c.d * 0.2 }}
            />
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-xl bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center shadow-[0_0_40px_#0058F0]/20"
        >
          {/* ----  check mark  ---- */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#0058F0] to-[#FFD52D] flex items-center justify-center">
            <motion.svg
              className="w-10 h-10 text-black"
              viewBox="0 0 24 24"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                variants={draw}
              />
            </motion.svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0058F0] via-[#227AFF] to-[#FFD52D] bg-clip-text text-transparent">
            Registration Successful!
          </h1>
          <p className="text-gray-300 mt-3">
            You’re now enrolled. Welcome to the cohort!
          </p>

          {/* ----  single CTA  ---- */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="rounded-lg border border-gray-700 px-6 py-3 text-sm hover:bg-gray-800 transition"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </main>
    </>
  );
}