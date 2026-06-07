import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  ArrowRight,
  Shield,
  Cpu,
  Users,
  Building2,
  CheckCircle2,
  Activity,
  Lock,
} from "lucide-react";
import Container from "../common/Container";

const STATS = [
  { label: "Systems Built", value: 250, suffix: "+", icon: Cpu },
  { label: "Engineers", value: 45, suffix: "+", icon: Users },
  { label: "Clients", value: 120, suffix: "+", icon: Building2 },
];

const PILLARS = [
  "Zero-trust architecture by default",
  "24/7 global incident response",
  "Enterprise-grade compliance (SOC 2, ISO)",
];

const FLOATING_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: `${(i * 19 + 5) % 100}%`,
  y: `${(i * 27 + 13) % 100}%`,
  size: 2 + (i % 2),
  duration: 5 + (i % 4),
  delay: (i % 6) * 0.35,
}));

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  const cardRef = useRef(null);
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      180px circle at ${cardMouseX}px ${cardMouseY}px,
      rgba(34, 211, 238, 0.12),
      transparent 80%
    )
  `;

  function handleMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    cardMouseX.set(e.clientX - rect.left);
    cardMouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.12, duration: 0.6 }}
      whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.25)" }}
      className="group relative flex flex-col p-5 md:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <stat.icon className="w-4 h-4 text-cyan-400" />
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            0{index + 1}
          </span>
        </div>
        <div className="text-2xl md:text-3xl font-black text-white mb-1">
          <Counter value={stat.value} suffix={stat.suffix} />
        </div>
        <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -30 : -120]),
    springConfig
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  const spotlight = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(34, 211, 238, 0.06),
      transparent 70%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-40 bg-[#020617] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.12]" />

        <motion.div
          className="absolute top-1/3 left-0 w-[400px] md:w-[550px] h-[400px] md:h-[550px] bg-cyan-600/10 blur-[100px] md:blur-[140px] rounded-full"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-indigo-600/8 blur-[90px] md:blur-[120px] rounded-full"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -16, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: spotlight }}
      />

      <Container className="relative z-10 grid gap-16 lg:gap-24 lg:grid-cols-2 items-center">
        {/* Left content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5 md:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="h-px w-8 md:w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
              Mission Report
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl mt-0"
          >
            We operate at the fringe of{" "}
            <span className="text-white font-medium italic relative">
              innovation and stability
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px bg-cyan-500/50"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </span>
            . Our task is simple: transform legacy complexity into frictionless cloud ecosystems.
          </motion.p>

          {/* Pillars */}
          <ul className="mt-8 space-y-3">
            {PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="flex items-center gap-3 text-sm md:text-base text-slate-400"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{pillar}</span>
              </motion.li>
            ))}
          </ul>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-10 md:mt-14">
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-auto mt-10 md:mt-12 px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full overflow-hidden shadow-2xl shadow-cyan-500/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
              Initiate Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.span
              className="absolute inset-0 bg-cyan-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </motion.button>
        </div>

        {/* Right visual */}
        <div className="relative mt-12 lg:mt-0">
          {/* Background watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute -top-6 -right-4 md:-top-12 md:-right-12 text-6xl md:text-9xl font-black text-white/[0.025] select-none pointer-events-none tracking-tighter"
          >
            TECH
          </motion.div>

          {/* Decorative rings */}
          <motion.div
            style={{ y: yParallax }}
            className="absolute -inset-6 md:-inset-10 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-[3rem] border border-dashed border-white/[0.04]"
            />
          </motion.div>

          <motion.div style={{ y: yParallax, scale: imageScale }} className="relative z-10">
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1200}
              scale={1.02}
              transitionSpeed={1200}
              gyroscope={false}
            >
              <div className="relative group p-2 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-white/15 via-transparent to-white/5 border border-white/10 shadow-2xl overflow-hidden">
                <motion.div
                  className="absolute -inset-1 rounded-[2.5rem] md:rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.2))",
                      "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.3))",
                      "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.2))",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="relative rounded-[2.2rem] md:rounded-[2.5rem] overflow-hidden aspect-video lg:aspect-[4/5]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                    alt="Cybersecurity Lab"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />

                  {/* Scan line overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  />

                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40" />

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617]/80 to-transparent" />
                </motion.div>
              </div>
            </Tilt>
          </motion.div>

          {/* Floating card — Integrity */}
          <motion.div
            initial={{ y: 30, opacity: 0, x: 20 }}
            whileInView={{ y: 0, opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-6 z-20"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-5 md:p-6 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[1.75rem] shadow-2xl shadow-black/40 min-w-[170px] md:min-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-400"
                />
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">
                  Integrity
                </span>
              </div>
              <p className="text-xl md:text-2xl font-black text-white mb-0.5">99.9%</p>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium">Fault Tolerance</p>
            </motion.div>
          </motion.div>

          {/* Floating card — Security */}
          <motion.div
            initial={{ y: -20, opacity: 0, x: -20 }}
            whileInView={{ y: 0, opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="absolute -top-4 -left-2 md:-top-6 md:-left-8 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="p-4 md:p-5 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">
                  Security
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white font-mono">AES-256</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-1">End-to-end encrypted</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
