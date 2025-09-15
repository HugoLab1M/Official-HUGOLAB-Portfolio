import { useState } from "react";
import {
  Waves, Mountain, MapPin, Shield, Clock, Users, Camera, CalendarCheck, LifeBuoy, Car, Award, CheckCircle2, ChevronRight, Languages
} from "lucide-react";

/* ====== Prims ====== */
function Pill({ children }) { return <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm shadow-sm">{children}</span>; }
function Section({ children, className = "" }) { return <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>; }
function CTA({ label, onClick, href }) {
  const className = "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring";
  const style = { background: "linear-gradient(90deg,#7C3AED,#06B6D4)", color: "#fff" };
  if (href) return <a href={href} className={className} style={style}>{label}</a>;
  return <button onClick={onClick} className={className} style={style}>{label}</button>;
}
function Card({ children, className = "" }) { return <div className={`rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur ${className}`}>{children}</div>; }

/* ====== Copy FR/EN ====== */
const copy = {
  fr: {
    brand: "Cascade Nomade",
    sub: "Guides Canyoning — Faverges • Seythenex",
    nav: { tours: "Parcours", pricing: "Tarifs", safety: "Sécurité", gallery: "Galerie", faq: "FAQ", contact: "Contact" },
    hero: {
      kicker: "Aventure au cœur des gorges",
      title: "Canyoning autour d’Annecy — fun, sécurisé, mémorable.",
      subtitle: "Des parcours pour tous les niveaux, encadrés par des guides diplômés. Équipement inclus, photos en option, petits groupes.",
      cta1: "Réserver un créneau",
      cta2: "Voir les parcours",
      badges: [
        { Icon: MapPin, text: "Base Faverges-Seythenex" },
        { Icon: Clock, text: "8:30 – 19:00 (météo)" },
        { Icon: Users, text: "Groupes 6 pers. max" },
      ],
    },
    tours: {
      title: "Nos Parcours",
      items: [
        { name: "Découverte des Sources", level: "Facile", dur: "2h", desc: "Parfait familles, toboggans naturels, petites vasques.", img: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1200&auto=format&fit=crop" },
        { name: "Seythenex Intégral", level: "Intermédiaire", dur: "3h", desc: "Rappels, ressauts, sauts (optionnels), ambiance forêt.", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" },
        { name: "Fournel Sport", level: "Sportif", dur: "3h30", desc: "Verticalité, vasques profondes, pour amateurs de sensations.", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
        { name: "Crépuscule Lumière", level: "Expérience", dur: "2h30", desc: "Sortie dorée + pack photos, ambiance fin de journée.", img: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=1200&auto=format&fit=crop" },
      ],
      chip: { level: "Niveau", dur: "Durée" },
    },
    why: {
      title: "Pourquoi nous choisir",
      bullets: [
        { Icon: Award, t: "Guides diplômés", d: "DE/BE canyoning, pédagogie, premiers secours." },
        { Icon: Shield, t: "Matériel premium", d: "Combinaisons 5mm, casques, longes récentes." },
        { Icon: Users, t: "Petits groupes", d: "Qualité d’encadrement & rythme adapté." },
        { Icon: Car, t: "Logistique simple", d: "Parking, vestiaires, navettes possibles." },
        { Icon: Camera, t: "Souvenirs OK", d: "Pack photos/vidéo sur demande." },
        { Icon: CalendarCheck, t: "Météo-friendly", d: "Report gratuit si conditions non favorables." },
      ],
    },
    steps: {
      title: "Comment ça se passe",
      items: [
        { t: "Réservation", d: "Choix du parcours et créneau en ligne.", n: 1 },
        { t: "Brief & équipement", d: "Sécurité, progression, gestes simples.", n: 2 },
        { t: "Aventure", d: "Descente guidée, sauts optionnels.", n: 3 },
        { t: "Debrief & photos", d: "Retour, hydratation, souvenirs.", n: 4 },
      ],
    },
    pricing: {
      title: "Tarifs",
      foot: "Tarifs dégressifs pour groupes/CE — nous contacter.",
      packs: [
        { name: "Découverte", price: "55€", includes: ["Équipement complet", "Encadrement", "Assurance RC"] },
        { name: "Intégral", price: "75€", includes: ["Équipement complet", "Encadrement", "Photos offertes"] },
        { name: "Sport", price: "85€", includes: ["Équipement complet", "Encadrement", "Photos + vidéo"] },
      ],
    },
    safety: {
      title: "Sécurité & Conditions",
      points: [
        "Âge minimum 8 ans (selon parcours).",
        "Sauts toujours optionnels.",
        "Savoir nager est obligatoire.",
        "Report météo sans frais si besoin.",
        "Brief complet + vérif. matériel avant départ.",
      ],
    },
    gallery: { title: "Galerie" },
    faq: {
      title: "FAQ",
      q: [
        { q: "Faut-il une expérience préalable ?", a: "Non. Les parcours faciles sont ouverts aux débutants ; nous adaptons le rythme et les obstacles." },
        { q: "Que faut-il apporter ?", a: "Maillot, serviette, chaussures fermées type rando/eau. Nous fournissons combi, casque, baudrier." },
        { q: "Et la météo ?", a: "Nous surveillons le débit et l’orage. En cas de doute, on reporte sans frais." },
      ],
    },
    contact: {
      title: "Réserver / Contact",
      labels: { date: "Date", time: "Heure", tour: "Parcours", people: "Participants", name: "Nom", phone: "Téléphone", msg: "Message", submit: "Envoyer la demande" },
      tours: ["Découverte", "Seythenex Intégral", "Fournel Sport", "Crépuscule Lumière"],
    },
  },
  en: {
    brand: "Cascade Nomade",
    sub: "Canyoning Guides — Faverges • Seythenex",
    nav: { tours: "Tours", pricing: "Pricing", safety: "Safety", gallery: "Gallery", faq: "FAQ", contact: "Contact" },
    hero: {
      kicker: "Adventure in the gorges",
      title: "Canyoning around Annecy — fun, safe, unforgettable.",
      subtitle: "Routes for all levels with certified guides. Gear included, photo add-on, small groups.",
      cta1: "Book a slot",
      cta2: "Explore tours",
      badges: [
        { Icon: MapPin, text: "Faverges-Seythenex base" },
        { Icon: Clock, text: "8:30 – 19:00 (weather)" },
        { Icon: Users, text: "Groups up to 6" },
      ],
    },
    tours: {
      title: "Our Tours",
      items: [
        { name: "Spring Discovery", level: "Easy", dur: "2h", desc: "Family-friendly slides and pools.", img: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1200&auto=format&fit=crop" },
        { name: "Seythenex Integral", level: "Intermediate", dur: "3h", desc: "Rappels, optional jumps, forest ambiance.", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" },
        { name: "Fournel Sport", level: "Sport", dur: "3h30", desc: "Vertical sections and deep pools.", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
        { name: "Golden Hour", level: "Experience", dur: "2h30", desc: "Sunset vibes + photo pack.", img: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=1200&auto=format&fit=crop" },
      ],
      chip: { level: "Level", dur: "Duration" },
    },
    why: {
      title: "Why choose us",
      bullets: [
        { Icon: Award, t: "Certified guides", d: "Pro canyoning diplomas and first-aid." },
        { Icon: Shield, t: "Premium gear", d: "5mm suits, helmets and modern lanyards." },
        { Icon: Users, t: "Small groups", d: "Better pacing and attention." },
        { Icon: Car, t: "Easy logistics", d: "Parking, changing rooms, shuttles." },
        { Icon: Camera, t: "Memories", d: "Photo/video add-ons on request." },
        { Icon: CalendarCheck, t: "Weather-friendly", d: "Free reschedule if needed." },
      ],
    },
    steps: {
      title: "How it works",
      items: [
        { t: "Booking", d: "Pick your tour and time slot online.", n: 1 },
        { t: "Brief & gear", d: "Safety, progression, and fit check.", n: 2 },
        { t: "Adventure", d: "Guided descent, optional jumps.", n: 3 },
        { t: "Debrief & photos", d: "Hydration, souvenirs, next steps.", n: 4 },
      ],
    },
    pricing: {
      title: "Pricing",
      foot: "Group/Corporate discounts — contact us.",
      packs: [
        { name: "Discovery", price: "€55", includes: ["All gear", "Guiding", "Liability insurance"] },
        { name: "Integral", price: "€75", includes: ["All gear", "Guiding", "Photos included"] },
        { name: "Sport", price: "€85", includes: ["All gear", "Guiding", "Photos + video"] },
      ],
    },
    safety: {
      title: "Safety & Conditions",
      points: [
        "Minimum age 8 (depending on tour).",
        "Jumps always optional.",
        "Must be able to swim.",
        "Free weather reschedule if needed.",
        "Full brief + gear check before departure.",
      ],
    },
    gallery: { title: "Gallery" },
    faq: {
      title: "FAQ",
      q: [
        { q: "Do I need prior experience?", a: "No. Easy tours are beginner-friendly; we adapt the pace and obstacles." },
        { q: "What should I bring?", a: "Swimsuit, towel, closed-toe shoes. We provide wetsuit, helmet, harness." },
        { q: "What about weather?", a: "We monitor rain and water flow; if uncertain we reschedule at no cost." },
      ],
    },
    contact: {
      title: "Book / Contact",
      labels: { date: "Date", time: "Time", tour: "Tour", people: "People", name: "Name", phone: "Phone", msg: "Message", submit: "Send request" },
      tours: ["Discovery", "Seythenex Integral", "Fournel Sport", "Golden Hour"],
    },
  },
};

/* ====== Page ====== */
export default function CascadeNomadeCanyoning() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      {/* Colorful top gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute -top-48 left-1/2 h-96 w-[80vw] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(ellipse at center,#7C3AED33,#06B6D433,#FFFFFF00)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white"><Waves size={18}/></div>
            <div>
              <p className="text-lg font-semibold">{t.brand}</p>
              <p className="text-xs opacity-70">{t.sub}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#tours" className="hover:opacity-80">{t.nav.tours}</a>
            <a href="#pricing" className="hover:opacity-80">{t.nav.pricing}</a>
            <a href="#safety" className="hover:opacity-80">{t.nav.safety}</a>
            <a href="#gallery" className="hover:opacity-80">{t.nav.gallery}</a>
            <a href="#faq" className="hover:opacity-80">{t.nav.faq}</a>
            <a href="#contact" className="hover:opacity-80">{t.nav.contact}</a>
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
              <Languages size={14}/> {lang.toUpperCase()}
            </button>
          </div>
        </Section>

        {/* Subnav sticky (anchors) */}
        <div className="border-t border-black/10 bg-white/70 backdrop-blur">
          <Section className="flex flex-wrap items-center gap-3 py-2 text-xs">
            <Pill><a href="#tours">{t.nav.tours}</a></Pill>
            <Pill><a href="#pricing">{t.nav.pricing}</a></Pill>
            <Pill><a href="#safety">{t.nav.safety}</a></Pill>
            <Pill><a href="#gallery">{t.nav.gallery}</a></Pill>
            <Pill><a href="#faq">{t.nav.faq}</a></Pill>
            <Pill><a href="#contact">{t.nav.contact}</a></Pill>
          </Section>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-10 pb-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Pill><Mountain size={16}/> {t.hero.kicker}</Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.hero.title}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">{t.hero.subtitle}</p>
            <div className="mt-6 flex gap-3">
              <CTA label={t.hero.cta1} href="#contact" />
              <a href="#tours" className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm">
                {t.hero.cta2} <ChevronRight size={16}/>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              {t.hero.badges.map(({ Icon, text }, i) => <Pill key={i}><Icon size={14}/>{text}</Pill>)}
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-[url('https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-lg md:h-80">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/40 to-cyan-500/30" />
          </div>
        </div>
      </Section>

      {/* Tours */}
      <Section id="tours" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.tours.title}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {t.tours.items.map((tour, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url('${tour.img}')` }} />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <Pill><CheckCircle2 size={14}/> {t.tours.chip.level}: {tour.level}</Pill>
                    <Pill><Clock size={14}/> {t.tours.chip.dur}: {tour.dur}</Pill>
                  </div>
                  <p className="font-medium">{tour.name}</p>
                  <p className="text-sm opacity-70">{tour.desc}</p>
                  <div className="mt-4"><a href="#contact" className="text-sm underline underline-offset-4">Je veux réserver →</a></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.why.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.bullets.map((b, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white"><b.Icon size={18}/></div>
                <div>
                  <p className="font-medium">{b.t}</p>
                  <p className="text-sm opacity-70">{b.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.steps.title}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {t.steps.items.map((s) => (
            <Card key={s.n}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-sm font-semibold">{s.n}</span>
                <p className="font-medium">{s.t}</p>
              </div>
              <p className="mt-2 text-sm opacity-70">{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.pricing.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.pricing.packs.map((p, i) => (
            <Card key={i}>
              <p className="text-sm opacity-70">{p.name}</p>
              <p className="text-2xl font-semibold">{p.price}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {p.includes.map((li, k) => <li key={k} className="flex items-center gap-2"><CheckCircle2 size={14}/> {li}</li>)}
              </ul>
              <div className="mt-4"><CTA label="Réserver" href="#contact" /></div>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-sm opacity-70">{t.pricing.foot}</p>
      </Section>

      {/* Safety */}
      <Section id="safety" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.safety.title}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <ul className="space-y-2 text-sm">
              {t.safety.points.map((p, i) => <li key={i} className="flex items-start gap-2"><Shield className="mt-0.5" size={16}/> <span>{p}</span></li>)}
            </ul>
          </Card>
          <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 text-white shadow-inner">
            <p className="text-lg font-semibold drop-shadow">Sérénité & contrôle</p>
            <p className="max-w-sm text-sm opacity-90 drop-shadow">Brief complet, rythme adapté, alternatives sans saut.</p>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.gallery.title}</h2>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520963183138-0d42a0f0a829?q=80&w=1200&auto=format&fit=crop"
          ].map((src, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <img src={src} alt={`canyoning ${i}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.faq.title}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {t.faq.q.map((item, i) => (
            <Card key={i}>
              <details>
                <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
                <p className="mt-2 text-sm opacity-80">{item.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact / Booking */}
      <Section id="contact" className="pb-16">
        <h2 className="mb-4 text-2xl font-semibold">{t.contact.title}</h2>
        <Card>
          <form className="grid gap-4 md:grid-cols-3">
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.date}</label><input type="date" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.time}</label><input type="time" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.tour}</label>
              <select className="w-full rounded-xl border border-black/10 px-3 py-2">
                {t.contact.tours.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.people}</label><input type="number" min="1" max="8" defaultValue={2} className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.name}</label><input placeholder="Prénom Nom" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.phone}</label><input placeholder="+33 6 00 00 00 30" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="mb-1 block text-sm opacity-70">{t.contact.labels.msg}</label><textarea rows={4} className="w-full rounded-xl border border-black/10 px-3 py-2" placeholder="Besoin, niveau, horaires souhaités..." /></div>
            <div className="md:col-span-3"><CTA label={t.contact.labels.submit} /></div>
          </form>
        </Card>
        <div className="mt-4 flex flex-wrap gap-3 text-sm opacity-80">
          <Pill><MapPin size={14}/> Faverges-Seythenex</Pill>
          <Pill><LifeBuoy size={14}/> Encadrement certifié</Pill>
          <Pill><Camera size={14}/> Photos/vidéos en option</Pill>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70">
        © {new Date().getFullYear()} {t.brand} — Démo HugoLab
      </footer>
    </div>
  );
}
