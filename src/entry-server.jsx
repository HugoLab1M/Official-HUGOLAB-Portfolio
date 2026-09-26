// Rendu serveur utilisé uniquement au build (scripts/prerender.mjs) : produit le HTML
// des pages principales pour que les robots qui n'exécutent pas le JavaScript
// (GPTBot, ClaudeBot, PerplexityBot…) lisent le contenu du site.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StaticRouter>
  );
}
