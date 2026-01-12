import React from "react";
import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={`relative mb-16 md:mb-24 ${center ? "flex flex-col items-center text-center" : "items-start text-left"}`}>
      
      {/* 1. KINETIC SUBTITLE WITH DIAGNOSTIC DOT */}
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-cyan-500/90 leading-none">
            {subtitle}
          </p>
        </motion.div>
      )}

      {/* 2. MAIN TITLE WITH HYPER-CONDENSED TYPOGRAPHY */}
      <div className="relative inline-block">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] lg:text-7xl"
        >
          {title}
        </motion.h2>

        {/* 3. ARCHITECTURAL ACCENTS (The "Startup" Look) */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`h-[1px] mt-4 bg-gradient-to-r from-cyan-500/50 via-white/20 to-transparent ${center ? "mx-auto" : ""}`}
        />
        
        {/* Decorative corner bracket */}
        {!center && (
          <div className="absolute -left-6 -top-2 w-4 h-4 border-t-2 border-l-2 border-white/5" />
        )}
      </div>

      {/* 4. SYSTEM METADATA (SUBTLE UI DETAIL) */}
      <div className={`mt-4 flex gap-4 opacity-20 font-mono text-[8px] uppercase tracking-widest text-slate-400 ${center ? "justify-center" : ""}`}>
        <span>Ref_0{Math.floor(Math.random() * 9)}</span>
        <span>//</span>
        <span>Secure_Node</span>
      </div>
    </div>
  );
}