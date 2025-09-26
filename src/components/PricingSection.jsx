export default function PricingSection({
    briefUrl = "#contact",
    paymentLinks = {
      starterDeposit: "#stripe-starter-50",
      vitrineDeposit: "#stripe-vitrine-50",
      maintenance49: "#stripe-maintenance-49",
      maintenance99: "#stripe-maintenance-99",
    },
  }) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-neutral-950" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Des offres simples et transparentes
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mt-3">
            Des sites rapides, élégants et performants — optimisés avec l’IA pour gagner du temps et de l'argent.
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {/* Landing Express */}
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800 p-8 flex flex-col bg-white dark:bg-neutral-900">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Landing Express</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">Délais courts</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">1 page claire et pro pour être visible et joignable rapidement.</p>
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
                  <a href={briefUrl} className="inline-flex flex-1 items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                    Envoyer le brief
                  </a>
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
                    <a href={briefUrl} className="inline-flex flex-1 items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                      Envoyer le brief
                    </a>
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
  
          {/* Option Logo / Branding */}
          <div className="mt-12">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Option Logo & Branding léger</h4>
                <p className="text-neutral-600 dark:text-neutral-300 mt-1">Logo pro livré en SVG/PNG/JPG + déclinaisons (couleur / N&B, favicon), mini guide couleurs & typos.</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-base text-neutral-500 dark:text-neutral-400">Deux formules au choix</p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  À partir de 249 € <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">HT</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={briefUrl} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition text-sm">
                    Demander un devis logo
                  </a>
                  <a href="#portfolio-logos" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-100 transition text-sm">
                    Voir exemples
                  </a>
                </div>
              </div>
            </div>
          </div>
  
          {/* Mentions */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-6">
            Tarifs indiqués hors taxes. Micro-entreprise — TVA non applicable, art. 293 B du CGI.
          </p>
        </div>
      </section>
    );
  }
  