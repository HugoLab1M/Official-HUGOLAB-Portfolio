import { BarSection } from "../components/Stands.jsx";

const LEAD_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80";

export default function BarPage() {
  return (
    <div className="bg-[var(--bg)]">
      <header className="relative isolate overflow-hidden">
        <img
          src={LEAD_BG}
          alt="Bar du Vieux Rhum"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110b07]/80 via-[#110b07]/40 to-[#110b07]/80" />
        <div className="relative mx-auto flex min-h-[400px] max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.14em] uppercase">Bar La Seiche — Sévrier</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-5xl">
            Rhums arrangés, mocktails créatifs et rooftop brasero
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Candy shots, rhums arrangés, collaborations cavistes et brasseurs invités : le bar du Vieux Rhum
            concentre l’ambiance du site entre route 66 lounge et rooftop brasero sur le lac.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">Bars & mixologie</p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] sm:text-[2.3rem]">
            Rhums arrangés, mocktails créatifs et rooftop brasero
          </h1>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Le bar du Vieux Rhum concentre l’ambiance du site : route 66 lounge, rooftop brasero, candy shots,
            accords cocktails & tapas. Collaborations cavistes et brasseurs invités, mocktails signature et carte
            premium pour animer vos soirées après les concerts ou ateliers.
          </p>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Horaires : mercredi et jeudi 18h–00h, vendredi et samedi 18h–00h30, dimanche 12h–23h. Réservez un
            comptoir ou un espace lounge selon vos événements.
          </p>
        </div>
      </section>
      <BarSection />
    </div>
  );
}
