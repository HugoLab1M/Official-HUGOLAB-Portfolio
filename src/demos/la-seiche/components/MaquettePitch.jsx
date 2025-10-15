import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const SITE_MAP = [
  { label: "Accueil", detail: "Héro immersif, manifeste du lieu, CTA privatisation et agenda." },
  { label: "Restaurants", detail: "Focus stands, cartes détaillées, mise en avant cuisine du monde." },
  { label: "Bars", detail: "Mixologie, rhums arrangés, atmosphère Route 66 et rooftop brasero." },
  { label: "Sorties & loisirs", detail: "Jeux arcade, pétanque, skatepark, espace kids, soirées thématiques." },
  { label: "Agenda", detail: "Calendrier interactif, téléchargement .ics, partage WhatsApp et mail." },
  { label: "Photos", detail: "Ambiances, stories sociales, contenus immersifs et UGC à valoriser." },
  { label: "Infos", detail: "Accès, horaires, newsletter, mobilité douce, contacts directs." },
];

export default function MaquettePitch() {
  return (
    <section id="maquette" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl rounded-3xl bg-[var(--sand)]/70 px-4 py-12 shadow-sm ring-1 ring-[var(--border)]/70 sm:px-6 md:px-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            Parcours utilisateur
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-3 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)] sm:text-[2.2rem]">
            Architecture éditoriale proposée pour La Seiche
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Cette maquette Hugolab séquence les contenus pour guider le visiteur : immersion, food court,
            programmation, loisirs, galeries puis informations pratiques et privatisation. Les CTA sont pensés
            pour convertir vers l’agenda, la réservation et la prise de contact.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 text-sm text-[var(--muted)] md:grid-cols-2">
          {SITE_MAP.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/80 px-5 py-5 shadow-sm ring-1 ring-[var(--border)]/70"
            >
              <p className="text-sm font-semibold text-[var(--ink)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 text-sm sm:flex-row">
          <PrimaryButton href="#photos">Voir les ambiances</PrimaryButton>
          <GhostButton href="#privatiser">Contact privatisation</GhostButton>
        </div>
      </div>
    </section>
  );
}
