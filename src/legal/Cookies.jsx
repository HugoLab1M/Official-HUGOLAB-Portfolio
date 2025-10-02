import { useEffect, useMemo, useState } from "react";
import { getStoredConsent, storeConsent } from "../components/CookieBanner.jsx";

function Toggle({ checked, disabled, onChange, label, description }) {
  const borderClass = checked ? "border-neutral-900/20" : "border-neutral-200";
  const switchTone = checked ? "border-neutral-900 bg-neutral-900" : "border-neutral-300 bg-neutral-200";
  const switchToneDark = checked ? "dark:border-white dark:bg-white" : "dark:border-neutral-700 dark:bg-neutral-800";

  return (
    <div
      className={`rounded-2xl border ${borderClass} bg-white/95 p-5 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/95 dark:hover:border-neutral-700`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">{label}</p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full border ${switchTone} ${switchToneDark} transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/50 disabled:opacity-50`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-1"}`}
          />
        </button>
      </div>
    </div>
  );
}

export default function Cookies() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const stored = getStoredConsent();
    setAnalyticsEnabled(stored === "accept");
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const summary = useMemo(() => {
    if (!preferencesLoaded) return "Chargement de vos préférences…";
    return analyticsEnabled
      ? "Mesure d'audience activée. Vous contribuez à l'amélioration continue du site."
      : "Mesure d'audience désactivée. Nous ne suivrons pas votre navigation.";
  }, [analyticsEnabled, preferencesLoaded]);

  const applyConsent = (status) => {
    const allowAnalytics = status === "accept";
    setAnalyticsEnabled(allowAnalytics);
    storeConsent(status);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hlab-cookie-preferences-changed", {
          detail: { status },
        })
      );
    }
    setFeedback(status === "accept" ? "Vos préférences ont été enregistrées." : "La mesure d'audience est désormais désactivée.");
  };

  const handleSave = () => {
    applyConsent(analyticsEnabled ? "accept" : "reject");
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">Cookies</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Gestion des cookies</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            HügoLab utilise un nombre limité de cookies afin de mesurer l’audience du site et d’améliorer les contenus.
            Aucun cookie publicitaire n’est déposé. Vous pouvez ajuster votre consentement ci-dessous.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-10 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <article className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-md shadow-neutral-900/5 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-none">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Vos préférences</h2>
                <p>
                  Nous distinguons les cookies strictement nécessaires, indispensables au fonctionnement du site, et les
                  cookies de mesure d'audience. Ces derniers nous aident à comprendre l'usage des pages afin d'améliorer
                  HügoLab.
                </p>
                <div className="rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-300/80">
                  {summary}
                </div>
                {feedback && (
                  <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {feedback}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <Toggle
                  checked
                  disabled
                  label="Cookies essentiels"
                  description="Indispensables au fonctionnement du site (sécurité, choix de langue). Toujours actifs."
                />
                <Toggle
                  checked={preferencesLoaded && analyticsEnabled}
                  disabled={!preferencesLoaded}
                  onChange={setAnalyticsEnabled}
                  label="Mesure d'audience"
                  description="Google Analytics 4 (données anonymisées, conservation 14 mois). Aide à améliorer l'expérience."
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => applyConsent("reject")}
                disabled={!preferencesLoaded}
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={() => applyConsent("accept")}
                disabled={!preferencesLoaded}
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Tout accepter
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!preferencesLoaded}
                className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Enregistrer mes préférences
              </button>
            </div>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Détails techniques</h2>
            <p className="mt-3">
              <strong>Google Analytics 4</strong> : pages consultées, durée de session, zones géographiques anonymisées.
              Conservation maximale de 14 mois. Outil hébergé par Google Ireland Limited. Le consentement est requis avant
              toute activation.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Contact</h2>
            <p className="mt-3">
              Pour toute question relative aux cookies ou à vos données, écrivez-nous à
              <a href="mailto:contact@hugolab.fr" className="ml-1 underline decoration-neutral-400 underline-offset-2">contact@hugolab.fr</a>.
            </p>
          </article>

          <article className="rounded-3xl border border-neutral-200 bg-white/95 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/95">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Retrouver la bannière</h2>
            <p className="mt-3">
              Vous préférez passer par la bannière ? Cliquez sur le bouton ci-dessous pour la ré-afficher et ajuster vos
              choix directement.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("hlab-open-cookie-banner"));
                }
              }}
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
            >
              Ouvrir la bannière cookies
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}
