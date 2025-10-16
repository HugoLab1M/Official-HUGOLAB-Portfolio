import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed, Wine, Gamepad2, CalendarDays } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const LOCAL_LOISIRS_IMAGE = new URL("../Images/Imagelaseiche3.jpg", import.meta.url).href;

const SLIDES = [
  {
    key: "restaurant",
    title: "Food court, bar et terrasses au bord du lac",
    subtitle:
      "Cuisine du monde, bars signature et espaces lounge sur 1 200 m² intérieurs et 1 500 m² extérieurs à Sévrier, près d’Annecy.",
    href: "#restaurant",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2100&q=80",
    tone: "light",
  },
  {
    key: "agenda",
    title: "Concerts, soirées dansantes et spectacles locaux",
    subtitle:
      "Rock’n’roll, salsa, bachata, country, jam sessions, stand-up… un programme hebdomadaire qui met à l’honneur les artistes de Haute-Savoie.",
    href: "#agenda",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2100&q=80",
    tone: "light",
  },
  {
    key: "loisirs",
    title: "Sorties, loisirs et jeux pour tous les équipages",
    subtitle:
      "Billards, baby-foot, fléchettes, skatepark, pétanque, aire kids et jeux d’arcade : prolongez la soirée en famille ou entre amis.",
    href: "#loisirs",
    image: LOCAL_LOISIRS_IMAGE,
    tone: "light",
  },
  {
    key: "privatisation",
    title: "Privatiser La Seiche pour vos événements",
    subtitle:
      "Deux niveaux, scène équipée, bars et stands privatisables pour vos anniversaires, séminaires ou lancements produits.",
    href: "#privatiser",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=2100&q=80",
    tone: "dark",
  },
  {
    key: "infos",
    title: "Organisez votre venue à Sévrier",
    subtitle:
      "Horaires, accès, parking gratuit, contact direct et newsletter pour suivre les nouvelles cartes et soirées.",
    href: "#infos",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2100&q=80",
    tone: "dark",
  },
];

const FEATURE_CARDS = [
  {
    label: "Cuisine du monde",
    description: "Pizzas au feu de bois, burgers artisanaux, salades fraîches, recettes mexicaines.",
    Icon: UtensilsCrossed,
    href: "/demos/la-seiche/restaurant",
  },
  {
    label: "Bars & cocktails",
    description: "Rhums arrangés, mocktails créatifs, caves invitées, lounge Route 66 et rooftop.",
    Icon: Wine,
    href: "/demos/la-seiche/bar",
  },
  {
    label: "Loisirs & jeux",
    description: "Billards, baby-foot, arcade, pétanque, skatepark, espace kids et terrasse brasero.",
    Icon: Gamepad2,
    href: "/demos/la-seiche/loisirs",
  },
  {
    label: "Programmation",
    description: "Concerts, jam sessions, karaokés, soirées BSK, rock’n’roll, stand-up et spectacles.",
    Icon: CalendarDays,
    href: "/demos/la-seiche/agenda",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section id="top" className="relative bg-[var(--bg)] pb-20 pt-6 sm:pb-24">
      <div
        className="relative w-screen -translate-x-1/2 overflow-hidden left-1/2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute bottom-[-3px] left-0 right-0 z-20 h-[150px] bg-[var(--bg)] torn-bottom" />

        <div className="relative z-10 h-[72vh] min-h-[560px] sm:min-h-[620px]">
          {SLIDES.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            const isLight = slide.tone === "light";
            const overlay = isLight
              ? `linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0.72) 100%), url('${slide.image}')`
              : `linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.92) 100%), url('${slide.image}')`;
            const headingColor = isLight ? "text-white" : "text-[var(--ink)]";
            const subColor = isLight ? "text-white/90" : "text-[var(--muted)]";
            const outlineClass = isLight
              ? "border-white/70 text-white hover:bg-white hover:text-[var(--ink)]"
              : "border-[rgba(23,23,23,0.18)] text-[var(--ink)] hover:border-[var(--brown)] hover:text-[var(--brown)]";

            return (
              <article
                key={slide.key}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: `translateX(${(slideIndex - index) * 25}px)`,
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: isActive ? 1 : 0,
                  backgroundImage: overlay,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 ${
                    isLight
                      ? "bg-gradient-to-b from-black/55 via-black/25 to-black/70"
                      : "bg-gradient-to-b from-white/75 via-white/35 to-white/85 mix-blend-multiply"
                  }`}
                />
                <div className="relative flex h-full flex-col justify-center gap-6 px-6 pb-24 pt-12 sm:px-12 md:pl-16">
                  <header className={`max-w-xl space-y-4 ${headingColor}`}>
                    <span className="inline-flex items-center rounded-full bg-black/45 px-3 py-1 text-xs font-medium tracking-[0.22em] text-white backdrop-blur md:text-[13px]">
                      La Seiche • Sévrier
                    </span>
                    <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
                      {slide.title}
                    </h1>
                    <p className={`max-w-xl text-lg leading-relaxed sm:text-xl ${subColor}`}>
                      {slide.subtitle}
                    </p>
                  </header>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton href="/demos/la-seiche/agenda" className="sm:w-auto">
                      Programme complet
                    </PrimaryButton>
                    <GhostButton href="/demos/la-seiche/privatisations" className={`${outlineClass} sm:w-auto`}>
                      Privatiser La Seiche
                    </GhostButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pointer-events-auto absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Afficher ${slide.title}`}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? "w-10 bg-white" : "w-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="pointer-events-auto absolute bottom-10 right-6 z-30 hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Slide précédent"
            onClick={() => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white hover:text-[var(--ink)]"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Slide suivant"
            onClick={() => setIndex((prev) => (prev + 1) % SLIDES.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white hover:text-[var(--ink)]"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            La Seiche : bar, restaurant, loisirs
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[2.2rem]">
            Food court, bars, concerts et terrasses à Sévrier, lac d’Annecy
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Sur 1&nbsp;200&nbsp;m² en intérieur et 1&nbsp;500&nbsp;m² en extérieur, La Seiche anime vos sorties au bord
            du lac : restaurants du monde, bars signatures, jeux grande taille, concerts pop/folk/funk, soirées
            salsa-bachata, stand-up Carton Comedy Club et privatisations sur-mesure pour entreprises ou familles.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map(({ label, description, Icon, href }) => (
            <a
              key={label}
              href={href}
              className="group flex flex-col gap-3 rounded-3xl bg-[#F3E0C8] p-6 shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--brown)] shadow">
                <Icon size={22} />
              </span>
              <p className="text-base font-semibold text-[var(--ink)]">{label}</p>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
              <span className="text-sm font-medium text-[var(--brown)] group-hover:underline">
                Explorer
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-[var(--border)]/70 sm:p-8">
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p className="text-base font-semibold text-[var(--ink)]">
              Suivre l’actualité et les programmations
            </p>
            <p>
              Facebook, Instagram ou WhatsApp : restez informé des nouvelles cartes, des concerts et des soirées
              thématiques.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SocialBadge href="https://www.facebook.com/lemarchedelaseiche">Facebook</SocialBadge>
            <SocialBadge href="https://www.instagram.com/marchedelaseiche/">Instagram</SocialBadge>
            <SocialBadge href="https://chat.whatsapp.com/Iq2s0u06hwvBesqpQFXv5T">WhatsApp</SocialBadge>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialBadge({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brown)] hover:text-[var(--brown)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
