import { useState } from "react";
import { Bike, Coffee, CalendarClock, MapPin, Clock, Phone, Languages, Sun } from "lucide-react";

function Pill({ children }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-sm backdrop-blur">{children}</span>;
}
function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}
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
function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur ${className}`}>{children}</div>;
}

const copy = {
  fr: {
    nav: { reserve: "Réserver", menu: "Café & Snack", packs: "Packs" },
    common: { reserveNow: "Réserver maintenant", choose: "Choisir", duration: "Durée", date: "Date", time: "Heure", name: "Nom", phone: "Téléphone", submit: "Valider la réservation" },
    coup: {
      tagline: "Pause gourmande & location de vélos au bord du lac",
      pitch: "Louez votre vélo et profitez d’une pause gourmande sur la Voie Verte d’Annecy.",
      bikes: "Nos vélos",
      cafe: "Café & Snack",
      packs: "Packs avantage",
      mapTitle: "À 2 min de la Voie Verte – Sevrier",
      bikeTypes: [
        { title: "VAE (Électrique)", desc: "Idéal pour faire le tour du lac sans forcer", icon: Bike },
        { title: "VTC Classique", desc: "Confort et simplicité pour une balade", icon: Bike },
        { title: "Remorque / Cargo", desc: "Parfait pour enfants ou bagages", icon: Bike },
      ],
      cafeLines: [
        { icon: Coffee, text: "Espressos, cappuccinos, smoothies" },
        { icon: Sun, text: "Terrasse ensoleillée, snack maison" },
      ],
      packItems: [
        { title: "Ride & Coffee", detail: "1 vélo + boisson chaude", price: "+4€" },
        { title: "Family Pack", detail: "2 vélos + remorque + goûter", price: "-10%" },
      ],
      formTitle: "Réserver un vélo",
    },
  },
  en: {
    nav: { reserve: "Book", menu: "Cafe & Snack", packs: "Bundles" },
    common: { reserveNow: "Book now", choose: "Choose", duration: "Duration", date: "Date", time: "Time", name: "Name", phone: "Phone", submit: "Confirm booking" },
    coup: {
      tagline: "Coffee break & bike rental by the lake",
      pitch: "Rent your bike and enjoy a tasty break on the Annecy Greenway.",
      bikes: "Our bikes",
      cafe: "Cafe & Snack",
      packs: "Value bundles",
      mapTitle: "2 minutes from the Greenway – Sevrier",
      bikeTypes: [
        { title: "E-bike", desc: "Perfect for the full tour with ease", icon: Bike },
        { title: "City bike", desc: "Comfort and simplicity for a ride", icon: Bike },
        { title: "Trailer / Cargo", desc: "Great for kids or luggage", icon: Bike },
      ],
      cafeLines: [
        { icon: Coffee, text: "Espressos, cappuccinos, smoothies" },
        { icon: Sun, text: "Sunny terrace, homemade snacks" },
      ],
      packItems: [
        { title: "Ride & Coffee", detail: "1 bike + hot drink", price: "+€4" },
        { title: "Family Pack", detail: "2 bikes + trailer + snack", price: "-10%" },
      ],
      formTitle: "Book a bike",
    },
  },
};

export default function CoupDePompe() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E9DC] to-white text-[#2A2A2A]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E5E4E] text-white"><Coffee size={18}/></div>
            <div>
              <p className="text-lg font-semibold">Coup de Pompe</p>
              <p className="text-xs opacity-70">Sevrier • Voie Verte</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm">
              <Languages size={14}/> {lang.toUpperCase()}
            </button>
          </div>
        </Section>
      </header>

      <Section className="pt-10 pb-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Pill><Bike size={16}/> {t.coup.tagline}</Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.coup.pitch}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">
              Apple Pay / Google Pay, dépôt de garantie digitalisé et rappel SMS. Réservez en 30 secondes, partez dans la foulée.
            </p>
            <div className="mt-6"><CTA label={t.common.reserveNow} /></div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              <Pill><MapPin size={14}/> {t.coup.mapTitle}</Pill>
              <Pill><Clock size={14}/> 9:00 – 19:00</Pill>
              <Pill><Phone size={14}/> +33 4 58 00 00 00</Pill>
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-[#2E5E4E] to-[#F77F00] shadow-lg md:h-80">
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl bg-white/20 p-6 text-white backdrop-blur-md">
                <p className="text-xl font-semibold">Voie Verte • Lake View</p>
                <p className="text-sm opacity-90">Hero image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.coup.bikes}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.coup.bikeTypes.map((b, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E5E4E] text-white"><b.icon size={18}/></div>
                <div>
                  <p className="font-medium">{b.title}</p>
                  <p className="text-sm opacity-70">{b.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm opacity-70">1h • 1/2 journée • journée</p>
                <CTA label={t.common.choose} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.coup.cafe}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex flex-col gap-3">
              {t.coup.cafeLines.map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5"><l.icon size={16}/></div>
                  <p>{l.text}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 text-white shadow-inner">
            <p className="text-lg font-semibold drop-shadow">Terrasse côté lac</p>
            <p className="max-w-sm text-sm opacity-90 drop-shadow">Parfait après le tour ou avant la montée vers Saint-Jorioz.</p>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">{t.coup.formTitle}</h3>
          <form className="grid gap-4 md:grid-cols-3">
            <div className="col-span-1">
              <label className="mb-1 block text-sm opacity-70">{t.common.date}</label>
              <input type="date" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm opacity-70">{t.common.time}</label>
              <input type="time" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm opacity-70">{t.common.duration}</label>
              <select className="w-full rounded-xl border border-black/10 px-3 py-2">
                <option>1h</option>
                <option>1/2 journée</option>
                <option>Journée</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm opacity-70">{t.common.name}</label>
              <input placeholder="Jean Dupont" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm opacity-70">{t.common.phone}</label>
              <input placeholder="+33 6 00 00 00 00" className="w-full rounded-xl border border-black/10 px-3 py-2" />
            </div>
            <div className="col-span-3">
              <CTA label={t.common.submit} />
            </div>
          </form>
        </Card>
      </Section>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} Coup de Pompe – Démo HugoLab</footer>
    </div>
  );
}
