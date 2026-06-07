import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { ArrowRight, Play, Rocket, FolderKanban, Calendar, ChevronDown } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

const TERMINAL_LINES = [
  { text: "$ emprime build --project crm-dashboard", delay: 0 },
  { text: "✓ CRM modules configured...", delay: 800, accent: "cyan" },
  { text: "✓ Business website deployed", delay: 1400, accent: "green" },
  { text: "✓ Client portal live & tested", delay: 2000, accent: "green" },
  { text: "→ Live at https://app.emprime.com", delay: 2600, accent: "purple" },
];

const STATS = [
  { value: "5+", label: "Projects Delivered", icon: FolderKanban },
  { value: "2025", label: "Founded", icon: Calendar },
  { value: "3", label: "Core Services", icon: Rocket },
];

const FLOATING_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 17 + 7) % 100}%`,
  y: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  duration: 4 + (i % 5),
  delay: (i % 8) * 0.4,
}));

function FloatingOrb({ className, animate: anim }) {
  return (
    <motion.div
      className={className}
      animate={anim}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function AnimatedWord({ word, index, isHighlight }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block ${isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400" : ""}`}
        initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.7,
          delay: 0.15 + index * 0.08,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function TerminalLine({ line, visible }) {
  const colorMap = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    purple: "text-purple-400",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className={`font-mono text-xs md:text-sm ${colorMap[line.accent] || "text-slate-400"}`}
        >
          {line.text}
          {line.delay === 0 && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-2 h-4 ml-1 bg-cyan-400 align-middle"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetricBar({ label, value, delay, textColor, barColor }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
        <span>{label}</span>
        <span className={textColor}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: value }}
          transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  const spotlight = useMotionTemplate`
    radial-gradient(
      700px circle at ${mouseX}px ${mouseY}px,
      rgba(34, 211, 238, 0.07),
      transparent 70%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const headlineWords = ["We", "Build", "Digital"];
  const highlightWord = "Products.";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] selection:bg-cyan-500/30"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-[0.15]" />

        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(34,211,238,0.03) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
        />

        <FloatingOrb
          className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full mix-blend-screen"
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        />
        <FloatingOrb
          className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] bg-indigo-600/15 blur-[130px] rounded-full mix-blend-screen"
          animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        />
        <FloatingOrb
          className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/40"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
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

      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: spotlight }}
      />

      <Container className="relative z-10 pt-24 pb-16">
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer mb-8 px-1 py-1 pr-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md hover:border-cyan-500/40 transition-colors overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500 text-[10px] font-bold uppercase tracking-wider text-black">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-black/60"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Est. 2025
            </span>
            <span className="relative text-sm text-slate-300 font-medium">
              Emprime — startup building CRM, websites & apps
            </span>
            <ArrowRight className="relative w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
            {headlineWords.map((word, i) => (
              <span key={word}>
                <AnimatedWord word={word} index={i} />
                {" "}
              </span>
            ))}
            <br />
            <span className="relative inline-block mt-1 md:mt-2">
              <AnimatedWord word={highlightWord} index={3} isHighlight />
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -bottom-1 left-0 right-0 h-[6px] md:h-[10px] bg-gradient-to-r from-cyan-500/40 via-cyan-400/20 to-transparent origin-left rounded-sm"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            Emprime helps startups and businesses launch{" "}
            <span className="text-white font-medium relative">
              CRM systems, websites & custom software
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px bg-cyan-500/60"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
            </span>{" "}
            — fast, clean, and built to grow.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -2, borderColor: "rgba(34,211,238,0.3)" }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm"
              >
                <stat.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">{stat.value}</span>
                <span className="text-xs text-slate-500 hidden sm:inline">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button className="group relative h-14 px-10 text-lg font-semibold bg-white text-[#391561] hover:bg-cyan-400 rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="group h-14 px-10 text-lg font-semibold border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-cyan-500/30 rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  View Our Work
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-20 md:mt-24 relative max-w-6xl mx-auto perspective-[1200px]"
        >
          {/* Decorative rings */}
          <motion.div
            style={{ y: y2 }}
            className="absolute -inset-8 md:-inset-12 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-[3rem] border border-dashed border-white/[0.04]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-[2.5rem] border border-white/[0.03]"
            />
          </motion.div>

          <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            perspective={1200}
            scale={1.02}
            transitionSpeed={1500}
            gyroscope={false}
            className="relative"
          >
            <div className="relative group p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-2xl">
              <motion.div
                className="absolute -inset-1 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(34,211,238,0.4), rgba(168,85,247,0.4))",
                    "linear-gradient(90deg, rgba(168,85,247,0.4), rgba(34,211,238,0.4))",
                    "linear-gradient(90deg, rgba(34,211,238,0.4), rgba(168,85,247,0.4))",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <div className="relative bg-[#020617] rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-black/50">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-5 md:px-6 py-3.5 bg-white/[0.03] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-500 font-mono tracking-widest">
                    EMPRIME_BUILD.EXE
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-emerald-400/80 font-mono hidden sm:inline">LIVE</span>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-5 gap-0">
                  {/* Terminal panel */}
                  <div className="md:col-span-3 p-5 md:p-6 bg-gradient-to-br from-slate-900/80 to-black min-h-[200px] md:min-h-[260px] border-b md:border-b-0 md:border-r border-white/5">
                    <div className="space-y-2">
                      {TERMINAL_LINES.map((line) => (
                        <TerminalLine
                          key={line.text}
                          line={line}
                          visible={visibleLines.includes(line.text)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Metrics panel */}
                  <div className="md:col-span-2 p-5 md:p-6 bg-black/40 space-y-5">
                    <MetricBar label="Design" value="100%" delay={1.4} textColor="text-cyan-400" barColor="bg-cyan-400" />
                    <MetricBar label="Development" value="85%" delay={1.6} textColor="text-purple-400" barColor="bg-purple-400" />
                    <MetricBar label="Launch Ready" value="92%" delay={1.8} textColor="text-emerald-400" barColor="bg-emerald-400" />

                    <div className="pt-2 grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((n, i) => (
                        <motion.div
                          key={n}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2 + i * 0.1 }}
                          className="aspect-square rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
                        >
                          <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            className="w-2 h-2 rounded-full bg-cyan-400/60"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
