import { motion } from "framer-motion";
import { stands } from "../data/stands.js";

export default function Stands() {
  return (
    <section id="stands" className="bg-white px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">Food, bar & loisirs</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2a0e0e]">Les stands du Marché</h2>
          <p className="mt-3 text-sm text-[#451315]/70">Temps d'attente indicatifs, mis à jour toutes les 15 minutes par nos équipes.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stands.map((stand, index) => (
            <motion.article
              key={stand.id}
              className="card hover-lift overflow-hidden border-[#f4c5ca] bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative">
                <img src={stand.image} alt={stand.name} className="h-48 w-full object-cover" />
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#c1121f] shadow">
                  {stand.wait}
                </span>
              </div>
              <div className="space-y-3 px-6 py-5">
                <h3 className="text-lg font-semibold text-[#2a0e0e]">{stand.name}</h3>
                <p className="text-sm text-[#451315]/75">Produits frais, recettes signatures et convivialité. Passez dire bonjour !</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
