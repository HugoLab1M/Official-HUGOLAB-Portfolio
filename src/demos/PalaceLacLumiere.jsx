import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Menu,
  Globe2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const PALETTE = {
  midnight: "#303a59",
  sand: "#b4824b",
  ivory: "#f4f0e9",
  ink: "#17213e",
  slate: "#68708d",
};

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1551888419-7ab9470cb2a9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
];

const SECTIONS = {
  intro: {
    eyebrow: "Palace cinq étoiles, Lac d'Émeraude",
    title: "L'Éclat des Rives — Hôtel & Spa",
    lead:
      "Notre palace cinq étoiles, membre de la collection Lumière, conjugue l'art-de-vivre lacustre avec une hospitalité contemporaine. Des suites baignées de lumière, un spa suspendu au-dessus des eaux, une table gastronomique auréolée… Laissez-vous porter.",
    paragraphs: [
      "Séjournez dans nos chambres et suites au confort confidentiel, dégustez une cuisine subtile et moderne, flânez sur notre plage privée ou relaxez-vous au spa signature. Découvrez l'âme Art déco de cette maison iconique lovée sur les rives du lac d'Émeraude.",
      "Vivez un séjour d'exception, entre contemplation, expériences sensorielles et service majordome 24/7.",
    ],
    links: [
      { label: "Suites & chambres", href: "#suites" },
      { label: "Spa Lumière", href: "#spa" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80",
        alt: "Terrasse panoramique du palace sur le lac d'Émeraude",
        legend: "Terrasse panoramique au petit matin",
      },
      {
        src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
        alt: "Spa suspendu avec vue sur le lac",
        legend: "Spa suspendu sur l'eau et rituels signature",
      },
      {
        src: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
        alt: "Suite art déco illuminée au crépuscule",
        legend: "Suites Art déco baignées de lumière",
      },
    ],
  },
  dining: {
    eyebrow: "Restaurant signature",
    title: "Une expérience des sens",
    copy:
      "La Maison des Flots allie l'esprit Art déco et une inspiration alpine. Sous la verrière panoramique, la cheffe Lila Moreau imagine des menus accordant produits du lac, herbes sauvages et signatures contemporaines.",
    highlights: [
      "Menu dégustation en 7 temps",
      "Accords rares sélectionnés par notre sommelière",
      "Salon panoramique sur le lac",
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  suites: {
    eyebrow: "Chambres, suites & villa privée",
    title: "Élégance naturelle et charme confidentiel",
    copy:
      "66 clefs baignées de lumière, décorées par l'atelier Cérès : boiseries chêne clair, motifs inspirés de la vague, balcon sur le lac. Notre villa privatisable accueille familles et événements intimes dans un écrin de verdure.",
    cta: "Réservez un séjour",
    cards: [
      {
        title: "Suite Panoramique",
        desc: "110 m² • Terrasse plein lac • Majordome",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Junior Suite Verrière",
        desc: "70 m² • Bow-window Art déco • Bain marbre",
        image: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Deluxe Rivage",
        desc: "38 m² • Balcon filant • Café signature",
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Villa Cèdre",
        desc: "250 m² • Jardin privé • Chef dédié",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  spa: {
    eyebrow: "Spa & rituels lacustres",
    title: "Lumière suspendue",
    copy:
      "Un spa de 900 m² posé à fleur d'eau : bassin intérieur-extérieurs, sauna vitré, cabines duo ouvertes sur le lac. Nos thérapeutes signent des rituels aux algues d'emerald et quartz chauffés.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Piscine à débordement (31°C)",
      "Bain à remous extérieur vue montagnes",
      "Rituels signature : Lueur, Contemplation, Horizon",
      "Studio holistique & yoga au lever du soleil",
    ],
  },
  experiences: {
    eyebrow: "Moments sur mesure",
    items: [
      {
        title: "Croisière crépuscule",
        copy: "Embarquez sur notre runabout Riva pour un apéritif coucher de soleil, accompagné par notre chef mixologiste.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
        details: [
          "Capitaine privé & champagne millésimé",
          "Mixologie signature servie à bord",
          "Playlist live imaginée par notre DJ résident",
        ],
      },
      {
        title: "Atelier floral",
        copy: "Composez un bouquet lacustre avec notre botaniste résident, inspiré des rives de l'Emeraude.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80",
        details: [
          "Herbier lacustre & essences rares",
          "Coaching botanique personnalisé",
          "Création de bouquet prêt à emporter",
        ],
      },
      {
        title: "Dîner sur pilotis",
        copy: "Table privatisée, menu sur-mesure, accords rares, harpiste en toile de fond.",
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=80",
        details: [
          "Menu en 9 temps, accords millésimés",
          "Service majordome & harpiste live",
          "Héliport & transferts sur demande",
        ],
      },
    ],
  },
  practical: {
    eyebrow: "Accès & conciergerie",
    address: "Quai des Cèdres, 74410 Veyrier-sur-Emeraude, France",
    phone: "+33 4 58 00 12 90",
    email: "concierge@eclatdesrives.com",
    copy:
      "Nos concierges Clefs d'Or orchestrent transferts privés, survols alpins, dîners étoilés en ville et découvertes hors du temps.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
  },
};

const TEXTS = {
  fr: {
    navMenu: "Menu",
    navReserve: "Réserver en ligne",
    navMenus: "Carte & menus",
    navGifts: "Coffrets cadeaux",
    ctaPrimary: "Réserver un séjour",
    ctaSecondary: "Découvrir la maison",
    pause: "Pause",
    play: "Lire",
    suitesBtn: "Explorer toutes les suites",
    experiencesTitle: "Expériences signature",
    contactCta: "Contacter la conciergerie",
  },
  en: {
    navMenu: "Menu",
    navReserve: "Book online",
    navMenus: "Menus",
    navGifts: "Gift boxes",
    ctaPrimary: "Book your stay",
    ctaSecondary: "Discover the estate",
    pause: "Pause",
    play: "Play",
    suitesBtn: "Explore all suites",
    experiencesTitle: "Signature experiences",
    contactCta: "Contact concierge",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PalaceLacLumiere() {
  const [lang, setLang] = useState("fr");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const copy = useMemo(() => TEXTS[lang], [lang]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const heroImage = HERO_SLIDES[activeSlide];

  return (
    <div className="min-h-screen bg-white text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>
      <header className="relative min-h-screen text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,22,38,0.75) 0%, rgba(15,22,38,0.35) 40%, rgba(15,22,38,0.75) 100%), url(${heroImage})`,
            backgroundAttachment: "fixed",
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <TopNav lang={lang} setLang={setLang} copy={copy} />

          <div className="flex-1 px-6 pb-20 pt-16 sm:px-12 lg:px-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl"
            >
              <p className="tracking-[0.6em] text-xs uppercase text-white/80">L'ÉCLAT DES RIVES</p>
              <h1 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl lg:text-[3.5rem]">Palace, spa & tables sur le lac</h1>
              <p className="mt-6 max-w-2xl text-base text-white/85 lg:text-lg">
                Un palace Art déco au bord du lac d'Émeraude : suites panoramiques, spa suspendu, tables étoilées et plage privée. Le tout orchestré par un service majordome sur-mesure.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 text-[0.7rem] tracking-[0.4em]">
                <a
                  className="inline-flex items-center gap-3 bg-white px-6 py-3 font-semibold uppercase text-[var(--ink)] transition hover:bg-white/85"
                  href="#contact"
                >
                  {copy.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  className="inline-flex items-center gap-3 border border-white/60 px-6 py-3 font-semibold uppercase"
                  href="#intro"
                >
                  {copy.ctaSecondary}
                </a>
              </div>
            </motion.div>

            <div className="mt-12 flex items-center gap-4 text-white/70">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? copy.pause : copy.play}
              </button>
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 w-2 rounded-full transition ${idx === activeSlide ? "bg-white" : "bg-white/40"}`}
                    aria-label={`Afficher la slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-[var(--ivory)] text-[var(--ink)]" style={{ "--ivory": PALETTE.ivory }}>
        <IntroSection lang={lang} />
        <DiningSection />
        <SuitesSection copy={copy} />
        <SpaSection />
        <ExperiencesSection lang={lang} copy={copy} />
        <PracticalSection copy={copy} />
      </main>

      <footer className="bg-white py-12 text-center text-xs uppercase tracking-[0.4em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
        © {new Date().getFullYear()} L'Éclat des Rives — Conception HügoLab
      </footer>
    </div>
  );
}

function TopNav({ lang, setLang, copy }) {
  return (
    <div className="flex items-center justify-between px-6 py-6 text-sm tracking-[0.3em] sm:px-12 lg:px-24">
      <button type="button" className="flex items-center gap-3 text-white/80">
        <Menu className="h-5 w-5" />
        {copy.navMenu.toUpperCase()}
      </button>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[0.65rem] uppercase tracking-[0.6em] text-white/70">L'ÉCLAT DES RIVES</span>
        <span className="text-lg tracking-[0.6em]">PALACE</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1 text-white/80 text-xs uppercase tracking-[0.3em]">
          <Globe2 className="h-4 w-4" />
          <span>{lang === "fr" ? "Français" : "English"}</span>
          <button
            type="button"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="text-white/50"
            aria-label="Changer de langue"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.35em] text-white/80 lg:flex">
          <a className="hover:text-white" href="#suites">{copy.navReserve}</a>
          <a className="hover:text-white" href="#dining">{copy.navMenus}</a>
          <a className="hover:text-white" href="#experiences">{copy.navGifts}</a>
        </nav>
      </div>
    </div>
  );
}

function IntroSection({ lang }) {
  const data = SECTIONS.intro;
  const [activeImage, setActiveImage] = useState(0);
  const [isFullView, setIsFullView] = useState(false);
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.5 });
  const gallery = data.gallery ?? [];
  const currentFrame = gallery[activeImage] ?? null;
  const viewFullLabel = lang === "fr" ? "Voir en grand" : "Full view";
  const closeLabel = lang === "fr" ? "Fermer" : "Close";

  return (
    <section id="intro" className="relative overflow-hidden bg-[var(--ivory)] px-6 py-24 sm:px-12 lg:px-32" style={{ "--ivory": PALETTE.ivory }}>
      <div className="pointer-events-none absolute -left-24 top-32 hidden h-64 w-64 rounded-full bg-[var(--sand)]/10 blur-2xl lg:block" style={{ "--sand": PALETTE.sand }} />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <motion.div
          ref={accentRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-6 text-left text-[var(--ink)]"
          style={{ "--ink": PALETTE.ink }}
        >
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
              {data.eyebrow}
            </p>
            <div className="mt-4">
              <AccentLine isActive={isInView} />
            </div>
            <h2 className="mt-4 text-3xl font-light sm:text-4xl">{data.title}</h2>
          </div>
          <p className="text-sm text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
            {data.lead}
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--ink)]">
            {data.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.4em]">
            {data.links.map((link) => (
              <a
                key={link.href}
                className="inline-flex items-center gap-2 text-[var(--sand)] transition hover:text-[var(--sand-dark)]"
                style={{ "--sand": PALETTE.sand, "--sand-dark": "#8e6330" }}
                href={link.href}
              >
                {link.label}
                <ChevronRight className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Ornament className="mt-8 lg:mt-12" />
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute -right-16 top-0 hidden h-48 w-48 rounded-full border border-[var(--sand)]/40 lg:block" style={{ "--sand": PALETTE.sand }} />
          <AnimatePresence mode="wait">
            {currentFrame && (
              <motion.div
                key={currentFrame.src}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-[rgba(23,33,62,0.1)]"
              >
                <img src={currentFrame.src} alt={currentFrame.alt} className="h-full max-h-[520px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626]/60 via-[#0f1626]/10 to-transparent transition-opacity group-hover:opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 bg-gradient-to-t from-[#0f1626]/70 via-[#0f1626]/40 to-transparent px-6 pb-6 pt-10 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/70">Lac & lumière palace</p>
                    <p className="mt-2 text-sm font-medium leading-snug">{currentFrame.legend}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFullView(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-[var(--ink)]"
                  >
                    {viewFullLabel}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {gallery.length > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {gallery.map((frame, idx) => (
                  <button
                    key={frame.src}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`group relative h-16 w-16 overflow-hidden rounded-full border transition ${
                      idx === activeImage ? "border-[var(--sand)] shadow" : "border-white/60"
                    }`}
                    style={{ "--sand": PALETTE.sand }}
                    aria-label={`Afficher ${frame.legend}`}
                  >
                    <img src={frame.src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="pointer-events-none absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                  </button>
                ))}
              </div>
              <span className="text-[0.7rem] uppercase tracking-[0.4em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
                {activeImage + 1} / {gallery.length}
              </span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFullView && currentFrame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white"
            >
              <img src={currentFrame.src} alt={currentFrame.alt} className="h-full w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => setIsFullView(false)}
                className="absolute top-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-black/90"
              >
                {closeLabel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DiningSection() {
  const data = SECTIONS.dining;
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.45 });
  return (
    <section id="dining" className="relative bg-[var(--midnight)] px-6 py-24 text-white sm:px-12 lg:px-24" style={{ "--midnight": PALETTE.midnight }}>
      <div className="pointer-events-none absolute -left-24 top-12 hidden h-64 w-64 rounded-full bg-white/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute right-10 bottom-10 hidden h-24 w-24 rounded-full border border-white/20 lg:block" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div
          ref={accentRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-white/60">{data.eyebrow}</p>
          <AccentLine isActive={isInView} color="#d1b18a" />
          <h2 className="text-3xl font-light">{data.title}</h2>
          <p className="text-sm leading-relaxed text-white/80">{data.copy}</p>
          <ul className="space-y-2 text-sm text-white/70">
            {data.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-[6px] w-[6px] bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={data.image}
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="group aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-[rgba(0,0,0,0.22)]"
            >
              <img src={data.image} alt="Restaurant" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <span className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-full bg-white/90 px-5 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-[var(--midnight)]">
                Signature Lumière
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SuitesSection({ copy }) {
  const data = SECTIONS.suites;
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.45 });
  return (
    <section id="suites" className="relative bg-white px-6 py-24 sm:px-12 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={accentRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl"
        >
          <div className="pointer-events-none absolute -left-24 top-10 hidden h-36 w-36 rounded-full border border-[var(--sand)]/25 lg:block" style={{ "--sand": PALETTE.sand }} />
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
            {data.eyebrow}
          </p>
          <div className="mt-4">
            <AccentLine isActive={isInView} />
          </div>
          <h2 className="mt-4 text-3xl font-light text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>{data.title}</h2>
          <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">{data.copy}</p>
          <a
            className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[var(--sand)]"
            style={{ "--sand": PALETTE.sand }}
            href="#contact"
          >
            {copy.suitesBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2">
          <div className="pointer-events-none absolute -top-10 right-12 hidden h-24 w-24 rounded-full bg-[var(--ivory)]/80 blur-2xl md:block" style={{ "--ivory": PALETTE.ivory }} />
          {data.cards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group overflow-hidden rounded-3xl border border-[var(--ivory-dark)] bg-white shadow-sm ring-1 ring-black/5"
              style={{ "--ivory-dark": "#e3dcd1" }}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-[var(--sand)]" style={{ "--sand": PALETTE.sand }}>
                  Vue lac
                </span>
              </div>
              <div className="space-y-2 px-6 py-5 text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>
                <h3 className="text-lg font-semibold tracking-[0.08em] text-[var(--sand)]" style={{ "--sand": PALETTE.sand }}>{card.title}</h3>
                <p className="text-sm text-[var(--muted)]">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaSection() {
  const data = SECTIONS.spa;
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.45 });
  return (
    <section id="spa" className="relative overflow-hidden px-0">
      <div
        className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]"
        style={{ backgroundColor: PALETTE.midnight }}
      >
        <div className="px-6 py-20 text-white sm:px-12 lg:px-24">
          <motion.div
            ref={accentRef}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative space-y-6"
          >
            <div className="pointer-events-none absolute -left-16 top-4 hidden h-24 w-24 rounded-full border border-white/15 lg:block" />
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">{data.eyebrow}</p>
            <AccentLine isActive={isInView} color="#d1b18a" />
            <h2 className="text-3xl font-light">{data.title}</h2>
            <p className="text-sm text-white/75">{data.copy}</p>
            <ul className="space-y-3 text-sm text-white/65">
              {data.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-[6px] w-[6px] bg-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div
          className="h-full min-h-[360px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,22,38,0.35) 0%, rgba(15,22,38,0.35) 100%), url(${data.image})`,
            backgroundAttachment: "fixed",
          }}
        />
      </div>
    </section>
  );
}

function ExperiencesSection({ lang, copy }) {
  const data = SECTIONS.experiences;
  const [activeCard, setActiveCard] = useState(data.items[0]?.title ?? null);
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.45 });
  const baseCard = data.items[0]?.title ?? null;
  const expandedLabel = lang === "fr" ? "Explorer" : "Discover";

  const handleSelect = (title) => {
    setActiveCard(title);
  };

  const handleReset = () => {
    setActiveCard(baseCard);
  };

  return (
    <section id="experiences" className="bg-[var(--ivory)] px-6 py-24 sm:px-12 lg:px-32" style={{ "--ivory": PALETTE.ivory }}>
      <motion.div
        ref={accentRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="pointer-events-none absolute -left-20 bottom-16 hidden h-24 w-24 rounded-full bg-[var(--sand)]/12 blur-xl lg:block" style={{ "--sand": PALETTE.sand }} />
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>{data.eyebrow}</p>
          <div className="mt-4">
            <AccentLine isActive={isInView} />
          </div>
          <h2 className="mt-3 text-3xl font-light text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>{copy.experiencesTitle}</h2>
          <p className="mt-5 text-sm text-[var(--muted)]">
            Escapades sur le lac, ateliers sensoriels, découvertes culinaires et culturelles — chaque moment est pensé sur-mesure par nos équipes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {data.items.map((item) => {
            const isActive = activeCard === item.title;
            return (
              <motion.article
                key={item.title}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onMouseEnter={() => handleSelect(item.title)}
                onFocus={() => handleSelect(item.title)}
                onMouseLeave={handleReset}
                onBlur={handleReset}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect(item.title);
                  }
                }}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive ? "rgba(180,130,75,0.55)" : "rgba(227,220,209,1)",
                  boxShadow: isActive
                    ? "0px 28px 80px rgba(23,33,62,0.18)"
                    : "0px 12px 36px rgba(23,33,62,0.08)",
                  backgroundColor: isActive ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--ivory-dark)] px-6 py-6 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ivory)]"
                style={{ "--ivory-dark": "#e3dcd1", "--sand": PALETTE.sand }}
              >
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-[6px] w-[6px] rounded-full bg-[var(--sand)]" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--sand)]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[var(--muted)]">{item.copy}</p>
                  <AnimatePresence>
                    {isActive && item.details?.length ? (
                      <motion.ul
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-2 text-xs uppercase tracking-[0.3em] text-[var(--sand)]"
                      >
                        {item.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="mt-[6px] h-[2px] w-8 bg-[var(--sand)]/60" />
                            <span className="text-[var(--muted)] normal-case tracking-normal">{detail}</span>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </div>
                <motion.div
                  className="relative mt-6 h-36 w-full overflow-hidden rounded-2xl bg-white/40 shadow-inner"
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 0.2 : 0.35 }}
                    className="absolute inset-0 bg-[var(--sand)]"
                    style={{ mixBlendMode: "soft-light" }}
                  />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0.9 : 0.4 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-[var(--sand)]/10"
                />
                <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-[var(--sand)]">
                  {expandedLabel}
                  <ChevronRight className="h-4 w-4" />
                </span>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function PracticalSection({ copy }) {
  const data = SECTIONS.practical;
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { amount: 0.45 });
  return (
    <section id="contact" className="bg-white px-6 py-24 sm:px-12 lg:px-32">
      <motion.div
        ref={accentRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-2"
      >
        <div className="pointer-events-none absolute -left-12 top-10 hidden h-36 w-36 rounded-full bg-[var(--sand)]/15 blur-3xl lg:block" style={{ "--sand": PALETTE.sand }} />
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>{data.eyebrow}</p>
          <AccentLine isActive={isInView} />
          <h2 className="text-3xl font-light text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>Conciergerie & séjour</h2>
          <p className="text-sm text-[var(--muted)]">{data.copy}</p>
          <div className="space-y-3 text-sm text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[var(--sand)]" style={{ "--sand": PALETTE.sand }} /> {data.address}</p>
            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-[var(--sand)]" style={{ "--sand": PALETTE.sand }} /> <a href={`tel:${data.phone.replace(/\s+/g, "")}`} className="hover:underline">{data.phone}</a></p>
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[var(--sand)]" style={{ "--sand": PALETTE.sand }} /> <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></p>
          </div>
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-3 border border-[var(--sand)] px-6 py-3 text-xs uppercase tracking-[0.4em] text-[var(--sand)] transition hover:bg-[var(--sand)] hover:text-white"
            style={{ "--sand": PALETTE.sand }}
          >
            {copy.contactCta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div
          className="group relative h-80 w-full overflow-hidden rounded-3xl border border-[var(--ivory-dark)] shadow-lg lg:h-[23rem]"
          style={{ "--ivory-dark": "#e3dcd1" }}
        >
          <img
            src={data.image}
            alt="Conciergerie"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626]/40 via-transparent to-white/5 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[var(--sand)] shadow" style={{ "--sand": PALETTE.sand }}>
            Concierge desk
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AccentLine({ isActive, color = PALETTE.sand, className = "" }) {
  return (
    <motion.span
      className={`block h-[2px] ${className}`}
      style={{ backgroundColor: color }}
      initial={{ width: 0, x: -48, opacity: 0 }}
      animate={isActive ? { width: 120, x: 0, opacity: 1 } : { width: 0, x: 48, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );
}

function Ornament({ className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-3 text-[var(--sand)] ${className}`} style={{ "--sand": PALETTE.sand }}>
      <span className="h-[38px] w-px bg-[rgba(247,242,234,0.4)]" />
      <span className="h-4 w-4 rotate-45 border border-[var(--sand)]" />
      <span className="h-[38px] w-px bg-[rgba(247,242,234,0.4)]" />
    </div>
  );
}
