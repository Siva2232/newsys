import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Award, Layers, Handshake, Zap, ArrowRight } from "lucide-react";
import Container from "../common/Container";

const points = [
  {
    title: "Veteran Engineering",
    description:
      "Architecting resilient systems that handle millions of requests without breaking a sweat.",
    icon: Award,
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    title: "Future-Proof Stack",
    description:
      "Deploying high-performance Rust and Go microservices for maximum horizontal scalability.",
    icon: Layers,
    accent: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Strategic Partnership",
    description:
      "We don't just take orders; we act as your fractional CTO to ensure long-term ROI.",
    icon: Handshake,
    accent: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    title: "Precision Velocity",
    description:
      "Automated CI/CD pipelines that turn ideas into production-ready features in hours.",
    icon: Zap,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
];

const FLOATING_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: `${(i * 25 + 10) % 100}%`,
  y: `${(i * 33 + 8) % 100}%`,
  size: 2,
  duration: 6 + (i % 3),
  delay: (i % 5) * 0.3,
}));

function FeatureCard({ point, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const background = useMotionTemplate`
    radial-gradient(
      400px circle at ${springX}px ${springY}px,
      rgba(34, 211, 238, 0.1),
      transparent 75%
    )
  `;

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = point.icon;

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -6 }}
      className="group relative p-7 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-950/60 border border-white/[0.06] hover:border-white/15 overflow-hidden transition-colors duration-500"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background }}
        />
      </div>

      {/* Top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-700 origin-left"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8 md:mb-10">
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${point.accent} border border-white/10`}>
            <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="text-3xl font-black text-white/[0.04] group-hover:text-cyan-500/15 transition-colors font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {point.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed font-light mb-8 group-hover:text-slate-300 transition-colors">
          {point.description}
        </p>

        <div className="relative w-full h-px bg-white/[0.05] overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-600 group-hover:text-cyan-400 transition-colors uppercase tracking-widest"
        >
          Learn more
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
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
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-40 bg-[#020617] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <motion.div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/[0.04] blur-[130px] rounded-full"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] blur-[110px] rounded-full"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/20"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -12, 0], opacity: [0.1, 0.35, 0.1] }}
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
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
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
              The Engineering Standard
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95]"
          >
            Why the best{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">
              choose us
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="h-px mt-6 w-48 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-center"
          />
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <FeatureCard key={point.title} point={point} index={index} />
          ))}
        </div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative mt-20 md:mt-28 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 text-center"
        >
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.04), transparent)",
              backgroundSize: "200% 100%",
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <div className="flex -space-x-3 md:-space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[#020617] bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl"
                />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[#020617] bg-cyan-500 flex items-center justify-center text-[10px] md:text-xs font-black text-black"
              >
                +12K
              </motion.div>
            </div>
            <p className="text-slate-400 font-medium tracking-wide text-sm md:text-base">
              Trusted by tech leads from{" "}
              <span className="text-white font-bold">Vercel, Stripe, and SpaceX.</span>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
