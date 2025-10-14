import { motion } from "framer-motion";

const FACEBOOK_IMAGES = [
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
];

export default function Instagram() {
  return (
    <section id="facebook" className="bg-white px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">Réseaux sociaux</p>
          <h2 className="text-3xl font-semibold text-[#2a0e0e]">La Seiche sur Facebook</h2>
          <p className="text-sm text-[#451315]/70">Coulisses du food-court, programmations live et infos privatisations à retrouver chaque semaine.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACEBOOK_IMAGES.map((image, index) => (
            <motion.div
              key={image}
              className="card overflow-hidden border-[#f4c5ca] bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <img src={image} alt="Moments au Marché de la Seiche" className="h-56 w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#c1121f] px-5 py-2.5 text-sm font-semibold text-[#c1121f] transition hover:-translate-y-[1px] hover:bg-[#c1121f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1121f]"
          >
            Suivre sur Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
