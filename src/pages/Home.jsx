import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import About from "../components/home/About";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TechStack from "../components/home/TechStack";
import CTA from "../components/home/CTA";

/** Emprime — startup software company (founded 2025) */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <TechStack />
      <CTA />
    </>
  );
}
