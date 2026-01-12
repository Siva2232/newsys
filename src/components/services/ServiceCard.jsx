import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Code,
  Cloud,
  ShieldCheck,
  Smartphone,
  Brain,
  Plus,
} from "lucide-react";

const iconMap = {
  Code,
  Cloud,
  ShieldCheck,
  Smartphone,
  Brain,
};

export default function ServiceCard({ title, description, icon, features }) {
  const Icon = iconMap[icon];
  
  // Tracking mouse for the spotlight effect
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col justify-between rounded-[2.5rem] bg-slate-900/40 p-8 md:p-10 border border-white/5 hover:border-cyan-500/20 transition-all duration-500 overflow-hidden"
    >
      {/* 1. DYNAMIC SPOTLIGHT BACKGROUND */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        {/* 2. ICON & HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div className="relative h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500">
            {Icon && <Icon className="h-7 w-7" />}
          </div>
          
          {/* Indicator light */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
             <span className="text-[8px] font-black uppercase tracking-widest text-white">Active</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-white tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed font-light mb-8 group-hover:text-slate-300 transition-colors">
          {description}
        </p>

        {/* 3. TECHNICAL SPECIFICATIONS (Features) */}
        {features && (
          <div className="space-y-3 border-t border-white/5 pt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Specifications</p>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-xs font-medium text-slate-500 group-hover:text-slate-300"
              >
                <Plus size={10} className="text-cyan-500/50" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 4. DECORATIVE MESH OVERLAY */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
         <Icon size={120} strokeWidth={1} />
      </div>

      {/* 5. KINETIC PROGRESS BEAM */}
      <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:w-full transition-all duration-1000" />
    </motion.div>
  );
}