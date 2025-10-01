export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">Confidentialité</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Politique de confidentialité</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            Cette politique explique quelles données nous collectons via le site hugolab.fr, à quelles fins et
            comment exercer vos droits. Elle est applicable à compter du 1er janvier 2025.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">1. Données collectées</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Formulaires Tally</strong> : nom, email, téléphone (optionnel), description du projet, fichiers
                transmis volontairement.
              </li>
              <li>
                <strong>Emails et appels</strong> : informations nécessaires pour préparer un devis ou assurer le suivi
                d’un projet.
              </li>
              <li>
                <strong>Mesure d’audience</strong> : données anonymisées via Google Analytics 4 (pages vues, provenance,
                navigation). Le suivi n’est activé qu’après votre consentement.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">2. Finalités et bases légales</h2>
            <p className="mt-3">
              Les données sont collectées pour : répondre à votre demande (pré-contractuel), établir des devis et
              contrats (exécution contractuelle), assurer le suivi du projet (intérêt légitime) et améliorer notre site
              (consentement pour la mesure d’audience).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">3. Durées de conservation</h2>
            <p className="mt-3">
              Les demandes de contact sont conservées 12 mois maximum sans suite commerciale. Les données clients sont
              conservées pendant la durée de la collaboration puis archivées selon les obligations comptables et
              fiscales françaises.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">4. Vos droits</h2>
            <p className="mt-3">
              Vous disposez d’un droit d’accès, de rectification, d’opposition, d’effacement, de limitation et de
              portabilité. Pour l’exercer, écrivez-nous à
              <a href="mailto:contact@hugolab.fr" className="ml-1 underline decoration-neutral-400 underline-offset-2">
                contact@hugolab.fr
              </a>.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">5. Sous-traitants & transferts</h2>
            <p className="mt-3">
              HügoLab utilise les prestataires suivants : Vercel (hébergement, États-Unis), Stripe (paiements sécurisés),
              Tally (formulaires), Google Analytics 4 (mesure d’audience). Ces services peuvent impliquer des transferts
              hors UE encadrés par des clauses contractuelles types (SCC) et des accords de traitement (DPA).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">6. Sécurité</h2>
            <p className="mt-3">
              Nous appliquons des mesures techniques (HTTPS, mises à jour régulières, accès restreints) et
              organisationnelles (sauvegardes, vérification des sous-traitants) pour protéger vos données.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">7. Contact délégué</h2>
            <p className="mt-3">
              HügoLab étant une micro-entreprise, le référent à la protection des données est Mateo Hugues. Vous pouvez
              le joindre à l’adresse <a href="mailto:contact@hugolab.fr" className="underline decoration-neutral-400 underline-offset-2">contact@hugolab.fr</a>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
