import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  "https://images.unsplash.com/photo-1509062760040-740e87ef0bfc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1920&q=80",
];

const SECTIONS = {
  intro: {
    eyebrow: "Palace cinq étoiles, Lac d'Émeraude",
    title: "L'Éclat des Rives — Hôtel & Spa",
    lead:
      "Notre palace cinq étoiles, membre de la collection Lumière, conjugue l'art-de-vivre lacustre avec une hospitalité contemporaine. Des suites baignées de lumière, un spa suspendu au-dessus des eaux, une table gastronomique auréolée… Laissez-vous porter." ,
    paragraphs: [
      "Séjournez dans nos chambres et suites au confort confidentiel, dégustez une cuisine subtile et moderne, flânez sur notre plage privée ou relaxez-vous au spa signature. Découvrez l'âme Art déco de cette maison iconique lovée sur les rives du lac d'Émeraude." ,
      "Vivez un séjour d'exception, entre contemplation, expériences sensorielles et service majordome 24/7."
    ],
    links: [
      { label: "Suites & chambres", href: "#suites" },
      { label: "Spa Lumière", href: "#spa" },
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
        image: "https://images.unsplash.com/photo-1627123424574-724758594e02?auto=format&fit=crop&w=1200&q=80",
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
      },
      {
        title: "Atelier floral",
        copy: "Composez un bouquet lacustre avec notre botaniste résident, inspiré des rives de l'Emeraude.",
      },
      {
        title: "Dîner sur pilotis",
        copy: "Table privatisée, menu sur-mesure, accords rares, harpiste en toile de fond.",
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
  return (
    <section id="intro" className="relative overflow-hidden bg-[var(--ivory)] px-6 py-24 sm:px-12 lg:px-32" style={{ "--ivory": PALETTE.ivory }}>
      <BackgroundIllustration position="right" />
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="relative mx-auto max-w-3xl text-center text-[var(--ink)]">
        <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
          {data.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-light sm:text-4xl text-[var(--ink)]">{data.title}</h2>
        <p className="mt-5 text-base text-[var(--slate)]">{data.lead}</p>
        <div className="mt-6 space-y-4 text-sm text-[var(--ink)]">
          {data.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-4 text-xs uppercase tracking-[0.4em]">
          {data.links.map((link) => (
            <a key={link.href} className="inline-flex items-center gap-2 text-[var(--sand)]" style={{ "--sand": PALETTE.sand }} href={link.href}>
              {link.label}
              <ChevronRight className="h-4 w-4" />
            </a>
          ))}
        </div>
        <Ornament className="mt-12" />
      </motion.div>
    </section>
  );
}

function DiningSection() {
  const data = SECTIONS.dining;
  return (
    <section id="dining" className="relative bg-[var(--midnight)] px-6 py-24 text-white sm:px-12 lg:px-24" style={{ "--midnight": PALETTE.midnight }}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-white/60">{data.eyebrow}</p>
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
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3]"
            >
              <img src={data.image} alt="Restaurant" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SuitesSection({ copy }) {
  const data = SECTIONS.suites;
  return (
    <section id="suites" className="relative bg-white px-6 py-24 sm:px-12 lg:px-32">
      <BackgroundIllustration position="left" />
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>
            {data.eyebrow}
          </p>
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {data.cards.map((card) => (
            <div key={card.title} className="border border-[var(--ivory-dark)] bg-white" style={{ "--ivory-dark": "#e3dcd1" }}>
              <img src={card.image} alt={card.title} className="h-64 w-full object-cover" loading="lazy" />
              <div className="space-y-2 px-6 py-5 text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>
                <h3 className="text-lg font-semibold tracking-[0.2em] text-[var(--sand)]" style={{ "--sand": PALETTE.sand }}>{card.title}</h3>
                <p className="text-sm text-[var(--muted)]">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaSection() {
  const data = SECTIONS.spa;
  return (
    <section id="spa" className="relative overflow-hidden px-0">
      <div
        className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]"
        style={{ backgroundColor: PALETTE.midnight }}
      >
        <div className="px-6 py-20 text-white sm:px-12 lg:px-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="space-y-6">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">{data.eyebrow}</p>
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
  return (
    <section id="experiences" className="bg-[var(--ivory)] px-6 py-24 sm:px-12 lg:px-32" style={{ "--ivory": PALETTE.ivory }}>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>{data.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-light text-[var(--ink)]" style={{ "--ink": PALETTE.ink }}>{copy.experiencesTitle}</h2>
            <p className="mt-5 text-sm text-[var(--muted)]">
              Escapades sur le lac, ateliers sensoriels, découvertes culinaires et culturelles — chaque moment est pensé sur-mesure par nos équipes.
            </p>
          </div>

          <div className="grid gap-6 lg:max-w-2xl">
            {data.items.map((item) => (
              <div key={item.title} className="border border-[var(--ivory-dark)] bg-white px-6 py-5" style={{ "--ivory-dark": "#e3dcd1" }}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--sand)]" style={{ "--sand": PALETTE.sand }}>{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PracticalSection({ copy }) {
  const data = SECTIONS.practical;
  return (
    <section id="contact" className="bg-white px-6 py-24 sm:px-12 lg:px-32">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-[var(--slate)]" style={{ "--slate": PALETTE.slate }}>{data.eyebrow}</p>
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
        <div className="h-72 w-full border border-[var(--ivory-dark)] bg-cover bg-center" style={{ "--ivory-dark": "#e3dcd1", backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-0ef3c08c0632?auto=format&fit=crop&w=1200&q=80')" }} />
      </motion.div>
    </section>
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

function BackgroundIllustration({ position }) {
  const isRight = position === "right";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${isRight ? "right-[-120px] top-20" : "left-[-120px] bottom-10"} hidden h-[260px] w-[260px] opacity-20 md:block`}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        mixBlendMode: "multiply",
      }}
    />
  );
}
