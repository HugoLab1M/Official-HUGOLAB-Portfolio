import { RestaurantSection } from "../components/Stands.jsx";

const LEAD_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80";

const INTRO_PARAGRAPHS = [
  "Dans un cadre agréable, les stands restaurants du food court proposent une cuisine soignée et variée. Les espaces se partagent entre grandes tablées en intérieur, terrasses aménagées et lounge cosy, pour déguster où vous voulez.",
  "Entrées, plats, desserts pour tous — kids friendly, espace famille & jeux, aménagements mobilité réduite. Cuisine du monde faite maison : burger, tacos, snack au stand Atelier Burger ; galettes et planches au Sain Bol ; pizzas artisanales cuites au feu de bois ; salades italiennes chez Napoli Pizza ; plats mexicains traditionnels chez Chichen-Itza ; couscous et tajines au stand Oriental.",
  "Horaires : mercredi et jeudi 18h-00h, vendredi et samedi 18h-00h30, dimanche 12h-23h.",
];

const STAND_FOCUS = [
  {
    title: "Napoli Pizza",
    description: "Pizzas faites maison, cuites au four à bois, salades italiennes & focaccia.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Atelier Burger",
    description: "Burgers, tacos, wrap, croque-monsieur, wings, nuggets, frites croustillantes.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Le Sain Bol",
    description: "Bar à salades, soupes froides, jus frais pressés minute, desserts légers.",
    image:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Chichen-Itza",
    description: "Tacos, quesadillas, burritos, barbacoa, alambre al pastor et recettes mexicaines.",
    image:
      "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=1200&q=80",
  },
];

const AMBIANCE_SHOTS = [
  {
    title: "Comptoirs & terrasses",
    description: "Vastes espaces communs pour partager tapas et planches après le service.",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Family friendly",
    description: "Zones cosy, espace kids & jeux, confort pour toutes les mobilités.",
    image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Service du soir",
    description: "Ambiance feutrée, éclairages bois & laiton, playlists chill & funk.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
];

const STAND_LIST = [
  {
    label: "Pizza au four à bois",
    detail: "Napoli Pizza : pizzas faites maison, cuites au four à bois.",
  },
  {
    label: "Burger, snacking",
    detail: "Atelier Burger : burgers, tacos, wrap, croque-monsieur, steak, wings, nuggets, frites.",
  },
  {
    label: "Bar à salades",
    detail: "Le Sain Bol : bar à salades, soupes froides, jus de fruits et légumes frais.",
  },
  {
    label: "Cuisine mexicaine",
    detail: "Chichen-Itza : tacos, quesadillas, burritos, barbacoa, alambre al pastor et plus.",
  },
];

export default function RestaurantPage() {
  return (
    <div className="bg-[var(--bg)]">
      <header className="relative isolate overflow-hidden">
        <img
          src={LEAD_BG}
          alt="Food court La Seiche"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110b07]/80 via-[#110b07]/40 to-[#110b07]/80" />
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.14em] uppercase">Bars et restaurants — La Seiche</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-5xl">
            Cuisine du monde, espaces lounge et terrasses ouvertes
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Food court, bar et restaurant, sorties entre amis, famille ou collègue : La Seiche mixe cartes
            soignées, ambiances conviviales et service à emporter ou à déguster sur place, face au lac d’Annecy.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-white/75">
            Bar et restaurant, blog « Quoi faire Annecy &amp; Sévrier », sortie amis et famille : tout est pensé pour
            savourer les soirées au bord du lac.
          </p>
        </div>
      </header>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:hidden">
          {AMBIANCE_SHOTS.map((shot) => (
            <figure
              key={shot.title}
              className="overflow-hidden rounded-3xl bg-black/10"
            >
              <img src={shot.image} alt={shot.title} className="h-52 w-full object-cover" loading="lazy" />
              <figcaption className="space-y-1 p-4 text-sm text-[var(--muted)]">
                <p className="text-base font-semibold text-[var(--ink)]">{shot.title}</p>
                <p>{shot.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="relative hidden gap-4 overflow-hidden rounded-[32px] bg-white/10 p-4 sm:flex">
          {AMBIANCE_SHOTS.map((shot, index) => (
            <figure
              key={shot.title}
              className="group relative flex-1 overflow-hidden rounded-3xl transition-[flex] duration-500 ease-out hover:flex-[2.2]"
            >
              <img
                src={shot.image}
                alt={shot.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/85 via-[#0b0b0b]/20 to-transparent opacity-80 transition group-hover:opacity-90" />
              <figcaption className="relative flex h-full flex-col justify-end gap-2 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.18em] text-white/70">{`0${index + 1}`}</p>
                <p className="text-xl font-semibold tracking-[-0.01em]">{shot.title}</p>
                <p className="text-sm leading-relaxed text-white/80 transition group-hover:text-white">
                  {shot.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl space-y-6 px-4 text-[var(--ink)] sm:px-6 lg:px-8">
          {INTRO_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-16 sm:pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium tracking-[0.12em] text-[var(--muted)] uppercase">
              Nos stands
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
              Food court & cartes signatures
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {STAND_FOCUS.map((stand, idx) => (
              <article
                key={stand.title}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={stand.image}
                    alt={stand.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                    {stand.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{stand.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RestaurantSection />
    </div>
  );
}
