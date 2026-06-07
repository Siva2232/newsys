import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import Container from "../common/Container";

const technologies = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Framer", logo: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Go", logo: "https://cdn.simpleicons.org/go/00ADD8" },
];

const FLOATING_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${(i * 23 + 6) % 100}%`,
  y: `${(i * 29 + 14) % 100}%`,
  size: 2 + (i % 2),
  duration: 5 + (i % 3),
  delay: (i % 4) * 0.35,
}));

function TechPill({ item }) {
  return (
    <div className="relative flex shrink-0 items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:bg-slate-800/70 hover:scale-[1.03] hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)] group/pill">
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-cyan-500/8 to-purple-500/5 opacity-0 group-hover/pill:opacity-100 transition-opacity duration-500" />
      <img
        src={item.logo}
        alt={item.name}
        className="relative w-6 h-6 md:w-8 md:h-8 object-contain brightness-[0.85] group-hover/pill:brightness-100 group-hover/pill:scale-110 transition-all duration-500"
      />
      <span className="relative text-sm md:text-lg font-bold tracking-tight text-slate-500 group-hover/pill:text-white transition-colors duration-500">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 30 }) {
  const [paused, setPaused] = useState(false);
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3 md:py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-y-0 left-0 w-[12%] md:w-[20%] bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[12%] md:w-[20%] bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        initial={{ x: direction === "left" ? 0 : "-33.33%" }}
        animate={{
          x: direction === "left" ? "-33.33%" : 0,
          transition: {
            ease: "linear",
            duration: paused ? speed * 3 : speed,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <TechPill key={`${item.name}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)] opacity-[0.08]" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/8 blur-[100px] rounded-full"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/25"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: spotlight }}
      />

      <Container className="relative z-10 mb-14 md:mb-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
              Our Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95]"
          >
            The Tools of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">
              Innovation
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="h-px mt-6 w-48 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-center"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              {technologies.length}+ Production Technologies
            </span>
          </motion.div>
        </div>
      </Container>

      {/* Marquee rows */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-6">
        <MarqueeRow items={technologies} direction="left" speed={28} />
        <MarqueeRow items={[...technologies].reverse()} direction="right" speed={32} />
      </div>

      {/* Bottom reflection */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 mt-16 md:mt-20 flex justify-center"
      >
        <div className="h-px w-2/3 max-w-xl bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />
      </motion.div>
    </section>
  );
}
