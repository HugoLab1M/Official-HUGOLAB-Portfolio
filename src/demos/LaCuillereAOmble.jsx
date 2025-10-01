import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Clock,
  Wine,
  Sprout,
  Flame,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80",
];

const copy = {
  fr: {
    brand: "La Cuillère à Omble",
    location: "Duingt • Lac d'Annecy",
    nav: [
      { id: "menu", label: "La carte" },
      { id: "experience", label: "L'expérience" },
      { id: "galerie", label: "Galerie" },
      { id: "reservation", label: "Réserver" },
    ],
    hero: {
      kicker: "Cuisine de lac & produits du terroir",
      title: "Une table chaleureuse face au lac",
      sub: "Poissons du lac, légumes des maraîchers voisins, cave soignée. Déjeuner sur la terrasse ou dîner dans notre salle lumineuse.",
      cta: "Réserver une table",
      ghost: "Télécharger la carte",
      stats: [
        { label: "Terrasse", value: "40 couverts" },
        { label: "Menu du midi", value: "32 €" },
        { label: "Carte des vins", value: "60 références" },
      ],
    },
    menu: {
      title: "La carte du moment",
      desc: "Une sélection courte, qui change au rythme des arrivages.",
      sections: [
        {
          title: "Entrées",
          items: [
            { name: "Tartare de féra", note: "Herbes du jardin, huile citronnée." },
            { name: "Velouté de courge", note: "Crème fumée, noisettes torréfiées." },
          ],
        },
        {
          title: "Plats",
          items: [
            { name: "Omble chevalier", note: "Beurre noisette, fenouil confit." },
            { name: "Filet de veau", note: "Réduction thym, purée de topinambours." },
          ],
        },
        {
          title: "Desserts",
          items: [
            { name: "Poire pochée", note: "Chocolat 70%, glace vanille." },
            { name: "Crémeux citron", note: "Meringue croustillante." },
          ],
        },
      ],
    },
    experience: {
      title: "Les essentiels",
      items: [
        { icon: Wine, title: "Accords vins", text: "Sélection de vignerons savoyards et pépites européennes." },
        { icon: Sprout, title: "Produits frais", text: "Approvisionnement quotidien en circuit court." },
        { icon: Flame, title: "Cuisine ouverte", text: "Voir l'équipe travailler depuis la salle." },
      ],
      note: "Menu déjeuner (lundi, jeudi, vendredi) — 32 € entrée/plat ou plat/dessert.",
    },
    gallery: {
      title: "Ambiances",
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      ],
    },
    reservation: {
      title: "Réserver une table",
      desc: "Par téléphone ou en quelques secondes en ligne.",
      phone: "+33 4 50 44 30 71",
      address: "Quai du Port, 74410 Duingt",
      hours: "Jeu – Lun : 9:00 – 22:00 (fermé mar/mer)",
      form: {
        name: "Nom",
        date: "Date",
        time: "Heure",
        guests: "Nombre de couverts",
        note: "Demande particulière",
        submit: "Envoyer la demande",
      },
    },
    footer: "La Cuillère à Omble — démonstration HügoLab",
  },
};

export default function LaCuillereAOmble() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const content = copy.fr;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#F7F4F1] text-[#1F1F1F]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F7F4F1]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1F1F1F] to-[#4F4C4A] text-white">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">{content.brand}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-[#6F6B68]">{content.location}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#6F6B68] md:flex">
            {content.nav.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="transition hover:text-[#1F1F1F]">
                {item.label}
              </button>
            ))}
            <a
              href="tel:+33450443071"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F1F1F] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#383533]"
            >
              <Phone className="h-4 w-4" />
              Réserver
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/75" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 text-white lg:flex-row lg:items-center lg:py-24">
            <div className="lg:w-3/5">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#F6D9A7]">
                {content.hero.kicker}
              </span>
              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{content.hero.title}</h1>
              <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">{content.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+33450443071"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1F1F1F] shadow-lg shadow-black/20 transition hover:bg-[#FBE8C8]"
                >
                  <CalendarDays className="h-4 w-4" />
                  {content.hero.cta}
                </a>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#F6D9A7] hover:text-[#F6D9A7]"
                >
                  <ArrowRight className="h-4 w-4" />
                  {content.hero.ghost}
                </a>
              </div>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              {content.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/20 bg-white/10 p-5 text-center shadow-sm backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#F6D9A7]/90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{content.menu.title}</h2>
              <p className="text-sm text-[#6F6B68]">{content.menu.desc}</p>
            </div>
            <a
              href="mailto:contact@lacuilleeraomble.fr"
              className="hidden items-center gap-2 text-sm font-semibold text-[#1F1F1F] underline underline-offset-4 md:inline-flex"
            >
              Obtenir la carte complète
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.menu.sections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-[#E2DED9] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">{section.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-[#6F6B68]">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <p className="font-medium text-[#1F1F1F]">{item.name}</p>
                      <p>{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#8C8884]">Carte indicative susceptible d'évoluer selon arrivage.</p>
        </section>

        <section id="experience" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold md:text-3xl">{content.experience.title}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {content.experience.items.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-3xl border border-[#E2DED9] bg-[#FDFBF7] p-5">
                  <item.icon className="h-5 w-5 text-[#D2975C]" />
                  <div>
                    <p className="font-semibold text-[#1F1F1F]">{item.title}</p>
                    <p className="text-sm text-[#6F6B68]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-3xl border border-[#E2DED9] bg-[#FFF7E5] p-4 text-sm text-[#6F6B68]">
              {content.experience.note}
            </p>
          </div>
        </section>

        <section id="galerie" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">{content.gallery.title}</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {content.gallery.images.map((src, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={src} alt={`Galerie ${idx + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section id="reservation" className="bg-[#1F1F1F] py-20 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{content.reservation.title}</h2>
              <p className="mt-2 text-sm text-white/80">{content.reservation.desc}</p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#F6D9A7]" /> {content.reservation.phone}</p>
                <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#F6D9A7]" /> {content.reservation.address}</p>
                <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-[#F6D9A7]" /> {content.reservation.hours}</p>
              </div>
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#F6D9A7] hover:text-[#F6D9A7]"
              >
                <ArrowRight className="h-4 w-4" /> Itinéraire
              </a>
            </div>
            <form className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <label className="text-sm text-white/80">
                {content.reservation.form.name}
                <input className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#F6D9A7] focus:outline-none" placeholder="Votre nom" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/80">
                  {content.reservation.form.date}
                  <input type="date" className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[#F6D9A7] focus:outline-none" />
                </label>
                <label className="text-sm text-white/80">
                  {content.reservation.form.time}
                  <input type="time" className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[#F6D9A7] focus:outline-none" />
                </label>
              </div>
              <label className="text-sm text-white/80">
                {content.reservation.form.guests}
                <input type="number" min={1} max={10} className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[#F6D9A7] focus:outline-none" placeholder="2" />
              </label>
              <label className="text-sm text-white/80">
                {content.reservation.form.note}
                <textarea rows={3} className="mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[#F6D9A7] focus:outline-none" placeholder="Allergies, poussette, etc." />
              </label>
              <button type="button" className="inline-flex items-center justify-center rounded-xl bg-[#F6D9A7] px-4 py-3 text-sm font-semibold text-[#1F1F1F] transition hover:bg-[#F3C888]">
                {content.reservation.form.submit}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[#F7F4F1] py-6 text-center text-sm text-[#6F6B68]">
        {content.footer}
      </footer>
    </div>
  );
}
