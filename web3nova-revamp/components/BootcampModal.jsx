import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, ArrowRight, CalendarDays, Zap, Clock } from "lucide-react";

const BOOTCAMP_FORM_URL = "https://forms.gle/6mWtDBAPgfFs7iyD8";
const DISMISS_KEY = "w3n_bootcamp_modal_dismissed";

const SKIP_PATHS = ["/desk", "/register"];

const BootcampModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;
    if (SKIP_PATHS.some((p) => path.startsWith(p))) return;

    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;

    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [router.pathname]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#0C0C0C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent glow */}
            <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative p-7 sm:p-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400/15 to-blue-400/15 border border-yellow-400/25 mb-5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  Limited · 7-Day Bootcamp
                </span>
              </div>

              <h2
                className="text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Special Bootcamp
              </h2>
              <p
                className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Breaking into Tech
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A fast, hands-on 7-day program to help you break into tech.
                Whether you&apos;re just starting or switching careers, this
                is your on-ramp — spots are limited.
              </p>

              <div className="space-y-3 mb-7">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">Intensive hands-on sessions</p>
                    <p className="text-xs text-gray-500">Build real skills fast with guided projects.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <CalendarDays className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">7 days, structured path</p>
                    <p className="text-xs text-gray-500">A clear roadmap from beginner to breaking in.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">Just a few minutes to join</p>
                    <p className="text-xs text-gray-500">Fill the short form to reserve your spot.</p>
                  </div>
                </div>
              </div>

              <a
                href={BOOTCAMP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-400 via-blue-400 to-blue-500 hover:shadow-[0_0_30px_rgba(43,110,255,0.45)] transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Join Now — Free Entry
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={dismiss}
                className="w-full mt-3 text-center text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootcampModal;