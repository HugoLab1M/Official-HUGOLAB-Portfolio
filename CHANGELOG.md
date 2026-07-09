# Changelog — Refonte HügoLab (juillet 2026)

## 1. Correctifs techniques (audit)

- **Build réparé** : binaire esbuild désynchronisé (`node_modules` copié depuis une autre machine) → réinstallation propre (`npm ci`). Cache Vite purgé (`node_modules/.vite`) qui empêchait le montage de l'app en dev.
- **Image 11,4 Mo compressée** : `src/demos/la-seiche/Images/Imagelaseiche3.jpg` (5032×3355) redimensionnée à 1600 px / qualité 70 → **349 Ko** (sauvegarde de l'originale hors projet).
- **Code splitting** : les 10 démos sont chargées en `React.lazy()` → bundle principal passé de **621 Ko à ~410 Ko**, chaque démo dans son propre chunk (10–73 Ko).
- **Liens cassés corrigés** :
  - Carte « La Seiche » pointait vers `/images/la-seiche/1.jpg` (inexistant) → image Unsplash de la démo.
  - Nav & footer « Tarifs » pointaient vers `/#pricing` alors que la section n'existait que sur /services → **PricingSection ajoutée à l'accueil**.
  - Footer : « Projets »/« Services » pointaient vers des ancres mortes `/#work`, `/#services` → vraies routes `/work`, `/services`.
  - Bouton « Voir exemples (bientôt) » du bloc logo pointait vers une ancre inexistante → remplacé par un lien vers /work.
- **Code mort supprimé** (jamais importé, contenait 3 des 4 images cassées) : `pages/Home.jsx`, `pages/Projects.jsx`, `sections/Process.jsx`, `sections/ServicesTeaser.jsx`, `sections/AboutTeaser.jsx`, `sections/TestimonialsMini.jsx`, `components/BackgroundAurora.jsx`, `components/BackgroundFilament.jsx`.
- **Bugs supprimés** :
  - Bloc « self-tests » dans App.jsx qui loggait un échec en console à chaque chargement (référence à un composant `Footer` inexistant).
  - Mode sombre activé par défaut alors que la moitié des sections étaient codées en clair → incohérences de contraste. Le site est désormais 100 % clair, toggle retiré.
  - Script `model-viewer` (unpkg) chargé sur toutes les pages sans être utilisé → retiré.
  - Nav HügoLab et headers sticky des démos se superposaient au scroll → la nav/footer du site sont masqués sur `/demos/*`, remplacés par un bouton flottant « Maquette HügoLab — retour » (les démos redeviennent des sites crédibles).
- **Accessibilité** : `document.documentElement.lang` synchronisé avec le toggle FR/EN, focus visible unifié (anneau violet), alt text revus sur hero/cartes, puces décoratives en `aria-hidden`, fallback Suspense annoncé (`role="status"`).

## 2. Refonte UI/UX du site principal

Nouvelle direction artistique construite autour du **violet du logo (#8C52FF)** :

- **Palette** : papier chaud `#FAF9F5`, encre violacée `#17141F`, lavande `#EFEAFD`, violet profond `#5B34E8` pour les interactions. Les anciens tokens (`--brown`, `--sand`…) sont mappés pour compatibilité.
- **Typographie** : Fraunces (titres, serif éditoriale) + Manrope (corps). Fini le « tout Space Grotesk ».
- **Composants signature** : kicker à carré violet, cartes éditoriales à bord fin (hover violet + lift), boutons pilule encre→violet avec flèche animée, liens à soulignement animé, numérotation éditoriale (01/02/03).
- Sections retravaillées : hero (image en arche + stats), approche (panneau encre), témoignages (guillemet serif), timeline À propos (frise verticale), footer encre violacée.

## 3. Offres / tarifs (prix inchangés, liens Stripe intacts)

- Chaque carte répond à : **pour qui / quoi / sous quel délai / combien** (« En ligne sous 10 jours ouvrés », « Artisans, indépendants, saisonniers »…).
- **Maintenance clarifiée** : les deux prix 49/99 € n'étaient pas différenciés → formules nommées **Essentiel** (mises à jour, sauvegardes, 30 min de modifs) et **Sérénité** (+2 h de modifs, rapport mensuel, suivi SEO), mention « sans engagement ».
- **Mini-FAQ conversion** (3 questions : textes/photos, paiement, propriété du site) pour lever les objections classiques des petits commerçants.
- Les 4 liens Stripe (`buy.stripe.com/...so00` à `...so03`) et les 2 formulaires Tally (`mJ7Zgd`, `mOveKp`) sont strictement identiques.

## 4. Démos : une direction artistique par secteur

| Démo | Nouvelle DA |
|---|---|
| Sans Permis Saint-Jorioz | « Capitainerie » : crème/navy/laiton, Playfair Display, angles droits, liseré pavillon |
| Cascade Nomade Canyoning | « Torrent » : page sombre pétrole, accent lime, Archivo majuscules (exit le dégradé violet-cyan) |
| Le Deck Pédalos | « Riviera estivale » : blanc chaud, jaune soleil, bleu piscine, Baloo 2 (exit le hero noir) |
| Micro-École Parapente | « Altitude » : ciel/blanc aéré, accents corail + bleu glacier, Outfit |
| La Cuillère à Omble | « Gastronomie éditoriale » : ivoire, vert sapin, doré, Cormorant Garamond |
| Au Coup de Pompe | « Atelier rétro » renforcé : Bricolage Grotesque sur les titres (palette crème/orange conservée) |
| Palace Lac & Lumière | Inchangé (DA art-déco déjà distinctive) |
| La Seiche | Inchangé (retravaillé récemment) — image compressée |

## 5. Deux nouvelles démos

- **Salon Lumen** (`/demos/salon-lumen`) : coiffeur Annecy, one-page volontairement sobre (tarifs, horaires, tel-to-call, Maps) — l'offre **Landing Express** en situation. Aucune dépendance animation.
- **Refuge Altara** (`/demos/refuge-altara`) : chalet d'exception, vitrine technique — parallaxe au scroll, barre de progression, titres masqués/révélés, image reveals à rideau, compteurs animés, marquee, micro-interactions. Le choix a été fait de ne pas ajouter de dépendance 3D (three.js ≈ +600 Ko) : tout est fait en Framer Motion déjà présent.

Les deux sont ajoutées au portfolio (grille /work) et aux routes lazy.
