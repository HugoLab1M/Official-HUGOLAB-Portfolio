import Agenda from "../components/Agenda.jsx";

const LEAD_BG =
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2000&q=80";

export default function AgendaPage() {
  return (
    <div className="bg-[var(--bg)]">
      <header className="relative isolate overflow-hidden">
        <img
          src={LEAD_BG}
          alt="Programmation La Seiche"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110b07]/80 via-[#110b07]/40 to-[#110b07]/80" />
        <div className="relative mx-auto flex min-h-[400px] max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.14em] uppercase">Programme La Seiche</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-5xl">
            Agenda concerts, soirées dansantes, spectacles &amp; animations
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Rock’n’roll avec DJ Shrek, soirées salsa/bachata/kizomba, bal country, stand-up Carton Comedy Club,
            jam sessions et karaokés : La Seiche fait vibrer Sévrier chaque semaine.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">Programme</p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] sm:text-[2.3rem]">
            Agenda concerts, soirées dansantes, spectacles & animations
          </h1>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Rock’n’roll, salsa, bachata, country, jam sessions, Carton Comedy Club, DJ sets, karaokés, petit bal
            du dimanche… La Seiche met à l’honneur artistes et collectifs de Haute-Savoie. Naviguez par date,
            téléchargez votre fiche .ics et partagez la soirée avec votre équipe.
          </p>
        </div>
      </section>
      <Agenda />
    </div>
  );
}
