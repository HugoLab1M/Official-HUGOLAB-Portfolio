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

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            Sorties & loisirs
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] sm:text-[2.3rem]">
            Jeux grande taille, animations live et terrasses chill
          </h1>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Billards, baby-foot, jeux d’arcade rétro, fléchettes, pétanque, skatepark, aire kids, ping-pong :
            La Seiche propose une multitude d’activités pour prolonger la soirée. Ajoutez les ateliers créatifs,
            les cours de danse, les karaokés et les brunchs en terrasse pour un programme complet.
          </p>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Réserver un créneau, privatiser un espace loisirs ou organiser un tournoi est possible via le
            formulaire de contact ou WhatsApp.
          </p>
        </div>
      </section>
      <LoisirsSection />
    </div>
  );
}
