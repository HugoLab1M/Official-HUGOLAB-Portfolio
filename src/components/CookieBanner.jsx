import { useState, useEffect } from "react";

const BANNER_KEY = "hlab_cookie_consent";

const COPY = {
  FR: {
    title: "Gestion des cookies",
    body:
      "HügoLab utilise uniquement des cookies de mesure d'audience (Google Analytics 4, données anonymisées) afin d'améliorer l'expérience du site. Aucun suivi publicitaire ni cession de données.",
    note: "Vous pourrez modifier vos préférences à tout moment via le lien « Gérer les cookies » en bas de page.",
    accept: "Accepter",
    manage: "Paramétrer vos choix",
    skip: "Continuer sans accepter",
  },
  EN: {
    title: "Cookie preferences",
    body:
      "HügoLab only relies on anonymised Google Analytics 4 to understand how the website is used and improve our services. No advertising trackers and no data resale.",
    note: "You can update your preferences at any time using the “Manage cookies” link located in the footer.",
    accept: "Accept",
    manage: "Adjust settings",
    skip: "Continue without accepting",
  },
};

export default function CookieBanner({
  visible,
  onAccept,
  onDecline,
  lang = "FR",
}) {
  const [mounted, setMounted] = useState(false);
  const copy = COPY[typeof lang === "string" ? lang.toUpperCase() : "FR"] ?? COPY.FR;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white/95 p-5 shadow-xl shadow-neutral-900/10 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
            <p className="text-base font-semibold text-neutral-900 dark:text-white">{copy.title}</p>
            <p>{copy.body}</p>
          </div>
          <button
            type="button"
            onClick={onDecline}
            className="shrink-0 text-xs font-medium text-neutral-500 underline underline-offset-4 transition hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {copy.skip}
          </button>
        </div>
        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">{copy.note}</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          <a
            href="/cookies"
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          >
            {copy.manage}
          </a>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(BANNER_KEY);
  } catch (error) {
    return null;
  }
}

export function storeConsent(value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BANNER_KEY, value);
  } catch (error) {
    // Gracefully degrade when storage is unavailable (privacy mode, etc.)
  }
}
