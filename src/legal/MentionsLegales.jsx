export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">Mentions légales</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">HügoLab — informations légales</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            Conformément aux articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans
            l’économie numérique, nous précisons ci-dessous les informations relatives à l’éditeur et à
            l’hébergement du site hugolab.fr.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Éditeur du site</h2>
            <p className="mt-3">
              HügoLab — micro-entreprise de Mateo Hugues<br />
              SIRET : en cours d’immatriculation (2025)<br />
              Adresse : siège à Doussard (74210), France — adresse complète disponible sur demande<br />
              Téléphone : +33 6 26 23 14 09<br />
              Email : <a href="mailto:contact@hugolab.fr" className="underline decoration-neutral-400 underline-offset-2">contact@hugolab.fr</a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Directeur de la publication</h2>
            <p className="mt-3">Mateo Hugues — Fondateur de HügoLab.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Hébergement</h2>
            <p className="mt-3">
              Vercel Inc.<br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-400 underline-offset-2">https://vercel.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Propriété intellectuelle</h2>
            <p className="mt-3">
              L’ensemble des contenus présents sur le site (textes, visuels, photographies, vidéos, éléments
              graphiques, structure et code source) sont protégés par le droit d’auteur et la législation
              française en vigueur. Toute reproduction, représentation, modification ou adaptation, totale ou
              partielle, est interdite sans l’autorisation écrite préalable de HügoLab.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Responsabilité</h2>
            <p className="mt-3">
              HügoLab s’efforce de fournir des informations fiables et mises à jour. Toutefois, nous ne pouvons
              garantir l’exactitude, l’exhaustivité ou l’actualité des informations diffusées sur le site. L’usage
              des informations se fait sous la responsabilité exclusive de l’utilisateur. HügoLab ne pourra être
              tenu responsable des dommages directs ou indirects résultant de l’accès au site ou de son
              utilisation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Contact</h2>
            <p className="mt-3">
              Pour toute question concernant le site, vous pouvez écrire à
              <a href="mailto:contact@hugolab.fr" className="ml-1 underline decoration-neutral-400 underline-offset-2">
                contact@hugolab.fr
              </a>
              ou appeler le +33 6 26 23 14 09.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
