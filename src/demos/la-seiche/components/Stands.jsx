import { motion } from "framer-motion";
import { stands } from "../data/stands.js";

const RESTAURANT = stands.slice(0, 3);
const BAR = stands[3];
const LOISIRS = stands.slice(4);

export default function Sections() {
  return (
    <>
      <RestaurantSection />
      <BarSection />
      <LoisirsSection />
    </>
  );
}

export function RestaurantSection() {
  return (
    <section id="restaurant" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
              Bars et restaurants — La Seiche près d’Annecy
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-3 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)] sm:text-4xl">
              Food court, cuisine du monde soignée et terrasses ouvertes
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              <p>
                Bar et restaurant, blog « Quoi faire Annecy &amp; Sévrier », sorties entre amis ou en famille :
                les stands partagent de vastes espaces communs en intérieur et sur les terrasses. On commande
                au comptoir et on déguste où l’on veut.
              </p>
              <p>
                Pour tous : entrées, plats, desserts. Kids friendly, espace famille &amp; jeux, aménagements
                mobilité réduite. Burger, tacos, snacks au stand Atelier Burger ; galettes et planches au Sain
                Bol ; pizzas artisanales cuites au feu de bois ; salades italiennes chez Napoli Pizza ; plats
                mexicains traditionnels chez Chichen-Itza.
              </p>
              <p>Horaires : mercredi &amp; jeudi 18h-00h • vendredi &amp; samedi 18h-00h30 • dimanche 12h-23h.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {RESTAURANT.map((stand, index) => (
            <motion.article
              key={stand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="h-48 overflow-hidden rounded-lg border border-[var(--border)] bg-black/40">
                <img src={stand.image} alt={stand.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {stand.name}
              </h3>
              <p className="mt-2 text-sm font-medium tracking-[0.06em] text-[var(--muted)]">
                {stand.focus}
              </p>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                <p className="font-medium text-[var(--ink)]">{stand.signature}</p>
                <p>{stand.service}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BarSection() {
  if (!BAR) return null;
  return (
    <section id="bar" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] sm:p-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 overflow-hidden rounded-2xl bg-black/40 lg:order-1">
            <img src={BAR.image} alt={BAR.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 space-y-5 lg:order-2">
            <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
              Bars & cocktails signature
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-3 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)] sm:text-4xl">
              {BAR.name} — mixologie d’équipage &amp; caves invitées
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Candy shots gourmands, rhums arrangés, route 66 lounge et cavistes invités : la page bar met
              en avant l’ambiance de nuit, les accords cocktails & tapas, ainsi que les DJ sets sur le rooftop.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoLine label="Carte" value={BAR.signature} />
              <InfoLine label="Service" value={BAR.service} />
              <InfoLine label="Ambiance" value="Lounge Route 66, rooftop brasero, DJ sets hebdos." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LoisirsSection() {
  return (
    <section id="loisirs" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">Sorties & loisirs</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] sm:text-4xl">
            Jeux pour petits et grands, animations live et espaces chill
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Billards, baby-foot, arcade, pétanque, skatepark, soirées dansantes, petit bal du dimanche :
            nous proposons une lecture claire des univers loisirs et mettons en avant les réservations
            groupes ou familiales.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {LOISIRS.map((spot, index) => (
            <motion.article
              key={spot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-7"
            >
              <div className="h-48 overflow-hidden rounded-lg border border-[var(--border)] bg-black/40">
                <img src={spot.image} alt={spot.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {spot.name}
              </h3>
              <p className="mt-1 text-sm font-medium tracking-[0.06em] text-[var(--muted)]">
                {spot.focus}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{spot.signature}</p>
              <p className="mt-3 text-sm font-medium text-[var(--ink)]">{spot.service}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 px-5 py-4 shadow-sm ring-1 ring-[var(--border)]/70">
      <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
      <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">{value}</span>
    </div>
  );
}
