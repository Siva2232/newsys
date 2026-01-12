import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Cloud,
  ShieldCheck,
  Cpu,
  Globe,
  Database,
  Lock,
  Code,
  Smartphone,
  Layers,
  ArrowRight
} from "lucide-react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

// Expanded data with specific icons for a "Large Company" feel
const servicesData = [
      {
    id: 1,
    title: "Application Development",
    desc: "Scalable, secure web applications engineered for performance and long-term growth.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Mobile App Development",
    desc: "High-performance iOS & Android apps with native-quality UX and speed.",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Custom Software Solutions",
    desc: "Tailor-made software built to match your exact business workflows and goals.",
    icon: <Layers className="w-6 h-6" />,
  },
//   {
//     id: 4,
//     title: "Edge Computing",
//     desc: "Deploying logic closer to your users to achieve sub-30ms global latency.",
//     icon: <Globe className="w-6 h-6" />,
//   },
//   {
//     id: 5,
//     title: "Database Sharding",
//     desc: "High-throughput database optimization for massive horizontal scaling.",
//     icon: <Database className="w-6 h-6" />,
//   },
//   {
//     id: 6,
//     title: "Encrypted DevOps",
//     desc: "Automated CI/CD pipelines with integrated security compliance checks.",
//     icon: <Lock className="w-6 h-6" />,
//   },
//  {
//     id: 7,
//     title: "Cloud Infrastructure",
//     desc: "Enterprise-grade AWS/Azure architecture designed for 99.99% availability.",
//     icon: <Cloud className="w-6 h-6" />,
//   },
//   {
//     id: 8,
//     title: "Cybersecurity Mesh",
//     desc: "Zero-trust protocols and real-time threat detection for distributed teams.",
//     icon: <ShieldCheck className="w-6 h-6" />,
//   },
//   {
//     id: 9,
//     title: "Neural Analytics",
//     desc: "AI-driven data pipelines that turn raw logs into actionable business logic.",
//     icon: <Cpu className="w-6 h-6" />,
//   },
  /* ───── NEW SERVICES ───── */

];

export default function ServiceList() {
  return (
    <section className="relative py-32 bg-[#020617] overflow-hidden">
      {/* BACKGROUND ARCHITECTURE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#06b6d415,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle
            subtitle="Engineered Solutions"
            title="The Future of Infrastructure"
            center
          />
        </motion.div>

        {/* SERVICE GRID */}
        <div className="grid gap-6 mt-20 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* TRUST FOOTNOTE */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em]"
        >
          Built for Global Scale <span className="mx-4 text-slate-800">|</span> Standardized Protocols
        </motion.p>
      </Container>
    </section>
  );
}

// --- ENHANCED SERVICE CARD COMPONENT ---
function ServiceCard({ service, index }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2rem] border border-white/5 bg-slate-900/40 p-10 transition-all hover:bg-slate-900/60 overflow-hidden"
    >
      {/* SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        {/* ICON CONTAINER */}
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
          {service.icon}
        </div>

        <h3 className="mb-4 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        
        <p className="mb-8 text-sm leading-relaxed text-slate-400 font-light">
          {service.desc}
        </p>

        {/* KINETIC BUTTON */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors cursor-pointer">
          Learn Integration 
          <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
      
      {/* ACCENT BEAM */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}