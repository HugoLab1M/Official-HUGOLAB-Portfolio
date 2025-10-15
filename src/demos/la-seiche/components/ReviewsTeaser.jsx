import { MessageCircleHeart, Star } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const HIGHLIGHTS = [
  {
    label: "Avis Google",
    value: "4,7/5",
    description: "Notes moyennes sur les saisons passées (maquette).",
  },
  {
    label: "Privatisations",
    value: "120+",
    description: "Évènements entreprises, anniversaires et concerts organisés.",
  },
  {
    label: "Communauté",
    value: "8 500",
    description: "Abonnés sur Instagram, Facebook & WhatsApp (maquette).",
  },
];

export default function ReviewsTeaser() {
  return (
    <section className="relative bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-8">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-[var(--muted)]">
            <MessageCircleHeart size={16} />
            Expériences clients
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] sm:text-[2.2rem]">
            Ils reviennent pour l’ambiance, les cartes et les soirées live
          </h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            La Seiche capitalise sur ses communautés locales : Google, réseaux sociaux, bouche-à-oreille.
            La mise en page Hugolab valorise les chiffres clés, les avis et les argumentaires en un bloc
            éditorial clair, directement lié au CTA privatisation ou à la page Agenda.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/avis">Consulter les avis</PrimaryButton>
            <GhostButton href="#privatiser">Privatiser La Seiche</GhostButton>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="space-y-3 text-center sm:text-left">
              <p className="text-xs font-medium tracking-[0.08em] text-[var(--muted)]">
                {item.label}
              </p>
              <p className="text-3xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {item.value}
              </p>
              <div className="flex items-center justify-center gap-1 text-[var(--brown)] sm:justify-start">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} className="opacity-60" />
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
