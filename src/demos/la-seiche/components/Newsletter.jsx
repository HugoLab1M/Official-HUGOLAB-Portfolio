import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const HOURS = [
  { day: "Mercredi", time: "18h – 00h" },
  { day: "Jeudi", time: "18h – 00h" },
  { day: "Vendredi", time: "18h – 00h30" },
  { day: "Samedi", time: "18h – 00h30" },
  { day: "Dimanche", time: "12h – 23h" },
];

export default function Infos() {
  return (
    <section id="infos" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            Informations pratiques
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] sm:text-4xl">
            La Seiche à Sévrier, food court & terrasses face au lac d’Annecy
          </h2>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Sur 1&nbsp;200&nbsp;m² en intérieur et 1&nbsp;500&nbsp;m² en extérieur, La Seiche rassemble restaurants,
            bars, scènes live, salles de jeux et terrasses aménagées pour des sorties en famille, entre amis
            ou en entreprise. Retrouvez les contacts clés, les horaires et les accès pour préparer votre venue.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <InfoPanel
              title="Accès & contact"
              description="35 route de Piron, 74320 Sévrier — grand parking gratuit, accès vélo et piste cyclable depuis Annecy."
            >
              <div className="flex flex-wrap gap-3 text-sm">
                <SecondaryLink href="https://maps.google.com/?q=La%20Seiche%2C%2035%20route%20de%20Piron%2C%2074320%20S%C3%A9vrier">
                  Itinéraire Google Maps
                </SecondaryLink>
                <SecondaryLink href="https://chat.whatsapp.com/Iq2s0u06hwvBesqpQFXv5T">
                  Rejoindre le groupe WhatsApp
                </SecondaryLink>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--ink)]">
                <a
                  href="mailto:contact@lemarchedelaseiche.com"
                  className="transition hover:text-[var(--brown)]"
                >
                  contact@lemarchedelaseiche.com
                </a>
                <span>+33 4 50 11 11 11</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl shadow-sm ring-1 ring-[rgba(102,69,33,0.25)]">
                <iframe
                  title="Carte La Seiche"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.878409517106!2d6.150946076853247!3d45.85511367108292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ba8c5d0fca27b%3A0x2c8c971bf7b18d5b!2s35%20Rte%20de%20Piron%2C%2074320%20Sevrier!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </InfoPanel>

            <InfoPanel
              title="Food court & bars"
              description="Cuisine du monde faite maison : pizzas au four à bois, burgers et snacking, bar à salades, recettes mexicaines. Espaces lounge, terrasses détente, bars à cocktails et rhums arrangés."
            >
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                Kids friendly, zone famille, accessibilité mobilité réduite. Jeux d’arcade, baby-foot, billards,
                fléchettes et aire pour enfants complètent l’expérience.
              </p>
            </InfoPanel>

            <InfoPanel
              title="Animations & privatisations"
              description="Concerts pop, funk, rock, jam sessions, karaokés, soirées dansantes (Salsa/Bachata/Kizomba, country, rock’n’roll) et spectacles mettent à l’honneur artistes et intervenants locaux."
            >
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                Privatisation possible du rooftop, des stands et des salles de jeu pour anniversaires, soirées
                d’entreprise, lancements produits ou tournages. Réponses dédiées sous 48h.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="mailto:contact@lemarchedelaseiche.com?subject=Privatisation%20La%20Seiche">
                  Demander un devis
                </PrimaryButton>
                <GhostButton href="#agenda">Voir le programme</GhostButton>
              </div>
            </InfoPanel>
          </div>

          <div className="space-y-8">
            <InfoPanel title="Horaires" description="Ouvert du mercredi au dimanche, animations en soirée et brunchs le week-end.">
              <div className="mt-5 space-y-2 text-sm">
                {HOURS.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between rounded-2xl bg-white/60 px-5 py-3 font-medium text-[var(--ink)] shadow-sm ring-1 ring-[rgba(102,69,33,0.25)]"
                  >
                    <span>{slot.day}</span>
                    <span className="text-[var(--muted)]">{slot.time}</span>
                  </div>
                ))}
              </div>
            </InfoPanel>

            <InfoPanel
              title="Newsletter & réseaux"
              description="Programmation live, nouvelles cartes Food court, invitations privatisation : une synthèse chaque semaine."
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="https://tally.so/r/XXXXXXXX">S’inscrire</PrimaryButton>
                <GhostButton href="mailto:contact@lemarchedelaseiche.com">Contact direct</GhostButton>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                <a
                  href="https://www.facebook.com/lemarchedelaseiche"
                  className="transition hover:text-[var(--brown)]"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/marchedelaseiche/"
                  className="transition hover:text-[var(--brown)]"
                >
                  Instagram
                </a>
                <a
                  href="https://chat.whatsapp.com/Iq2s0u06hwvBesqpQFXv5T"
                  className="transition hover:text-[var(--brown)]"
                >
                  WhatsApp
                </a>
              </div>
            </InfoPanel>

            <InfoPanel
              title="Repères rapides"
              description="Retrouvez les pages clés pour présenter l’offre complète de La Seiche."
            >
              <ul className="grid grid-cols-2 gap-3 text-sm text-[var(--muted)]">
                <QuickLink href="#restaurant">Restaurants & food court</QuickLink>
                <QuickLink href="#bar">Bars & cocktails</QuickLink>
                <QuickLink href="#loisirs">Sorties & loisirs</QuickLink>
                <QuickLink href="#agenda">Programme & agenda</QuickLink>
                <QuickLink href="#privatiser">Privatisations</QuickLink>
                <QuickLink href="#photos">Ambiances & photos</QuickLink>
              </ul>
            </InfoPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPanel({ title, description, children }) {
  return (
    <div className="rounded-3xl bg-[var(--sand)]/60 px-6 py-6 shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] sm:px-8">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--ink)]">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      ) : null}
      {children ? <div className="mt-5 space-y-4">{children}</div> : null}
    </div>
  );
}

function SecondaryLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[var(--ink)] shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] transition hover:text-[var(--brown)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      {children}
    </a>
  );
}

function QuickLink({ href, children }) {
  return (
    <li>
      <a href={href} className="transition hover:text-[var(--brown)]">
        {children}
      </a>
    </li>
  );
}
