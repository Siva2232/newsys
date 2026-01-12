import React from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Zap, Layers, Users, MousePointerClick, ChevronRight, MessageSquare } from "lucide-react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 relative overflow-hidden">
      {/* BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-5" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* 1. THE "WHY US" HERO */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              Now Boarding Beta Partners
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
          >
            Stop Building <br />
            <span className="text-cyan-500">Start Launching.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            TechNova provides the high-performance infrastructure your startup needs to 
            reach enterprise-grade stability in weeks, not years. 
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button className="bg-white text-black px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-cyan-500 transition-all">
              Initiate Project <Rocket size={18} />
            </Button>
            <Button className="bg-white/5 border border-white/10 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              View Architecture
            </Button>
          </motion.div>
        </div>

        {/* 2. THE CUSTOMER APPROACH: THREE PILLARS */}
        <div className="grid md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden mb-32">
          <ApproachCard 
            icon={<Zap className="text-cyan-500" />}
            title="Rapid Deployment"
            desc="We eliminate technical debt before it starts. Launch your MVP with a production-ready cloud stack on day one."
          />
          <ApproachCard 
            icon={<ShieldCheck className="text-cyan-500" />}
            title="Enterprise Trust"
            desc="Bank-level security and automated compliance are baked into your core. You’re ready for big-ticket clients immediately."
          />
          <ApproachCard 
            icon={<Layers className="text-cyan-500" />}
            title="Infinite Scale"
            desc="Our architecture grows with you. From your first 100 users to your first million, we handle the load."
          />
        </div>

        {/* 3. THE "APPROACH US" CONSOLE */}
        <div className="relative rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-12 overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Users size={150} />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              Ready to <span className="text-cyan-500">Collaborate?</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              We don't just take orders; we act as your CTO-on-demand. 
              Drop your system requirements and let's build the future together.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <MessageSquare className="mb-4 text-cyan-500" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1">Book Discovery</h4>
                  <p className="text-xs text-slate-500">15-min technical sync</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <MousePointerClick className="mb-4 text-cyan-500" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1">Request Quote</h4>
                  <p className="text-xs text-slate-500">Get a custom roadmap</p>
               </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ApproachCard({ icon, title, desc }) {
  return (
    <div className="bg-[#020617] p-12 flex flex-col items-start gap-6 hover:bg-white/[0.02] transition-all">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed font-medium">
        {desc}
      </p>
      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 hover:text-white transition-colors">
        Learn More <ChevronRight size={14} />
      </button>
    </div>
  );
}