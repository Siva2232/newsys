import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageSquare, Zap, ShieldCheck, Sparkles, Mail, MapPin, Clock } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

const TRUST_ITEMS = [
  { icon: Zap, text: "Fast response — we reply within hours" },
  { icon: ShieldCheck, text: "Your ideas stay confidential" },
  { icon: MessageSquare, text: "Direct communication with our team" },
];

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@emprime.com" },
  { icon: MapPin, label: "Location", value: "India" },
  { icon: Clock, label: "Founded", value: "2025 — Startup" },
];

const FLOATING_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: `${(i * 24 + 10) % 100}%`,
  y: `${(i * 30 + 8) % 100}%`,
  size: 2,
  duration: 5 + (i % 3),
  delay: (i % 4) * 0.4,
}));

function TrustBadge({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 text-slate-400 group"
    >
      <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-cyan-500 border border-white/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium group-hover:text-slate-300 transition-colors">{item.text}</span>
    </motion.div>
  );
}

function InputField({ label, index, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.08 }}
      className="space-y-2"
    >
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-2xl bg-white/[0.04] px-6 py-4 text-white border border-white/[0.06] focus:border-cyan-400/50 outline-none transition-all placeholder:text-slate-600"
        />
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-px bg-cyan-500/60 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function ContactForm() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const [focusedTextarea, setFocusedTextarea] = useState(false);

  const spotlight = useMotionTemplate`
    radial-gradient(
      650px circle at ${springX}px ${springY}px,
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
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.1]" />

        <motion.div
          className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/8 blur-[130px] rounded-full"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/8 blur-[110px] rounded-full"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/20"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -12, 0], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: spotlight }}
      />

      <Container className="relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-cyan-500 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <Sparkles className="relative w-3 h-3" />
                <span className="relative">Contact Emprime</span>
              </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tighter">
                LET'S BUILD{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
                  WITH EMPRIME
                </span>
              </h1>

              <p className="mt-6 text-slate-400 text-base md:text-lg font-light leading-relaxed">
                Tell us about your CRM, website, or app idea. As a 2025 startup with 5+ projects delivered, we know how to move fast and build right.
              </p>
            </div>

            <div className="space-y-5">
              {TRUST_ITEMS.map((item, i) => (
                <TrustBadge key={item.text} item={item} index={i} />
              ))}
            </div>

            {/* Contact info cards */}
            <div className="grid gap-3 pt-4">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{info.label}</p>
                      <p className="text-sm text-slate-300">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 relative group"
          >
            <motion.div
              className="absolute -inset-px rounded-[2.5rem] opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-sm pointer-events-none"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.15))",
                  "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.2))",
                  "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.15))",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <form className="relative p-7 md:p-10 lg:p-12 bg-slate-950/70 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] md:rounded-[2.5rem] space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <InputField label="Your Name" type="text" placeholder="John Doe" index={0} />
                <InputField label="Corporate Email" type="email" placeholder="john@company.com" index={1} />
              </div>

              <InputField label="Subject" type="text" placeholder="CRM / Website / Mobile App" index={2} />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.44 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                  Brief Narrative
                </label>
                <div className="relative">
                  <textarea
                    rows="4"
                    placeholder="Describe your project — CRM, website, app, or custom software..."
                    onFocus={() => setFocusedTextarea(true)}
                    onBlur={() => setFocusedTextarea(false)}
                    className="w-full rounded-2xl bg-white/[0.04] px-6 py-4 text-white border border-white/[0.06] focus:border-cyan-400/50 outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px bg-cyan-500/60 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedTextarea ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="group relative w-full h-14 md:h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                      Send to Emprime
                      <Send size={16} />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-cyan-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  </Button>
                </motion.div>
                <p className="mt-4 text-center text-[10px] text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
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
