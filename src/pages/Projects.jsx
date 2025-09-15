// src/pages/Projects.jsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "Site Vitrine — Restaurant Le Soleil",
    category: "Site vitrine / Restauration",
    image: "/projects/restaurant.jpg",
    link: "https://exemple-restaurant.com"
  },
  {
    title: "Portfolio Client — Designer UX",
    category: "Portfolio",
    image: "/projects/portfolio.jpg",
    link: "https://exemple-portfolio.com"
  },
  {
    title: "E-commerce — Boutique Sport",
    category: "E-commerce",
    image: "/projects/ecommerce.jpg",
    link: "https://exemple-shop.com"
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mes Projets</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Une sélection de réalisations récentes : design soigné, performance et identité forte.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl overflow-hidden shadow-lg bg-neutral-100 dark:bg-neutral-900 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div className="h-56 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-left">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{p.category}</p>
              <span className="text-blue-600 dark:text-blue-400 font-medium">→ Voir le projet</span>
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
