import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { useRef } from "react";
import Container from "../common/Container";
import Button from "../common/Button";

export default function CTA() {
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-32 bg-[#020617] overflow-hidden group px-4"
    >
      {/* 1. BACKGROUND ADAPTATIONS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Only show spotlight on devices with a mouse */}
        <motion.div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none hidden md:block"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${spotlightX}px ${spotlightY}px,
                rgba(6, 182, 212, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Scaled-down ambient orbs for mobile */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-8 md:p-24 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 text-[10px] md:text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase bg-cyan-500/10 rounded-full">
              Let's Connect
            </span>
            
            {/* Responsive Text Sizes: text-3xl for mobile, text-7xl for desktop */}
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 md:mb-8">
              Ready to Build <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
                The Next Big Thing?
              </span>
            </h2>
            
            <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12">
              Join 150+ companies already scaling their infrastructure with our 
              automated architecture.
            </p>

            {/* Actions: Stacked on mobile, row on tablet+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-white text-black hover:bg-cyan-400 transition-all rounded-xl md:rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
                  Start Your Project
                </Button>
              </motion.div>
              
              <button className="flex items-center gap-2 text-white font-semibold text-base md:text-lg hover:text-cyan-400 transition-colors py-2">
                Talk to an Expert
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* 4. RESPONSIVE DATA PULSE */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 opacity-60">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">99.9%</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500">Uptime</p>
            </div>
            {/* Border removed on mobile, kept on desktop */}
            <div className="text-center sm:border-x border-white/10 px-0 sm:px-4 md:px-12">
              <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">24/7</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500">Support</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white tracking-tighter">&lt; 50ms</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500">Latency</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}