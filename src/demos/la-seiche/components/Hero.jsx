import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0F1730] text-white">
      <div className="absolute inset-0">
        <img
          src="/images/la-seiche/1.jpg"
          alt="Ambiance nocturne au Marché de la Seiche"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1730]/80 via-[#0F1730]/70 to-[#0F1730]/90" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 sm:px-6 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-[#0E7490]">Sévrier • Haute-Savoie</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Marché de la Seiche — bar • restaurants • loisirs
          </h1>
          <p className="mt-5 text-base text-white/85">
            1 200 m² intérieur • 1 500 m² extérieur • Sévrier. Programmes hebdo, food-court, afterworks, live & loisirs sur les rives du lac.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <PrimaryButton href="#agenda">Agenda des soirées</PrimaryButton>
            <GhostButton href="#privatiser">Privatiser un espace</GhostButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
