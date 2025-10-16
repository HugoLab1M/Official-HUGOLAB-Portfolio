import { motion } from "framer-motion";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
    alt: "Plats signatures La Seiche",
  },
  {
    src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    alt: "Cocktails artisanaux",
  },
  {
    src: "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=1200&q=80",
    alt: "Terrasse extérieure de nuit",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    alt: "Ambiance rooftop brasero",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80",
    alt: "Scène et concerts live",
  },
  {
    src: "https://images.unsplash.com/photo-1516302366965-5b1ae04b8b36?auto=format&fit=crop&w=1200&q=80",
    alt: "Zone loisirs & arcade",
  },
];

export default function Instagram() {
  return (
    <section id="photos" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
              Photos & réseaux
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-3 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)] sm:text-4xl">
              Atmosphère du marché et stories La Seiche
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Cette galerie illustre l’expérience : stands gourmands, bars Route 66, terrasses brasero,
              concerts live et animations karaoke. Chaque vignette peut pointer vers une story épinglée ou
              une publication clé d’Instagram et Facebook.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <SocialLink href="https://www.facebook.com/lemarchedelaseiche">Facebook</SocialLink>
            <SocialLink href="https://www.instagram.com/marchedelaseiche/">Instagram</SocialLink>
            <SocialLink href="https://chat.whatsapp.com/Iq2s0u06hwvBesqpQFXv5T">WhatsApp</SocialLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-xl border border-[var(--border)] bg-white p-4 text-[var(--muted)] shadow-sm"
            >
              <div className="h-60 overflow-hidden rounded-lg border border-[var(--border)] bg-black/10">
                <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-3 text-sm font-medium tracking-[-0.01em] text-[var(--ink)]">
                {photo.alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brown)] hover:text-[var(--brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white"
    >
      {children}
    </a>
  );
}
