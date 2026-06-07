import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Brain,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "../common/Container";
import { servicesData } from "../../data/servicesData";

const ICON_MAP = {
  Code: Code2,
  Smartphone,
  Brain,
  ShieldCheck,
};

const FLOATING_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${(i * 21 + 8) % 100}%`,
  y: `${(i * 31 + 10) % 100}%`,
  size: 2 + (i % 2),
  duration: 5 + (i % 4),
  delay: (i % 5) * 0.4,
}));

function PremiumServiceCard({ service, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const Icon = ICON_MAP[service.icon] || Code2;
  const rotateY = useTransform(springX, [0, 300], [-4, 4]);
  const rotateX = useTransform(springY, [0, 400], [4, -4]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(150);
    mouseY.set(200);
  }

  const glow = useMotionTemplate`
    radial-gradient(
      420px circle at ${springX}px ${springY}px,
      rgba(34, 211, 238, 0.1),
      transparent 75%
    )
  `;

  const borderGlow = useMotionTemplate`
    radial-gradient(
      320px circle at ${springX}px ${springY}px,
      rgba(34, 211, 238, 0.35),
      transparent 70%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.06] bg-slate-950/80 p-8 md:p-10 transition-colors duration-500 hover:border-white/15"
    >
      {/* Noise + mouse glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glow }}
        />
        <motion.div
          className="absolute -inset-px rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: borderGlow }}
        />
      </div>

      {/* Animated top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/60 transition-all duration-700"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
      />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <div className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 to-purple-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
            />
            <Icon className="relative w-6 h-6 md:w-7 md:h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Svc
            </span>
            <span className="text-2xl font-black text-white/20 group-hover:text-cyan-500/40 transition-colors duration-500 font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 md:mb-4">
          {service.title.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "text-slate-500" : ""}>
              {word}{" "}
            </span>
          ))}
        </h3>

        <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
          {service.description}
        </p>

        {/* Feature tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {service.features.slice(0, 3).map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.08 + i * 0.06 }}
              className="px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-slate-400 border border-white/[0.06] bg-white/[0.03] group-hover:border-cyan-500/20 group-hover:text-slate-300 transition-colors duration-500"
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action area */}
      <div className="relative z-10 mt-10 md:mt-14 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group/btn relative h-10 px-6 rounded-full bg-white text-black text-sm font-bold overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors duration-300">
            View Detail
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </span>
          <motion.span
            className="absolute inset-0 bg-cyan-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.1, borderColor: "rgba(34,211,238,0.5)" }}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.div>
      </div>

      {/* Bottom flare */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-700" />
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`
    radial-gradient(
      700px circle at ${mouseX}px ${mouseY}px,
      rgba(34, 211, 238, 0.05),
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)] opacity-[0.1]" />

        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-cyan-600/10 blur-[150px] rounded-full"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-indigo-600/10 blur-[130px] rounded-full"
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/25"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
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

      <Container className="relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-24 grid md:grid-cols-2 items-end gap-8 lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
                Core Capabilities
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]"
            >
              We Solve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">
                Hard Problems.
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-px mt-6 max-w-xs bg-gradient-to-r from-cyan-500/50 via-white/20 to-transparent origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-md">
              Blending artistic engineering with clinical execution to deliver
              software that defines industries.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  {servicesData.length} Active Services
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <PremiumServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-16 md:mt-20 relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10"
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.05), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-2">
                Need something custom?
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Let's architect your next system.
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group shrink-0 flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-black text-sm font-bold uppercase tracking-wider"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
