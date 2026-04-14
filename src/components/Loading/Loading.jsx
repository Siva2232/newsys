import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo11 from "../assets/Logo11.png";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 15) + 1, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "circIn" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000212] overflow-hidden"
        >
          {/* 1. NEURAL GRID BACKGROUND */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#391561_0%,transparent_50%)]"
            />
          </div>

          <div className="relative z-10 w-full max-w-md px-10">
            {/* 2. SAME LOGO UI */}
            <div className="flex justify-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={Logo11}
                    alt="Perfect Digital Logo"
                    className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(57,21,97,0.45)]"
                  />
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Perfect<span className="text-[#391561]">Digital</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-white/50 tracking-[0.28em] uppercase">
                    System Active
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 3. STATUS LOGS */}
            <div className="mb-4 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-[#391561] uppercase tracking-[0.2em]">
                  System.initialize()
                </p>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  {progress < 30 && "Decrypting layers..."}
                  {progress >= 30 && progress < 70 && "Syncing global nodes..."}
                  {progress >= 70 && progress < 100 && "Optimizing kernel..."}
                  {progress === 100 && "Ready for deployment"}
                </p>
              </div>
              <p className="text-2xl font-black text-white tabular-nums tracking-tighter">
                {progress}%
              </p>
            </div>

            {/* 4. PROGRESS RAIL */}
            <div className="relative h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#391561] to-white shadow-[0_0_10px_rgba(57,21,97,0.8)]"
              />
            </div>

            {/* 5. DATA STREAM FOOTER */}
            <div className="mt-8 flex justify-between opacity-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="h-1 w-8 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ x: [-32, 32] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="h-full w-1/2 bg-[#391561]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-[-5%] left-[-5%] text-[20vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter italic">
            TECHNOVA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}