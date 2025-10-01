import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wind,
  MapPin,
  Clock,
  Phone,
  Camera,
  CalendarCheck2,
  Gift,
  MountainSnow,
  Thermometer,
  ArrowRight,
  Sparkles,
  CloudSun,
  BusFront,
  Video,
  Plane,
} from "lucide-react";

const HERO_GALLERY = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1603297148707-8c6fef39a3fe?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1544452148-7fc29cb74b02?auto=format&fit=crop&w=1600&q=80",
];

const COPY = {
  fr: {
    brand: "Micro-École Parapente",
    tagline: "Biplace au-dessus du lac d'Annecy",
    nav: [
      { id: "prestations", label: "Nos vols" },
      { id: "experience", label: "Expérience" },
      { id: "tarifs", label: "Tarifs" },
      { id: "galerie", label: "Photos" },
      { id: "infos", label: "Infos pratiques" },
      { id: "reservation", label: "Réserver" },
    ],
    hero: {
      headline: "Vols biplaces, briefing personnalisé et souvenirs garantis",
      sub: "Décollages Planfait & Col de la Forclaz. Brief sécurité, reportage photo et report météo offert.",
      cta: "Réserver un vol",
      ghost: "Télécharger la plaquette",
      stats: [
        { value: "12", suffix: "", label: "pilotes locaux" },
        { value: "480", suffix: "m", label: "dénivelé lac" },
        { value: "365", suffix: "j", label: "monitoring météo" },
      ],
    },
    flights: {
      title: "Nos vols principaux",
      items: [
        {
          name: "Découverte",
          desc: "12-15 minutes de vol panoramique. Idéal première fois.",
          extras: ["Altitude 950 m", "Photos HD en option"],
        },
        {
          name: "Thermique",
          desc: "25-30 minutes. On exploite les ascendances pour prendre de la hauteur.",
          extras: ["GoPro fournie", "Figures douces sur demande"],
        },
        {
          name: "Acro Sensations",
          desc: "15 minutes de sensations fortes, vrilles et wings over.",
          extras: ["Casque audio", "Vidéo Full HD incluse"],
        },
      ],
    },
    timeline: {
      title: "L'expérience en 4 étapes",
      steps: [
        { time: "J-1", title: "Brief météo", desc: "SMS + email pour confirmer le créneau selon les conditions.", icon: CloudSun },
        { time: "+30 min", title: "Accueil & équipement", desc: "Navette, équipement, briefing sécurité personnalisé.", icon: BusFront },
        { time: "Vol", title: "En l'air", desc: "Photos, pilotage possible, figures selon vos envies.", icon: Plane },
        { time: "Après", title: "Souvenirs", desc: "Débrief, remise des médias, bons cadeaux sur demande.", icon: Video },
      ],
    },
    pricing: {
      title: "Tarifs & options",
      cards: [
        {
          title: "Découverte",
          price: "90 €",
          includes: ["12-15 minutes", "Brief personnalisé", "Navette incluse"],
        },
        {
          title: "Thermique",
          price: "130 €",
          includes: ["25-30 minutes", "Photos offertes", "Variation altitude"],
        },
        {
          title: "Acro",
          price: "150 €",
          includes: ["Figures acrobatiques", "Vidéo HD", "Pilotage assisté"],
        },
      ],
      options: [
        { icon: Camera, label: "Pack photos + vidéos", value: "25 €" },
        { icon: Gift, label: "Bon cadeau PDF", value: "Gratuit" },
        { icon: CalendarCheck2, label: "Report météo garanti", value: "Inclus" },
      ],
    },
    info: {
      title: "Infos pratiques",
      blocks: [
        { icon: MapPin, title: "Point de rendez-vous", text: "Aérodrome de Doussard — zone micro-école" },
        { icon: Clock, title: "Horaires", text: "8:30 – 19:30 (selon conditions)" },
        { icon: Phone, title: "Contact", text: "+33 6 99 19 37 85" },
        { icon: MountainSnow, title: "Conditions", text: "Poids 30-110 kg, tenue chaude conseillée" },
      ],
    },
    form: {
      title: "Réserver un créneau",
      labels: {
        date: "Date souhaitée",
        slot: "Créneau",
        flight: "Formule",
        firstname: "Prénom",
        lastname: "Nom",
        phone: "Téléphone",
        message: "Notes (âge, poids, envies)",
        submit: "Valider la demande",
      },
      slots: ["08:30", "10:00", "12:00", "14:30", "17:00"],
    },
    footer: "Micro-École Parapente — démonstration HügoLab",
    gallery: {
      title: "En images",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544452148-7fc29cb74b02?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542733400-bca9f9ff63c4?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  },
  en: {
    brand: "Micro Paragliding School",
    tagline: "Tandem flights above Lake Annecy",
    nav: [
      { id: "prestations", label: "Flights" },
      { id: "experience", label: "Experience" },
      { id: "tarifs", label: "Pricing" },
      { id: "galerie", label: "Photos" },
      { id: "infos", label: "Info" },
      { id: "reservation", label: "Book" },
    ],
    hero: {
      headline: "Tandem flights, local pilots, memories guaranteed",
      sub: "Planfait & Forclaz takeoffs. Safety briefing, photo package and free weather reschedule.",
      cta: "Book a flight",
      ghost: "Download brochure",
      stats: [
        { value: "12", suffix: "", label: "local pilots" },
        { value: "480", suffix: "m", label: "vertical drop" },
        { value: "365", suffix: "", label: "days of monitoring" },
      ],
    },
    flights: {
      title: "Signature flights",
      items: [
        {
          name: "Discovery",
          desc: "12-15 minutes panoramic flight. Perfect first experience.",
          extras: ["Altitude 950 m", "Optional photos"]
        },
        {
          name: "Thermal",
          desc: "25-30 minutes playing with thermals to gain altitude.",
          extras: ["GoPro included", "Gentle aerobatics on demand"]
        },
        {
          name: "Acro thrills",
          desc: "15-minute adrenaline session with dynamic manoeuvres.",
          extras: ["Audio helmet", "Full HD video"]
        },
      ],
    },
    timeline: {
      title: "How it works",
      steps: [
        { time: "Day before", title: "Weather check", desc: "SMS + email confirmation depending on conditions.", icon: CloudSun },
        { time: "+30 min", title: "Welcome & gear", desc: "Shuttle ride, equipment fitting, safety briefing.", icon: BusFront },
        { time: "Flight", title: "In the air", desc: "Photos, optional piloting, sensations on demand.", icon: Plane },
        { time: "After", title: "Souvenirs", desc: "Debrief, media delivery, gift vouchers available.", icon: Video },
      ],
    },
    pricing: {
      title: "Pricing & extras",
      cards: [
        {
          title: "Discovery",
          price: "€90",
          includes: ["12-15 minutes", "Personal briefing", "Shuttle included"],
        },
        {
          title: "Thermal",
          price: "€130",
          includes: ["25-30 minutes", "Photos included", "Higher altitude"],
        },
        {
          title: "Acro",
          price: "€150",
          includes: ["Aerobatics", "HD video", "Co-piloting"],
        },
      ],
      options: [
        { icon: Camera, label: "Photo + video pack", value: "€25" },
        { icon: Gift, label: "Gift voucher PDF", value: "Free" },
        { icon: CalendarCheck2, label: "Weather reschedule", value: "Included" },
      ],
    },
    info: {
      title: "Good to know",
      blocks: [
        { icon: MapPin, title: "Meeting", text: "Doussard landing field — micro-school zone" },
        { icon: Clock, title: "Hours", text: "08:30 – 19:30 (weather permitting)" },
        { icon: Phone, title: "Phone", text: "+33 6 99 19 37 85" },
        { icon: MountainSnow, title: "Conditions", text: "Weight 30-110 kg, warm clothes recommended" },
      ],
    },
    form: {
      title: "Request a slot",
      labels: {
        date: "Preferred date",
        slot: "Time",
        flight: "Flight",
        firstname: "First name",
        lastname: "Last name",
        phone: "Phone",
        message: "Notes (age, weight, wishes)",
        submit: "Submit request",
      },
      slots: ["08:30", "10:00", "12:00", "14:30", "17:00"],
    },
    footer: "Paragliding micro school — HügoLab demo",
    gallery: {
      title: "From the sky",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544452148-7fc29cb74b02?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542733400-bca9f9ff63c4?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  },
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" } }),
};

function SectionTitle({ kicker, title }) {
  return (
    <div className="mb-8">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/80">{kicker}</span>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h2>
    </div>
  );
}

export default function MicroEcoleParapente() {
  const [lang, setLang] = useState("fr");
  const [heroIndex, setHeroIndex] = useState(0);
  const content = COPY[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_GALLERY.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-sky-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 text-lg font-black text-white shadow-lg">
              MP
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">{content.brand}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Annecy • Doussard</p>
            </div>
          </div>
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
            {content.nav.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="transition hover:text-emerald-500">
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-emerald-400 hover:text-emerald-500"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-slate-900 text-white">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{ backgroundImage: `url(${HERO_GALLERY[heroIndex]})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/70 to-slate-900" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 lg:flex-row lg:items-center lg:py-24">
            <motion.div initial="hidden" animate="show" variants={fade} className="lg:w-7/12">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                {content.tagline}
              </span>
              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{content.hero.headline}</h1>
              <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">{content.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:bg-emerald-300"
                >
                  <Thermometer className="h-4 w-4" />
                  {content.hero.cta}
                </a>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  <ArrowRight className="h-4 w-4" />
                  {content.hero.ghost}
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="grid flex-1 gap-4 sm:grid-cols-3"
            >
              {content.hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2 rounded-3xl border border-white/15 bg-white/10 p-5 text-center shadow-sm backdrop-blur">
                  <p className="flex items-baseline gap-1 text-3xl font-semibold text-white">
                    {stat.value}
                    {stat.suffix ? <span className="text-lg font-medium text-emerald-200/90">{stat.suffix}</span> : null}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">{stat.label}</p>
                </div>
              ))}
            </motion.div>
         </div>
       </section>

        <section id="prestations" className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle kicker={lang === "fr" ? "Vols" : "Flights"} title={content.flights.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.flights.items.map((flight, idx) => (
              <motion.div
                key={flight.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                custom={idx + 1}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <p className="text-lg font-semibold text-slate-900">{flight.name}</p>
                </div>
                <p className="text-sm text-slate-600">{flight.desc}</p>
                <ul className="space-y-1 text-xs text-slate-500">
                  {flight.extras.map((extra) => (
                    <li key={extra} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {extra}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="bg-gradient-to-br from-emerald-50 to-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Parcours" : "Journey"} title={content.timeline.title} />
            <div className="space-y-6">
              {content.timeline.steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fade}
                    custom={idx + 1}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex min-w-[70px] items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                        {step.time}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 text-left md:pl-6">
                      <p className="font-semibold text-slate-900">{step.title}</p>
                      <p className="text-sm text-slate-600">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="tarifs" className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle kicker={lang === "fr" ? "Tarifs" : "Pricing"} title={content.pricing.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.pricing.cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                custom={idx + 1}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{card.price}</p>
                <ul className="mt-4 space-y-1 text-sm text-slate-600">
                  {card.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {content.hero.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            {content.pricing.options.map((option) => (
              <div key={option.label} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <option.icon className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="font-semibold text-slate-900">{option.label}</p>
                  <p className="text-xs text-emerald-600">{option.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="galerie" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Galerie" : "Gallery"} title={content.gallery.title} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.gallery.images.map((src, idx) => (
                <motion.div
                  key={src}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={idx + 1}
                  className="aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
                >
                  <img src={src} alt={`Galerie parapente ${idx + 1}`} className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="infos" className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker={lang === "fr" ? "Infos pratiques" : "Good to know"} title={content.info.title} />
            <div className="grid gap-6 md:grid-cols-2">
              {content.info.blocks.map((block, idx) => (
                <motion.div
                  key={block.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={idx + 1}
                  className="flex items-start gap-3 rounded-3xl border border-white/15 bg-white/10 px-5 py-4"
                >
                  <block.icon className="mt-0.5 h-5 w-5 text-emerald-200" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/80">{block.title}</p>
                    <p className="text-sm text-white/90">{block.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="reservation" className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle kicker={lang === "fr" ? "Réservation" : "Booking"} title={content.form.title} />
          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:grid-cols-2"
          >
            <label className="text-sm text-slate-600">
              {content.form.labels.date}
              <input type="date" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
            </label>
            <label className="text-sm text-slate-600">
              {content.form.labels.slot}
              <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
                {content.form.slots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-600">
              {content.form.labels.flight}
              <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
                {content.flights.items.map((flight) => (
                  <option key={flight.name}>{flight.name}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-600">
                {content.form.labels.firstname}
                <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Léna" />
              </label>
              <label className="text-sm text-slate-600">
                {content.form.labels.lastname}
                <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Richard" />
              </label>
            </div>
            <label className="text-sm text-slate-600">
              {content.form.labels.phone}
              <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="+33 6 00 00 00 00" />
            </label>
            <label className="text-sm text-slate-600 md:col-span-2">
              {content.form.labels.message}
              <textarea rows={3} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Poids, préférences sensations, âge..." />
            </label>
            <button type="button" className="md:col-span-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              {content.form.labels.submit}
            </button>
          </motion.form>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white/70 py-6 text-center text-sm text-slate-500">
        {content.footer}
      </footer>
    </div>
  );
}
