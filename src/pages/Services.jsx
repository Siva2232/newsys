import ServiceList from "../components/services/ServiceList";

export default function Services() {
  return (
    <div className="bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <ServiceList />
    </div>
  );
}
