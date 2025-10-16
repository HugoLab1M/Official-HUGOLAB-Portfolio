import { LoisirsSection } from "../components/Stands.jsx";

const LEAD_BG =
  "https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=2000&q=80";

export default function LoisirsPage() {
  return (
    <div className="bg-[var(--bg)]">
      <header className="relative isolate overflow-hidden">
        <img
          src={LEAD_BG}
          alt="Loisirs et jeux La Seiche"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110b07]/80 via-[#110b07]/40 to-[#110b07]/80" />
        <div className="relative mx-auto flex min-h-[400px] max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.14em] uppercase">Sorties &amp; loisirs</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-5xl">
            Jeux grande taille, animations live et terrasses chill
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Billards, baby-foot, arcade rétro, fléchettes, pétanque, skatepark et aire kids : La Seiche propose
            de prolonger la soirée au-delà des assiettes. Ajoutez ateliers, cours de danse, karaokés et brunchs pour
            un programme complet.
          </p>
        </div>
      </header>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" />
      </section>
      <LoisirsSection />
    </div>
  );
}
