import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Anchor,
  CalendarClock,
  MapPin,
  Clock,
  Phone,
  Users,
  Shield,
  Camera,
  Sun,
  Wind,
  Sailboat,
  LifeBuoy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HERO_GALLERY = [
  "/pedalos/pedalos1.jpg",
];

const copy = {
  fr: {
    badge: "Talloires · Lac d'Annecy",
    brand: "Le Deck Pédalos",
    hero: {
      kicker: "Louer un pédalo n'a jamais été aussi fluide",
      title: "Réservez depuis votre transat, embarquez en 2 minutes",
      sub: "Disponibilités en temps réel, rappel SMS, matériel inclus. Vue panoramique sur la baie de Talloires.",
      cta: "Réserver un créneau",
      ghost: "Découvrir la flotte",
    },
    nav: [
      { id: "concept", label: "Concept" },
      { id: "flotte", label: "Flotte" },
      { id: "disponibilites", label: "Disponibilités" },
      { id: "tarifs", label: "Tarifs" },
      { id: "infos", label: "Infos" },
    ],
    concept: {
      title: "Une expérience signature",
      features: [
        {
          icon: Waves,
          title: "Départ en douceur",
          text: "Zone embarquement dédiée, quai en bois et assistance à la mise à l'eau.",
        },
        {
          icon: Sparkles,
          title: "Service conciergerie",
          text: "Glacière, enceinte Bluetooth, parasol : on prépare le pédalo selon vos envies.",
        },
        {
          icon: Shield,
          title: "Brief minute",
          text: "Règles sécurité, météo, coins baignade du jour. Le tout en moins de 60 secondes.",
        },
      ],
    },
    fleet: {
      title: "La flotte Le Deck",
      cards: [
        {
          name: "Duo Chic",
          desc: "Pédalo 2 places avec dossier premium, idéal pour un coucher de soleil.",
          badge: "Nouveau",
          image: "/pedalos/pedalos2.jpg",
        },
        {
          name: "Famille Lagoon",
          desc: "4 places avec toboggan, idéal pour les tribus et les éclats de rire.",
          badge: "Best-seller",
          image: "/pedalos/pedalos3.jpg",
        },
        {
          name: "Sunset Premium",
          desc: "6 places, banquettes lounge, glacière et enceinte intégrées.",
          badge: "After-work",
          image: "/pedalos/pedalos4.jpg",
        },
      ],
    },
    availability: {
      title: "Disponibilités en live",
      note: "Choisissez votre créneau, ajoutez vos options, payez sur place.",
      sizes: ["Duo", "Famille", "Sunset"],
      durations: ["30 min", "1 h", "1 h 30"],
      footer: "Confirmation immédiate + rappel SMS 1h avant",
    },
    pricing: {
      title: "Tarifs & options",
      cards: [
        {
          title: "Pédalo Duo",
          price: "29 €",
          includes: ["30 minutes", "Gilets & sac étanche", "Brief personnalisé"],
        },
        {
          title: "Famille Lagoon",
          price: "45 €",
          includes: ["1 heure", "Parasol + glacière", "Photo Polaroid offerte"],
        },
        {
          title: "Sunset Premium",
          price: "69 €",
          includes: ["1 heure", "Boisson artisanale", "Enceinte Bluetooth"],
        },
      ],
    },
    info: {
      title: "Infos pratiques",
      items: [
        { icon: MapPin, label: "Point de départ", value: "Plage de Talloires, ponton privé" },
        { icon: Clock, label: "Horaires", value: "10:00 – 19:30 (selon météo)" },
        { icon: Phone, label: "Contact", value: "+33 4 58 00 00 01" },
        { icon: Wind, label: "Vent", value: "Sorties ajustées, annulation offerte" },
      ],
    },
    gallery: {
      title: "Un aperçu depuis le ponton",
    },
    cta: "Réserver maintenant",
  },
  en: {
    badge: "Talloires · Lake Annecy",
    brand: "Le Deck Pedalos",
    hero: {
      kicker: "Boat feel, zero hassle",
      title: "Book from your deckchair, embark in 2 minutes",
      sub: "Live availability, SMS reminders, gear included. Panoramic views on Talloires bay.",
      cta: "Book a slot",
      ghost: "Meet the fleet",
    },
    nav: [
      { id: "concept", label: "Concept" },
      { id: "flotte", label: "Fleet" },
      { id: "disponibilites", label: "Availability" },
      { id: "tarifs", label: "Pricing" },
      { id: "infos", label: "Info" },
    ],
    concept: {
      title: "What makes the experience",
      features: [
        {
          icon: Waves,
          title: "Smooth boarding",
          text: "Private dock, staff assistance and storage for your belongings.",
        },
        {
          icon: Sparkles,
          title: "Concierge touch",
          text: "Cooler, Bluetooth speaker, parasol – prepped to match your vibes.",
        },
        {
          icon: Shield,
          title: "One-minute brief",
          text: "Safety tips, weather insight, best swim spots of the day.",
        },
      ],
    },
    fleet: {
      title: "Signature fleet",
      cards: [
        {
          name: "Duo Chic",
          desc: "Two-seater with plush backrests, perfect for golden hour rides.",
          badge: "New",
          image: "/pedalos/pedalos2.jpg",
        },
        {
          name: "Family Lagoon",
          desc: "Four seats with slide, fun guaranteed for little tribes.",
          badge: "Best seller",
          image: "/pedalos/pedalos3.jpg",
        },
        {
          name: "Sunset Premium",
          desc: "Six seats, lounge cushions, cooler and speaker included.",
          badge: "After-work",
          image: "/pedalos/pedalos4.jpg",
        },
      ],
    },
    availability: {
      title: "Live availability",
      note: "Pick a time slot, add extras, pay on site.",
      sizes: ["Duo", "Family", "Sunset"],
      durations: ["30 min", "1 h", "1 h 30"],
      footer: "Instant confirmation + SMS reminder 1h before",
    },
    pricing: {
      title: "Pricing & extras",
      cards: [
        {
          title: "Duo Pedalo",
          price: "€29",
          includes: ["30 minutes", "Life jackets & dry bag", "Personal briefing"],
        },
        {
          title: "Family Lagoon",
          price: "€45",
          includes: ["1 hour", "Parasol + cooler", "Instant Polaroid"],
        },
        {
          title: "Sunset Premium",
          price: "€69",
          includes: ["1 hour", "Signature drink", "Bluetooth speaker"],
        },
      ],
    },
    info: {
      title: "Good to know",
      items: [
        { icon: MapPin, label: "Departure", value: "Talloires beach, private pontoon" },
        { icon: Clock, label: "Hours", value: "10:00 – 19:30 (weather permitting)" },
        { icon: Phone, label: "Phone", value: "+33 4 58 00 00 01" },
        { icon: Wind, label: "Weather", value: "Trips adjusted, free reschedule" },
      ],
    },
    gallery: {
      title: "From the deck",
    },
    cta: "Book now",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

function SectionTitle({ kicker, title, align = "left" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/70">{kicker}</span>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">{title}</h2>
    </div>
  );
}

export default function LeDeckPedalos() {
  const [lang, setLang] = useState("fr");
  const content = copy[lang];
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_GALLERY.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-cyan-950 via-slate-950 to-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-black text-slate-950 shadow-lg">
              LD
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">{content.brand}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{content.badge}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {content.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const target = document.getElementById(item.id);
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="text-slate-200 transition hover:text-cyan-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 lg:inline-flex"
            >
              {lang === "fr" ? "Réserver" : "Book"}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              style={{ backgroundImage: `url(${HERO_GALLERY[heroIndex]})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 lg:flex-row lg:items-center lg:py-28">
            <div className="lg:w-3/5">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                {content.hero.kicker}
              </span>
              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mt-4 text-lg text-slate-200">{content.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-300/40 transition hover:bg-cyan-200"
                >
                  <Sailboat className="h-4 w-4" />
                  {content.hero.cta}
                </a>
                <button
                  onClick={() => document.getElementById("flotte")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:text-cyan-200"
                >
                  <ArrowRight className="h-4 w-4" />
                  {content.hero.ghost}
                </button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative flex flex-1 items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative h-56 w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur"
              >
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-400/30 to-indigo-500/30" />
                <div className="space-y-3 text-sm text-white/90">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Sunset Premium</p>
                    <span className="rounded-full bg-white/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">New</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2">
                    <CalendarClock className="h-4 w-4 text-cyan-200" />
                    <span>18:00 — 19:30</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <LifeBuoy className="h-4 w-4 text-cyan-200" />
                      <span>Gilets kids & adultes fournis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Camera className="h-4 w-4 text-cyan-200" />
                      <span>Photo souvenir offerte</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Users className="h-4 w-4 text-cyan-200" />
                      <span>6 personnes</span>
                    </div>
                  </div>
                  <div className="pt-0">
                    <button className="w-full rounded-2xl bg-cyan-300 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                      {content.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="concept" className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle kicker={lang === "fr" ? "Concept" : "Concept"} title={content.concept.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.concept.features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                custom={idx + 1}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/60"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/20 text-cyan-100">
                  <feature.icon className="h-5 w-5" />
                </div>
                <p className="text-lg font-semibold text-white">{feature.title}</p>
                <p className="mt-2 text-sm text-cyan-100/80">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="flotte" className="bg-white py-20 text-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Flotte" : "Fleet"} title={content.fleet.title} align="center" />
            <div className="grid gap-6 md:grid-cols-3">
              {content.fleet.cards.map((card, idx) => (
                <motion.div
                  key={card.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={idx + 1}
                  className="group overflow-hidden rounded-3xl border border-slate-200 shadow-lg transition hover:-translate-y-2"
                >
                  <div
                    className="h-48 w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="flex flex-col gap-3 p-5">
                    <span className="self-start rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                      {card.badge}
                    </span>
                    <p className="text-lg font-semibold text-slate-900">{card.name}</p>
                    <p className="text-sm text-slate-600">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="disponibilites" className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.12),_transparent_55%)]" />
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-8 text-white backdrop-blur">
            <SectionTitle kicker={lang === "fr" ? "Réservation" : "Booking"} title={content.availability.title} align="center" />
            <p className="mx-auto mb-8 max-w-xl text-center text-sm text-cyan-100/80">{content.availability.note}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <fieldset className="space-y-3">
                <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">{lang === "fr" ? "Taille" : "Size"}</legend>
                <div className="flex flex-wrap gap-2">
                  {content.availability.sizes.map((size, idx) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(idx)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedSize === idx
                          ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                          : "border-white/20 text-white hover:border-cyan-200/70"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="space-y-3">
                <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">{lang === "fr" ? "Durée" : "Duration"}</legend>
                <div className="flex flex-wrap gap-2">
                  {content.availability.durations.map((duration, idx) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(idx)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedDuration === idx
                          ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                          : "border-white/20 text-white hover:border-cyan-200/70"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <p className="mt-6 text-center text-xs text-cyan-100/70">{content.availability.footer}</p>
          </div>
        </section>

        <section id="tarifs" className="bg-white py-20 text-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Tarifs" : "Pricing"} title={content.pricing.title} align="center" />
            <div className="grid gap-6 md:grid-cols-3">
              {content.pricing.cards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={idx + 1}
                  className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg transition hover:-translate-y-2"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{card.title}</p>
                  <p className="mt-2 text-3xl font-semibold">{card.price}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {card.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <LifeBuoy className="mt-0.5 h-4 w-4 text-cyan-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://cal.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      {content.cta}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="infos" className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle kicker={lang === "fr" ? "Infos" : "Info"} title={content.info.title} />
          <div className="grid gap-6 md:grid-cols-2">
            {content.info.items.map((item, idx) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                custom={idx + 1}
                className="flex items-start gap-3 rounded-3xl border border-white/20 bg-white/5 px-5 py-4 text-white"
              >
                <item.icon className="mt-0.5 h-5 w-5 text-cyan-200" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">{item.label}</p>
                  <p className="text-sm text-cyan-50/90">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="galerie" className="bg-white py-16 text-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Galerie" : "Gallery"} title={content.gallery.title} align="center" />
            <div className="grid gap-4 md:grid-cols-3">
              {HERO_GALLERY.map((image, idx) => (
                <motion.div
                  key={image}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={idx + 1}
                  className="h-56 rounded-3xl border border-slate-200 bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90 py-10 text-sm text-cyan-100/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Le Deck Pédalos</p>
          <div className="flex flex-wrap items-center gap-3">
            {content.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                className="transition hover:text-cyan-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
