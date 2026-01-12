import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import { servicesData } from "../../data/servicesData";

// --- High-Fidelity Service Card ---
function PremiumServiceCard({ service, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950 p-10 transition-all hover:border-white/20"
    >
      {/* 1. Integrated Noise & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <motion.div
          className="absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(34, 211, 238, 0.08),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* 2. Abstract Service ID / Icon */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-xl font-mono text-white group-hover:scale-110 transition-transform duration-500">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
        </div>

        {/* 3. Content Architecture */}
        <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
          {service.title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "text-slate-500" : ""}>{word} </span>
          ))}
        </h3>
        
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-[280px]">
          {service.description}
        </p>
      </div>

      {/* 4. Action Area */}
      <div className="relative z-10 mt-16 flex items-center gap-4">
        <button className="h-10 px-6 rounded-full bg-white text-black text-sm font-bold hover:bg-cyan-400 transition-colors">
          View Detail
        </button>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
          <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      {/* 5. Bottom Gradient Flare */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-700" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative py-32 bg-[#020617] overflow-hidden">
      {/* Background Orbs for Depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full" />
      </div>

      <Container>
        <div className="relative z-10 mb-24 grid md:grid-cols-2 items-end gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-500 font-mono tracking-[0.3em] uppercase text-sm mb-4 block"
            >
              Core Capabilities
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              We Solve <br /> <span className="text-slate-700">Hard Problems.</span>
            </h2>
          </div>
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md pb-2">
            Blending artistic engineering with clinical execution to deliver 
            software that defines industries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <PremiumServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}