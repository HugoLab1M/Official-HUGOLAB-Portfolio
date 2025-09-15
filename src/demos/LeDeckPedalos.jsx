import { useState } from "react";
import { Waves, Anchor, CalendarClock, MapPin, Clock, Phone, Languages } from "lucide-react";

function Pill({ children }) { return <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-sm backdrop-blur">{children}</span>; }
function Section({ children, className = "" }) { return <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>; }
function CTA({ label, onClick }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring"
      style={{ background: "linear-gradient(90deg, #111827, #1f2937)", color: "#fff" }}
    >
      {label}
    </button>
  );
}
function Card({ children, className = "" }) { return <div className={`rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur ${className}`}>{children}</div>; }

const copy = {
  fr: {
    common: { bookSlot: "Réservez votre créneau", date: "Date", time: "Heure", size: "Taille", duration: "Durée", name: "Nom", phone: "Téléphone", submit: "Valider la réservation" },
    deck: {
      tagline: "Vos pédalos au cœur du lac d’Annecy",
      pitch: "Réservez votre pédalo à Talloires et vivez un moment unique en famille ou entre amis.",
      formTitle: "Réserver un pédalo",
      tarifsTitle: "Tarifs & Options",
      tarifs: [
        { title: "2 places – 30 min", price: "12€" },
        { title: "4 places – 1h", price: "25€" },
        { title: "6 places – 2h", price: "60€" },
      ],
      options: ["Gilets de sauvetage", "Sac étanche", "Parasol"],
      infos: [
        { icon: CalendarClock, text: "Merci de revenir 5 min avant la fin de votre créneau" },
        { icon: MapPin, text: "Parking à proximité – Plage de Talloires" },
      ],
    },
  },
  en: {
    common: { bookSlot: "Book your time slot", date: "Date", time: "Time", size: "Size", duration: "Duration", name: "Name", phone: "Phone", submit: "Confirm booking" },
    deck: {
      tagline: "Your pedalos in the heart of Lake Annecy",
      pitch: "Book your pedalo in Talloires and share unforgettable moments.",
      formTitle: "Book a pedalo",
      tarifsTitle: "Pricing & Options",
      tarifs: [
        { title: "2 seats – 30 min", price: "€12" },
        { title: "4 seats – 1h", price: "€25" },
        { title: "6 seats – 2h", price: "€60" },
      ],
      options: ["Life jackets", "Dry bag", "Parasol"],
      infos: [
        { icon: CalendarClock, text: "Please return 5 min before your slot ends" },
        { icon: MapPin, text: "Nearby parking – Talloires Beach" },
      ],
    },
  },
};

export default function LeDeckPedalos() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2E6D8] to-white text-[#083D77]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1BAFBF] text-white"><Waves size={18}/></div>
            <div>
              <p className="text-lg font-semibold">Le Deck Pédalos</p>
              <p className="text-xs opacity-70">Talloires • Plage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm">
              <span className="sr-only">Toggle language</span> {lang.toUpperCase()}
            </button>
          </div>
        </Section>
      </header>

      <Section className="pt-10 pb-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Pill><Anchor size={16}/> {t.deck.tagline}</Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.deck.pitch}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">
              Réservation en ligne, disponibilité en temps réel et rappel SMS. Partez à l’heure, revenez 5 minutes avant la fin de votre créneau.
            </p>
            <div className="mt-6"><CTA label={t.common.bookSlot} /></div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              <Pill><MapPin size={14}/> Plage de Talloires</Pill>
              <Pill><Clock size={14}/> 10:00 – 19:00</Pill>
              <Pill><Phone size={14}/> +33 4 58 00 00 01</Pill>
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-[#083D77] to-[#1BAFBF] shadow-lg md:h-80">
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl bg-white/20 p-6 text-white backdrop-blur-md">
                <p className="text-xl font-semibold">Talloires • Turquoise</p>
                <p className="text-sm opacity-90">Hero image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-10">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t.deck.formTitle}</h3>
          <form className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.date}</label>
              <input type="date" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.time}</label>
              <input type="time" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.size}</label>
              <select className="w-full rounded-xl border border-black/10 px-3 py-2">
                <option>Pédalo 2 places</option>
                <option>Pédalo 4 places</option>
                <option>Pédalo 6 places</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.duration}</label>
              <select className="w-full rounded-xl border border-black/10 px-3 py-2">
                <option>30 min</option>
                <option>1h</option>
                <option>2h</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.name}</label>
              <input placeholder="Camille Martin" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">{t.common.phone}</label>
              <input placeholder="+33 6 00 00 00 02" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div className="md:col-span-3">
              <CTA label={t.common.submit} />
            </div>
          </form>
        </div>
      </Section>

      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.deck.tarifsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.deck.tarifs.map((p, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{p.title}</p>
                <span className="text-sm font-semibold">{p.price}</span>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-sm opacity-70">Options : {t.deck.options.join(" • ")}</p>
      </Section>

      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">Infos pratiques</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {t.deck.infos.map((item, i) => (
            <Card key={i}><div className="flex items-center gap-3"><item.icon size={18}/><p>{item.text}</p></div></Card>
          ))}
          <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1592833159155-cf7f07d9aaf6?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 text-white shadow-inner">
            <p className="text-lg font-semibold drop-shadow">Eau turquoise</p>
            <p className="max-w-sm text-sm opacity-90 drop-shadow">Galerie placeholder (remplacer par vraies photos).</p>
          </div>
        </div>
      </Section>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} Le Deck Pédalos – Démo HugoLab</footer>
    </div>
  );
}
