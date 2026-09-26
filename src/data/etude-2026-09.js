// Chiffres agrégés des deux études HügoLab de septembre 2026 (projet radar-ia,
// out/etude.html et out/etude-avocat.html). Aucun cabinet nommé ici : seules les
// sources publiques citées par le moteur et les totaux sont repris.
// ⚠️ Ne rien arrondir ni extrapoler : chaque chiffre doit se retrouver dans l'étude.

export const ENGINE = {
  fr: "la recherche web intégrée de Claude Code (Anthropic)",
  en: "the built-in web search of Claude Code (Anthropic)",
};

export const ETUDE = {
  "expert-comptable": {
    label: { fr: "Experts-comptables", en: "Accountants" },
    question: { fr: "Quel est le meilleur expert-comptable à Annecy ?", en: "Who is the best accountant in Annecy?" },
    date: { fr: "18 septembre 2026", en: "18 September 2026" },
    cabinets: 25,
    reponses: 150,
    nommesMeilleur: 1, // nommés 2 fois sur 2 sur « meilleur … à [ville] »
    identifies: 25, // correctement identifiés sur leur nom
    sansSiteSource: 13, // aucune page de leur propre site parmi les sources
    sources: [
      { domain: "pagesjaunes.fr", kind: "annuaire", pct: 78 },
      { domain: "starofservice.com", kind: "annuaire", pct: 54 },
      { domain: "annuaire.experts-comptables.org", kind: "annuaire", pct: 42 },
      { domain: "ilicompta.fr", kind: "annuaire", pct: 40 },
      { domain: "visioconseilspro.com", kind: "annuaire", pct: 38 },
    ],
    sourcesBase: { fr: "100 réponses, 908 citations", en: "100 answers, 908 citations" },
  },
  avocat: {
    label: { fr: "Avocats", en: "Lawyers" },
    question: { fr: "Quel est le meilleur avocat à Lyon ?", en: "Who is the best lawyer in Lyon?" },
    date: { fr: "19 septembre 2026", en: "19 September 2026" },
    cabinets: 18,
    reponses: 108,
    nommesMeilleur: 0,
    identifies: 17,
    sansSiteSource: 5,
    sources: [
      { domain: "alexia.fr", kind: "annuaire", pct: 67 },
      { domain: "avocat.fr", kind: "annuaire", pct: 61 },
      { domain: "justifit.fr", kind: "annuaire", pct: 61 },
      { domain: "starofservice.com", kind: "annuaire", pct: 61 },
      { domain: "pagesjaunes.fr", kind: "annuaire", pct: 44 },
    ],
    sourcesBase: { fr: "72 réponses, 650 citations", en: "72 answers, 650 citations" },
  },
};

// Totaux des deux études (25 + 18 cabinets, 150 + 108 réponses), dérivés pour ne jamais diverger.
const sum = (key) => Object.values(ETUDE).reduce((n, e) => n + e[key], 0);
export const TOTAL = {
  cabinets: sum("cabinets"), // 43
  reponses: sum("reponses"), // 258
  nommesMeilleur: sum("nommesMeilleur"), // 1
  identifies: sum("identifies"), // 42
  sansSiteSource: sum("sansSiteSource"), // 18
};
