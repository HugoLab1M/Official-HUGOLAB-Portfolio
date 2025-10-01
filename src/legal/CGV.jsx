export default function CGV() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">Conditions générales</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Conditions générales de vente</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            Les présentes CGV ont pour objet de définir les modalités des prestations proposées par HügoLab.
            Elles constituent la base contractuelle applicable à défaut de conditions particulières mentionnées dans
            le devis signé par le client.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">1. Objet</h2>
            <p className="mt-3">
              HügoLab réalise des prestations de création de sites internet, d’identité visuelle, de maintenance et de
              conseil digital pour les professionnels. Toute commande implique l’acceptation des présentes conditions.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">2. Devis & commandes</h2>
            <p className="mt-3">
              Chaque prestation fait l’objet d’un devis détaillant le périmètre, le planning indicatif et le tarif HT.
              La commande est considérée comme validée dès signature du devis ou paiement de l’acompte demandé (50 %).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">3. Paiement</h2>
            <p className="mt-3">
              Les tarifs sont exprimés en euros HT. Un acompte de 50 % est facturé à la commande, le solde avant mise en
              ligne définitive. Les paiements s’effectuent par virement ou via les liens Stripe communiqués au client.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">4. Délais et livraison</h2>
            <p className="mt-3">
              Les délais annoncés sont indicatifs et peuvent être ajustés selon la rapidité des retours client ou des
              cas de force majeure. HügoLab s’engage à informer le client de toute évolution impactant le planning.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">5. Corrections et maintenance</h2>
            <p className="mt-3">
              Chaque projet inclut jusqu’à deux vagues de corrections raisonnables sur la base des maquettes validées.
              Toute demande supplémentaire fera l’objet d’un devis. Les offres de maintenance couvrent mises à jour,
              sauvegardes et petites évolutions définies dans la formule choisie.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">6. Propriété intellectuelle</h2>
            <p className="mt-3">
              Les livrables (maquettes, code, supports) restent la propriété de HügoLab jusqu’au paiement complet des
              factures. Après règlement, les droits d’utilisation sont cédés au client pour l’usage prévu à l’offre.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">7. Responsabilité</h2>
            <p className="mt-3">
              HügoLab s’engage à livrer un site fonctionnel conformément au devis. Sa responsabilité ne saurait être
              engagée en cas d’utilisation non conforme, de modifications réalisées par le client ou ses prestataires,
              ou d’indisponibilité liée à l’hébergeur choisi.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">8. Droit applicable</h2>
            <p className="mt-3">
              Les présentes CGV sont soumises au droit français. Tout litige sera du ressort des tribunaux compétents
              d’Annecy, sous réserve d’une tentative de résolution amiable préalable.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">9. Contact</h2>
            <p className="mt-3">
              Pour toute question relative aux prestations ou aux conditions générales, contactez-nous à
              <a href="mailto:contact@hugolab.fr" className="ml-1 underline decoration-neutral-400 underline-offset-2">contact@hugolab.fr</a>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
