import { useState } from "react";
import { Ship, Waves, Anchor, MapPin, Clock, Phone, Languages, CreditCard, ShieldCheck, Wind, Camera } from "lucide-react";

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
    tagline: "Bateaux sans permis au cœur du lac",
    pitch: "Réservez votre bateau à Saint-Jorioz et profitez d’une balade en toute simplicité.",
    cta: "Réserver un créneau",
    heroBadges: [
      { Icon: MapPin, text: "Port de Saint-Jorioz" },
      { Icon: Clock, text: "9:00 – 19:00" },
      { Icon: Phone, text: "+33 4 58 00 00 10" },
    ],
    features: [
      { Icon: CreditCard, text: "Acompte en ligne + empreinte de caution" },
      { Icon: ShieldCheck, text: "Brief sécurité & zones autorisées" },
      { Icon: Wind, text: "Blocage météo automatique (report/avoir)" },
      { Icon: Camera, text: "Options: GoPro / bouée tractée (si permis adapté)" },
    ],
    fleetTitle: "Notre flotte",
    fleet: [
      { name: "Sans permis 6cv", desc: "Jusqu’à 5 pers • idéal découverte" },
      { name: "Sans permis confort", desc: "Banquettes + bimini • 5 pers" },
      { name: "Électrique", desc: "Silencieux • 4 pers • éco" },
    ],
    formTitle: "Réservation",
    labels: { date: "Date", time: "Heure", duration: "Durée", model: "Modèle", name: "Nom", phone: "Téléphone", submit: "Valider la réservation" },
    durations: ["1h", "2h", "3h"],
  },
  en: {
    tagline: "No-license boats on Lake Annecy",
    pitch: "Book your boat in Saint-Jorioz and enjoy a smooth ride.",
    cta: "Book a time slot",
    heroBadges: [
      { Icon: MapPin, text: "Saint-Jorioz Marina" },
      { Icon: Clock, text: "9:00 – 7:00 PM" },
      { Icon: Phone, text: "+33 4 58 00 00 10" },
    ],
    features: [
      { Icon: CreditCard, text: "Deposit online + card hold" },
      { Icon: ShieldCheck, text: "Safety briefing & allowed areas" },
      { Icon: Wind, text: "Weather auto-hold (reschedule/credit)" },
      { Icon: Camera, text: "Add-ons: GoPro / towable (where allowed)" },
    ],
    fleetTitle: "Our fleet",
    fleet: [
      { name: "No-license 6hp", desc: "Up to 5 ppl • discovery" },
      { name: "Comfort no-license", desc: "Benches + bimini • 5 ppl" },
      { name: "Electric", desc: "Silent • 4 ppl • eco" },
    ],
    formTitle: "Booking",
    labels: { date: "Date", time: "Time", duration: "Duration", model: "Model", name: "Name", phone: "Phone", submit: "Confirm booking" },
    durations: ["1h", "2h", "3h"],
  },
};

export default function SansPermisSaintJorioz() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E7F7FB] to-white text-[#0F172A]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9] text-white"><Ship size={18}/></div>
            <div>
              <p className="text-lg font-semibold">Sans Permis Saint-Jorioz</p>
              <p className="text-xs opacity-70">Port • Réservation en ligne</p>
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
            <Pill><Anchor size={16}/> {t.tagline}</Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.pitch}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">Acompte sécurisé, empreinte bancaire pour la caution, rappel SMS et carte des zones autorisées.</p>
            <div className="mt-6"><CTA label={t.cta} /></div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              {t.heroBadges.map(({ Icon, text }, i) => <Pill key={i}><Icon size={14}/> {text}</Pill>)}
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-[#0F172A] to-[#0EA5E9] shadow-lg md:h-80">
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl bg-white/20 p-6 text-white backdrop-blur-md">
                <p className="text-xl font-semibold">Saint-Jorioz • Marina</p>
                <p className="text-sm opacity-90">Hero image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-8">
        <h2 className="mb-4 text-2xl font-semibold">{t.fleetTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.fleet.map((b, i) => (
            <Card key={i}>
              <p className="font-medium">{b.name}</p>
              <p className="text-sm opacity-70">{b.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pb-10">
        <div className="grid gap-4 md:grid-cols-2">
          {t.features.map((f, i) => (
            <Card key={i}><div className="flex items-center gap-3"><f.Icon size={18}/><p>{f.text}</p></div></Card>
          ))}
          <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 text-white shadow-inner">
            <p className="text-lg font-semibold drop-shadow">Balade au calme</p>
            <p className="max-w-sm text-sm opacity-90 drop-shadow">Galerie placeholder</p>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">{t.formTitle}</h3>
          <form className="grid gap-4 md:grid-cols-3">
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.date}</label><input type="date" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.time}</label><input type="time" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.duration}</label><select className="w-full rounded-xl border border-black/10 px-3 py-2">{t.durations.map(d=><option key={d}>{d}</option>)}</select></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.model}</label><select className="w-full rounded-xl border border-black/10 px-3 py-2"><option>Sans permis 6cv</option><option>Sans permis confort</option><option>Électrique</option></select></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.name}</label><input placeholder="Alex Dupont" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.phone}</label><input placeholder="+33 6 00 00 00 10" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div className="md:col-span-3"><CTA label={t.labels.submit} /></div>
          </form>
        </Card>
      </Section>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} Sans Permis Saint-Jorioz – Démo HugoLab</footer>
    </div>
  );
}
