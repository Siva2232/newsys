import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Container from "../common/Container";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Detect if screen is small to dampen parallax
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Dampen parallax for mobile (move -50 instead of -150)
  const yParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -40 : -150]), 
    springConfig
  );
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const stats = [
    { label: "Systems Built", value: 250, suffix: "+" },
    { label: "Engineers", value: 45, suffix: "+" },
    { label: "Clients", value: 120, suffix: "+" },
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-[#020617] overflow-hidden">
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10 grid gap-16 lg:gap-24 lg:grid-cols-2 items-center">
        
        {/* --- LEFT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-8 md:w-12 bg-cyan-500" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
              Mission Report
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 md:mb-10">
            Trusted <span className="text-slate-700">Ally</span> for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-700">
              Digital Warfare.
            </span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
            <p>
              We operate at the fringe of <span className="text-white font-medium italic">innovation and stability</span>. 
              Our task is simple: transform legacy complexity into frictionless cloud ecosystems.
            </p>
          </div>

          {/* STATS - Stacked on tiny mobile, 3-col on larger mobile/desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            {stats.map((stat, index) => (
              <div key={index} className={`flex flex-col ${index === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <div className="text-2xl md:text-3xl font-black text-white mb-1 flex">
                   <Counter value={stat.value} />
                   <span>{stat.suffix}</span>
                </div>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#06b6d4" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto mt-10 md:mt-12 px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full transition-colors shadow-2xl shadow-cyan-500/20"
          >
            Initiate Consultation
          </motion.button>
        </motion.div>

        {/* --- RIGHT VISUAL --- */}
        <div className="relative mt-12 lg:mt-0">
          <motion.div 
            style={{ y: yParallax, rotateX: isMobile ? 0 : rotateX }}
            className="relative z-10 rounded-[2.5rem] md:rounded-[3rem] p-2 bg-gradient-to-br from-white/20 via-transparent to-white/5 border border-white/10 shadow-2xl overflow-hidden"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="rounded-[2.2rem] md:rounded-[2.5rem] overflow-hidden aspect-video lg:aspect-square"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                alt="Cybersecurity Lab"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </motion.div>

          {/* FLOATING DATA CARD - Adjusted for mobile position */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 z-20 p-5 md:p-8 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl max-w-[180px] md:max-w-none"
          >
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">Integrity</span>
            </div>
            <p className="text-[10px] md:text-sm text-slate-400 font-medium">99.9% Fault Tolerance.</p>
          </motion.div>

          {/* BACKGROUND TEXT - Responsive sizing */}
          <div className="absolute -top-6 -right-6 md:-top-12 md:-right-12 text-6xl md:text-9xl font-black text-white/[0.02] select-none pointer-events-none">
            TECH
          </div>
        </div>
      </Container>
    </section>
  );
}

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}