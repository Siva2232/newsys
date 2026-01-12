import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Zap, Globe, Cpu, ArrowUpRight, CheckCircle2, Award, Target, Rocket } from "lucide-react";

// --- STARTUP DATA (Scalable for the future) ---
const companyData = {
  name: "TechNova",
  tagline: "Infrastructure for the next 100 years.",
  description: "We are a precision-engineering collective. While we operate with startup speed, we build with enterprise-grade resilience. Our mission is to architect systems that don't just scale—they evolve.",
  stats: [
    { label: "Systems Built", value: 12, suffix: "+" },
    { label: "Uptime Rate", value: 99.99, suffix: "%" },
    { label: "Response Time", value: 45, suffix: "ms" },
    { label: "Code Coverage", value: 100, suffix: "%" },
  ],
  founders: [
    { name: "Alex Rivet", role: "CEO / Engineering", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Sarah Chen", role: "CTO / Systems", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  ]
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 1. THE VISIONARY HERO (Startup Ambition) */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-cyan-500"></span>
              <span className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase">Phase 01: Genesis</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
              SMALL TEAM.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-slate-800">
                MASSIVE IMPACT.
              </span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg">
              {companyData.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative border border-white/10 rounded-[3rem] p-4 bg-slate-900/50 backdrop-blur-3xl">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop" alt="Data Architecture" className="rounded-[2.5rem] grayscale brightness-50 hover:grayscale-0 transition-all duration-700" />
            </div>
          </motion.div>
        </div>
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </section>

      {/* 2. THE BENTO STATS (Current Performance) */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {companyData.stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. FUTURE ROADMAP (Scaling to Large Co) */}
      <section className="py-32 relative">
        <Container>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">OUR EVOLUTION</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">From MVP to Market Standard</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <RoadmapStep icon={<Rocket />} stage="Today" title="Agile Sprints" desc="Building core protocols and securing early-adopter partnerships." />
            <RoadmapStep icon={<Target />} stage="2027" title="Market Expansion" desc="Integrating AI-driven automation across global cloud regions." color="text-cyan-400" />
            <RoadmapStep icon={<Award />} stage="2030" title="Industry Lead" desc="Setting the global standard for secure, autonomous infrastructure." />
          </div>
        </Container>
      </section>

      {/* 4. FOUNDERS / THE HUMAN ELEMENT */}
      <section className="py-32 bg-white/5">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black tracking-tight mb-4">THE ARCHITECTS</h2>
              <p className="text-slate-400 italic">"We are building the tools we wished we had 10 years ago."</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-12">
            {companyData.founders.map((person, i) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={i} 
                className="flex flex-col md:flex-row gap-6 items-center p-8 rounded-[2.5rem] bg-slate-900/50 border border-white/5"
              >
                <img src={person.img} className="w-32 h-32 rounded-2xl object-cover grayscale" alt={person.name} />
                <div>
                  <h4 className="text-2xl font-bold">{person.name}</h4>
                  <p className="text-cyan-500 font-mono text-sm mb-4">{person.role}</p>
                  <div className="flex gap-4">
                    <span className="text-xs text-slate-500 hover:text-white cursor-pointer transition-colors underline">LinkedIn</span>
                    <span className="text-xs text-slate-500 hover:text-white cursor-pointer transition-colors underline">GitHub</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. CALL TO ACTION (Future focused) */}
      <section className="py-40">
        <Container>
          <div className="relative rounded-[4rem] bg-gradient-to-br from-cyan-600 to-blue-800 p-12 md:p-24 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <h2 className="relative z-10 text-4xl md:text-7xl font-black tracking-tighter text-white mb-8">BE PART OF THE <br/> FOUNDATION.</h2>
            <button className="relative z-10 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-2xl">
              Partner With Us
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function Container({ children, className = "" }) {
  return <div className={`container mx-auto px-6 ${className}`}>{children}</div>;
}

function StatCard({ stat, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center group hover:bg-white/[0.05] transition-all"
    >
      <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
        {stat.value}{stat.suffix}
      </h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors">
        {stat.label}
      </p>
    </motion.div>
  );
}

function RoadmapStep({ icon, stage, title, desc, color = "text-white" }) {
  return (
    <div className="p-10 rounded-[3rem] bg-slate-900/30 border border-white/5 relative group hover:border-cyan-500/20 transition-all">
      <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2 block">{stage}</span>
      <h4 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h4>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}