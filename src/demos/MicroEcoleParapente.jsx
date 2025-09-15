import { useState } from "react";
import { Wind, MapPin, Clock, Phone, Languages, Camera, Gift, CalendarClock } from "lucide-react";

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
    tagline: "Biplace au-dessus du lac — Planfait / Forclaz",
    pitch: "Volez en parapente biplace avec une micro-école locale à Doussard.",
    cta: "Réserver un vol",
    badges: [
      { Icon: MapPin, text: "RDV: Atterrissage de Doussard" },
      { Icon: Clock, text: "8:30 – 19:30 (selon météo)" },
      { Icon: Phone, text: "+33 4 58 00 00 20" },
    ],
    productsTitle: "Nos vols",
    products: [
      { name: "Découverte", desc: "10–15 min • vue lac • photos en option" },
      { name: "Prestige", desc: "25–35 min • conditions ascendantes" },
      { name: "Acro Sensations", desc: "Figures, G-forces • vidéo incluse" },
    ],
    optionsTitle: "Options & infos",
    options: [
      { Icon: Camera, text: "Photos/vidéos HD" },
      { Icon: Gift, text: "Bons cadeaux" },
      { Icon: CalendarClock, text: "Report météo sans frais" },
    ],
    formTitle: "Réservation",
    labels: { date: "Date", time: "Heure", formula: "Formule", weight: "Poids (kg)", name: "Nom", phone: "Téléphone", submit: "Valider la réservation" },
    slots: ["8:30", "10:00", "12:00", "14:30", "16:30"],
  },
  en: {
    tagline: "Tandem flights — Planfait / Forclaz",
    pitch: "Fly tandem with a local micro-school based in Doussard.",
    cta: "Book a flight",
    badges: [
      { Icon: MapPin, text: "Meeting: Doussard landing field" },
      { Icon: Clock, text: "8:30 AM – 7:30 PM (weather)" },
      { Icon: Phone, text: "+33 4 58 00 00 20" },
    ],
    productsTitle: "Our flights",
    products: [
      { name: "Discovery", desc: "10–15 min • lake views • photos optional" },
      { name: "Prestige", desc: "25–35 min • thermals permitting" },
      { name: "Acro Sensations", desc: "Tricks, G-forces • video included" },
    ],
    optionsTitle: "Add-ons & info",
    options: [
      { Icon: Camera, text: "HD photos/videos" },
      { Icon: Gift, text: "Gift vouchers" },
      { Icon: CalendarClock, text: "Free weather reschedule" },
    ],
    formTitle: "Booking",
    labels: { date: "Date", time: "Time", formula: "Package", weight: "Weight (kg)", name: "Name", phone: "Phone", submit: "Confirm booking" },
    slots: ["8:30", "10:00", "12:00", "14:30", "16:30"],
  },
};

export default function MicroEcoleParapente() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF7F1] to-white text-[#0F172A]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16A34A] text-white"><Wind size={18}/></div>
            <div>
              <p className="text-lg font-semibold">Micro-École Parapente</p>
              <p className="text-xs opacity-70">Doussard • Biplace</p>
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
            <Pill><Wind size={16}/> {t.tagline}</Pill>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.pitch}</h1>
            <p className="mt-3 max-w-prose text-sm opacity-80">Poids/âge vérifiés à la réservation, briefing sécurité, point de RDV GPS, photos/vidéos en option.</p>
            <div className="mt-6"><CTA label={t.cta} /></div>
            <div className="mt-6 flex flex-wrap gap-3 opacity-90">
              {t.badges.map(({ Icon, text }, i) => <Pill key={i}><Icon size={14}/> {text}</Pill>)}
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-[#0F172A] to-[#16A34A] shadow-lg md:h-80">
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl bg-white/20 p-6 text-white backdrop-blur-md">
                <p className="text-xl font-semibold">Planfait • Forclaz</p>
                <p className="text-sm opacity-90">Hero image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-8">
        <h2 className="mb-4 text-2xl font-semibold">{t.productsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.products.map((p, i) => (
            <Card key={i}>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm opacity-70">{p.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pb-10">
        <h2 className="mb-4 text-2xl font-semibold">{t.optionsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.options.map((o, i) => <Card key={i}><div className="flex items-center gap-3"><o.Icon size={18}/><p>{o.text}</p></div></Card>)}
          <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 text-white shadow-inner md:col-span-2">
            <p className="text-lg font-semibold drop-shadow">Au-dessus du lac</p>
            <p className="max-w-sm text-sm opacity-90 drop-shadow">Galerie placeholder</p>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">{t.formTitle}</h3>
          <form className="grid gap-4 md:grid-cols-3">
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.date}</label><input type="date" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.time}</label><select className="w-full rounded-xl border border-black/10 px-3 py-2">{t.slots.map(s=><option key={s}>{s}</option>)}</select></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.formula}</label><select className="w-full rounded-xl border border-black/10 px-3 py-2"><option>Découverte</option><option>Prestige</option><option>Acro Sensations</option></select></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.weight}</label><input type="number" min="20" max="120" placeholder="Ex: 75" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.name}</label><input placeholder="Lucie Martin" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div><label className="mb-1 block text-sm opacity-70">{t.labels.phone}</label><input placeholder="+33 6 00 00 00 20" className="w-full rounded-xl border border-black/10 px-3 py-2" /></div>
            <div className="md:col-span-3"><CTA label={t.labels.submit} /></div>
          </form>
        </Card>
      </Section>

      <footer className="border-t border-black/10 py-8 text-center text-sm opacity-70">© {new Date().getFullYear()} Micro-École Parapente – Démo HugoLab</footer>
    </div>
  );
}
