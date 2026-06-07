import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Rocket,
  Target,
  Award,
  ArrowRight,
  Linkedin,
  Github,
} from "lucide-react";
import Container from "../components/common/Container";

const companyData = {
  description:
    "Emprime is a software startup founded in 2025. We build CRM systems, business websites, mobile apps, and custom software for startups and growing businesses — with 5+ projects already delivered and more on the way.",
  stats: [
    { label: "Projects Delivered", value: 5, suffix: "+" },
    { label: "Core Services", value: 3, suffix: "" },
    { label: "Founded", value: 2025, suffix: "" },
    { label: "Client Focus", value: 100, suffix: "%" },
  ],
  founders: [
    {
      name: "Emprime Team",
      role: "Founders & Builders",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
    },
    {
      name: "Development Squad",
      role: "Engineering & Design",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop",
    },
  ],
};

const roadmap = [
  {
    icon: Rocket,
    stage: "2025",
    title: "Launch & First Clients",
    desc: "Founded Emprime, delivered 5+ projects including CRM systems, business websites, and custom apps.",
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    icon: Target,
    stage: "2026",
    title: "Grow the Portfolio",
    desc: "Expand our client base, launch SaaS products, and deepen expertise in CRM and e-commerce solutions.",
    accent: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Award,
    stage: "2027+",
    title: "Scale Emprime",
    desc: "Build a recognized brand in custom software — serving startups, SMEs, and enterprises across India and beyond.",
    accent: "from-indigo-500/20 to-indigo-500/5",
  },
];

const FLOATING_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${(i * 23 + 6) % 100}%`,
  y: `${(i * 29 + 10) % 100}%`,
  size: 2,
  duration: 5 + (i % 3),
  delay: (i % 4) * 0.35,
}));

function Counter({ value, suffix, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const duration = 2000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.25)" }}
      className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center group transition-colors duration-500"
    >
      <h3 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">
        <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
      </h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors">
        {stat.label}
      </p>
    </motion.div>
  );
}

function RoadmapStep({ step, index }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ y: -6 }}
      className="relative p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-950/60 border border-white/[0.06] group hover:border-white/15 transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2 block">
          {step.stage}
        </span>
        <h4 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
          {step.title}
        </h4>
        <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-400 transition-colors">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

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
    <div
      onMouseMove={handleMouseMove}
      className="bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-[0.12]" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full"
            animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {FLOATING_PARTICLES.map((p) => (
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="h-px w-8 bg-cyan-500" />
                <span className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">
                  Founded 2025
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter mb-8">
                WE ARE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-slate-600">
                  EMPRIME.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-lg">
                {companyData.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="relative hidden lg:block"
            >
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={1200} gyroscope={false}>
                <div className="relative group p-2 rounded-[2.5rem] bg-gradient-to-br from-white/15 to-transparent border border-white/10">
                  <motion.div
                    className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.2))",
                        "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.3))",
                        "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.2))",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop"
                    alt="Data Architecture"
                    className="relative rounded-[2rem] grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Tilt>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 border-y border-white/[0.05] bg-white/[0.01]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {companyData.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="py-24 md:py-32 relative">
        <Container>
          <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">
                Roadmap
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
            >
              OUR JOURNEY
            </motion.h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
              From startup launch to scaling impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {roadmap.map((step, i) => (
              <RoadmapStep key={step.stage} step={step} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Founders */}
      <section className="py-24 md:py-32 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">THE EMPRIME TEAM</h2>
            <p className="text-slate-400 italic text-lg">
              "We started Emprime in 2025 to build the software tools businesses actually need."
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {companyData.founders.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col md:flex-row gap-6 items-center p-6 md:p-8 rounded-[2rem] bg-slate-950/60 border border-white/[0.06] hover:border-white/15 transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-2xl shrink-0">
                  <img
                    src={person.img}
                    className="w-28 h-28 md:w-32 md:h-32 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt={person.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-1">{person.name}</h4>
                  <p className="text-cyan-500 font-mono text-sm mb-4">{person.role}</p>
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1, color: "#22d3ee" }}
                      href="#"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, color: "#22d3ee" }}
                      href="#"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-10 md:p-16 lg:p-24 text-center group"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, #0891b2, #1d4ed8)",
                  "linear-gradient(135deg, #1d4ed8, #0891b2)",
                  "linear-gradient(135deg, #0891b2, #1d4ed8)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-dashed border-white/10 rounded-[3rem] pointer-events-none"
            />

            <h2 className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-8">
              GROW WITH
              <br />
              EMPRIME.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 group inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full shadow-2xl"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
