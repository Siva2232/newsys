import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const technologies = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Framer", logo: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Go", logo: "https://cdn.simpleicons.org/go/00ADD8" },
];

export default function TechStack() {
  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden">
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10 mb-20">
        <SectionTitle
          subtitle="Our Ecosystem"
          title="The Tools of Innovation"
          center
        />
      </Container>

      {/* 2. THE MARQUEE SYSTEM */}
      <div className="flex flex-col gap-6">
        <MarqueeRow items={technologies} direction="left" speed={30} />
        <MarqueeRow items={[...technologies].reverse()} direction="right" speed={35} />
      </div>

      {/* Bottom Subtle Reflection */}
      <div className="mt-20 flex justify-center opacity-20">
         <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
      </div>
    </section>
  );
}

// --- High-Fidelity Marquee Row Component ---
function MarqueeRow({ items, direction = "left", speed = 30 }) {
  const duplicatedItems = [...items, ...items, ...items]; // Triple for ultra-smooth loop

  return (
    <div className="relative group overflow-hidden py-4">
      {/* Precision Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-[15%] md:w-[25%] bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15%] md:w-[25%] bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        initial={{ x: direction === "left" ? 0 : "-33.33%" }}
        animate={{ x: direction === "left" ? "-33.33%" : 0 }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        // Pause on Hover Effect
        whileHover={{ transition: { duration: speed * 2 } }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="relative flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:bg-slate-800/60 group/card"
          >
            {/* Inner Glow on Hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
            
            <img
              src={item.logo}
              alt={item.name}
              className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-[0.8] contrast-[1.2] group-hover/card:brightness-100 group-hover/card:scale-110 transition-all duration-500"
            />
            <span className="text-sm md:text-xl font-bold tracking-tight text-slate-500 group-hover/card:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}