import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

const STATS = [
  { value: "5+", label: "Projects" },
  { value: "2025", label: "Founded" },
  { value: "100%", label: "Dedicated" },
];

const FLOATING_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: `${(i * 22 + 12) % 100}%`,
  y: `${(i * 28 + 6) % 100}%`,
  size: 2,
  duration: 5 + (i % 3),
  delay: (i % 4) * 0.4,
}));

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <p className="text-xl md:text-2xl font-black text-white tracking-tighter">{stat.value}</p>
      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 mt-1">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function CTA() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-32 bg-[#020617] overflow-hidden group px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.12]" />

        <motion.div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none hidden md:block"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${spotlightX}px ${spotlightY}px,
                rgba(34, 211, 238, 0.12),
                transparent 80%
              )
            `,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 blur-[90px] md:blur-[120px] rounded-full"
          animate={{ x: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full"
          animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Rotating ring decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 md:-inset-6 rounded-[2.5rem] md:rounded-[3.5rem] border border-dashed border-white/[0.04] pointer-events-none"
          />

          <div className="relative rounded-[2rem] md:rounded-[3rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-16 lg:p-24 text-center overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-px rounded-[2rem] md:rounded-[3rem] opacity-30 pointer-events-none"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.1), transparent)",
                  "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.15), transparent)",
                  "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.1), transparent)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative inline-flex items-center gap-2 px-4 py-1.5 mb-5 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase bg-cyan-500/10 border border-cyan-500/20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <Sparkles className="relative w-3 h-3" />
                <span className="relative">Let's Connect</span>
              </motion.span>

              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-5 md:mb-8">
                Ready to Launch{" "}
                <span className="block sm:inline mt-1 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
                  With Emprime?
                </span>
              </h2>

              <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12">
                Whether you need a CRM, a business website, or a custom app — let's turn your idea into a product. Join our growing list of clients since 2025.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Button className="group relative w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-white text-black rounded-xl md:rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-cyan-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </Button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.03, color: "#22d3ee" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 text-white font-semibold text-base md:text-lg transition-colors py-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Talk to Emprime
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/[0.06] grid grid-cols-3 gap-4 md:gap-12">
              {STATS.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
