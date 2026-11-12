import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/I5eIfcg1nBmEoaQ58bKm4W?s=cl&p=i&iam=2";
const STORAGE_KEY = "buildStationPopupDismissed";

const BuildStationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Build Station: join the WhatsApp group"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md max-h-[92vh] flex flex-col bg-[#0C0C0C] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative w-full min-h-0 flex-1 overflow-y-auto">
              <Image
                src="/build-station.png"
                alt="Web3Nova x Stellar Build Station — 2-day build station for all builders and enthusiasts, Nov 27th–28th, 9AM at Web3Nova Hub. Tracks: Web Development, Blockchain Development, AI Automation, AI Prompting, UI/UX Design."
                width={1080}
                height={1350}
                sizes="(max-width: 448px) 100vw, 448px"
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="p-4 border-t border-white/10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-black font-semibold transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <MessageCircle className="w-5 h-5" />
                Join the WhatsApp group
              </a>
              <p className="mt-2 text-center text-xs text-gray-400">
                Build Station · Nov 27th–28th · 9AM · Web3Nova Hub
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BuildStationPopup;
