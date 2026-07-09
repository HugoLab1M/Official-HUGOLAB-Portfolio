import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import TallyModal from "./TallyModal.jsx";

/*
  Offres HügoLab — structure pensée conversion pour petits commerces :
  chaque carte répond à « pour qui ? », « qu'est-ce que j'obtiens ? »,
  « en combien de temps ? », « combien ? ».
  ⚠️ Les liens Stripe et Tally ne doivent pas changer.
*/

function OfferCard({ featured = false, badge, title, forWho, desc, bullets, delay, price, priceNote, children }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-8 transition duration-300 ${
        featured
          ? "border-transparent bg-[var(--ink)] text-white shadow-[0_40px_90px_-40px_rgba(23,20,31,0.6)]"
          : "border-[var(--border)] bg-white hover:border-[var(--violet)]"
      }`}
    >
      {badge ? (
        <span
          className={`absolute -top-3 left-8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
            featured ? "bg-[var(--violet)] text-white" : "bg-[var(--lavender)] text-[var(--violet-text)]"
          }`}
        >
          {badge}
        </span>
      ) : null}
      <h3 className={`font-display text-2xl font-medium ${featured ? "text-white" : "text-[var(--ink)]"}`}>{title}</h3>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${featured ? "text-[var(--violet)]" : "text-[var(--violet-text)]"}`}>
        {forWho}
      </p>
      <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-white/70" : "text-[var(--muted)]"}`}>{desc}</p>
      <ul className="mt-6 space-y-2.5 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <Check className={`mt-0.5 h-4 w-4 flex-none ${featured ? "text-[var(--violet)]" : "text-[var(--violet-text)]"}`} aria-hidden />
            <span className={featured ? "text-white/90" : "text-[var(--ink)]"}>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        {delay ? (
          <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${featured ? "text-white/50" : "text-[var(--muted)]"}`}>
            {delay}
          </p>
        ) : null}
        <p className={`mt-2 font-display text-3xl ${featured ? "text-white" : "text-[var(--ink)]"}`}>
          {price}
          {priceNote ? (
            <span className={`ml-2 text-base font-normal ${featured ? "text-white/60" : "text-[var(--muted)]"}`}>{priceNote}</span>
          ) : null}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function PricingSection({
  briefFormUrl = "https://tally.so/r/mJ7Zgd",
  logoFormUrl = "https://tally.so/r/mOveKp",
  paymentLinks = {
    starterDeposit: "https://buy.stripe.com/eVq6oJ8QC3SzdoH6LV8so00",
    vitrineDeposit: "https://buy.stripe.com/5kQ6oJ7My0Gn1FZgmv8so01",
    maintenance49: "https://buy.stripe.com/7sYdRbaYKagXbgz4DN8so02",
    maintenance99: "https://buy.stripe.com/4gMaEZ7MygFl2K39Y78so03",
    logo: null,
  },
}) {
  const [logoOpen, setLogoOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  const primaryBtn =
    "inline-flex flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300";

  return (
    <section className="border-t border-[var(--border)] py-20 md:py-24" id="pricing">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="kicker">Tarifs</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">
            Des offres simples, un prix annoncé dès le départ
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Pas de devis à rallonge : vous savez ce que vous payez, ce que vous recevez et sous quel délai.
            L’acompte se règle en ligne, le solde à la mise en ligne.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Landing Express */}
          <OfferCard
            badge="Pour démarrer"
            title="Landing Express"
            forWho="Artisans, indépendants, saisonniers"
            desc="Une page unique, claire et rapide, pour être trouvé sur Google et recevoir des appels — sans y passer des semaines."
            bullets={[
              "1 page complète : présentation, services, avis, contact",
              "Design responsive (mobile, tablette, ordinateur)",
              "SEO local de base + fiche Google Business",
              "Nom de domaine configuré & mise en ligne incluse",
            ]}
            delay="En ligne sous 10 jours ouvrés"
            price="649 €"
            priceNote="HT"
          >
            <p className="mt-1 text-sm text-[var(--muted)]">Acompte de 50 % à la commande</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={paymentLinks.starterDeposit}
                className={`${primaryBtn} bg-[var(--ink)] text-white hover:bg-[var(--violet-deep)]`}
              >
                Payer l’acompte
              </a>
              <button
                onClick={() => setBriefOpen(true)}
                className={`${primaryBtn} border border-[var(--border-strong)] text-[var(--ink)] hover:border-[var(--violet)] hover:bg-[var(--lavender)]`}
              >
                Envoyer le brief
              </button>
            </div>
          </OfferCard>

          {/* Vitrine complète (featured) */}
          <OfferCard
            featured
            badge="Le plus choisi"
            title="Vitrine complète"
            forWho="Restaurants, commerces, activités outdoor"
            desc="Le site professionnel complet : votre activité, vos services et un moyen simple de vous contacter ou réserver."
            bullets={[
              "5 pages (Accueil, Services, À propos, Contact + 1 au choix)",
              "Formulaire de contact ou demande de réservation",
              "SEO local renforcé + Google Business + Analytics",
              "Formation d’1 h pour rester autonome",
            ]}
            delay="En ligne sous 30 jours"
            price="1 390 €"
            priceNote="HT"
          >
            <p className="mt-1 text-sm text-white/60">Acompte de 50 % à la commande</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={paymentLinks.vitrineDeposit}
                className={`${primaryBtn} bg-[var(--violet)] text-white hover:bg-[#9d6cff]`}
              >
                Payer l’acompte
              </a>
              <button
                onClick={() => setBriefOpen(true)}
                className={`${primaryBtn} border border-white/30 text-white hover:border-[var(--violet)] hover:bg-white/5`}
              >
                Envoyer le brief
              </button>
            </div>
          </OfferCard>

          {/* Maintenance */}
          <OfferCard
            badge="Tranquillité"
            title="Maintenance"
            forWho="Pour tous les sites HügoLab"
            desc="Votre site reste à jour, sauvegardé et suivi — vous vous concentrez sur votre métier. Sans engagement, résiliable à tout moment."
            bullets={[
              "Essentiel 49 € : mises à jour, sauvegardes, surveillance, 30 min de modifications / mois",
              "Sérénité 99 € : tout Essentiel + 2 h de modifications, rapport mensuel de visites et suivi SEO local",
              "Support réactif par email ou WhatsApp",
            ]}
            price="49 €"
            priceNote="ou 99 € / mois"
          >
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={paymentLinks.maintenance49}
                className={`${primaryBtn} bg-[var(--ink)] text-white hover:bg-[var(--violet-deep)]`}
              >
                Essentiel 49 €
              </a>
              <a
                href={paymentLinks.maintenance99}
                className={`${primaryBtn} border border-[var(--border-strong)] text-[var(--ink)] hover:border-[var(--violet)] hover:bg-[var(--lavender)]`}
              >
                Sérénité 99 €
              </a>
            </div>
          </OfferCard>
        </div>

        {/* Logo / Branding */}
        <div className="mt-10">
          <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--violet-text)]">Option</p>
              <h4 className="font-display mt-1 text-xl font-medium text-[var(--ink)]">Logo & identité visuelle</h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                2 à 3 pistes créatives, fichiers sources, déclinaisons pour vos supports (enseigne, cartes, réseaux).
                Idéal en complément d’un site — ou seul, pour rafraîchir votre image.
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-display text-2xl text-[var(--ink)]">
                dès 249 € <span className="text-base font-normal text-[var(--muted)]">HT</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => setLogoOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--violet-deep)]"
                >
                  Demander un devis logo
                </button>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--violet)] hover:bg-[var(--lavender)]"
                >
                  Voir nos maquettes
                </Link>
                {paymentLinks.logo && (
                  <a
                    href={paymentLinks.logo}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--violet)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9d6cff]"
                  >
                    Commander Logo 249 €
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mini-FAQ conversion */}
        <dl className="mt-12 grid gap-6 border-t border-[var(--border)] pt-10 md:grid-cols-3">
          {[
            {
              q: "Et si je n’ai ni textes ni photos ?",
              a: "On rédige ensemble à partir d’un questionnaire simple, et on sélectionne des photos professionnelles libres de droits en attendant les vôtres.",
            },
            {
              q: "Comment se passe le paiement ?",
              a: "50 % à la commande (paiement sécurisé Stripe), 50 % à la mise en ligne. La maintenance est mensuelle, sans engagement.",
            },
            {
              q: "Le site m’appartient-il ?",
              a: "Oui. Nom de domaine, contenu et code : tout est à votre nom. Vous restez libre, avec ou sans maintenance.",
            },
          ].map((item) => (
            <div key={item.q}>
              <dt className="text-sm font-semibold text-[var(--ink)]">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.a}</dd>
            </div>
          ))}
        </dl>

        {/* Mentions */}
        <p className="mt-8 text-xs text-[var(--muted)]">
          Tarifs indiqués hors taxes. Micro-entreprise — TVA non applicable, art. 293 B du CGI.
        </p>
      </div>

      {/* MODALES TALLY */}
      {briefOpen && <TallyModal url={briefFormUrl} onClose={() => setBriefOpen(false)} title="Brief site (gratuit)" />}
      {logoOpen && <TallyModal url={logoFormUrl} onClose={() => setLogoOpen(false)} title="Brief logo (gratuit)" />}
    </section>
  );
}
