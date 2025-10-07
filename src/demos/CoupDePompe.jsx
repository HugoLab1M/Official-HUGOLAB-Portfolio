import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Coffee,
  MountainSnow,
  Leaf,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Thermometer,
  Droplets,
  ArrowRight,
  ShieldCheck,
  Sun,
  Flame,
  Waves,
} from "lucide-react";

const HERO_IMAGES = [
  "/projects/1_v2.jpg",
];

const copy = {
  fr: {
    badge: "Location vélos · Snack · Sauna",
    brand: "Au Coup de Pompe",
    nav: [
      { id: "services", label: "Services" },
      { id: "menu", label: "Menu" },
      { id: "experience", label: "Expérience" },
      { id: "tarifs", label: "Tarifs" },
      { id: "infos", label: "Infos pratiques" },
    ],
    hero: {
      kicker: "Location vélos & snack du lac d’Annecy",
      title: "Vélos entretenus, recettes maison, pause sauna",
      sub: "Au Coup de Pompe vous accueille à Doussard avec des vélos vérifiés, des smoothies minute et un espace détente scandinave.",
      primary: "Réserver un vélo",
      secondary: "Télécharger la carte snack",
    },
    stats: [
      { value: "120+", label: "itinéraires testés" },
      { value: "12", label: "vélos premium" },
      { value: "2", label: "espaces détente" },
    ],
    services: {
      title: "Ce que nous proposons",
      items: [
        {
          title: "Location vélo & gravels",
          text: "VTC, VAE, tandem. Casques, antivols et appli guidée inclus.",
          icon: Bike,
        },
        {
          title: "Snack local & bar vitaminé",
          text: "Smoothies minute, tartines chaudes, terrasses à l’ombre. Produits d’artisans locaux.",
          icon: Coffee,
        },
        {
          title: "Sauna & bain nordique",
          text: "Relaxation scandinave privatisable. Parfait après la sortie vélo ou paddle.",
          icon: MountainSnow,
        },
      ],
    },
    highlights: [
      { icon: ShieldCheck, title: "Brief minute", text: "Itinéraires adaptés, météo du jour, consignes sécurité." },
      { icon: Sun, title: "Terrasse ensoleillée", text: "Espaces lounge, playlists chill, coups à boire." },
      { icon: Flame, title: "Sauna scandinave", text: "Sauna + bain nordique privatisables après la sortie." },
    ],
    menu: {
      title: "Carte courte & de saison",
      list: [
        { name: "Tartine du moment", desc: "Pain levain, charcuterie locale, pickles maison" },
        { name: "Bowl vitaminé", desc: "Granola croquant, yaourt fermier, fruits frais" },
        { name: "Smoothie lac bleu", desc: "Myrtille, banane, menthe, sirop agave" },
        { name: "Boisson glacée maison", desc: "Citron verveine, infusion glacée, option pétillante" },
        { name: "Snack sportif", desc: "Barre énergétique maison et shot de gingembre" },
        { name: "Glaces artisanales", desc: "3 parfums du glacier voisin" },
      ],
    },
    experience: {
      title: "Parcours conseillé : 3h d’expérience",
      steps: [
        {
          title: "09:30 — Picking & briefing",
          text: "On choisit le vélo, réglage express, itinéraire Garmin préchargé.",
          icon: Sparkles,
        },
        {
          title: "10:00 — Boucle panoramique",
          text: "20 km autour du lac, spots baignade repérés par l’équipe.",
          icon: Leaf,
        },
        {
          title: "12:00 — Pause snack",
          text: "Smoothie + tartine sur la terrasse ensoleillée.",
          icon: Droplets,
        },
        {
          title: "12:45 — Sauna & bain nordique",
          text: "15 min sauna sec + douche froide + relaxation au bain nordique.",
          icon: Thermometer,
        },
      ],
    },
    pricing: {
      title: "Tarifs & options",
      cards: [
        {
          title: "Vélo gravel premium",
          price: "39 €",
          badge: "2h",
          points: ["Casque + antivol inclus", "Appli d’itinéraires", "Brief personnalisé"],
        },
        {
          title: "Pack journée complète",
          price: "69 €",
          badge: "Best seller",
          points: ["Vélo + boisson + snack", "Sauna & bain nordique 30 min", "Serviette & sac étanche"],
        },
        {
          title: "After-ride détente",
          price: "25 €",
          badge: "Bien-être",
          points: ["Sauna finlandais 20 min", "Bain nordique", "Tisane maison"],
        },
      ],
    },
    info: {
      title: "Infos pratiques",
      address: "400 route du Taillefer, Doussard",
      hours: "Ouvert 09:00 – 18:30 (selon météo)",
      phone: "+33 6 99 19 37 85",
      mapCta: "Voir sur Google Maps",
    },
    footerCta: "Réserver maintenant",
  },
  en: {
    badge: "Bike rental · Snack · Sauna",
    brand: "Au Coup de Pompe",
    nav: [
      { id: "services", label: "Services" },
      { id: "menu", label: "Menu" },
      { id: "experience", label: "Experience" },
      { id: "tarifs", label: "Pricing" },
      { id: "infos", label: "Info" },
    ],
    hero: {
      kicker: "Right on Annecy’s cycle path",
      title: "Bikes, smoothies, sauna — the full day-out experience",
      sub: "Instant booking, gear included, Scandinavian sauna to recover. We handle logistics so you can just enjoy.",
      primary: "Book a bike",
      secondary: "Download brochure",
    },
    stats: [
      { value: "120+", label: "routes scouted" },
      { value: "12", label: "premium bikes" },
      { value: "2", label: "relax areas" },
    ],
    services: {
      title: "What’s included",
      items: [
        {
          title: "Gravel & city bikes",
          text: "E-bikes, tandems, helmets, locks and GPS routes included.",
          icon: Bike,
        },
        {
          title: "Local fuel bar",
          text: "Fresh smoothies, hot tartines, artisan coffee on a sunny deck.",
          icon: Coffee,
        },
        {
          title: "Private sauna",
          text: "Nordic sauna + hot tub to recover after the ride or paddle.",
          icon: MountainSnow,
        },
      ],
    },
    highlights: [
      { icon: ShieldCheck, title: "Quick briefing", text: "Routes matched to your level, daily weather tips." },
      { icon: Sun, title: "Sunny deck", text: "Loungers, USB plugs and curated playlists." },
      { icon: Waves, title: "50 m from the lake", text: "Direct access to the beach, showers and lockers." },
    ],
    menu: {
      title: "Minimal, seasonal menu",
      list: [
        { name: "Signature tartine", desc: "Sourdough, local charcuterie, house pickles" },
        { name: "Energy bowl", desc: "Homemade granola, farm yoghurt, seasonal fruits" },
        { name: "Blue smoothie", desc: "Blueberry, banana, mint, agave" },
        { name: "Cold brew spritz", desc: "Citrus, verveine, sparkling water" },
        { name: "Post-ride bites", desc: "Homemade energy bar & ginger shot" },
        { name: "Artisan ice cream", desc: "Three flavours from local maker" },
      ],
    },
    experience: {
      title: "Suggested 3h itinerary",
      steps: [
        {
          title: "09:30 — Setup & briefing",
          text: "Pick the bike, fine tune the fit, load the Garmin route.",
          icon: Sparkles,
        },
        {
          title: "10:00 — Scenic loop",
          text: "20 km ride with curated stops for swimming and photo spots.",
          icon: Leaf,
        },
        {
          title: "12:00 — Deck snack",
          text: "Smoothie + tartine on the sunny deck with panoramic views.",
          icon: Droplets,
        },
        {
          title: "12:45 — Sauna reset",
          text: "Nordic sauna, cold rinse and hot tub to recover like a pro.",
          icon: Thermometer,
        },
      ],
    },
    pricing: {
      title: "Pricing & add-ons",
      cards: [
        {
          title: "Premium gravel",
          price: "€39",
          badge: "2h",
          points: ["Helmet + lock", "Curated routes", "Personal briefing"],
        },
        {
          title: "Full day escape",
          price: "€69",
          badge: "Best seller",
          points: ["Bike + drink + snack", "Sauna & hot tub", "Towel & dry bag"],
        },
        {
          title: "After ride care",
          price: "€25",
          badge: "Wellness",
          points: ["Nordic sauna", "Hot tub", "Herbal tea"],
        },
      ],
    },
    info: {
      title: "Good to know",
      address: "400 route du Taillefer, Doussard",
      hours: "Open 09:00 – 18:30 (weather dependent)",
      phone: "+33 6 99 19 37 85",
      mapCta: "Open Google Maps",
    },
    footerCta: "Book now",
  },
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.12 * i, duration: 0.6, ease: "easeOut" } }),
};

function SectionTitle({ kicker, title, align = "left" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F47529]">
        {kicker}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-[#1F1F1F] md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function CoupDePompe() {
  const [{ lang, content }, setLang] = useState(() => ({ lang: "fr", content: copy.fr }));
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLangToggle = () => {
    setLang((prev) => {
      const nextLang = prev.lang === "fr" ? "en" : "fr";
      return { lang: nextLang, content: copy[nextLang] };
    });
  };

  return (
    <div className="bg-[#F4EDE3] text-[#1F1F1F]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F4EDE3]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F47529] text-lg font-black text-white shadow-lg">
              CP
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">{content.brand}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8B7F73]">{content.badge}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#6B635A] lg:flex">
            {content.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const target = document.getElementById(item.id);
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="transition hover:text-[#F47529]"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLangToggle}
              className="rounded-full border border-[#D8CCC0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B635A] transition hover:border-[#F47529] hover:text-[#F47529]"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#F47529] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#F58C4D] lg:inline-flex"
            >
              {lang === "fr" ? "Réserver" : "Book"}
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/30 via-[#1F1F1F]/60 to-[#1F1F1F]/85" />
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
            <motion.div initial="hidden" animate="visible" variants={fade}>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C6A6]">
                {content.hero.kicker}
              </span>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-200 md:text-lg">
                {content.hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F47529] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#F58C4D]"
                >
                  <Bike className="h-4 w-4" />
                  {content.hero.primary}
                </a>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#F47529] hover:text-[#F4C6A6]"
                >
                  <ArrowRight className="h-4 w-4" />
                  {content.hero.secondary}
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid gap-4"
            >
              {content.stats.map((stat, idx) => (
                <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur transition hover:border-[#F4C6A6]/70">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#F4C6A6]">{stat.label}</p>
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle kicker={lang === "fr" ? "Services" : "Services"} title={content.services.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.services.items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                custom={idx + 1}
                className="rounded-3xl border border-[#E3D7C9] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F47529]/15 text-[#F47529]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F1F1F]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6B635A]">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {content.highlights.map((highlight, idx) => (
              <motion.div
                key={highlight.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                custom={idx + 1}
                className="flex items-start gap-3 rounded-2xl border border-[#E3D7C9] bg-white px-5 py-4 shadow-sm"
              >
                <highlight.icon className="mt-1 h-5 w-5 text-[#F47529]" />
                <div>
                  <p className="font-semibold text-[#1F1F1F]">{highlight.title}</p>
                  <p className="text-sm text-[#6B635A]">{highlight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="menu" className="bg-[#FFF7EF] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Snack" : "Cafe"} title={content.menu.title} align="center" />
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
              {content.menu.list.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={idx + 1}
                  className="rounded-2xl border border-[#E3D7C9] bg-white px-5 py-4 text-left shadow-sm"
                >
                  <p className="text-base font-semibold text-[#1F1F1F]">{item.name}</p>
                  <p className="mt-1 text-sm text-[#6B635A]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle kicker={lang === "fr" ? "Expérience" : "Experience"} title={content.experience.title} />
          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full border-l border-dashed border-[#F4C6A6]/60 md:block" />
            <div className="space-y-8">
              {content.experience.steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={idx + 1}
                  className="relative ml-0 flex flex-col gap-4 rounded-3xl border border-[#E3D7C9] bg-white p-6 pr-8 shadow-sm md:ml-16 md:flex-row md:items-center"
                >
                  <div className="absolute -left-3 top-6 hidden h-6 w-6 rounded-full border-4 border-white bg-[#F47529] md:block" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F47529]/15 text-[#F47529]">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1F1F1F]">{step.title}</p>
                    <p className="text-sm text-[#6B635A]">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="tarifs" className="bg-[#1F1F1F] py-20 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Tarifs" : "Pricing"} title={content.pricing.title} align="center" />
            <div className="grid gap-6 md:grid-cols-3">
              {content.pricing.cards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={idx + 1}
                  className="flex flex-col rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-lg shadow-black/20 backdrop-blur"
                >
                  <span className="self-start rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#F4C6A6]">
                    {card.badge}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-3xl font-bold">{card.price}</p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-200">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Flame className="mt-0.5 h-4 w-4 text-[#F47529]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <a
                      href="https://cal.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#F4C6A6]"
                    >
                      {content.footerCta}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="infos" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionTitle kicker={lang === "fr" ? "Planifier sa venue" : "Before you come"} title={content.info.title} />
              <ul className="space-y-4 text-sm text-[#6B635A]">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#F47529]" />
                  {content.info.address}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#F47529]" />
                  {content.info.hours}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#F47529]" />
                  <a href="tel:+33699193785" className="hover:text-[#F47529]">
                    {content.info.phone}
                  </a>
                </li>
              </ul>
              <a
                href="https://goo.gl/maps/3qJxYoKZyGX2"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E3D7C9] px-5 py-3 text-sm font-semibold text-[#1F1F1F] transition hover:border-[#F47529] hover:text-[#F47529]"
              >
                <ArrowRight className="h-4 w-4" />
                {content.info.mapCta}
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#E3D7C9] shadow-lg">
              <iframe
                title="Carte Au Coup de Pompe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.094541138316!2d6.208240076330758!3d45.77795761230507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ba9e31e4ed62f%3A0x2b095b7b84b78723!2s400%20Rte%20du%20Taillefer%2C%2074210%20Doussard!5e0!3m2!1sfr!2sfr!4v1700000000000"
                className="h-[320px] w-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E3D7C9] bg-[#F4EDE3] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm text-[#6B635A] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Au Coup de Pompe</p>
          <div className="flex items-center gap-3">
            <a href="#services" className="transition hover:text-[#F47529]">
              {lang === "fr" ? "Services" : "Services"}
            </a>
            <a href="#menu" className="transition hover:text-[#F47529]">
              Menu
            </a>
            <a href="#tarifs" className="transition hover:text-[#F47529]">
              {lang === "fr" ? "Tarifs" : "Pricing"}
            </a>
            <a href="#infos" className="transition hover:text-[#F47529]">
              {lang === "fr" ? "Contact" : "Contact"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
