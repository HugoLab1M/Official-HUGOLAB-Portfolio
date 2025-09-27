import { useState } from "react";

export default function PricingSection({
  // COLLE ICI TES LIENS TALLY :
  briefFormUrl = "https://tally.so/r/TON_FORMULAIRE_BRIEF", // ← à remplacer
  logoFormUrl = "https://tally.so/r/TON_FORMULAIRE_LOGO",   // ← à remplacer
  paymentLinks = {
    starterDeposit: "#stripe-starter-50",
    vitrineDeposit: "#stripe-vitrine-50",
    maintenance49: "#stripe-maintenance-49",
    maintenance99: "#stripe-maintenance-99",
    logo: null, // optionnel si tu veux un paiement direct logo plus tard
  },
}) {
  const [logoOpen, setLogoOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <section className="py-20 bg-gray-50 dark:bg-neutral-950" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Des offres simples, transparentes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-3">
            Des sites rapides, beaux et efficaces — boostés à l’IA pour aller plus vite sans sacrifier la qualité.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Landing */}
          <div className="rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800 p-8 flex flex-col bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Landing Express</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">Délais courts</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">1 page claire et efficace pour être visible et contactable rapidement.</p>
            <ul className="text-neutral-700 dark:text-neutral-200 space-y-2 mb-8 text-sm">
              <li>✔ 1 page (héros, 3 sections, contact)</li>
              <li>✔ Design responsive (mobile/tablette)</li>
              <li>✔ SEO local basique</li>
              <li>✔ Mise en ligne & configuration domaine</li>
            </ul>
            <div className="mt-auto">
              <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                649 € <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">HT</span>
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">Acompte 50% à la commande</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href={paymentLinks.starterDeposit} className="inline-flex flex-1 items-center justify-center bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-900 dark:hover:bg-neutral-100 transition">
                  Payer l’acompte
                </a>
                <button onClick={() => setBriefOpen(true)} className="inline-flex flex-1 items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                  Envoyer le brief
                </button>
              </div>
            </div>
          </div>

          {/* Vitrine complète (featured) */}
          <div className="relative overflow-hidden rounded-2xl p-0 ring-2 ring-neutral-900 dark:ring-white">
            <div className="absolute right-4 top-4 z-10">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100 shadow">Le plus choisi</span>
            </div>
            <div className="rounded-2xl h-full p-8 flex flex-col bg-white dark:bg-neutral-900">
              <h3 className="text-xl font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Vitrine complète</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">Une présence pro et optimisée pour être trouvé facilement.</p>
              <ul className="text-neutral-700 dark:text-neutral-200 space-y-2 mb-8 text-sm">
                <li>✔ 5 pages (Accueil, Services, À propos, Contact +1)</li>
                <li>✔ Formulaire de contact / réservation</li>
                <li>✔ Google Business Profile & Google Analytics</li>
                <li>✔ SEO local renforcé</li>
              </ul>
              <div className="mt-auto">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                  1 390 € <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">HT</span>
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">Acompte 50% à la commande</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href={paymentLinks.vitrineDeposit} className="inline-flex flex-1 items-center justify-center bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-900 dark:hover:bg-neutral-100 transition">
                    Payer l’acompte
                  </a>
                  <button onClick={() => setBriefOpen(true)} className="inline-flex flex-1 items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                    Envoyer le brief
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800 p-8 flex flex-col bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Maintenance</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">Tranquillité</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">On s’occupe des mises à jour, sauvegardes et petites modifs.</p>
            <ul className="text-neutral-700 dark:text-neutral-200 space-y-2 mb-8 text-sm">
              <li>✔ Sauvegardes & mises à jour</li>
              <li>✔ Petites modifications incluses</li>
              <li>✔ Support rapide (email / WhatsApp)</li>
            </ul>
            <div className="mt-auto">
              <div className="space-y-1 mb-3">
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">49 € / mois</p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">ou 99 € / mois</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href={paymentLinks.maintenance49} className="inline-flex flex-1 items-center justify-center bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-900 dark:hover:bg-neutral-100 transition">
                  Souscrire 49 €
                </a>
                <a href={paymentLinks.maintenance99} className="inline-flex flex-1 items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                  Souscrire 99 €
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Logo / Branding */}
        <div className="mt-12">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Option Logo & Branding léger</h4>
              <p className="text-neutral-600 dark:text-neutral-300 mt-1">Gratuit de vous renseigner : donnez-nous les infos, on revient vers vous sous 24–72h.</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-base text-neutral-500 dark:text-neutral-400">Deux formules au choix</p>
              <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                À partir de 249 € <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">HT</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setLogoOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition text-sm"
                >
                  Demander un devis logo
                </button>

                <div className="relative inline-flex">
                  <a
                    href="#portfolio-logos"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-100 transition text-sm pr-16"
                  >
                    Voir exemples
                  </a>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] rounded-md px-2 py-0.5 bg-white text-black dark:bg-black dark:text-white border border-neutral-200 dark:border-neutral-700 opacity-90">
                    bientôt
                  </span>
                </div>

                {paymentLinks.logo && (
                  <a
                    href={paymentLinks.logo}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-100 transition text-sm"
                  >
                    Commander Logo 249 €
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mentions */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-6">
          Tarifs indiqués hors taxes. Micro-entreprise — TVA non applicable, art. 293 B du CGI.
        </p>
      </div>

      {/* MODALES TALLY */}
      {briefOpen && <TallyModal url={briefFormUrl} onClose={() => setBriefOpen(false)} title="Brief site (gratuit)" />}
      {logoOpen && <TallyModal url={logoFormUrl} onClose={() => setLogoOpen(false)} title="Brief logo (gratuit)" />}
    </section>
  );
}

/* ---------- Iframe modal for Tally ---------- */
function TallyModal({ url, onClose, title }) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Fermer ✕
              </button>
            </div>
            <iframe
              title={title}
              src={url}
              className="w-full h-[calc(100%-48px)]" // prend toute la hauteur sauf la barre de titre
              allow="fullscreen; clipboard-read; clipboard-write; camera; microphone"
            />
          </div>
        </div>
      </div>
    );
  }
  