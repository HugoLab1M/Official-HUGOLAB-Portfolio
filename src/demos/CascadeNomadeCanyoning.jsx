import { useState } from "react";
import {
  Waves, Mountain, MapPin, Shield, Clock, Users, Camera, CalendarCheck, LifeBuoy, Car, Award, CheckCircle2, ChevronRight, Languages
} from "lucide-react";

/* ====== DA "torrent" : page sombre pétrole, accent lime, typo condensée ====== */
const PETROL = "#0E2C2A";
const PETROL_2 = "#143B38";
const LIME = "#C8F04C";
const FOAM = "#EFF7F1";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm" style={{ borderColor: "rgba(239,247,241,0.25)", background: "rgba(239,247,241,0.06)", color: FOAM }}>
      {children}
    </span>
  );
}
function Section({ children, className = "", id }) { return <section id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>; }
function CTA({ label, onClick, href }) {
  const className = "cnc-display inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2";
  const style = { background: LIME, color: PETROL };
  if (href) return <a href={href} className={className} style={style}>{label}</a>;
  return <button onClick={onClick} className={className} style={style}>{label}</button>;
}
function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border p-5 ${className}`} style={{ borderColor: "rgba(239,247,241,0.12)", background: PETROL_2 }}>{children}</div>;
}

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
        { name: "Découverte des Sources", level: "Facile", dur: "2h", desc: "Parfait familles, toboggans naturels, petites vasques.", img: "/canyoning/2_v2.jpg" },
        { name: "Seythenex Intégral", level: "Intermédiaire", dur: "3h", desc: "Rappels, ressauts, sauts (optionnels), ambiance forêt.", img: "/canyoning/3_v2.jpg" },
        { name: "Fournel Sport", level: "Sportif", dur: "3h30", desc: "Verticalité, vasques profondes, pour amateurs de sensations.", img: "/canyoning/4_v2.jpg" },
        { name: "Crépuscule Lumière", level: "Expérience", dur: "2h30", desc: "Sortie dorée + pack photos, ambiance fin de journée.", img: "/canyoning/5_v2.jpg" },
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
        { name: "Spring Discovery", level: "Easy", dur: "2h", desc: "Family-friendly slides and pools.", img: "/canyoning/2_v2.jpg" },
        { name: "Seythenex Integral", level: "Intermediate", dur: "3h", desc: "Rappels, optional jumps, forest ambiance.", img: "/canyoning/3_v2.jpg" },
        { name: "Fournel Sport", level: "Sport", dur: "3h30", desc: "Vertical sections and deep pools.", img: "/canyoning/4_v2.jpg" },
        { name: "Golden Hour", level: "Experience", dur: "2h30", desc: "Sunset vibes + photo pack.", img: "/canyoning/5_v2.jpg" },
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
    <div className="min-h-screen" style={{ background: PETROL, color: FOAM, fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&display=swap');
        .cnc-display { font-family: 'Archivo', system-ui, sans-serif; }
        .cnc-input { background: rgba(239,247,241,0.06); border: 1px solid rgba(239,247,241,0.2); color: #EFF7F1; border-radius: 0.5rem; }
        .cnc-input::placeholder { color: rgba(239,247,241,0.4); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: "rgba(239,247,241,0.12)", background: "rgba(14,44,42,0.9)" }}>
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: LIME, color: PETROL }}><Waves size={18}/></div>
            <div>
              <p className="cnc-display text-lg font-bold uppercase tracking-wide">{t.brand}</p>
              <p className="text-xs opacity-70">{t.sub}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#tours" className="hover:text-[#C8F04C]">{t.nav.tours}</a>
            <a href="#pricing" className="hover:text-[#C8F04C]">{t.nav.pricing}</a>
            <a href="#safety" className="hover:text-[#C8F04C]">{t.nav.safety}</a>
            <a href="#gallery" className="hover:text-[#C8F04C]">{t.nav.gallery}</a>
            <a href="#faq" className="hover:text-[#C8F04C]">{t.nav.faq}</a>
            <a href="#contact" className="hover:text-[#C8F04C]">{t.nav.contact}</a>
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ background: "rgba(239,247,241,0.1)" }}>
              <Languages size={14}/> {lang.toUpperCase()}
            </button>
          </div>
        </Section>
      </header>

      {/* Hero */}
      <Section className="pt-14 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Pill><Mountain size={16}/> {t.hero.kicker}</Pill>
            <h1 className="cnc-display mt-5 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-prose text-base opacity-80">{t.hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTA label={t.hero.cta1} href="#contact" />
              <a href="#tours" className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:bg-white/5" style={{ borderColor: "rgba(239,247,241,0.3)" }}>
                {t.hero.cta2} <ChevronRight size={16}/>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              {t.hero.badges.map(({ Icon, text }, i) => <Pill key={i}><Icon size={14}/>{text}</Pill>)}
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-2xl md:h-96 md:-rotate-1">
            <img src="/canyoning/1_v2.jpg" alt="Descente de canyon avec Cascade Nomade" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,44,42,0.55), transparent 55%)" }} />
            <p className="cnc-display absolute bottom-4 left-4 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: LIME }}>
              Seythenex · Faverges
            </p>
          </div>
        </div>
      </Section>

      {/* Tours */}
<Section id="tours" className="pb-10">
  <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.tours.title}</h2>
  <div className="grid gap-5 md:grid-cols-2">
    {t.tours.items.map((tour, i) => {
      const imgRight = i % 2 === 1; // 0,2 left — 1,3 right
      return (
        <Card key={i} className="overflow-hidden p-0">
          <div className="grid gap-0 md:grid-cols-2">
            {/* IMAGE */}
            <div
              className={[
                "relative h-48 w-full overflow-hidden",
                // Mobile: rounded on top; Desktop: reset all, then round left or right only
                "md:rounded-none",
                imgRight ? "md:order-2 md:rounded-r-2xl" : "md:order-1 md:rounded-l-2xl",
              ].join(" ")}
            >
              <img
                src={tour.img}
                alt={`${tour.name} — sortie canyoning Cascade Nomade`}
                loading="lazy"
                width="1200"
                height="800"
                className="h-full w-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className={["p-5", imgRight ? "md:order-1" : "md:order-2"].join(" ")}>
              <div className="mb-2 flex flex-wrap gap-2 text-xs">
                <Pill><CheckCircle2 size={14}/> {t.tours.chip.level}: {tour.level}</Pill>
                <Pill><Clock size={14}/> {t.tours.chip.dur}: {tour.dur}</Pill>
              </div>
              <p className="font-medium">{tour.name}</p>
              <p className="text-sm opacity-70">{tour.desc}</p>
              <div className="mt-4">
                <a
                  href="#contact"
                  className="text-sm underline underline-offset-4"
                  aria-label={`Réserver une sortie canyoning ${tour.name}`}
                >
                  Réserver ma sortie canyoning
                </a>
              </div>
            </div>
          </div>
        </Card>
      );
    })}
  </div>
</Section>

      {/* Why us */}
      <Section className="pb-10">
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.why.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.bullets.map((b, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8F04C] text-[#0E2C2A]"><b.Icon size={18}/></div>
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
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.steps.title}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {t.steps.items.map((s) => (
            <Card key={s.n}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[#C8F04C]">{s.n}</span>
                <p className="font-medium">{s.t}</p>
              </div>
              <p className="mt-2 text-sm opacity-70">{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="pb-10">
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.pricing.title}</h2>
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
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.safety.title}</h2>
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
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.gallery.title}</h2>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            "/canyoning/7_v2.jpg",
            "/canyoning/8_v2.jpg",
            "/canyoning/9_v2.jpg",
            "/canyoning/10_v2.jpg",
            "/canyoning/11_v2.jpg",
            "/canyoning/1_v2.jpg",
            "/canyoning/3_v2.jpg",
            "/canyoning/2_v2.jpg",
          ].map((src, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`Cascade Nomade Canyoning — galerie ${i + 1}`}
                loading="lazy"
                width="1200"
                height="900"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pb-10">
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.faq.title}</h2>
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
        <h2 className="cnc-display mb-6 text-2xl font-bold uppercase tracking-wide">{t.contact.title}</h2>
        <Card>
          <form className="grid gap-4 md:grid-cols-3">
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.date}</label><input type="date" className="cnc-input w-full px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.time}</label><input type="time" className="cnc-input w-full px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.tour}</label>
              <select className="cnc-input w-full px-3 py-2">
                {t.contact.tours.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.people}</label><input type="number" min="1" max="8" defaultValue={2} className="cnc-input w-full px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.name}</label><input placeholder="Prénom Nom" className="cnc-input w-full px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.contact.labels.phone}</label><input placeholder="+33 6 00 00 00 30" className="cnc-input w-full px-3 py-2" /></div>
            <div className="md:col-span-3"><label className="mb-1 block text-sm opacity-70">{t.contact.labels.msg}</label><textarea rows={4} className="cnc-input w-full px-3 py-2" placeholder="Besoin, niveau, horaires souhaités..." /></div>
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
      <footer className="border-t border-white/10 py-8 text-center text-sm opacity-60">
        © {new Date().getFullYear()} {t.brand} — Démo HugoLab
      </footer>
    </div>
  );
}
