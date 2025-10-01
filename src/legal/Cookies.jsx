export default function Cookies() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">Cookies</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Gestion des cookies</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            HügoLab utilise un nombre limité de cookies afin de mesurer l’audience du site et d’améliorer les contenus.
            Aucun cookie publicitaire n’est déposé. Votre consentement est demandé dès votre première visite.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">1. Cookies utilisés</h2>
            <p className="mt-3">
              <strong>Google Analytics 4</strong> : mesure de l’audience (pages consultées, durée, provenance). Les données
              sont anonymisées et conservées 14 mois maximum. Le dépôt n’a lieu qu’en cas d’acceptation explicite.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">2. Refuser ou modifier votre choix</h2>
            <p className="mt-3">
              Vous pouvez accepter ou refuser la mesure d’audience via la bannière dédiée. Pour modifier votre choix
              ultérieurement, utilisez le lien « Gérer les cookies » présent en bas de page ou cliquez sur le bouton
              ci-dessous.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("hlab-open-cookie-banner"));
                }
              }}
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Gérer mes cookies
            </button>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">3. Contact</h2>
            <p className="mt-3">
              Pour toute question relative aux cookies ou à vos données, écrivez-nous à
              <a href="mailto:contact@hugolab.fr" className="ml-1 underline decoration-neutral-400 underline-offset-2">contact@hugolab.fr</a>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
