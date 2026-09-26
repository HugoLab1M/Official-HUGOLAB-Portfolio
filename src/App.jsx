'use client';
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import PricingSection from "./components/PricingSection.jsx";

// Démos chargées à la demande pour garder le bundle principal léger
const CoupDePompe = lazy(() => import("./demos/CoupDePompe.jsx"));
const LeDeckPedalos = lazy(() => import("./demos/LeDeckPedalos.jsx"));
const SansPermisSaintJorioz = lazy(() => import("./demos/SansPermisSaintJorioz.jsx"));
const MicroEcoleParapente = lazy(() => import("./demos/MicroEcoleParapente.jsx"));
const CascadeNomadeCanyoning = lazy(() => import("./demos/CascadeNomadeCanyoning.jsx"));
const LaCuillereAOmble = lazy(() => import("./demos/LaCuillereAOmble.jsx"));
const PalaceLacLumiere = lazy(() => import("./demos/PalaceLacLumiere.jsx"));
const LaSeiche = lazy(() => import("./demos/LaSeiche.jsx"));
const SalonLumen = lazy(() => import("./demos/SalonLumen.jsx"));
const RefugeAltara = lazy(() => import("./demos/RefugeAltara.jsx"));
import CookieBanner, { getStoredConsent, storeConsent } from "./components/CookieBanner.jsx";
import { initAnalytics, disableAnalytics } from "./utils/analytics.js";
import WhyUs from "./sections/WhyUs.jsx";
import Branches from "./sections/Branches.jsx";
import AiAnswerDemo from "./sections/AiAnswerDemo.jsx";
import VisibiliteIA from "./pages/VisibiliteIA.jsx";
import MentionsLegales from "./legal/MentionsLegales.jsx";
import Confidentialite from "./legal/Confidentialite.jsx";
import CookiesPage from "./legal/Cookies.jsx";
import CGV from "./legal/CGV.jsx";
import AvisPage from "./pages/Avis.jsx";
import FooterPro from "./layout/FooterPro.jsx";
import { openMail } from "./utils/mail.js";

// =============================================
// HügoLab — Portfolio Website (Agency Branding)
// Single-file React component (Tailwind + Framer Motion)
// =============================================

// --- Hero carousel images ----------------------------------------------------
const HERO_IMAGES = ["/hero/1_v2-web.jpg", "/hero/2_v2-web.jpg", "/hero/3_v2-web.jpg"];

// --- Projects (replace with real ones) --------------------------------------
const PROJECTS = [
  {
    slug: "au-coup-de-pompe",
    title: "Au Coup de Pompe — Repair & Snacks",
    tagline: "Atelier vélo et snack : un site moderne, pensé d’abord pour le mobile.",
    industry: "Commerce local",
    stack: ["Next.js", "Tailwind", "Framer Motion", "SEO"],
    image:
      "/projects/1_v2-web.jpg",
    url: "/demos/coup-de-pompe",               // ⇦ route interne
    caseStudyUrl: "#case-au-coup-de-pompe",
  },
  {
    slug: "annecy-pedalos",
    title: "Le Deck Pédalos",
    tagline: "Réservation en quelques clics et grille tarifaire dynamique.",
    industry: "Tourisme",
    stack: ["React", "Tailwind", "Vite"],
    image:
      "/projects/2_v2.jpg",
    url: "/demos/le-deck-pedalos",            // ⇦ route interne
    caseStudyUrl: "#case-annecy-velos",
  },
  {
    slug: "sans-permis-saint-jorioz",
    title: "Sans Permis Saint-Jorioz — Bateaux à l’heure",
    tagline: "Acompte en ligne, empreinte de caution, slots météo-aware.",
    industry: "Tourisme",
    stack: ["React", "Tailwind", "Stripe-ready"],
    image: "/projects/3_v2.jpg",
    url: "/demos/sans-permis-saint-jorioz",
    caseStudyUrl: "#case-sans-permis",
  },
  {
    slug: "micro-ecole-parapente",
    title: "Micro-École Parapente — Doussard",
    tagline: "Créneaux biplace, options photo/vidéo, report météo.",
    industry: "Outdoor",
    stack: ["React", "Tailwind", "i18n"],
    image: "/projects/4_v2.jpg",
    url: "/demos/micro-ecole-parapente",
    caseStudyUrl: "#case-parapente",
  },
  {
    slug: "cascade-nomade-canyoning",
    title: "Cascade Nomade — Guides Canyoning",
    tagline: "Parcours pour tous, encadrement diplômé, site coloré et immersif.",
    industry: "Outdoor",
    stack: ["React", "Tailwind", "i18n", "UX"],
    image: "/projects/5_v2.jpg",
    url: "/demos/cascade-nomade-canyoning",
    caseStudyUrl: "#case-cascade-nomade",
  },
  {
    slug: "la-cuillere-a-omble",
    title: "La Cuillère à Omble — Restaurant",
    tagline: "Cuisine de lac, terrasse lumineuse, vins sélectionnés.",
    industry: "Restaurant",
    stack: ["React", "Tailwind", "SEO"],
    image: "/projects/6_v2.jpg",        // mets une vignette ici (ou réutilise /omble/hero.jpg)
    url: "/demos/la-cuillere-a-omble",  // ⇦ route interne
    caseStudyUrl: "#case-omble",
  },
  {
    slug: "palace-lac-lumiere",
    title: "Lac & Lumière Palace — Hôtel 5*",
    tagline: "Suites panoramiques, spa suspendu, gastronomie étoilée sur les rives du lac.",
    industry: "Hôtellerie de luxe",
    stack: ["React", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    url: "/demos/palace-lac-lumiere",
    caseStudyUrl: "#case-palace-lac-lumiere",
  },
  {
    slug: "la-seiche-marche",
    title: "La Seiche — Marché bar & loisirs",
    tagline: "Agenda partagé, stands food, privatisations et newsletter pour Sévrier.",
    industry: "Lieu hybride",
    stack: ["React", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    url: "/demos/la-seiche",
    caseStudyUrl: "#case-la-seiche",
  },
  {
    slug: "salon-lumen",
    title: "Salon Lumen — Coiffeur",
    tagline: "One-page sobre et efficace : tarifs, horaires, appel en un clic. L'offre Landing Express en situation.",
    industry: "Commerce de proximité",
    stack: ["React", "Tailwind", "Landing Express"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    url: "/demos/salon-lumen",
    caseStudyUrl: "#case-salon-lumen",
  },
  {
    slug: "refuge-altara",
    title: "Refuge Altara — Chalet d'exception",
    tagline: "Vitrine immersive : parallaxe, animations au scroll, storytelling premium. Notre savoir-faire poussé à fond.",
    industry: "Hôtellerie de charme",
    stack: ["React", "Framer Motion", "Signature"],
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    url: "/demos/refuge-altara",
    caseStudyUrl: "#case-refuge-altara",
  }
];

// --- Contact / Socials -------------------------------------------------------
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mateo-hugues/" },
];

const CONTACT = {
  email: "contact@hugolab.fr",
  phone: "+33 6 26 23 14 09",
  location: "Haute-Savoie · Lyon",
};

// --- i18n strings ------------------------------------------------------------
const STRINGS = {
  fr: {
    nav: { home: "Accueil", ia: "Visibilité IA", work: "Réalisations", services: "Services", pricing: "Tarifs", about: "À propos", contact: "Contact" },
    navCta: "Nous contacter",
    hero: {
      kicker: "Studio de visibilité · Annecy & Lyon",
      title: "Être trouvé.\nÊtre choisi.",
      subtitle:
        "HügoLab aide les cabinets, commerces et indépendants de Haute-Savoie et de Lyon à apparaître là où leurs clients cherchent — dans les réponses des moteurs IA comme sur Google — et à faire bonne impression une fois trouvés.",
      ctaPrimary: "Découvrir l’audit Visibilité IA",
      ctaSecondary: "Voir les réalisations",
      stats: [
        { value: "43", label: "cabinets étudiés en 2026" },
        { value: "3", label: "pôles, un interlocuteur" },
        { value: "< 24 h", label: "délai de réponse" },
      ],
    },
    branches: {
      kicker: "Trois pôles",
      title: "Un même objectif : qu’on vous trouve, et qu’on vous choisisse",
      intro: "Mesurer où vous en êtes, construire ce qui manque, soigner l’image. Chaque pôle se prend seul ou se combine.",
      items: [
        {
          badge: "Nouveau",
          title: "Visibilité IA",
          forWho: "Avocats · experts-comptables",
          desc: "Ce que répond un moteur de recherche IA quand un client cherche un cabinet comme le vôtre, les pages qu’il lit pour répondre, et celles où vous manquez.",
          bullets: ["Chaque question testée deux fois", "Pages citées et absences, une par une", "Trois actions concrètes"],
          price: "Audit · 490 € HT",
          cta: "Découvrir",
          href: "/visibilite-ia",
        },
        {
          title: "Sites web",
          forWho: "Commerces · indépendants · tourisme",
          desc: "Des sites clairs, rapides et bien référencés, pensés pour transformer une visite en prise de contact.",
          bullets: ["Landing page ou vitrine complète", "SEO local et fiche Google", "Maintenance mensuelle en option"],
          price: "dès 649 € HT",
          cta: "Voir les offres",
          href: "/services#landing",
        },
        {
          title: "Identité visuelle",
          forWho: "Création · refonte de marque",
          desc: "Un logo et une identité cohérents sur tous vos supports, du site à l’enseigne.",
          bullets: ["2 à 3 pistes créatives", "Fichiers sources et déclinaisons", "Mini guide d’usage"],
          price: "dès 490 € HT",
          cta: "En savoir plus",
          href: "/services#logo",
        },
      ],
    },
    studyTeaser: {
      kicker: "Étude · septembre 2026",
      title: "Le moteur sait qui sont les cabinets indépendants. Il ne les propose pas.",
      body: "43 cabinets d’avocats et d’experts-comptables de Haute-Savoie et de Lyon, 258 réponses d’un moteur de recherche IA analysées, chaque question posée deux fois.",
      stats: [
        { value: "1", of: "sur 43", label: "nommé de façon stable quand on demande « le meilleur » de sa ville" },
        { value: "42", of: "sur 43", label: "correctement identifiés quand on tape leur nom" },
        { value: "18", of: "sur 43", label: "sans aucune page de leur propre site parmi les sources lues" },
      ],
      cta: "Lire les résultats",
      href: "/visibilite-ia",
    },
    homeProjects: {
      title: "Sites web : réalisations et maquettes",
      intro: "Chaque maquette a sa propre direction artistique : un aperçu concret de ce que nous livrons.",
      cta: "Voir toutes les réalisations",
      ctaHref: "/work",
    },
    homeApproach: {
      kicker: "Notre méthode",
      title: "Mesurer avant de promettre",
      description:
        "Audit, site ou logo, nous partons de ce qui se passe vraiment : ce que voient vos clients, ce que lisent les moteurs, ce qui les pousse à vous contacter. Puis nous construisons l’essentiel, sans effet de manche.",
      slogan: "Des faits, des pages qui travaillent, une image qui vous ressemble.",
    },
    whyUs: {
      kicker: "Pourquoi HügoLab",
      title: "Un studio indépendant, un seul interlocuteur",
      cta: "En savoir plus sur HügoLab",
      ctaHref: "/about",
      items: [
        {
          icon: "ai",
          title: "Une méthode mesurée",
          desc: "Chaque constat est vérifié deux fois, daté et sourcé. Aucune promesse bâtie sur une seule observation.",
        },
        {
          icon: "local",
          title: "Ancré en Haute-Savoie",
          desc: "Basé près d’Annecy, disponible pour des échanges de vive voix, en Haute-Savoie comme à Lyon.",
        },
        {
          icon: "transparent",
          title: "Des prix annoncés",
          desc: "Des offres claires, un prix affiché dès le départ, aucun jargon inutile.",
        },
        {
          icon: "human",
          title: "Un seul interlocuteur",
          desc: "La même personne de l’audit à la mise en ligne, et après.",
        },
        {
          icon: "speed",
          title: "Production rapide",
          desc: "Des étapes courtes, validées avec vous, et une mise en ligne en quelques semaines.",
        },
        {
          icon: "design",
          title: "Un design qui respire",
          desc: "Typographies soignées, espaces aérés, une image à la hauteur de votre savoir-faire.",
        },
      ],
    },
    services: {
      title: "Services",
      kicker: "Ce que nous faisons",
      cta: "Voir les maquettes",
      sections: [
        {
          id: "visibilite-ia",
          tag: "Visibilité IA",
          title: "Audit de visibilité IA",
          desc:
            "Nous interrogeons un moteur de recherche IA avec les questions de vos futurs clients, chacune deux fois, et vous remettons la liste des pages qu’il lit pour répondre, celles où vous êtes absent, et trois actions pour y remédier.",
          bullets: [
            "Questions génériques, de besoin précis et sur votre nom",
            "Réponses intégrales, moteur et date nommés",
            "Pages citées et absences, une par une",
            "Accompagnement mensuel possible : corrections et mesure",
          ],
          visual: "ai",
          ctaLabel: "Découvrir l’audit",
          ctaHref: "/visibilite-ia",
        },
        {
          id: "landing",
          tag: "Sites web",
          title: "Création de site vitrine",
          desc:
            "Nous concevons et mettons en ligne votre site vitrine : design soigné, texte clair, chargement fluide. Nous travaillons en React pour un site léger et durable. Si besoin, on ajoute un petit CMS pour éditer vos pages en autonomie.",
          bullets: [
            "Architecture claire & mobile-first",
            "SEO technique (balises, performance, méta)",
            "CMS léger optionnel (édition simple)",
            "Analytics & mesure des conversions",
            "Mise en ligne + maintenance légère",
          ],
          img: "/services/vitrine-web.jpg",
          imgAlt: "Exemple de site vitrine par HügoLab",
        },
        {
          id: "vitrine",
          tag: "Sites web",
          title: "Création de site e-shop",
          desc:
            "Une boutique en ligne simple et fiable, avec paiement sécurisé via Stripe : parcours d’achat fluide, e-mails de confirmation et tableau de bord de suivi. Nous configurons uniquement l’essentiel.",
          bullets: [
            "Catalogue & pages produit claires",
            "Paiement Stripe (CB, Apple/Google Pay)",
            "Livraison / retrait selon vos besoins",
            "E-mails commande & facture",
            "Statistiques de ventes",
          ],
          img: "/services/eshop-web.jpg",
          imgAlt: "Exemple de boutique en ligne",
        },
        {
          id: "logo",
          tag: "Identité visuelle",
          title: "Logo & identité de marque",
          desc:
            "Nous créons une identité qui vous ressemble et qui fonctionne partout : logo, palette, typographies et règles d’usage. Vous repartez avec les fichiers sources et un mini guide pour rester cohérent sur tous vos supports.",
          bullets: [
            "2–3 pistes créatives, allers-retours inclus",
            "Versions horizontales/verticales + favicon",
            "Guide d’usage (couleurs, typo, marges)",
            "Gabarits réseaux sociaux (option)",
          ],
          img: "/services/branding-web.jpg",
          imgAlt: "Création de logo et identité",
        },
        {
          id: "maintenance",
          tag: "Sites web",
          title: "Suivi & optimisation",
          desc:
            "Nous assurons mises à jour, sauvegardes, surveillance des performances et petites évolutions pour que votre site continue de travailler pour vous.",
          bullets: [
            "Veille technique & mises à jour mensuelles",
            "Sauvegardes automatiques & restauration",
            "Rapport de visites & pistes SEO",
            "Petites évolutions incluses selon formule",
          ],
          img: "/services/maintenance-web.jpg",
          imgAlt: "Tableau de suivi et maintenance de site web",
        },
      ],
    },
    servicesPage: {
      kicker: "Services & tarifs",
      title: "Visibilité IA, sites web et identité visuelle",
      desc: "Trois pôles, des offres claires. Mesurer votre visibilité, construire le site qui convertit, soigner l’image qui vous distingue : chaque prestation se prend seule ou se combine.",
      ctaPrimary: "Nous contacter",
      ctaPrimaryHref: "/#contact",
      ctaSecondary: "Télécharger la plaquette",
      ctaSecondaryHref: "https://tally.so/r/mOQNRL",
    },
    work: { title: "Projets en avant", kicker: "Réalisations", viewMore: "Voir davantage de maquettes" },
    workPage: {
      kicker: "Réalisations",
      title: "Sites et maquettes HügoLab",
      desc: "Projets livrés et maquettes sectorielles conçues pour les acteurs locaux : tourisme, restauration, outdoor et services. Chacune avec sa propre direction artistique.",
      ctaPrimary: "Parler de mon site",
      ctaPrimaryHref: "/#contact",
    },
    about: {
      title: "Notre histoire",
      kicker: "À propos",
      p1: "HügoLab est un studio indépendant basé près d’Annecy, fondé par Mateo Hugues. Nous aidons les cabinets, commerces et indépendants de Haute-Savoie et de Lyon à être trouvés — par les moteurs IA comme par Google — et à faire bonne impression une fois trouvés.",
      p2: "Notre point de départ est toujours une mesure : ce que voient vos clients, ce que lisent les moteurs. En septembre 2026, nous avons ainsi étudié 43 cabinets indépendants d’avocats et d’experts-comptables. Viennent ensuite le site, les contenus et l’identité visuelle.",
      quote: "Un client ne tombe plus seulement sur votre site : il demande aussi à une IA qui choisir. Notre travail est de faire en sorte que vous soyez dans la réponse, et que la première impression soit la bonne.",
      quoteAuthor: "Mateo Hugues — Fondateur de HügoLab",
    },
    aboutPage: {
      hero: {
        kicker: "Studio de visibilité",
        title: "Nous aidons les indépendants à être trouvés, puis choisis",
        subtitle:
          "Basés près d’Annecy, nous accompagnons cabinets, commerces et indépendants de Haute-Savoie et de Lyon : audit de visibilité IA, sites web et identité visuelle.",
        pill: "HügoLab — fondé en 2025",
        ctaPrimary: "Planifier un échange",
        ctaSecondary: "Télécharger la plaquette",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "Cabinets étudiés en 2026", value: "43" },
        { label: "Pôles d’expertise", value: "3" },
        { label: "Création", value: "2025" },
      ],
      values: {
        title: "Notre approche",
        items: [
          {
            title: "Mesurer d’abord",
            desc: "Avant de proposer quoi que ce soit, nous regardons ce qui se passe : ce que répondent les moteurs, ce que voit un client, d’où viennent vos contacts.",
          },
          {
            title: "Clarté et conversion",
            desc: "Chaque page mène vers l’action : prise de contact, réservation ou achat.",
          },
          {
            title: "Tech minimaliste",
            desc: "Une stack moderne avec uniquement les briques utiles, pour rester fiable et évolutif.",
          },
          {
            title: "Suivi continu",
            desc: "Mesure régulière, SEO local et améliorations pour garder une longueur d’avance.",
          },
        ],
      },
      timeline: {
        title: "Étapes clés",
        items: [
          { year: "03/09/2025", title: "Création de HügoLab", desc: "Immatriculation de la micro-entreprise et premières landing pages pour les artisans du lac." },
          { year: "15/09/2025", title: "Offres vitrines", desc: "Structuration des offres Landing & Vitrine avec maquettes sectorielles et paiement en ligne." },
          { year: "24/09/2025", title: "Démos tourisme & restauration", desc: "Mise en ligne de démonstrations personnalisables pour les acteurs locaux." },
          { year: "01/10/2025", title: "Maintenance & SEO continu", desc: "Lancement des offres de suivi : analytics, SEO local et améliorations régulières." },
          { year: "18/09/2026", title: "Pôle Visibilité IA", desc: "Étude sur 43 cabinets d’avocats et d’experts-comptables de Haute-Savoie et de Lyon, et premiers audits de visibilité IA." },
        ],
      },
    },
    contact: {
      title: "Parlons de votre projet",
      kicker: "Contact",
      p: "Audit de visibilité IA, site web ou identité visuelle : décrivez votre activité et votre besoin. Nous revenons vers vous sous 24 h avec une réponse claire.",
      btn: "Ouvrir ma messagerie",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtBy: "Site par HügoLab",
      tagline:
        "Studio de visibilité indépendant près d’Annecy : audit de visibilité IA, sites web et identité visuelle pour les cabinets, commerces et indépendants.",
      availability: "Haute-Savoie & Lyon — missions partout en France.",
      ctaPrimary: "Planifier un échange",
      ctaPrimaryUrl: "/#contact",
      ctaSecondary: "Envoyer mon brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "Agence",
          links: [
            { label: "À propos", href: "/about" },
            { label: "Méthode", href: "/about#process" },
            { label: "Contact", href: "/#contact" },
          ],
        },
        {
          title: "Offres",
          links: [
            { label: "Visibilité IA", href: "/visibilite-ia" },
            { label: "Sites web", href: "/services#landing" },
            { label: "Maintenance", href: "/services#maintenance" },
            { label: "Logo & identité", href: "/services#logo" },
          ],
        },
        {
          title: "Ressources",
          links: [
            { label: "Étude IA 2026", href: "/visibilite-ia" },
            { label: "Réalisations", href: "/work" },
            { label: "Tarifs", href: "/services#pricing" },
          ],
        },
        {
          title: "Légal",
          links: [
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "Confidentialité", href: "/confidentialite" },
            { label: "Cookies", href: "/cookies" },
            { label: "CGV", href: "/cgv" },
          ],
        },
      ],
      contact: {
        title: "Contact",
        emailLabel: "Email",
        phoneLabel: "Téléphone",
        locationLabel: "Zones d'intervention",
        socialsLabel: "Réseaux",
      },
      manageCookies: "Gérer les cookies",
      bottomNav: ["ia", "services", "work", "about", "contact"],
    },
    langLabel: "FR",
  },

  en: {
    nav: { home: "Home", ia: "AI visibility", work: "Work", services: "Services", pricing: "Pricing", about: "About", contact: "Contact" },
    navCta: "Get in touch",
    hero: {
      kicker: "Visibility studio · Annecy & Lyon",
      title: "Get found.\nGet chosen.",
      subtitle:
        "HügoLab helps firms, shops and independents in Haute-Savoie and Lyon show up where their clients look — in AI search answers as well as on Google — and make the right impression once found.",
      ctaPrimary: "Explore the AI visibility audit",
      ctaSecondary: "See our work",
      stats: [
        { value: "43", label: "firms studied in 2026" },
        { value: "3", label: "practices, one contact" },
        { value: "< 24h", label: "reply time" },
      ],
    },
    branches: {
      kicker: "Three practices",
      title: "One goal: be found, and be chosen",
      intro: "Measure where you stand, build what is missing, sharpen your image. Each practice works on its own or combined.",
      items: [
        {
          badge: "New",
          title: "AI visibility",
          forWho: "Lawyers · accountants",
          desc: "What an AI search engine answers when a client looks for a firm like yours, the pages it reads to answer, and where you are missing.",
          bullets: ["Every question tested twice", "Cited pages and gaps, one by one", "Three concrete actions"],
          price: "Audit · €490 excl. VAT",
          cta: "Explore",
          href: "/visibilite-ia",
        },
        {
          title: "Websites",
          forWho: "Shops · independents · tourism",
          desc: "Clear, fast, well-referenced websites designed to turn a visit into an inquiry.",
          bullets: ["Landing page or full showcase", "Local SEO and Google listing", "Optional monthly care"],
          price: "from €649 excl. VAT",
          cta: "See offers",
          href: "/services#landing",
        },
        {
          title: "Visual identity",
          forWho: "New brand · rebrand",
          desc: "A logo and identity that stay consistent everywhere, from website to shop sign.",
          bullets: ["2 to 3 creative routes", "Source files and variations", "Quick usage guide"],
          price: "from €490 excl. VAT",
          cta: "Learn more",
          href: "/services#logo",
        },
      ],
    },
    studyTeaser: {
      kicker: "Study · September 2026",
      title: "The engine knows who independent firms are. It just doesn’t recommend them.",
      body: "43 law and accounting firms in Haute-Savoie and Lyon, 258 answers from an AI search engine analysed, each question asked twice.",
      stats: [
        { value: "1", of: "of 43", label: "named consistently when asked for “the best” in its town" },
        { value: "42", of: "of 43", label: "correctly identified when searched by name" },
        { value: "18", of: "of 43", label: "with no page of their own website among the sources read" },
      ],
      cta: "Read the findings",
      href: "/visibilite-ia",
    },
    homeProjects: {
      title: "Websites: work and mockups",
      intro: "Each mockup has its own art direction: a concrete look at what we deliver.",
      cta: "See all work",
      ctaHref: "/work",
    },
    homeApproach: {
      kicker: "How we work",
      title: "Measure before promising",
      description:
        "Audit, website or logo, we start from what actually happens: what your clients see, what engines read, what makes people get in touch. Then we build what matters, without the fluff.",
      slogan: "Facts, pages that work, an image that looks like you.",
    },
    whyUs: {
      kicker: "Why HügoLab",
      title: "An independent studio, one point of contact",
      cta: "Learn more about HügoLab",
      ctaHref: "/about",
      items: [
        { icon: "ai", title: "A measured method", desc: "Every finding is checked twice, dated and sourced. No promise built on a single observation." },
        { icon: "local", title: "Rooted in Haute-Savoie", desc: "Based near Annecy, available to meet in person in Haute-Savoie and Lyon." },
        { icon: "transparent", title: "Upfront pricing", desc: "Clear offers, prices shown from the start, no jargon." },
        { icon: "human", title: "One point of contact", desc: "The same person from audit to launch, and beyond." },
        { icon: "speed", title: "Fast production", desc: "Short steps approved with you, and a launch within weeks." },
        { icon: "design", title: "Design that breathes", desc: "Refined type, generous space, an image worthy of your expertise." },
      ],
    },
    services: {
      title: "Services",
      kicker: "What we do",
      cta: "See mockups",
      sections: [
        {
          id: "visibilite-ia",
          tag: "AI visibility",
          title: "AI visibility audit",
          desc:
            "We ask an AI search engine the questions your prospective clients ask, each twice, and hand you the list of pages it reads to answer, those where you are missing, and three actions to fix it.",
          bullets: [
            "Generic, need-specific and brand questions",
            "Full answers, engine and date named",
            "Cited pages and gaps, one by one",
            "Optional monthly support: fixes and measurement",
          ],
          visual: "ai",
          ctaLabel: "Explore the audit",
          ctaHref: "/visibilite-ia",
        },
        {
          id: "landing",
          tag: "Websites",
          title: "Business website",
          desc:
            "We design and launch your showcase website with clear copy, refined design and fast loading. Built with React for a lean, future-proof front end. If you need to edit pages, we add a lightweight CMS.",
          bullets: [
            "Clear, mobile-first architecture",
            "Technical SEO (tags, performance, meta)",
            "Optional lightweight CMS (easy editing)",
            "Analytics & conversion tracking",
            "Launch + light maintenance",
          ],
          img: "/services/vitrine-web.jpg",
          imgAlt: "Showcase website by HügoLab",
        },
        {
          id: "vitrine",
          tag: "Websites",
          title: "Online store",
          desc:
            "A simple, reliable store with secure Stripe payments: smooth checkout, order emails and a small dashboard. We set up only what you really need.",
          bullets: [
            "Clean catalog & product pages",
            "Stripe payments (cards, Apple/Google Pay)",
            "Shipping or click & collect as needed",
            "Order & invoice emails",
            "Sales statistics",
          ],
          img: "/services/eshop-web.jpg",
          imgAlt: "Online store example",
        },
        {
          id: "logo",
          tag: "Visual identity",
          title: "Logo & visual identity",
          desc:
            "We craft an identity that looks good and works everywhere: logo, color palette, type and usage rules. Delivered with source files and a quick style guide to keep everything consistent.",
          bullets: [
            "2–3 creative routes with revisions",
            "Horizontal/vertical versions + favicon",
            "Quick style guide (colors, type, spacing)",
            "Social templates (optional)",
          ],
          img: "/services/branding-web.jpg",
          imgAlt: "Logo and identity work",
        },
        {
          id: "maintenance",
          tag: "Websites",
          title: "Care & optimisation",
          desc: "We handle updates, backups, monitoring and small improvements so your website keeps working for you.",
          bullets: [
            "Monthly technical updates",
            "Backups & recovery plan",
            "Traffic report & SEO leads",
            "Small enhancements included per plan",
          ],
          img: "/services/maintenance-web.jpg",
          imgAlt: "Website care and optimisation dashboard",
        },
      ],
    },
    servicesPage: {
      kicker: "Services & pricing",
      title: "AI visibility, websites and visual identity",
      desc: "Three practices, clear offers. Measure your visibility, build the site that converts, sharpen the image that sets you apart: each works on its own or combined.",
      ctaPrimary: "Get in touch",
      ctaPrimaryHref: "/#contact",
      ctaSecondary: "Download the deck",
      ctaSecondaryHref: "https://tally.so/r/mOQNRL",
    },
    work: { title: "Featured work", kicker: "Work", viewMore: "See more mockups" },
    workPage: {
      kicker: "Work",
      title: "HügoLab websites and mockups",
      desc: "Delivered projects and sector mockups for local businesses: tourism, hospitality, outdoor and services. Each with its own art direction.",
      ctaPrimary: "Talk about my website",
      ctaPrimaryHref: "/#contact",
    },
    about: {
      title: "Our story",
      kicker: "About",
      p1: "HügoLab is an independent studio near Annecy, founded by Mateo Hugues. We help firms, shops and independents in Haute-Savoie and Lyon get found — by AI engines as well as Google — and make the right impression once found.",
      p2: "We always start from a measurement: what your clients see, what engines read. In September 2026 we studied 43 independent law and accounting firms this way. Then come the website, the content and the visual identity.",
      quote: "Clients no longer just land on your website: they also ask an AI who to choose. Our job is to make sure you are in the answer, and that the first impression is the right one.",
      quoteAuthor: "Mateo Hugues — HügoLab Founder",
    },
    aboutPage: {
      hero: {
        kicker: "Visibility studio",
        title: "We help independents get found, then chosen",
        subtitle:
          "From near Annecy, we work with firms, shops and independents in Haute-Savoie and Lyon: AI visibility audits, websites and visual identity.",
        pill: "HügoLab — founded 2025",
        ctaPrimary: "Book a call",
        ctaSecondary: "Download the deck",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "Firms studied in 2026", value: "43" },
        { label: "Practices", value: "3" },
        { label: "Founded", value: "2025" },
      ],
      values: {
        title: "How we work",
        items: [
          { title: "Measure first", desc: "Before proposing anything, we look at what happens: what engines answer, what a client sees, where your leads come from." },
          { title: "Clarity first", desc: "Every page leads visitors toward the next action — inquiry, booking or checkout." },
          { title: "Minimal tech", desc: "A modern stack with only the pieces required to stay reliable and scalable." },
          { title: "Ongoing care", desc: "Regular measurement, local SEO and improvements to stay ahead." },
        ],
      },
      timeline: {
        title: "Milestones",
        items: [
          { year: "2025-09-03", title: "HügoLab launches", desc: "Micro-business registered, first landing pages for artisans around Lake Annecy." },
          { year: "2025-09-15", title: "Showcase packages", desc: "Landing + Showcase offers with sector mockups and online payment." },
          { year: "2025-09-24", title: "Tourism & hospitality demos", desc: "Ready-to-customise demos for local businesses." },
          { year: "2025-10-01", title: "Care & SEO plans", desc: "Care plans covering analytics, local SEO and regular improvements." },
          { year: "2026-09-18", title: "AI visibility practice", desc: "Study of 43 law and accounting firms in Haute-Savoie and Lyon, and first AI visibility audits." },
        ],
      },
    },
    contact: {
      title: "Let's talk about your project",
      kicker: "Contact",
      p: "AI visibility audit, website or visual identity: tell us about your business and what you need. We reply within 24 hours with a clear answer.",
      btn: "Open my email app",
    },
    footer: {
      rights: "All rights reserved.",
      builtBy: "Site by HügoLab",
      tagline: "Independent visibility studio near Annecy: AI visibility audits, websites and visual identity for firms, shops and independents.",
      availability: "Haute-Savoie & Lyon — working across France.",
      ctaPrimary: "Schedule a call",
      ctaPrimaryUrl: "/#contact",
      ctaSecondary: "Send your brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "Studio",
          links: [
            { label: "About", href: "/about" },
            { label: "Method", href: "/about#process" },
            { label: "Contact", href: "/#contact" },
          ],
        },
        {
          title: "Offers",
          links: [
            { label: "AI visibility", href: "/visibilite-ia" },
            { label: "Websites", href: "/services#landing" },
            { label: "Care plans", href: "/services#maintenance" },
            { label: "Logo & identity", href: "/services#logo" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "AI study 2026", href: "/visibilite-ia" },
            { label: "Work", href: "/work" },
            { label: "Pricing", href: "/services#pricing" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Legal notice", href: "/mentions-legales" },
            { label: "Privacy", href: "/confidentialite" },
            { label: "Cookies", href: "/cookies" },
            { label: "Terms", href: "/cgv" },
          ],
        },
      ],
      contact: {
        title: "Contact",
        emailLabel: "Email",
        phoneLabel: "Phone",
        locationLabel: "Areas served",
        socialsLabel: "Follow",
      },
      manageCookies: "Manage cookies",
      bottomNav: ["ia", "services", "work", "about", "contact"],
    },
    langLabel: "EN",
  },
};

const PAGE_TITLES = {
  "/": {
    fr: "HügoLab — Visibilité IA, sites web et identité visuelle · Annecy & Lyon",
    en: "HügoLab — AI visibility, websites and visual identity · Annecy & Lyon",
  },
  "/visibilite-ia": {
    fr: "Audit de visibilité IA pour avocats et experts-comptables — HügoLab",
    en: "AI visibility audit for law and accounting firms — HügoLab",
  },
  "/services": { fr: "Services & tarifs — HügoLab", en: "Services & pricing — HügoLab" },
  "/work": { fr: "Réalisations — HügoLab", en: "Work — HügoLab" },
  "/about": { fr: "À propos — HügoLab", en: "About — HügoLab" },
};

// --- Utils ------------------------------------------------------------------
function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const EMAIL_TEMPLATES = {
  FR: {
    subject: "Demande via hugolab.fr",
    body: "Bonjour HügoLab,\n\nMon projet :\n- Activité :\n- Besoin (visibilité IA, site, logo) :\n- Site actuel (si oui) :\n\nMerci !",
  },
  EN: {
    subject: "Inquiry via hugolab.fr",
    body: "Hello HügoLab,\n\nMy project:\n- Business:\n- Need (AI visibility, website, logo):\n- Current site (if any):\n\nThanks!",
  },
};

function getEmailTemplate(langLabel) {
  const key = typeof langLabel === "string" ? langLabel.toUpperCase() : "FR";
  return EMAIL_TEMPLATES[key] ?? EMAIL_TEMPLATES.FR;
}

// --- UI Components -----------------------------------------------------------
function LangToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle language"
      className="rounded-full border border-[var(--border-strong)] px-2.5 py-1 text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--lavender)]"
    >
      {lang.toUpperCase()}
    </button>
  );
}

function Nav({ t, onLangToggle, lang, onContactClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const items = [
    { label: t.nav.ia, to: "/visibilite-ia", aria: lang === "fr" ? "Découvrir l’audit de visibilité IA" : "Explore the AI visibility audit" },
    { label: t.nav.services, to: "/services", aria: lang === "fr" ? "Découvrir les services HügoLab" : "Discover HügoLab services" },
    { label: t.nav.work, to: "/work", aria: lang === "fr" ? "Explorer les réalisations HügoLab" : "Explore HügoLab work" },
    { label: t.nav.pricing, to: "/services#pricing", aria: lang === "fr" ? "Consulter les tarifs HügoLab" : "See HügoLab pricing" },
    { label: t.nav.about, to: "/about", aria: lang === "fr" ? "En savoir plus sur HügoLab" : "Learn more about HügoLab" },
    { label: t.nav.contact, to: "/#contact", aria: lang === "fr" ? "Contacter HügoLab" : "Contact HügoLab" },
  ];

  const closeMobile = () => setMobileOpen(false);
  const mobileLabel = mobileOpen
    ? lang === "fr"
      ? "Fermer le menu"
      : "Close menu"
    : lang === "fr"
    ? "Ouvrir le menu"
    : "Open menu";
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(248,247,251,0.85)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 group" aria-label="HügoLab — accueil">
          <img src="/logo.svg" alt="HügoLab" className="h-9 w-auto" />
          <span className="font-display hidden text-lg font-medium tracking-tight text-[var(--ink)] transition-opacity group-hover:opacity-80 sm:inline-block">
            HügoLab
          </span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-label={item.aria}
              className={classNames(
                "link-underline text-sm font-medium transition-colors hover:text-[var(--ink)]",
                pathname === item.to ? "text-[var(--ink)]" : "text-[var(--muted)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} onToggle={onLangToggle} />
          <button
            onClick={onContactClick}
            className="hidden items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--violet-deep)] sm:inline-flex"
          >
            {t.navCta}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] p-2 text-[var(--ink)] transition hover:bg-[var(--lavender)] md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileLabel}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--paper)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={`mobile-${item.label}`}
                to={item.to}
                onClick={closeMobile}
                aria-label={item.aria}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--lavender)]"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                onContactClick();
                closeMobile();
              }}
              className="mt-2 rounded-full bg-[var(--ink)] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--violet-deep)]"
            >
              {t.navCta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function SectionTitle({ children, kicker }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {kicker ? <p className="kicker mb-3">{kicker}</p> : null}
      <h2 className="font-display mb-8 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{children}</h2>
    </div>
  );
}

function Hero({ t }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);
  const isFr = t.langLabel === "FR";
  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lavender) 0%, transparent 70%)" }}
      />
      <div className="hugolab-container grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="kicker">{t.hero.kicker}</p>
          <h1 className="font-display mt-6 whitespace-pre-line text-5xl font-medium leading-[1.02] tracking-tight text-[var(--ink)] md:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{t.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/visibilite-ia" className="btn-primary">
              {t.hero.ctaPrimary}
              <span className="btn-arrow" aria-hidden>→</span>
            </Link>
            <Link to="/work" className="btn-ghost">
              {t.hero.ctaSecondary}
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl text-[var(--ink)]">{stat.value}</dd>
                <p className="mt-1 text-xs leading-snug text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
        {/* Visuel : une maquette de site (pôle Sites) + la réponse d’un moteur IA (pôle Visibilité) */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="relative ml-auto w-[88%] overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
            style={{ borderRadius: "180px 180px 28px 28px" }}
          >
            <div className="relative aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={HERO_IMAGES[index]}
                  alt={isFr ? "Aperçu d’une maquette de site HügoLab" : "Preview of a HügoLab website mockup"}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="relative -mt-40 w-[92%] sm:-mt-48 sm:w-[80%] lg:absolute lg:-left-10 lg:bottom-8 lg:mt-0 lg:w-[72%]">
            <AiAnswerDemo lang={isFr ? "fr" : "en"} compact showToggle={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StudyTeaser({ data }) {
  if (!data) return null;
  return (
    <section className="pb-16 md:pb-24">
      <div className="hugolab-container">
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--ink)] p-8 text-white md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(140,82,255,0.6) 0%, transparent 70%)" }}
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="kicker !text-white/60">{data.kicker}</p>
              <h2 className="font-display mt-5 text-3xl font-medium leading-snug md:text-[2.6rem]">{data.title}</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{data.body}</p>
            </div>
            <Link
              to={data.href}
              className="inline-flex flex-none items-center gap-2 self-start rounded-full bg-[var(--violet-deep)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--violet-text)] md:self-auto"
            >
              {data.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            {data.stats.map((st) => (
              <div key={st.label} className="border-t border-white/15 pt-5">
                <p className="font-display text-5xl font-medium tracking-tight md:text-6xl">
                  {st.value}
                  <span className="ml-2 text-xl text-white/50">{st.of}</span>
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection({ data, lang }) {
  if (!data) return null;
  return (
    <section id="approach" className="py-16 md:py-24">
      <div className="hugolab-container">
        <div className="rounded-[32px] bg-[var(--ink)] p-10 text-white md:p-16">
          <p className="kicker !text-white/60">{data.kicker || (lang === "FR" ? "Approche" : "Approach")}</p>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start md:gap-20">
            <h2 className="font-display max-w-md text-3xl font-medium leading-snug md:text-4xl">{data.title}</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{data.description}</p>
          </div>
          <p className="font-display mt-10 text-xl italic text-[var(--violet)]">{data.slogan}</p>
        </div>
      </div>
    </section>
  );
}

// util pour ProjectCard
const isExternalUrl = (u) => /^https?:\/\//i.test(u);

function FeaturedMockups({ t }) {
  const copy = t.homeProjects;
  const items = PROJECTS.slice(0, 3);

  return (
    <section id="projects" className="border-t border-[var(--border)] bg-[var(--surface)]/60 py-16 md:py-24">
      <div className="hugolab-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">{t.langLabel === "FR" ? "Sites web" : "Websites"}</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{copy.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{copy.intro}</p>
          </div>
          <Link to={copy.ctaHref} className="btn-ghost whitespace-nowrap">
            {copy.cta}
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, idx) => {
            const order = String(idx + 1).padStart(2, "0");
            const card = (
              <div className="card-editorial group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.industry}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 bg-[var(--paper)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                    {item.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-sm text-[var(--violet-text)]">{order}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--violet-text)]">
                    {t.langLabel === "FR" ? "Voir la maquette" : "Open mockup"}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            );
            return isExternalUrl(item.url) ? (
              <a key={item.slug} href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {card}
              </a>
            ) : (
              <Link key={item.slug} to={item.url} className="block h-full">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, lang }) {
  const isFrench = lang === "FR";
  const liveLabel = isFrench ? "Voir le site en ligne" : "View live project";
  const CardInner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.title} — ${p.industry}`}
          loading="lazy"
          width="1280"
          height="800"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="bg-[var(--paper)]/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)]">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--violet-text)]">{p.industry}</p>
        <h3 className="mb-1 text-lg font-semibold text-[var(--ink)]">{p.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{p.tagline}</p>
        <div className="mt-4 flex items-center gap-4">
          {/* Toute la carte est déjà un lien : simple libellé ici, pas de lien imbriqué */}
          <span className="link-underline text-sm font-semibold text-[var(--ink)]">{liveLabel}</span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      id={p.caseStudyUrl && p.caseStudyUrl.startsWith("#") ? p.caseStudyUrl.slice(1) : undefined}
      className="card-editorial group overflow-hidden"
    >
      {isExternalUrl(p.url) ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
          {CardInner}
        </a>
      ) : (
        <Link to={p.url} className="block">
          {CardInner}
        </Link>
      )}
    </motion.div>
  );
}

// Ligne « visuel + contenu » qui alterne gauche/droite (hors de Services pour ne pas être remontée à chaque rendu)
function FeatureRow({ t, section, reverse = false }) {
  const emailCopy = getEmailTemplate(t.langLabel);
  return (
    <div
      id={section.id || undefined}
      className={classNames(
        "grid items-start gap-8 md:grid-cols-2 scroll-mt-24",
        reverse ? "md:[&>div:first-child]:order-2" : ""
      )}
    >
      {/* Visuel : image, ou la démo de réponse IA pour le pôle Visibilité */}
      {section.visual === "ai" ? (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--lavender)]/60 p-5 md:p-8">
          <AiAnswerDemo lang={t.langLabel === "FR" ? "fr" : "en"} compact />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)]">
          <div className="aspect-[4/3] md:aspect-[3/2]">
            <img
              src={section.img}
              alt={section.imgAlt}
              loading="lazy"
              width="1200"
              height="900"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 65%" }}
            />
          </div>
        </div>
      )}

      {/* Texte (reste en haut) */}
      <div>
        <p className="kicker mb-3">{section.tag}</p>
        <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--ink)] md:text-3xl">{section.title}</h3>
        <p className="mt-4 leading-relaxed text-[var(--muted)]">{section.desc}</p>

        <ul className="mt-5 space-y-2.5 text-sm">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span aria-hidden className="mt-[7px] inline-block h-1.5 w-1.5 flex-none bg-[var(--violet)]"></span>
              <span className="leading-relaxed text-[var(--ink)]">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={section.ctaHref ?? "/work"} className="btn-primary !px-5 !py-2.5">
            {section.ctaLabel ?? t.services.cta}
            <span className="btn-arrow" aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() => openMail(CONTACT.email, emailCopy.subject, emailCopy.body)}
            className="btn-ghost !px-5 !py-2.5"
          >
            {t.contact.btn}
          </button>
        </div>
      </div>
    </div>
  );
}

function Services({ t }) {
  return (
    <section id="services" className="py-14 md:py-20">
      <SectionTitle kicker={t.services.kicker}>{t.services.title}</SectionTitle>

      <div className="mx-auto max-w-6xl space-y-14 px-4">
        {/* Visuel alterné gauche / droite sur desktop */}
        {t.services.sections.map((section, i) => (
          <FeatureRow key={section.id} t={t} section={section} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function Work({ t, limit = 6, showMore = true }) {
  const shouldLimit = typeof limit === "number";
  const items = shouldLimit ? PROJECTS.slice(0, limit) : PROJECTS;
  const shouldShowMore = showMore && shouldLimit && PROJECTS.length > limit;

  return (
    <section id="work" className="py-14 md:py-20">
      <SectionTitle kicker={t.work.kicker}>{t.work.title}</SectionTitle>
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <ProjectCard p={p} key={p.slug} lang={t.langLabel} />
        ))}
      </div>
      {shouldShowMore && (
        <div className="mt-12 text-center">
          <Link to="/work" className="btn-ghost">
            {t.work.viewMore ?? (t.langLabel === "FR" ? "Voir davantage" : "See more")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="py-14 md:py-20">
      <SectionTitle kicker={t.about.kicker}>{t.about.title}</SectionTitle>

      {/* Image + text side-by-side */}
      <div className="mx-auto max-w-6xl px-4 grid gap-8 md:gap-10 items-start md:grid-cols-12">
        {/* IMAGE (left) */}
        <figure className="md:col-span-5">
          <div className="relative aspect-[16/9] md:aspect-[19/9] overflow-hidden rounded-3xl ring-1 ring-[var(--border)]">
            <img
              src="/about/hugolab-team-web.jpg"   // ← your image (public/about/hugolab-team.webp)
              alt="HügoLab — l’équipe au travail"
              loading="lazy"
              width="1280"
              height="720"
              className="h-full w-full object-cover object-[50%_30%]"  // adjust crop (Y%) if needed
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </figure>

        {/* TEXT (right) */}
        <div className="md:col-span-7 space-y-4 leading-relaxed text-[var(--muted)]">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
      </div>

      {/* QUOTE centered BELOW image+text */}
      {t.about.quote && (
        <figure className="mx-auto mt-10 max-w-3xl px-4 text-center md:mt-14">
          <blockquote className="font-display border-y border-[var(--border)] py-8 text-xl italic leading-relaxed text-[var(--ink)] md:text-2xl">
            {t.about.quote}
          </blockquote>
          {t.about.quoteAuthor && (
            <figcaption className="mt-4 text-sm font-semibold text-[var(--violet-text)]">
              {t.about.quoteAuthor}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

function Contact({ t }) {
  const emailCopy = getEmailTemplate(t.langLabel);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const labels =
    t.langLabel === "FR"
      ? {
          name: "Votre nom",
          email: "Email",
          project: "Parlez-nous de votre activité et de votre besoin",
          budget: "Budget ou timing (optionnel)",
          helper: "Vous recevrez une réponse sous 24h.",
          confirmation: "Votre messagerie s’ouvre pour finaliser l’envoi.",
        }
      : {
          name: "Your name",
          email: "Email",
          project: "Tell us about your activity and what you need",
          budget: "Budget or timing (optional)",
          helper: "We reply within 24 hours.",
          confirmation: "Your email app opens so you can send the message.",
        };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameLabel = t.langLabel === "FR" ? "Nom" : "Name";
    const projectLabel = t.langLabel === "FR" ? "Projet" : "Project";
    const budgetLabel = t.langLabel === "FR" ? "Budget / timing" : "Budget / timing";
    const lines = [
      `${nameLabel}: ${formData.name || "-"}`,
      `Email: ${formData.email || "-"}`,
      "",
      `${projectLabel}:`,
      formData.project || "-",
      "",
      `${budgetLabel}:`,
      formData.budget || "-",
    ].join("\n");
    openMail(CONTACT.email, emailCopy.subject, lines);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-20">
      <div className="hugolab-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <p className="kicker">{t.contact.kicker}</p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{t.contact.title}</h2>
          <p className="text-lg leading-relaxed text-[var(--muted)]">{t.contact.p}</p>
          <div className="space-y-3 text-sm text-[var(--muted)]">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-lg font-semibold text-[var(--ink)] transition hover:text-[var(--brown-2)]"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
              className="block text-lg font-semibold text-[var(--ink)] transition hover:text-[var(--brown-2)]"
            >
              {CONTACT.phone}
            </a>
            <p>{CONTACT.location}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            <span className="rounded-full border border-[var(--border)] px-3 py-1">{t.langLabel === "FR" ? "Réponse < 24h" : "Reply < 24h"}</span>
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {t.langLabel === "FR" ? "Studio humain" : "Human studio"}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[32px] border border-[var(--border)] bg-[var(--sand)]/70 p-6 md:p-8">
          <div>
            <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              {labels.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)]/60"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              {labels.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)]/60"
            />
          </div>
          <div>
            <label htmlFor="project" className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              {labels.project}
            </label>
            <textarea
              id="project"
              name="project"
              rows={4}
              value={formData.project}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)]/60"
            />
          </div>
          <div>
            <label htmlFor="budget" className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              {labels.budget}
            </label>
            <input
              id="budget"
              name="budget"
              type="text"
              value={formData.budget}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)]/60"
            />
          </div>
          <p className="text-sm text-[var(--muted)]">{labels.helper}</p>
          <button type="submit" className="btn-primary w-full justify-center">
            {t.contact.btn}
          </button>
          {submitted && (
            <p className="text-center text-sm text-[var(--brown-2)]">{labels.confirmation}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function AboutPage({ t }) {
  const page = t.aboutPage;
  const emailCopy = getEmailTemplate(t.langLabel);
  const valuesKicker = t.langLabel === "FR" ? "Notre méthode" : "Our method";
  const timelineKicker = t.langLabel === "FR" ? "Parcours" : "Journey";

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-24 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="pill">{page.hero.pill}</span>
            <h1 className="font-display mt-6 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {page.hero.title}
            </h1>
            <p className="mt-5 leading-relaxed text-[var(--muted)] md:text-lg">
              {page.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openMail(CONTACT.email, emailCopy.subject, emailCopy.body)}
                className="btn-primary !px-5 !py-2.5"
              >
                {page.hero.ctaPrimary}
                <span className="btn-arrow" aria-hidden>→</span>
              </button>
              <a
                href={page.hero.ctaSecondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-5 !py-2.5"
              >
                {page.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {page.highlights.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="card-editorial flex flex-col items-center gap-2 px-5 py-6 text-center"
              >
                <div className="font-display text-3xl text-[var(--ink)] md:text-4xl">{item.value}</div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About t={t} />

      <section className="py-16 md:py-20" id="process">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker">{valuesKicker}</p>
          <h2 className="font-display mt-3 text-2xl font-medium tracking-tight md:text-3xl">{page.values.title}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {page.values.items.map((item, idx) => (
              <div key={item.title} className="card-editorial p-6">
                <p className="font-display text-sm text-[var(--violet-text)]">{String(idx + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" id="timeline">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker">{timelineKicker}</p>
          <h2 className="font-display mt-3 text-2xl font-medium tracking-tight md:text-3xl">{page.timeline.title}</h2>
          <div className="mt-10 space-y-0 border-l border-[var(--border-strong)]">
            {page.timeline.items.map((step) => (
              <div key={step.year} className="relative py-6 pl-8">
                <span aria-hidden className="absolute -left-[5px] top-8 h-[9px] w-[9px] bg-[var(--violet)]" />
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--violet-text)]">{step.year}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <Contact t={t} />
      </section>
    </main>
  );
}

function ServicesPage({ t }) {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]/60 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="kicker justify-center">{t.servicesPage.kicker}</p>
          <h1 className="font-display mt-4 text-3xl font-medium tracking-tight md:text-5xl">{t.servicesPage.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[var(--muted)] md:text-lg">{t.servicesPage.desc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={t.servicesPage.ctaPrimaryHref} className="btn-primary !px-5 !py-2.5">
              {t.servicesPage.ctaPrimary}
              <span className="btn-arrow" aria-hidden>→</span>
            </a>
            <a
              href={t.servicesPage.ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-5 !py-2.5"
            >
              {t.servicesPage.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <Services t={t} />

      <PricingSection
        briefFormUrl="https://tally.so/r/mJ7Zgd"
        logoFormUrl="https://tally.so/r/mOveKp"
        paymentLinks={{
          starterDeposit: "https://buy.stripe.com/eVq6oJ8QC3SzdoH6LV8so00",
          vitrineDeposit: "https://buy.stripe.com/5kQ6oJ7My0Gn1FZgmv8so01",
          maintenance49: "https://buy.stripe.com/7sYdRbaYKagXbgz4DN8so02",
          maintenance99: "https://buy.stripe.com/4gMaEZ7MygFl2K39Y78so03",
        }}
      />
    </main>
  );
}

function WorkPage({ t }) {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]/60 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="kicker justify-center">{t.workPage.kicker}</p>
          <h1 className="font-display mt-4 text-3xl font-medium tracking-tight md:text-5xl">{t.workPage.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[var(--muted)] md:text-lg">{t.workPage.desc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={t.workPage.ctaPrimaryHref} className="btn-primary !px-5 !py-2.5">
              {t.workPage.ctaPrimary}
              <span className="btn-arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <Work t={t} limit={null} showMore={false} />
    </main>
  );
}

function PricingRedirect() {
  return <Navigate to="/services#pricing" replace />;
}

function ContactRedirect() {
  return <Navigate to="/#contact" replace />;
}

// --- Main component ----------------------------------------------------------
export default function App() {
  const [cookieConsent, setCookieConsent] = useState("unknown");
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lang, setLang] = useState("fr");
  const location = useLocation();
  // Les démos sont des sites autonomes : on masque la nav/footer HügoLab
  const isDemoRoute = location.pathname.startsWith("/demos/");
  const t = useMemo(() => STRINGS[lang], [lang]);
  const emailCopy = useMemo(() => getEmailTemplate(t.langLabel), [t.langLabel]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Titre d’onglet par page (le SPA ne sert qu’un index.html)
  useEffect(() => {
    if (isDemoRoute) return;
    const title = PAGE_TITLES[location.pathname];
    document.title = title ? title[lang] : PAGE_TITLES["/"][lang];
  }, [location.pathname, lang, isDemoRoute]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = getStoredConsent();
    if (stored === "accept") {
      setCookieConsent("accept");
      initAnalytics();
      setShowCookieBanner(false);
    } else if (stored === "reject") {
      setCookieConsent("reject");
      disableAnalytics();
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  useEffect(() => {
    const openHandler = () => setShowCookieBanner(true);
    if (typeof window === "undefined") return undefined;
    window.addEventListener("hlab-open-cookie-banner", openHandler);
    return () => window.removeEventListener("hlab-open-cookie-banner", openHandler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handlePreferencesChange = (event) => {
      const status = event?.detail?.status;
      if (status === "accept") {
        setCookieConsent("accept");
        storeConsent("accept");
        initAnalytics();
        setShowCookieBanner(false);
      } else if (status === "reject") {
        setCookieConsent("reject");
        storeConsent("reject");
        disableAnalytics();
        setShowCookieBanner(false);
      }
    };
    window.addEventListener("hlab-cookie-preferences-changed", handlePreferencesChange);
    return () => window.removeEventListener("hlab-cookie-preferences-changed", handlePreferencesChange);
  }, []);

  useEffect(() => {
    if (cookieConsent === "accept") {
      initAnalytics();
    }
    if (cookieConsent === "reject") {
      disableAnalytics();
    }
  }, [cookieConsent]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const scrollToEl = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };
      if (!scrollToEl()) {
        const timer = setTimeout(scrollToEl, 120);
        return () => clearTimeout(timer);
      }
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  const handleAcceptCookies = () => {
    setCookieConsent("accept");
    storeConsent("accept");
    setShowCookieBanner(false);
    initAnalytics();
  };

  const handleDeclineCookies = () => {
    setCookieConsent("reject");
    storeConsent("reject");
    setShowCookieBanner(false);
    disableAnalytics();
  };

  const handleManageCookies = () => {
    setShowCookieBanner(true);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* La Nav est masquée sur les démos pour les présenter comme de vrais sites */}
      {!isDemoRoute && (
        <Nav
          t={t}
          lang={lang}
          onLangToggle={() => setLang(lang === "fr" ? "en" : "fr")}
          onContactClick={() =>
            openMail(
              CONTACT.email,
              emailCopy.subject,
              emailCopy.body
            )
          }
        />
      )}
      {isDemoRoute && (
        <Link
          to="/work"
          className="fixed bottom-6 left-6 z-[60] inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-[var(--violet-deep)]"
        >
          <span aria-hidden>←</span>
          {lang === "fr" ? "Maquette HügoLab — retour" : "HügoLab mockup — back"}
        </Link>
      )}
      {/* Ici on gère les routes */}
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
            <span className="text-sm text-[var(--muted)]">{lang === "fr" ? "Chargement…" : "Loading…"}</span>
          </div>
        }
      >
      <Routes>
        {/* Page d’accueil (portfolio existant) */}
        <Route
          path="/"
          element={
            <main>
              <Hero t={t} />
              <Branches data={t.branches} />
              <StudyTeaser data={t.studyTeaser} />
              <FeaturedMockups t={t} />
              <ApproachSection data={t.homeApproach} lang={t.langLabel} />
              <WhyUs section={t.whyUs} />
              <Contact t={t} />
            </main>
          }
        />
        <Route path="/visibilite-ia" element={<VisibiliteIA lang={lang} email={CONTACT.email} />} />
        <Route path="/audit-ia" element={<Navigate to="/visibilite-ia" replace />} />
        <Route path="/about" element={<AboutPage t={t} />} />
        <Route path="/services" element={<ServicesPage t={t} />} />
        <Route path="/work" element={<WorkPage t={t} />} />
        <Route path="/pricing" element={<PricingRedirect />} />
        <Route path="/contact" element={<ContactRedirect />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/avis" element={<AvisPage />} />
        {/* Pages démos */}
        <Route path="/demos/coup-de-pompe" element={<CoupDePompe />} />
        <Route path="/demos/le-deck-pedalos" element={<LeDeckPedalos />} />
        <Route path="/demos/sans-permis-saint-jorioz" element={<SansPermisSaintJorioz />} />
        <Route path="/demos/micro-ecole-parapente" element={<MicroEcoleParapente />} />
        <Route path="/demos/cascade-nomade-canyoning" element={<CascadeNomadeCanyoning />} />
        <Route path="/demos/la-cuillere-a-omble" element={<LaCuillereAOmble />} />
        <Route path="/demos/palace-lac-lumiere" element={<PalaceLacLumiere />} />
        <Route path="/demos/la-seiche/*" element={<LaSeiche />} />
        <Route path="/demos/salon-lumen" element={<SalonLumen />} />
        <Route path="/demos/refuge-altara" element={<RefugeAltara />} />
      </Routes>
      </Suspense>

      {/* Footer masqué sur les démos (sites autonomes) */}
      {!isDemoRoute && (
        <FooterPro
          t={t}
          onManageCookies={handleManageCookies}
          contact={CONTACT}
          socials={SOCIALS}
        />
      )}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--paper)] text-[var(--ink)] shadow-lg transition hover:-translate-y-1 hover:border-[var(--violet)] hover:shadow-xl"
          aria-label={lang === "fr" ? "Revenir en haut" : "Back to top"}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <CookieBanner
        visible={showCookieBanner}
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
        lang={t.langLabel}
      />
    </div>
  );
}

