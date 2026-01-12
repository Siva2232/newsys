import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ArrowRight, Terminal, Cpu, ShieldCheck, Globe, Database } from "lucide-react";

// ───────── COMPONENT: SCROLL TO TOP ─────────
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  // 1. BOOT SEQUENCE LOGIC (Fixed 4th Icon Activation)
  useEffect(() => {
    setIsPageLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // 900ms delay ensures the user sees the "100%" and all 4 lit icons
          setTimeout(() => setIsPageLoading(false), 900);
          return 100;
        }
        // Random increments to feel more "organic"
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 90);

    setOpen(false); 
    return () => clearInterval(interval);
  }, [pathname]);

  // 2. SCROLL & OVERFLOW EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = (open || isPageLoading) ? "hidden" : "unset";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, isPageLoading]);

  return (
    <>
      <ScrollToTop />

      {/* ───────── SECTION: DIAGNOSTIC LOADER ───────── */}
      <AnimatePresence mode="wait">
        {isPageLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
          >
            {/* 01. BINARY STREAM (Left) */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 opacity-20 font-mono text-[8px] text-cyan-500 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
              <span>Sequence_Alpha_774</span>
              <span>Encryption_Active</span>
              <span>01001010 01101111 01101000 01101110</span>
            </div>

            {/* 02. BACKGROUND GRID */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0891b210,transparent_70%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* CORE LOGO ENGINE */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-0 border-[1px] border-dashed border-cyan-500/30 rounded-[3rem]" 
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-4 border border-white/5 rounded-[2.5rem]" 
                />
                <div className="relative w-20 h-20 bg-white text-black flex items-center justify-center font-black text-3xl rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  TN
                </div>
              </div>

              {/* PROGRESS BAR UI */}
              <div className="mt-16 w-72">
                <div className="flex justify-between items-end mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-cyan-500">System.Initialize</span>
                    <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Protocol_Nova_Active</span>
                  </div>
                  <span className="text-2xl font-black text-white italic">{progress}%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_20px_#22d3ee]" 
                  />
                </div>
              </div>
              
              {/* NODE STATUS GRID - FIX: Recalibrated thresholds for 4 icons */}
              <div className="mt-12 grid grid-cols-4 gap-8">
                {[Cpu, ShieldCheck, Globe, Database].map((Icon, idx) => {
                  // Icon thresholds: 25%, 50%, 75%, 95%
                  const activeLevels = [25, 50, 75, 95];
                  const isActive = progress >= activeLevels[idx];
                  
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <Icon 
                        size={18} 
                        className={`${isActive ? "text-cyan-400" : "text-white/10"} transition-colors duration-500`} 
                      />
                      <div className={`h-1 w-1 rounded-full ${isActive ? "bg-cyan-500 shadow-[0_0_8px_#06b6d4]" : "bg-white/5"}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DATA OVERLAY (Right) */}
            <div className="absolute right-6 bottom-10 hidden md:block">
              <div className="text-[9px] font-mono text-white/10 space-y-1">
                <p>LATENCY: 14MS</p>
                <p>STATUS: OPTIMIZED</p>
                <p>REGION: GLOBAL_NODE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── SECTION: MAIN HEADER ───────── */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || open ? "py-3 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5" : "py-6 bg-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="w-10 h-10 bg-white text-black flex items-center justify-center font-black rounded-xl active:scale-95 transition-transform">TN</Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} link={link} isActive={pathname === link.path} />
            ))}
            <Link to="/launch">
              <button className="flex items-center gap-2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-cyan-400 transition-all shadow-xl shadow-white/5">
                Launch <Zap size={12} fill="currentColor" />
              </button>
            </Link>
          </nav>

          <button onClick={() => setOpen(true)} className="md:hidden p-3 rounded-2xl bg-white/5 border border-white/10 text-white active:bg-white/10">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ───────── SECTION: MOBILE DRAWER ───────── */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[105] md:hidden">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl" onClick={() => setOpen(false)} />
            
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute right-0 top-0 h-full w-[85%] bg-slate-950 border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live_Protocol</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={link.path} onClick={() => setOpen(false)} className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all ${pathname === link.path ? "bg-cyan-500 text-black border-cyan-400" : "bg-white/[0.03] border-white/5 text-white"}`}>
                      <span className="text-2xl font-black uppercase tracking-tighter italic">{link.name}</span>
                      <ArrowRight size={20} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 bg-slate-950 border-t border-white/5">
                <div className="bg-gradient-to-br from-white/[0.05] to-transparent p-6 rounded-[2.5rem] border border-white/10">
                  <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Partner Access</span>
                      <span className="text-xs text-slate-400 font-medium">Initialize Sequence.</span>
                    </div>
                    <Terminal size={16} className="text-slate-600" />
                  </div>
                  <Link to="/launch" onClick={() => setOpen(false)} className="block w-full">
                    <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all">
                      Launch Nova <Zap size={16} fill="currentColor" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ link, isActive }) {
  return (
    <Link to={link.path} className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${isActive ? "text-white" : "text-slate-500 hover:text-white"}`}>
      <span className="relative z-10">{link.name}</span>
      {isActive && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />}
    </Link>
  );
}