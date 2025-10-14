import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const IMAGES = [
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fff5f5] text-[#2a0e0e]">
      <div className="absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[360px] w-[360px] rounded-full bg-[#ffe1e4] blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-12%] h-[320px] w-[420px] rounded-[999px] bg-[#ffd1d7] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24 sm:px-6 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c1121f] shadow-sm">
            Sévrier • Haute-Savoie
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            La Seiche — bar • restaurants • loisirs sur 2 700 m²
          </h1>
          <p className="mt-5 text-base text-[#451315]/85">
            Food-court, bar central, rooftop & agenda live pour fédérer les acteurs du lac d’Annecy. Une maquette sur-mesure qui transforme les recherches Google/Maps en réservations concrètes.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[#451315]/80">
            <li>• Agenda partageable et boutons « Venir ce soir » / « Privatiser »</li>
            <li>• Stands détaillés avec temps d’attente en direct</li>
            <li>• Newsletter + Facebook intégrés pour vos actualités</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <PrimaryButton href="#agenda">Agenda des soirées</PrimaryButton>
            <GhostButton href="#maquette">Voir la proposition</GhostButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex flex-1 justify-center lg:justify-end"
        >
          <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
            <div className="card overflow-hidden rounded-3xl border-[#f4c5ca] bg-white">
              <img src={IMAGES[0]} alt="Cocktail signature La Seiche" className="h-56 w-full object-cover" />
              <div className="space-y-1 px-5 py-4 text-sm text-[#451315]/80">
                <p className="font-semibold text-[#2a0e0e]">Cocktails live & DJ sets</p>
                <p>Un rythme hebdo à mettre en avant dans le calendrier en ligne.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="card h-full overflow-hidden rounded-3xl border-[#f4c5ca] bg-white">
                <img src={IMAGES[1]} alt="Food-court La Seiche" className="h-40 w-full object-cover" />
                <div className="px-5 py-4 text-sm text-[#451315]/80">
                  <p className="font-semibold text-[#2a0e0e]">8 stands food en rotation</p>
                  <p>Chaque stand présenté avec spécialités et temps d’attente.</p>
                </div>
              </div>
              <div className="card overflow-hidden rounded-3xl border-[#f4c5ca] bg-white">
                <img src={IMAGES[2]} alt="Terrasse extérieure" className="h-32 w-full object-cover" />
                <div className="px-5 py-4 text-sm text-[#451315]/80">
                  <p className="font-semibold text-[#2a0e0e]">Rooftop • lac & montagnes</p>
                  <p>Photos immersives pour booster les demandes de privatisation.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
