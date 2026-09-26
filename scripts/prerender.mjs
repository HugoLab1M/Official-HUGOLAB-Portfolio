// Après `vite build` (client) et `vite build --ssr` : écrit une page HTML statique par
// route principale (dist/<route>.html, servie par Vercel grâce à cleanUrls), avec son
// titre, sa description et son URL canonique. Le navigateur recharge ensuite l'appli
// React par-dessus, comme avant.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.mjs";

const SITE = "https://hugolab.fr";
const PAGES = {
  "/": {
    title: "HügoLab — Visibilité IA, sites web et identité visuelle · Annecy & Lyon",
    description:
      "HügoLab aide les cabinets, commerces et indépendants de Haute-Savoie et de Lyon à être trouvés et choisis : audit de visibilité IA, création de sites web et identité visuelle.",
  },
  "/visibilite-ia": {
    title: "Audit de visibilité IA pour avocats et experts-comptables — HügoLab",
    description:
      "Quand un client demande à une IA quel cabinet choisir, êtes-vous dans la réponse ? Les pages que lit le moteur, celles où vous êtes absent, et trois actions concrètes. 490 € HT.",
  },
  "/services": {
    title: "Services & tarifs — HügoLab",
    description: "Audit de visibilité IA, sites vitrines, boutiques en ligne, maintenance et identité visuelle : des offres claires et des prix annoncés.",
  },
  "/work": { title: "Réalisations — HügoLab", description: "Sites et maquettes HügoLab : tourisme, restauration, outdoor et services, chacun avec sa propre direction artistique." },
  "/about": { title: "À propos — HügoLab", description: "HügoLab, studio de visibilité indépendant près d’Annecy fondé par Mateo Hugues." },
  "/mentions-legales": { title: "Mentions légales — HügoLab" },
  "/confidentialite": { title: "Politique de confidentialité — HügoLab" },
  "/cookies": { title: "Cookies — HügoLab" },
  "/cgv": { title: "Conditions générales de vente — HügoLab" },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("dist/index.html : conteneur #root introuvable");

for (const [route, meta] of Object.entries(PAGES)) {
  const url = SITE + (route === "/" ? "/" : route);
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(meta.title)}`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  if (meta.description) {
    html = html.replace(/(<meta name="description" content=")[^"]*/, `$1${esc(meta.description)}`);
    html = html.replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(meta.description)}`);
    html = html.replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(meta.description)}`);
  }
  writeFileSync(route === "/" ? "dist/index.html" : `dist${route}.html`, html);
  console.log(`pré-rendu ${route}`);
}
rmSync("dist-ssr", { recursive: true, force: true });
