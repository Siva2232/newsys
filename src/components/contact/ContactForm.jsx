import { motion } from "framer-motion";
import { Send, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

export default function ContactForm() {
  return (
    <section className="relative py-32 bg-[#020617] overflow-hidden">
      {/* 1. BACKGROUND DEPTH ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <Container className="relative z-10 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: VALUE PROPOSITION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-cyan-500 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
                Inquiry Portal
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter">
                READY TO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  SCALE UP?
                </span>
              </h2>
              <p className="mt-6 text-slate-400 text-lg font-light leading-relaxed">
                Connect with our engineering lead to discuss your system architecture and deployment roadmap.
              </p>
            </div>

            <div className="space-y-6">
              <TrustBadge icon={<Zap size={18}/>} text="Average 2h response time" />
              <TrustBadge icon={<ShieldCheck size={18}/>} text="NDA protected consultation" />
              <TrustBadge icon={<MessageSquare size={18}/>} text="Direct Slack access for partners" />
            </div>
          </motion.div>

          {/* RIGHT: THE INTERACTIVE MODULE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 relative group"
          >
            {/* Ambient glow behind card */}
            <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <form className="relative p-8 md:p-12 bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <InputField label="Your Name" type="text" placeholder="John Doe" />
                <InputField label="Corporate Email" type="email" placeholder="john@company.com" />
              </div>

              <InputField label="Subject" type="text" placeholder="Project Infrastructure" />

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Brief Narrative</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your project goals..."
                  className="w-full rounded-2xl bg-white/5 px-6 py-4 text-white border border-white/5 focus:border-cyan-400/50 outline-none transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              <div className="pt-4">
                <Button className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-cyan-400 hover:scale-[1.02] transition-all">
                  Initialize Consultation
                  <Send size={16} />
                </Button>
                <p className="mt-4 text-center text-[10px] text-slate-600 uppercase tracking-widest">
                  Secure 256-bit Encrypted Transmission
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-4 text-slate-400">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-500 border border-white/10">
        {icon}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl bg-white/5 px-6 py-4 text-white border border-white/5 focus:border-cyan-400/50 outline-none transition-all placeholder:text-slate-600"
      />
    </div>
  );
}