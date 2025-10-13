import { motion } from "framer-motion";

const INSTAGRAM_IMAGES = [
  "/images/la-seiche/3.jpg",
  "/images/la-seiche/4.jpg",
  "/images/la-seiche/5.jpg",
  "/images/la-seiche/6.jpg",
  "/images/la-seiche/2.jpg",
  "/images/la-seiche/1.jpg",
];

export default function Instagram() {
  return (
    <section id="instagram" className="bg-white px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#0E7490]">Social</p>
          <h2 className="text-3xl font-semibold text-[#0F1730]">La Seiche sur Instagram</h2>
          <p className="text-sm text-[#0F1730]/70">Coulisses, nouveaux stands, playlists, afterworks & surprises.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSTAGRAM_IMAGES.map((image, index) => (
            <motion.div
              key={image}
              className="card overflow-hidden"
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
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            Suivre sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
