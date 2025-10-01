import { useState, useEffect } from "react";

const BANNER_KEY = "hlab_cookie_consent";

const COPY = {
  FR: {
    title: "Cookies de mesure d'audience",
    body:
      "Nous utilisons Google Analytics 4 (anonymisé) pour comprendre comment notre site est consulté et améliorer nos services. Aucune donnée n'est utilisée pour de la publicité ou revendue.",
    note: "Vous pouvez modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de page.",
    accept: "Accepter",
    refuse: "Refuser",
  },
  EN: {
    title: "Audience measurement cookies",
    body:
      "We use anonymised Google Analytics 4 to understand how visitors browse the site and improve our services. We do not sell or share this data for advertising.",
    note: "You can update your choice anytime using the “Manage cookies” link in the footer.",
    accept: "Accept",
    refuse: "Decline",
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
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-200">
          <p className="font-medium text-neutral-900 dark:text-white">
            {copy.title}
          </p>
          <p>{copy.body}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onDecline}
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {copy.refuse}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
          >
            {copy.accept}
          </button>
        </div>
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{copy.note}</p>
      </div>
    </div>
  );
}

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(BANNER_KEY);
}

export function storeConsent(value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BANNER_KEY, value);
}
