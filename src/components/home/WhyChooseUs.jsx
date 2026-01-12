import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const points = [
  {
    title: "Veteran Engineering",
    description: "Architecting resilient systems that handle millions of requests without breaking a sweat.",
    icon: "01"
  },
  {
    title: "Future-Proof Stack",
    description: "Deploying high-performance Rust and Go microservices for maximum horizontal scalability.",
    icon: "02"
  },
  {
    title: "Strategic Partnership",
    description: "We don't just take orders; we act as your fractional CTO to ensure long-term ROI.",
    icon: "03"
  },
  {
    title: "Precision Velocity",
    description: "Automated CI/CD pipelines that turn ideas into production-ready features in hours.",
    icon: "04"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-40 bg-[#020617] overflow-hidden">
      {/* --- BACKGROUND DEPTH LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top/Bottom Divider Beams */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        {/* Radial Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] blur-[100px] rounded-full" />
      </div>

      <Container>
        <SectionTitle
          subtitle="The Engineering Standard"
          title="Why the best choose us"
          center
        />

        {/* --- DYNAMIC CARD GRID --- */}
        <div className="grid gap-6 mt-24 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <FeatureCard key={index} point={point} index={index} />
          ))}
        </div>

        {/* --- TRUST BADGE FOOTER --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl text-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-slate-800 shadow-xl" />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#020617] bg-cyan-500 flex items-center justify-center text-xs font-black text-black">
                +12K
              </div>
            </div>
            <p className="text-slate-400 font-medium tracking-wide">
              Trusted by tech leads from <span className="text-white font-bold">Vercel, Stripe, and SpaceX.</span>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// --- ACTIVE SPOTLIGHT CARD COMPONENT ---
function FeatureCard({ point, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Spotlight Effect Calculation
  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(6, 182, 212, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-white/10 overflow-hidden transition-colors duration-500"
    >
      {/* 1. Mouse Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{ background }}
      />

      {/* 2. Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <span className="text-5xl font-black text-white/[0.03] group-hover:text-cyan-500/20 transition-colors font-mono tracking-tighter">
            {point.icon}
          </span>
          <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-500">
            <div className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
          {point.title}
        </h3>
        
        <p className="text-sm text-slate-400 leading-relaxed font-light mb-8 group-hover:text-slate-300">
          {point.description}
        </p>

        {/* 3. Kinetic Progress Indicator */}
        <div className="relative w-full h-px bg-white/5 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{ duration: 1.5, delay: index * 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}