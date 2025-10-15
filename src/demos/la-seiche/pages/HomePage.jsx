import Hero from "../components/Hero.jsx";
import { PrimaryButton, GhostButton } from "../components/Ctas.jsx";
import ReviewsTeaser from "../components/ReviewsTeaser.jsx";
import MaquettePitch from "../components/MaquettePitch.jsx";

const SECTION_SPOTLIGHTS = [
  {
    title: "Restaurants",
    description:
      "Burger artisanal, pizzas au feu de bois, salades fraîches, tacos et cuisine mexicaine : le food court mêle espaces ouverts et terrasses détente.",
    href: "/demos/la-seiche/restaurant",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Agenda",
    description:
      "Concerts pop/folk/funk, soirées salsa/bachata/kizomba, karaoké, bal country, jam sessions et DJ sets locaux. Un vrai lieu de vie toute l’année.",
    href: "/demos/la-seiche/agenda",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sorties & loisirs",
    description:
      "Billards, baby-foot, fléchettes, jeux d’arcade, pétanque et skatepark : de quoi prolonger la soirée en famille ou entre amis.",
    href: "/demos/la-seiche/loisirs",
    image:
      "https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Privatisations",
    description:
      "Anniversaires, séminaires, lancements produits, soirées d’entreprise : deux niveaux, bar central, stands culinaires et scène équipée.",
    href: "/demos/la-seiche/privatisations",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {SECTION_SPOTLIGHTS.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-3xl bg-[#F5E4CD] shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-52 w-full overflow-hidden bg-black/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                  <span className="mt-auto text-sm font-medium text-[var(--brown)] group-hover:underline">
                    Découvrir
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="grid gap-8 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] sm:grid-cols-[1.2fr_0.9fr] sm:p-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
                Carton Comedy Club
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[2rem]">
                Stand-up Annecy & plateaux d’humoristes à La Seiche
              </h2>
              <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Toutes les semaines, le Carton Comedy Club pose ses valises à Sévrier. De la crème des
                humoristes régionaux aux talents émergents, l’espace scène se transforme en salle de spectacle.
                Réservez vos places sur le programme en ligne.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/demos/la-seiche/agenda">Voir les prochaines dates</PrimaryButton>
                <GhostButton href="/demos/la-seiche/blog">En savoir plus</GhostButton>
              </div>
            </div>
            <div className="h-64 overflow-hidden rounded-3xl bg-black/10">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
                alt="Carton Comedy Club"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <ReviewsTeaser />
      <MaquettePitch />
    </>
  );
}
