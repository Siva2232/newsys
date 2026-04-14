import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../common/Container";
import Button from "../common/Button";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] selection:bg-cyan-500/30"
    >
      {/* 1. LAYERED BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
        {/* Modern SVG Grid with Radial Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Dynamic Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
        
        {/* Grain/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Container className="relative z-10 pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* 2. ENHANCED BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group cursor-pointer mb-8 px-1 py-1 pr-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-500/50 transition-colors"
          >
            <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-[10px] font-bold uppercase tracking-wider text-black">New</span>
            <span className="text-sm text-slate-300 font-medium">v4.0 Enterprise Engine is now live</span>
            <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
          </motion.div>

          {/* 3. HIGH-CONTRAST TYPOGRAPHY */}
          <motion.h1
            style={{ opacity }}
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black tracking-tight text-white"
          >
            The Future of <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500">
                Infrastructure
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-[8px] bg-cyan-500/30 -z-10 rounded-sm"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            Stop managing servers and start building. Our platform automates the 
            complexity of global scaling with <span className="text-white font-medium">zero-latency</span> edge nodes.
          </motion.p>

          {/* 4. PREMIUM BUTTONS WITH HOVER STATES */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Button className="h-14 px-10 text-lg font-semibold bg-white text-[#391561] hover:bg-cyan-400 hover:scale-105 transition-all duration-300 rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Deploy Solution
            </Button>
            <Button variant="outline" className="h-14 px-10 text-lg font-semibold border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all rounded-xl">
              Book Architecture Call
            </Button>
          </motion.div>
        </div>

        {/* 5. THE "HERO OBJECT" - 3D GLASS CARD MOCKUP */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 relative max-w-6xl mx-auto"
        >
          <div className="relative group p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-2xl">
            {/* Glow Effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Mockup Content */}
            <div className="relative bg-[#020617] rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl">
               <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                  </div>
                  <div className="text-xs text-slate-500 font-mono tracking-widest">DEPLOYMENT_TERMINAL.EXE</div>
                  <div className="w-4 h-4" />
               </div>
               <div className="aspect-video bg-gradient-to-br from-slate-900 to-black p-8">
                  {/* Inner UI Visuals */}
                  <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-2 rounded-lg bg-white/5 border border-white/10 p-4 animate-pulse" />
                    <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20" />
                    <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20" />
                    <div className="col-span-2 rounded-lg bg-white/5 border border-white/10" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}