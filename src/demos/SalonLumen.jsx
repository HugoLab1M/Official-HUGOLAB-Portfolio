import { Phone, MapPin, Clock, Instagram, Scissors } from "lucide-react";

/*
  Salon Lumen — maquette "Landing Express" volontairement sobre :
  une seule page, pas d'animation lourde, un seul accent couleur.
  Montre ce qu'un petit budget bien exécuté peut donner.
*/

const COPPER = "#B06B3A";
const INK = "#2B2523";

const PRESTATIONS = [
  { name: "Coupe femme", detail: "Shampoing, coupe, coiffage", price: "42 €" },
  { name: "Coupe homme", detail: "Coupe ciseaux ou tondeuse, finitions", price: "26 €" },
  { name: "Barbe", detail: "Taille, contours, serviette chaude", price: "18 €" },
  { name: "Couleur", detail: "Coloration végétale ou classique", price: "dès 55 €" },
  { name: "Balayage", detail: "Méchage, patine, brushing", price: "dès 75 €" },
  { name: "Enfant (-10 ans)", detail: "Coupe simple", price: "16 €" },
];

const HORAIRES = [
  { jour: "Mardi – Vendredi", heures: "9h00 – 18h30" },
  { jour: "Samedi", heures: "8h30 – 17h00" },
  { jour: "Dimanche & Lundi", heures: "Fermé" },
];

export default function SalonLumen() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2523]" style={{ fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .lumen-serif { font-family: 'DM Serif Display', Georgia, serif; }
      `}</style>

      {/* Header minimal */}
      <header className="border-b border-[#2B2523]/10 bg-[#FBF7F2]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Scissors className="h-5 w-5" style={{ color: COPPER }} aria-hidden />
            <p className="lumen-serif text-xl">Salon Lumen</p>
          </div>
          <a
            href="tel:+33450520000"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: INK }}
          >
            <Phone className="h-4 w-4" aria-hidden />
            04 50 52 00 00
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 pb-16 pt-16 text-center md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: COPPER }}>
            Coiffeur · Annecy centre
          </p>
          <h1 className="lumen-serif mx-auto mt-5 max-w-2xl text-4xl leading-tight md:text-5xl">
            Un salon de quartier, des coupes qui vous ressemblent
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#6B615C]">
            Depuis 2012, Camille et son équipe vous accueillent rue Carnot, sans rendez-vous le matin,
            sur réservation l’après-midi. Produits professionnels, café offert, conseils sincères.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+33450520000"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: COPPER }}
            >
              <Phone className="h-4 w-4" aria-hidden />
              Prendre rendez-vous
            </a>
            <a
              href="#tarifs"
              className="inline-flex items-center rounded-full border border-[#2B2523]/20 px-6 py-3 text-sm font-semibold transition hover:border-[#B06B3A] hover:text-[#B06B3A]"
            >
              Voir les tarifs
            </a>
          </div>
        </section>

        {/* Photo bandeau */}
        <section className="mx-auto max-w-5xl px-5">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"
              alt="Intérieur du Salon Lumen : fauteuils, miroirs et lumière naturelle"
              className="h-72 w-full object-cover md:h-96"
              loading="lazy"
              width="1600"
              height="900"
            />
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="mx-auto max-w-4xl px-5 py-16 md:py-20">
          <h2 className="lumen-serif text-3xl">Prestations & tarifs</h2>
          <ul className="mt-8 divide-y divide-[#2B2523]/10">
            {PRESTATIONS.map((p) => (
              <li key={p.name} className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="mt-0.5 text-sm text-[#6B615C]">{p.detail}</p>
                </div>
                <p className="lumen-serif whitespace-nowrap text-xl" style={{ color: COPPER }}>{p.price}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#6B615C]">
            Tarifs TTC. Cheveux longs ou prestations techniques : devis sur place avant de commencer.
          </p>
        </section>

        {/* Infos pratiques */}
        <section className="border-t border-[#2B2523]/10 bg-white py-16">
          <div className="mx-auto grid max-w-4xl gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="lumen-serif text-3xl">Horaires</h2>
              <ul className="mt-6 space-y-3">
                {HORAIRES.map((h) => (
                  <li key={h.jour} className="flex items-center justify-between border-b border-[#2B2523]/10 pb-3 text-sm">
                    <span className="font-semibold">{h.jour}</span>
                    <span className="text-[#6B615C]">{h.heures}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-sm text-[#6B615C]">
                <Clock className="h-4 w-4" style={{ color: COPPER }} aria-hidden />
                Sans rendez-vous tous les matins avant 11h
              </p>
            </div>
            <div>
              <h2 className="lumen-serif text-3xl">Nous trouver</h2>
              <address className="mt-6 space-y-3 text-sm not-italic text-[#6B615C]">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none" style={{ color: COPPER }} aria-hidden />
                  12 rue Carnot, 74000 Annecy<br />(à 2 min de la vieille ville)
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-none" style={{ color: COPPER }} aria-hidden />
                  <a href="tel:+33450520000" className="underline underline-offset-4 hover:text-[#B06B3A]">04 50 52 00 00</a>
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 flex-none" style={{ color: COPPER }} aria-hidden />
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#B06B3A]">
                    @salonlumen.annecy
                  </a>
                </p>
              </address>
              <a
                href="https://maps.google.com/?q=12+rue+Carnot+Annecy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2B2523]/20 px-5 py-2.5 text-sm font-semibold transition hover:border-[#B06B3A] hover:text-[#B06B3A]"
              >
                Ouvrir dans Maps
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-[#6B615C]">
        © {new Date().getFullYear()} Salon Lumen — Maquette démonstration HügoLab (offre Landing Express)
      </footer>
    </div>
  );
}
