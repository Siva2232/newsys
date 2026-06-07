import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Code,
  Smartphone,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Container from "../common/Container";

const servicesData = [
  {
    id: 1,
    title: "Application Development",
    desc: "Scalable, secure web applications engineered for performance and long-term growth.",
    icon: Code,
    features: ["React & Next.js", "Responsive Design", "SEO Optimized", "High Performance"],
  },
  {
    id: 2,
    title: "Mobile App Development",
    desc: "High-performance iOS & Android apps with native-quality UX and speed.",
    icon: Smartphone,
    features: ["Android & iOS", "React Native", "Flutter", "App Store Deployment"],
  },
  {
    id: 3,
    title: "Custom Software Solutions",
    desc: "Tailor-made software built to match your exact business workflows and goals.",
    icon: Layers,
    features: ["Enterprise Apps", "CRM & ERP", "API Integration", "Secure Architecture"],
  },
];

const FLOATING_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${(i * 21 + 8) % 100}%`,
  y: `${(i * 27 + 12) % 100}%`,
  size: 2 + (i % 2),
  duration: 5 + (i % 4),
  delay: (i % 5) * 0.35,
}));

function ServiceCard({ service, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const Icon = service.icon;

  const glow = useMotionTemplate`
    radial-gradient(
      420px circle at ${springX}px ${springY}px,
      rgba(34, 211, 238, 0.1),
      transparent 75%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2rem] border border-white/[0.06] bg-slate-950/70 p-8 md:p-10 transition-colors duration-500 hover:border-white/15 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glow }}
        />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-700 origin-left"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:scale-110 transition-all duration-500">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white/10 group-hover:text-cyan-500/20 transition-colors font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mb-3 text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>

        <p className="mb-6 text-sm md:text-base leading-relaxed text-slate-400 font-light">
          {service.desc}
        </p>

        <ul className="space-y-2 mb-8">
          {service.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.08 + i * 0.05 }}
              className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-cyan-400 transition-colors cursor-pointer">
          Learn Integration
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

export default function ServiceList() {
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
    <>
      {/* Page hero */}
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[55vh] flex items-center pt-28 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-[0.12]" />
          <motion.div
            className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full"
            animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {FLOATING_PARTICLES.slice(0, 8).map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-cyan-400/25"
              style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
              animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: spotlight }}
        />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
                Engineered Solutions
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-6">
              The Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-600">
                Infrastructure
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mb-8">
              Enterprise-grade services built for scale, security, and speed — from MVP to global deployment.
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                {servicesData.length} Core Service Lines
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/8 blur-[120px] rounded-full"
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mt-16 md:mt-24 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10"
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(34,211,238,0.05), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-2">
                  Built for Global Scale
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Need a custom architecture?
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            Standardized Protocols <span className="mx-4 text-slate-800">|</span> Enterprise Ready
          </motion.p>
        </Container>
      </section>
    </>
  );
}
