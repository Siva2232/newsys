import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight, Facebook } from "lucide-react";
import Container from "../components/common/Container";
import { companyInfo } from "../data/companyInfo";
import Logo11 from "../assets/Logo11.png"; // adjust path if needed
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/5">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 blur-[80px] md:blur-[120px] rounded-full" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* --- BRAND COLUMN --- */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <Link 
  to="/" 
  className="flex items-center gap-3 group"
  aria-label="Home"
>
  <div className="flex items-center">
    <img 
      src={Logo11} 
      alt="Perfect Digital Logo" 
      className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* OPTIONAL TEXT (same as header if needed) */}
  {/*
  <div className="flex flex-col leading-tight">
    <span className="text-lg md:text-xl font-extrabold tracking-tight text-white">
      Perfect<span className="text-cyan-400">Digital</span>
    </span>
    <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
      System Active
    </span>
  </div>
  */}
</Link>
            
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-sm">
              Architecting the next generation of digital infrastructure with <span className="text-white">precision and security.</span>
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-green-500 uppercase tracking-widest">Systems Online</span>
              </div>
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            
            {/* Quick Links */}
            <div className="space-y-5 md:space-y-6">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Platform</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
                {["Solutions", "Infrastructure", "Security", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-sm text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors group py-1 sm:py-0">
                      {item}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 hidden sm:block" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-5 md:space-y-6">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Connect</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-500 group cursor-pointer py-1">
                  <Mail size={16} className="text-slate-700 group-hover:text-cyan-500 flex-shrink-0" />
                  <span className="group-hover:text-white transition-colors truncate">{companyInfo.contact.email}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500 group cursor-pointer py-1">
                  <Phone size={16} className="text-slate-700 group-hover:text-cyan-500 flex-shrink-0" />
                  <span className="group-hover:text-white transition-colors">{companyInfo.contact.phone}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500 group cursor-pointer leading-tight py-1">
                  <MapPin size={16} className="text-slate-700 group-hover:text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="group-hover:text-white transition-colors">{companyInfo.contact.address}</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-5 md:space-y-6">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Newsletter</h4>
              <div className="relative group max-w-sm">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-white text-black text-[10px] font-black uppercase rounded-lg hover:bg-cyan-400 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
              &copy; {currentYear} {companyInfo.name} 
              <span className="hidden sm:inline mx-2">/</span> 
              <br className="sm:hidden" />
              Engineered in SF
            </p>
          </div>
          
          <div className="flex items-center gap-8 order-1 md:order-2">
            <div className="flex gap-6">
              {[
                { icon: <Linkedin size={20} />, href: companyInfo.socialLinks.linkedin },
                { icon: <Twitter size={20} />, href: companyInfo.socialLinks.twitter },
                { icon: <Facebook size={20} />, href: companyInfo.socialLinks.facebook }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-600 hover:text-cyan-400 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="order-3 flex items-center gap-6 md:gap-8">
            <Link to="#" className="text-[9px] md:text-[10px] font-bold uppercase text-slate-600 hover:text-white transition-colors tracking-widest">Privacy</Link>
            <Link to="#" className="text-[9px] md:text-[10px] font-bold uppercase text-slate-600 hover:text-white transition-colors tracking-widest">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}