import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { PrimaryButton, GhostButton } from "../demos/la-seiche/components/Ctas.jsx";

const REVIEWS = [
  {
    name: "Clémence P.",
    date: "12 octobre 2025",
    rating: 5,
    text: "Toute l’équipe a adoré la privatisation : repas varié, staff au top et soirée DJ jusqu’à minuit.",
  },
  {
    name: "Antoine G.",
    date: "09 octobre 2025",
    rating: 5,
    text: "Le food court est idéal pour notre bande. Mention spéciale aux tacos fumés et à la carte cocktails.",
  },
  {
    name: "Sophie M.",
    date: "05 octobre 2025",
    rating: 4,
    text: "Ambiance chaleureuse, bons plats. Juste un peu d’attente au bar lors des concerts.",
  },
  {
    name: "Julien F.",
    date: "30 septembre 2025",
    rating: 5,
    text: "Nous avons fêté un anniversaire avec 80 invités : organisation fluide, scénographie magique.",
  },
  {
    name: "Nina L.",
    date: "25 septembre 2025",
    rating: 5,
    text: "Les soirées salsa sont devenues notre rituel du jeudi. Equipe souriante, sons parfaits.",
  },
  {
    name: "Caroline D.",
    date: "21 septembre 2025",
    rating: 4,
    text: "Les enfants adorent l’espace jeux et les ateliers. On revient souvent en famille le dimanche.",
  },
  {
    name: "Marc T.",
    date: "18 septembre 2025",
    rating: 5,
    text: "Cadre unique au bord du lac. Idéal pour recevoir nos clients internationaux.",
  },
  {
    name: "Léa B.",
    date: "14 septembre 2025",
    rating: 5,
    text: "Cuisine variée, service rapide, ambiance pirate très réussie. À tester absolument.",
  },
  {
    name: "Thomas R.",
    date: "10 septembre 2025",
    rating: 4,
    text: "Programmation éclectique. Petit bémol : le parking vite complet, pensez au co-voiturage.",
  },
];

const AVERAGE_RATING = REVIEWS.reduce((acc, review) => acc + review.rating, 0) / REVIEWS.length;

export default function AvisPage() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const listener = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const scriptId = "avis-jsonld";
    if (typeof document === "undefined" || document.getElementById(scriptId)) return undefined;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    // Données fictives utilisées uniquement pour la maquette.
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "La Seiche (maquette)",
      "url": "https://lemarchedelaseiche.fr",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": AVERAGE_RATING.toFixed(1),
        "reviewCount": REVIEWS.length,
      }
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const reviewsForDisplay = useMemo(() => {
    if (!isMobile) return REVIEWS;
    return [REVIEWS[current]];
  }, [isMobile, current]);

  const goNext = () => setCurrent((prev) => (prev + 1) % REVIEWS.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <div className="bg-[var(--bg)]">
      <header className="bg-[var(--sand)] pb-12 pt-16 sm:pb-16 sm:pt-20 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
            Témoignages
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-4 after:block after:h-[2px] after:w-16 after:bg-[var(--brown)] sm:text-5xl">
            Avis &amp; témoignages
          </h1>
          <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Exemples fictifs utilisés pour la maquette. Ils démontrent comment valoriser des retours
            clients, la note globale et les citations marquantes directement sur le site.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.06em] text-[var(--muted)]">
            Exemples fictifs à titre de maquette.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="#avis-grid">Découvrir les avis</PrimaryButton>
            <GhostButton href="/demos/la-seiche">Retour à la maquette</GhostButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <section id="avis-grid" className="space-y-10">
          <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--sand)] px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
                  Synthèse (maquette)
                </p>
                <p className="text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {AVERAGE_RATING.toFixed(1)}/5 — {REVIEWS.length} retours
                </p>
              </div>
              <div className="flex items-center gap-1 text-[var(--brown)]">
                {Array.from({ length: 5 }, (_, idx) => (
                  <Star
                    key={idx}
                    size={20}
                    className={idx < Math.round(AVERAGE_RATING) ? "" : "opacity-30"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Les notes et commentaires ci-dessous sont fictifs et servent uniquement à illustrer la
              présentation d’avis sur le site. Ils peuvent être remplacés par vos avis Google, Facebook
              ou formulaires internes.
            </p>
          </div>

          {isMobile ? (
            <div className="space-y-4">
              <ReviewCard review={reviewsForDisplay[0]} />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition hover:text-[var(--brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white"
                >
                  <ChevronLeft size={18} />
                  Précédent
                </button>
                <span className="text-sm text-[var(--muted)]">
                  {current + 1} / {REVIEWS.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition hover:text-[var(--brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Suivant
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviewsForDisplay.map((review) => (
                <ReviewCard key={review.name + review.date} review={review} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ReviewCard({ review }) {
  const initials = useMemo(
    () =>
      review.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [review.name]
  );

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sand)] text-sm font-semibold text-[var(--ink)]">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">{review.name}</p>
          <p className="text-xs text-[var(--muted)]">{review.date}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-[var(--brown)]">
        {Array.from({ length: 5 }, (_, idx) => (
          <Star key={idx} size={16} className={idx < review.rating ? "" : "opacity-30"} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{review.text}</p>
    </article>
  );
}
