import { useMemo, useState, useEffect } from "react";
import {
  Waves, Anchor, CalendarClock, MapPin, Clock, Phone, Languages,
  Users, Shield, Camera, Info, BadgeEuro, Sun, Wind
} from "lucide-react";

/* ========= UI Prims ========= */
function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
      {children}
    </span>
  );
}
function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}
function CTA({ label, href, onClick, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring";
  const styles = {
    primary: { background: "linear-gradient(90deg,#0F172A,#334155)", color: "#fff" },
    ghost: {},
  };
  if (href) return <a href={href} className={base} style={styles[variant]}>{label}</a>;
  return <button onClick={onClick} className={base} style={styles[variant]}>{label}</button>;
}
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 ${className}`}>
      {children}
    </div>
  );
}

/* ========= Dark mode ========= */
function useDarkMode(defaultOn = false) {
  const [dark, setDark] = useState(defaultOn);
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);
  return [dark, setDark];
}
function ThemeToggle() {
  const [dark, setDark] = useDarkMode(false);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
}

/* ========= Copy ========= */
const copy = {
  fr: {
    brand: "Le Deck Pédalos",
    sub: "Talloires • Plage",
    nav: { booking: "Réserver", prices: "Tarifs", fleet: "Flotte", gallery: "Galerie", info: "Infos", faq: "FAQ", contact: "Contact" },
    hero: {
      kicker: "Vos pédalos au cœur du lac d’Annecy",
      title: "Réservez en 3 clics. Profitez, on s’occupe du reste.",
      subtitle: "Disponibilités en temps réel, rappel SMS et matériel fourni. Départs depuis la plage de Talloires.",
      cta1: "Réserver un créneau",
      cta2: "Voir les tarifs",
    },
    booking: {
      title: "Réserver un pédalo",
      date: "Date",
      time: "Heure",
      size: "Taille",
      duration: "Durée",
      name: "Nom",
      phone: "Téléphone",
      submit: "Valider la réservation",
      summary: "Récapitulatif",
      people: "places",
      mins: "min",
      hour: "h",
      disclaimer: "Paiement sur place. Annulation gratuite jusqu’à 2h avant le départ.",
    },
    rates: {
      title: "Tarifs & Options",
      note: "Tarifs indicatifs – sujets à variation selon affluence.",
      options: ["Gilets de sauvetage inclus", "Parasol (selon stock)", "Sac étanche"],
    },
    fleet: {
      title: "Notre flotte",
      items: [
        { title: "Pédalo 2 places", desc: "Compact et facile à manœuvrer.", img: "/pedalos/2_v2.jpg" },
        { title: "Pédalo 4 places", desc: "Le choix idéal en famille.", img: "/pedalos/3_v2.jpg" },
        { title: "Pédalo 6 places", desc: "Grand plateau, convivial.", img: "/pedalos/4_v2.jpg" },
      ],
    },
    why: {
      bullets: [
        { Icon: Shield, t: "Sécurité", d: "Brief rapide + gilets fournis." },
        { Icon: BadgeEuro, t: "Simple & clair", d: "Réservation en ligne, paiement sur place." },
        { Icon: Users, t: "Pour tous", d: "De 2 à 6 places, enfants bienvenus." },
        { Icon: Camera, t: "Souvenirs", d: "Prêt de sac étanche pour le téléphone." },
      ],
    },
    gallery: { title: "Galerie" },
    info: {
      title: "Infos pratiques",
      items: [
        { Icon: MapPin, text: "Plage de Talloires — parking à proximité" },
        { Icon: Clock, text: "Ouvert 10:00 – 19:00 (météo)" },
        { Icon: Sun, text: "Crème solaire et eau recommandées" },
        { Icon: Wind, text: "Sorties ajustées selon le vent" },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Faut-il savoir nager ?", a: "Oui, au moins le(s) pilote(s). Gilets disponibles pour tous." },
        { q: "Âge minimum ?", a: "Aucun, les enfants sont sous la responsabilité des adultes." },
        { q: "Annulation ?", a: "Gratuite jusqu’à 2h avant. En cas de météo défavorable, on reporte sans frais." },
      ],
    },
    contact: {
      title: "Contact",
      phone: "+33 4 58 00 00 01",
      address: "Plage de Talloires, 74290",
      call: "Appeler",
    },
  },
  en: {
    brand: "Le Deck Pedalos",
    sub: "Talloires • Beach",
    nav: { booking: "Book", prices: "Pricing", fleet: "Fleet", gallery: "Gallery", info: "Info", faq: "FAQ", contact: "Contact" },
    hero: {
      kicker: "Your pedalos in the heart of Lake Annecy",
      title: "Book in 3 clicks. We handle the rest.",
      subtitle: "Real-time availability, SMS reminder and included gear. Departures from Talloires beach.",
      cta1: "Book a slot",
      cta2: "See pricing",
    },
    booking: {
      title: "Book a pedalo",
      date: "Date",
      time: "Time",
      size: "Size",
      duration: "Duration",
      name: "Name",
      phone: "Phone",
      submit: "Confirm booking",
      summary: "Summary",
      people: "seats",
      mins: "min",
      hour: "h",
      disclaimer: "Pay on site. Free cancellation up to 2h before departure.",
    },
    rates: {
      title: "Pricing & Options",
      note: "Indicative prices — may vary with demand.",
      options: ["Life jackets included", "Parasol (when available)", "Dry bag"],
    },
    fleet: {
      title: "Our fleet",
      items: [
        { title: "2-seat pedalo", desc: "Compact, easy to handle.", img: "/pedalos/2_v2.jpg" },
        { title: "4-seat pedalo", desc: "Perfect for families.", img: "/pedalos/3_v2.jpg" },
        { title: "6-seat pedalo", desc: "Spacious deck for groups.", img: "/pedalos/4_v2.jpg" },
      ],
    },
    why: {
      bullets: [
        { Icon: Shield, t: "Safety", d: "Quick brief + life jackets." },
        { Icon: BadgeEuro, t: "Simple", d: "Online booking, pay on site." },
        { Icon: Users, t: "For everyone", d: "2 to 6 seats, kids welcome." },
        { Icon: Camera, t: "Memories", d: "Dry bag available for phones." },
      ],
    },
    gallery: { title: "Gallery" },
    info: {
      title: "Good to know",
      items: [
        { Icon: MapPin, text: "Talloires beach — parking nearby" },
        { Icon: Clock, text: "Open 10:00 – 19:00 (weather)" },
        { Icon: Sun, text: "Sunscreen & water recommended" },
        { Icon: Wind, text: "Trips adjusted with wind" },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Do I need to know how to swim?", a: "Yes for at least the pilot(s). Life jackets available for all." },
        { q: "Minimum age?", a: "No, kids must be supervised by adults." },
        { q: "Cancellation?", a: "Free up to 2h before. If weather is bad, we reschedule for free." },
      ],
    },
    contact: {
      title: "Contact",
      phone: "+33 4 58 00 00 01",
      address: "Talloires beach, 74290",
      call: "Call",
    },
  },
};

/* ========= Pricing engine ========= */
const DURATIONS = ["30", "60", "120"]; // minutes
const SIZES = ["2", "4", "6"]; // seats
const RATES = {
  "2": { "30": 12, "60": 22, "120": 40 },
  "4": { "30": 18, "60": 25, "120": 48 },
  "6": { "30": 22, "60": 32, "120": 60 },
};
const TIMES = ["10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","16:00","16:30","17:00","18:00"];

/* ========= Page ========= */
export default function LeDeckPedalos() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  // booking state
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(TIMES[0]);
  const [size, setSize] = useState("4");
  const [dur, setDur] = useState("60");
  const price = useMemo(() => RATES[size][dur], [size, dur]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9F6F8] to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-white">
      {/* Decorative glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div
          className="absolute left-1/2 top-[-120px] h-[320px] w-[70vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse at center,#22d3ee33,#ffffff00)" }}
        />
      </div>

      {/* Header (single) */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
        <Section className="flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white">
              <Waves size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold">{t.brand}</p>
              <p className="text-xs opacity-70">{t.sub}</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#booking" className="hover:opacity-80">{t.nav.booking}</a>
            <a href="#prices" className="hover:opacity-80">{t.nav.prices}</a>
            <a href="#fleet" className="hover:opacity-80">{t.nav.fleet}</a>
            <a href="#gallery" className="hover:opacity-80">{t.nav.gallery}</a>
            <a href="#info" className="hover:opacity-80">{t.nav.info}</a>
            <a href="#faq" className="hover:opacity-80">{t.nav.faq}</a>
            <a href="#contact" className="hover:opacity-80">{t.nav.contact}</a>

            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 dark:border-white/10 dark:bg-white/10"
              aria-label="Toggle language"
            >
              <Languages size={14} /> {lang.toUpperCase()}
            </button>
            <ThemeToggle />
          </nav>
        </Section>
      </header>

      {/* Hero */}
      <Section id="top" className="pt-10 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Pill>
              <Anchor size={16} /> {t.hero.kicker}
            </Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.hero.title}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">{t.hero.subtitle}</p>
            <div className="mt-6 flex gap-3">
              <CTA label={t.hero.cta1} href="#booking" />
              <a
                href="#prices"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm dark:border-white/10"
              >
                {t.hero.cta2}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              <Pill>
                <MapPin size={14} /> Talloires — Plage
              </Pill>
              <Pill>
                <Clock size={14} /> 10:00 – 19:00
              </Pill>
              <Pill>
                <Phone size={14} /> {copy[lang].contact.phone}
              </Pill>
            </div>
          </div>

          {/* Hero visual with glow + ring */}
          <div className="relative h-64 w-full overflow-hidden rounded-3xl md:h-80">
            <div className="absolute inset-0 bg-[url('/pedalos/1_v2.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-black/10 to-white/0 dark:from-black/40" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10 dark:ring-white/10" />
          </div>
        </div>
      </Section>

      {/* Wavy separator */}
      <div className="relative -mt-6 mb-8" aria-hidden>
        <svg viewBox="0 0 1440 90" className="h-[70px] w-full fill-white dark:fill-slate-900">
          <path d="M0 0h1440v43c-120 24-240 36-360 36s-240-12-360-36S480 7 360 7 120 31 0 55V0Z" />
        </svg>
      </div>

      {/* Booking */}
      <Section id="booking" className="pb-10">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">{t.booking.title}</h3>
          <form
            className="grid gap-4 md:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Request sent ✅");
            }}
          >
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.booking.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.booking.time}</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-white/5"
              >
                {TIMES.map((ti) => (
                  <option key={ti}>{ti}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.booking.size}</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-white/5"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} {t.booking.people}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.booking.duration}</label>
              <select
                value={dur}
                onChange={(e) => setDur(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-white/5"
              >
                {DURATIONS.map((m) => (
                  <option key={m} value={m}>
                    {m === "60" ? `1${t.booking.hour}` : `${m} ${t.booking.mins}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary */}
            <div className="md:col-span-3">
              <div className="rounded-xl border border-black/10 bg-white/70 p-4 text-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill>
                    <CalendarClock size={14} /> {date} — {time}
                  </Pill>
                  <Pill>
                    <Users size={14} /> {size} {t.booking.people}
                  </Pill>
                  <Pill>
                    <Clock size={14} /> {dur === "60" ? `1${t.booking.hour}` : `${dur} ${t.booking.mins}`}
                  </Pill>
                  <Pill>
                    <BadgeEuro size={14} /> {price}€
                  </Pill>
                </div>
                <p className="mt-3 opacity-70">{t.booking.disclaimer}</p>
              </div>
            </div>

            <div className="md:col-span-1 flex items-end">
              <CTA label={t.booking.submit} />
            </div>
          </form>
        </Card>
      </Section>

      {/* Fleet */}
      <Section id="fleet" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{copy[lang].fleet.title}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {copy[lang].fleet.items.map((f, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url('${f.img}')` }} />
              <div className="p-5">
                <p className="font-medium">{f.title}</p>
                <p className="text-sm opacity-70">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section className="pb-10">
        <div className="grid gap-4 md:grid-cols-4">
          {copy[lang].why.bullets.map((b, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white">
                  <b.Icon size={18} />
                </div>
                <div>
                  <p className="font-medium">{b.t}</p>
                  <p className="text-sm opacity-70">{b.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="prices" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{copy[lang].rates.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {SIZES.map((s) => (
            <Card key={s}>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {s} {t.booking.people}
                </p>
                <Pill>
                  <Clock size={14} /> {t.booking.duration}
                </Pill>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {DURATIONS.map((m) => (
                  <li key={m} className="flex items-center justify-between">
                    <span>{m === "60" ? `1${t.booking.hour}` : `${m} ${t.booking.mins}`}</span>
                    <span className="font-semibold">{RATES[s][m]}€</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm opacity-70">
          <Info size={16} /> {copy[lang].rates.note}
        </p>
        <p className="mt-1 text-sm opacity-70">Options : {copy[lang].rates.options.join(" • ")}</p>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{copy[lang].gallery.title}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "/pedalos/2_v2.jpg",
            "/pedalos/3_v2.jpg",
            "/pedalos/4_v2.jpg",
            "/pedalos/5_v2.jpg",
            "/pedalos/1_v2.jpg",
            "/pedalos/3_v2.jpg",
            "/pedalos/4_v2.jpg",
            "/pedalos/2_v2.jpg",
          ].map((src, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`pedalos ${i}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Section>

      {/* Practical info + map */}
      <Section id="info" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{copy[lang].info.title}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <ul className="space-y-2 text-sm">
              {copy[lang].info.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2">
                  <it.Icon className="mt-0.5" size={16} /> <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </Card>
          <div className="overflow-hidden rounded-2xl border border-black/10 shadow-sm dark:border-white/10">
            <iframe
              title="Talloires Beach"
              src="https://www.openstreetmap.org/export/embed.html?bbox=6.191%2C45.827%2C6.231%2C45.855&layer=mapnik&marker=45.842%2C6.209"
              className="h-64 w-full"
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{copy[lang].faq.title}</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {copy[lang].faq.items.map((f, i) => (
            <Card key={i}>
              <details>
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-2 text-sm opacity-80">{f.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="pb-16">
        <Card>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">{copy[lang].contact.title}</p>
              <p className="text-sm opacity-70">{copy[lang].contact.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${copy[lang].contact.phone.replace(/\s/g, "")}`}
                className="rounded-xl border border-black/10 px-4 py-2 text-sm dark:border-white/10"
              >
                <Phone className="mr-2 inline-block" size={14} />
                {copy[lang].contact.call}
              </a>
              <CTA label={t.hero.cta1} href="#booking" />
            </div>
          </div>
        </Card>
      </Section>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70 dark:border-white/10">
        © {new Date().getFullYear()} Le Deck Pédalos — Démo HugoLab
      </footer>
    </div>
  );
}
