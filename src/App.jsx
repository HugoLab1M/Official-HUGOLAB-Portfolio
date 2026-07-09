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
import MentionsLegales from "./legal/MentionsLegales.jsx";
import Confidentialite from "./legal/Confidentialite.jsx";
import CookiesPage from "./legal/Cookies.jsx";
import CGV from "./legal/CGV.jsx";
import AvisPage from "./pages/Avis.jsx";
import FooterPro from "./layout/FooterPro.jsx";

// =============================================
// HügoLab — Portfolio Website (Agency Branding)
// Single-file React component (Tailwind + Framer Motion)
// =============================================

// --- Hero carousel images ----------------------------------------------------
const HERO_IMAGES = ["/hero/1_v2.jpg", "/hero/2_v2.jpg", "/hero/3_v2.jpg"];

// --- Projects (replace with real ones) --------------------------------------
const PROJECTS = [
  {
    slug: "au-coup-de-pompe",
    title: "Au Coup de Pompe — Repair & Snacks",
    tagline: "Local bike repair + snack bar with a modern, mobile-first site.",
    industry: "Local Business",
    stack: ["Next.js", "Tailwind", "Framer Motion", "SEO"],
    image:
      "/projects/1_v2.jpg",
    url: "/demos/coup-de-pompe",               // ⇦ route interne
    caseStudyUrl: "#case-au-coup-de-pompe",
  },
  {
    slug: "annecy-pedalos",
    title: "Le Deck Pédalos",
    tagline: "Conversion-focused booking flow + dynamic pricing table.",
    industry: "Tourism",
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
  { name: "Instagram", href: "https://www.instagram.com/" },
];

const CONTACT = {
  email: "contact@hugolab.fr",
  phone: "+33 6 26 23 14 09",
  location: "Annecy • Grenoble",
};

// --- i18n strings ------------------------------------------------------------
const STRINGS = {
  fr: {
    nav: { home: "Accueil", work: "Projets", services: "Services", pricing: "Tarifs", about: "À propos", contact: "Contact" },
    hero: {
      kicker: "Studio web près d’Annecy",
      title: "Des sites clairs, élégants et efficaces pour vos clients",
      subtitle: "Design, création et refonte de sites vitrines avec SEO local intégré pour les entreprises autour du lac.",
      ctaPrimary: "Voir les maquettes",
      ctaSecondary: "Décrire mon projet",
    },
    homeIntro: {
      title: "Studio indépendant près d’Annecy",
      body:
        "HügoLab accompagne les commerces, maisons d’hôtes et artisans du lac à clarifier leur présence en ligne. Nous concevons des sites sobres, humains et orientés résultats avec un suivi de proximité.",
      highlights: [
        {
          title: "Création & refonte",
          desc: "Sites vitrines sur-mesure pour raconter votre activité simplement.",
        },
        {
          title: "SEO local",
          desc: "Architecture, contenus et balises pensés pour être trouvés autour d’Annecy.",
        },
        {
          title: "Suivi continu",
          desc: "Maintenance légère, mises à jour et optimisations régulières.",
        },
      ],
    },
    homeProjects: {
      title: "Maquettes & projets en situation",
      intro: "Quelques exemples prêts à personnaliser pour montrer la qualité visuelle et la clarté que nous livrons.",
      cta: "Voir toutes les maquettes",
      ctaHref: "/work",
    },
    homeApproach: {
      kicker: "Notre mission",
      title: "Des sites qui respirent et convertissent",
      description:
        "Workshops courts, direction artistique douce et intégration légère pour livrer des pages rapides, lisibles et optimisées pour vos objectifs.",
      slogan: "Clarté, vitesse, conversions — pas d’effet de manche inutile.",
    },
    homeTestimonials: {
      kicker: "Témoignages maquette",
      title: "Ils apprécient notre manière de travailler",
      note: "Contenu fictif pour la maquette, destiné à illustrer la mise en page.",
      items: [
        {
          quote: "Site livré en trois semaines avec un ton qui colle parfaitement à notre maison d’hôtes.",
          name: "Claire Martin",
          role: "Maison Plume, Talloires",
        },
        {
          quote: "Process simple, beaucoup de transparence et surtout un site clair qui nous apporte des demandes locales.",
          name: "Ludovic Perrin",
          role: "Atelier vélo du Semnoz",
        },
        {
          quote: "On a enfin un site qui nous ressemble : chaleureux, rapide et optimisé pour être trouvé sur Google.",
          name: "Sonia B.",
          role: "Restaurant Ô Berges",
        },
      ],
    },
    whyUs: {
      kicker: "Pourquoi HügoLab",
      title: "Une micro-agence locale engagée sur vos résultats",
      cta: "En savoir plus sur HügoLab",
      ctaHref: "/about",
      items: [
        {
          icon: "local",
          title: "Ancré autour du lac",
          desc: "Studio basé à Doussard, disponible pour des échanges terrain et une relation de proximité.",
        },
        {
          icon: "speed",
          title: "Production rapide",
          desc: "Sprints courts, validations régulières et mise en ligne en quelques semaines.",
        },
        {
          icon: "transparent",
          title: "Transparence totale",
          desc: "Devis clair, étapes partagées et aucun jargon inutile.",
        },
        {
          icon: "human",
          title: "Relation humaine",
          desc: "Un seul interlocuteur qui vous accompagne du contenu aux réglages techniques.",
        },
        {
          icon: "design",
          title: "Design qui respire",
          desc: "Typographies modernes, espaces aérés et storytelling premium.",
        },
      ],
    },
    servicesTeaser: {
      kicker: "Ce que nous faisons",
      title: "Des sites clairs, modernes et performants",
      primaryCta: "Voir nos services",
      primaryHref: "/services",
      secondaryCta: "Voir nos projets",
      secondaryHref: "/work",
      items: [
        {
          tag: "Landing page",
          title: "Landing Express",
          desc: "Une page unique pour lancer une offre, collecter des leads ou valider un concept.",
          href: "/services#landing",
          cta: "Voir les détails",
        },
        {
          tag: "Site vitrine",
          title: "Vitrine complète",
          desc: "Cinq pages, formulaire, analytics et SEO local pour être trouvé et contacté facilement.",
          href: "/services#vitrine",
          cta: "Voir les détails",
        },
        {
          tag: "Maintenance",
          title: "Suivi & optimisation",
          desc: "Mises à jour, sauvegardes, rapports mensuels et petits ajustements selon vos besoins.",
          href: "/services#maintenance",
          cta: "Voir les détails",
        },
        {
          tag: "Identité",
          title: "Logo & branding léger",
          desc: "Logo, palette, favicon et mini guide pour garder une identité cohérente sur vos supports.",
          href: "/services#logo",
          cta: "Voir les détails",
        },
      ],
    },
    process: {
      kicker: "Notre méthode",
      title: "Une production claire en quatre étapes",
      cta: "Comprendre notre méthode",
      ctaHref: "/about#process",
      steps: [
        {
          step: "1",
          title: "Découverte",
          desc: "On clarifie vos objectifs, les pages nécessaires, le ton et les délais.",
        },
        {
          step: "2",
          title: "Maquette",
          desc: "Vous validez l’architecture, le contenu clé et le design avant intégration.",
        },
        {
          step: "3",
          title: "Dév & SEO",
          desc: "Intégration en React, optimisation des performances et du référencement local.",
        },
        {
          step: "4",
          title: "Mise en ligne",
          desc: "Configuration domaine, analytics, formation claire et maintenance si besoin.",
        },
      ],
    },
    aboutTeaser: {
      kicker: "L’agence",
      title: "Basés à Doussard, au bord du lac d’Annecy",
      desc: "Nous concevons des sites vitrines modernes, crédibles et performants pour les entreprises locales. L’objectif : transformer une visite en prise de contact ou réservation.",
      primaryCta: "En savoir plus sur l’agence",
      primaryHref: "/about",
      secondaryCta: "Voir nos projets",
      secondaryHref: "/work",
    },
    services: {
      title: "Services",
      kicker: "Ce que nous faisons",
      cta: "Voir les maquettes",
      sections: [
        {
          id: "landing",
          tag: "Site vitrine",
          title: "Création de site vitrine",
          desc:
            "Nous concevons et mettons en ligne votre site vitrine : design soigné, texte clair, chargement fluide. Nous travaillons en React/Next.js pour un front ultra-léger et durable. Si besoin, on ajoute un petit CMS pour éditer vos pages en autonomie.",
          bullets: [
            "Architecture claire & mobile-first",
            "SEO technique (balises, perf, méta)",
            "CMS léger optionnel (édition simple)",
            "Analytics & mesure des conversions",
            "Mise en ligne sur Vercel + maintenance légère",
          ],
          img: "/services/vitrine.jpg",
          imgAlt: "Exemple de site vitrine par HügoLab",
          href: "#pricing",
        },
        {
          id: "vitrine",
          tag: "Site e-commerce",
          title: "Création de site e-shop",
          desc:
            "Une boutique en ligne simple et fiable, avec paiement sécurisé via Stripe. Front en React/Next.js, parcours d’achat fluide, e-mails de confirmation et tableau de bord de suivi. Nous configurons uniquement l'essentiel.",
          bullets: [
            "Catalogue & pages produit claires",
            "Paiement Stripe (CB, Apple/Google Pay)",
            "Livraison / retrait selon vos besoins",
            "E-mails commande & facture",
            "Stats ventes & événements de conversion",
          ],
          img: "/services/eshop.jpg",
          imgAlt: "Exemple de boutique en ligne",
          href: "#pricing",
        },
        {
          id: "logo",
          tag: "Identité visuelle",
          title: "Logo & identité de marque",
          desc:
            "Nous créons une identité qui vous ressemble et qui fonctionne partout : logo, palette, typos et règles d’usage. Vous repartez avec les fichiers sources et un mini guide pour garder de la cohérence sur tous vos supports.",
          bullets: [
            "2–3 pistes créatives, allers-retours inclus",
            "Versions horizontales/verticales + favicon",
            "Guide d’usage (couleurs, typo, marges)",
            "Gabarits réseaux sociaux (option)",
          ],
          img: "/services/branding.jpg",
          imgAlt: "Création de logo et identité",
          href: "#pricing",
        },
        {
          id: "maintenance",
          tag: "Maintenance",
          title: "Suivi & optimisation",
          desc:
            "Nous assurons mises à jour, sauvegardes, monitoring de performances et petites évolutions pour faire évoluer votre site en continu.",
          bullets: [
            "Veille technique & mises à jour mensuelles",
            "Sauvegardes automatiques & restauration",
            "Rapport de visites & opportunités SEO",
            "Petites évolutions incluses selon formule",
          ],
          img: "/services/maintenance.jpg",
          imgAlt: "Tableau de suivi et maintenance de site web",
          href: "#pricing",
        },
      ],
    },
    servicesPage: {
      kicker: "Offres & prestations",
      title: "Sites vitrines, landing pages & maintenance web",
      desc: "Des offres claires pour lancer ou refondre votre présence en ligne. Chaque formule inclut la mise en ligne, l’optimisation mobile et un accompagnement pour rester autonome.",
      ctaPrimary: "Planifier un appel",
      ctaPrimaryHref: "/contact",
      ctaSecondary: "Télécharger la plaquette",
      ctaSecondaryHref: "https://tally.so/r/mOQNRL",
    },
    work: { title: "Projets en avant", kicker: "Nos réalisations", viewMore: "Voir davantage de maquettes" },
    workPage: {
      kicker: "Portfolio",
      title: "Projets et démonstrations HügoLab",
      desc: "Sélection de projets livrés et de maquettes sectorielles conçues pour les acteurs locaux : tourisme, restauration, outdoor et services.",
      ctaPrimary: "Demander une démo",
      ctaPrimaryHref: "/contact",
    },
    about: {
      title: "Notre histoire",
      kicker: "À propos",
      p1: "HügoLab est une jeune entreprise dynamique qui conçoit des sites modernes, orientés résultats pour les artisans, entreprises, associations, institutions et particuliers de Haute-Savoie. Fondée par Mateo Hugues, passionné de design et de stratégie digitale, notre mission est simple : transformer une visite en prise de contact, réservation ou vente.",
      p2: "Nous allions design soigné et leviers d’IA pour produire des interfaces claires, SEO-friendly et performantes. Notre approche ? Comprendre vos besoins, concevoir et tester — jusqu’à obtenir un site à votre image qui attire, séduit et convertit vos visiteurs.",
      quote: "À l’ère du digital, votre site web est bien plus qu’une vitrine : c’est la première impression que vos clients se font de votre marque. Clair, attractif et crédible, il reflète votre identité et inspire confiance. Chez HügoLab, notre mission est de traduire fidèlement la réalité de votre activité en page internet, pour que vos visiteurs deviennent vos clients.",
      quoteAuthor: "Mateo Hugues — Fondateur de HügoLab",
    },
    aboutPage: {
      hero: {
        kicker: "Studio digital",
        title: "Nous concevons des expériences web qui donnent envie d’agir",
        subtitle:
          "Basés à Annecy, nous accompagnons entrepreneurs, marques et institutions à mettre en lumière leur savoir-faire avec des sites modernes, élégants et performants.",
        pill: "HügoLab — fondé en 2025",
        ctaPrimary: "Planifier un appel",
        ctaSecondary: "Télécharger la plaquette",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "Maquettes sectorielles prêtes", value: "10" },
        { label: "Mise en ligne sous", value: "30 jours" },
        { label: "Création officielle", value: "2025" },
      ],
      values: {
        title: "Notre approche",
        items: [
          {
            title: "Clarté et conversion",
            desc: "Chaque page raconte une histoire qui mène vers l’action : prise de contact, réservation ou achat.",
          },
          {
            title: "Production agile",
            desc: "Sprints courts, validations transparentes. Nous livrons un site prêt à performer en quelques semaines.",
          },
          {
            title: "Tech minimaliste",
            desc: "Stack moderne (React, Vite, Next.js) avec uniquement les briques utiles pour rester fiable et évolutif.",
          },
          {
            title: "Suivi continu",
            desc: "Analytics, SEO local et améliorations trimestrielles pour garder une longueur d’avance.",
          },
        ],
      },
      timeline: {
        title: "Étapes clés",
        items: [
          { year: "03/09/2025", title: "Création de HügoLab", desc: "Immatriculation de la micro-entreprise et premières landing pages pour artisans du lac." },
          { year: "15/09/2025", title: "Offres vitrines prêtes", desc: "Structuration des offres Landing & Vitrine avec maquettes sectorielles et paiements Stripe." },
          { year: "24/09/2025", title: "Démos tourisme & restauration", desc: "Mise en ligne des démonstrations personnalisables pour acteurs locaux (tourisme, restauration, outdoor)." },
          { year: "01/10/2025", title: "Maintenance & SEO continu", desc: "Lancement des offres de suivi : analytics, SEO local et améliorations trimestrielles." },
        ],
      },
    },
    contact: {
      title: "Parlez-nous de votre projet",
      kicker: "Contact",
      p: "Décrivez votre activité, l’objectif du site et toute contrainte (délais, refonte, SEO). Nous revenons sous 24h avec un plan simple et un devis clair.",
      btn: "Ouvrir ma messagerie",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtBy: "Site par HügoLab",
      tagline:
        "Studio web indépendant basé à Annecy. Nous concevons des sites modernes et orientés conversion pour les entreprises locales et marques ambitieuses.",
      availability: "Basés à Annecy & Grenoble — missions partout en France.",
      ctaPrimary: "Planifier un échange",
      ctaPrimaryUrl: "/#contact",
      ctaSecondary: "Envoyer mon brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "Agence",
          links: [
            { label: "À propos", href: "/about" },
            { label: "Process", href: "/about#process" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Offres",
          links: [
            { label: "Landing Express", href: "/services#landing" },
            { label: "Vitrine complète", href: "/services#vitrine" },
            { label: "Maintenance", href: "/services#maintenance" },
            { label: "Logo & branding", href: "/services#logo" },
          ],
        },
        {
          title: "Ressources",
          links: [
            { label: "Projets", href: "/work" },
            { label: "Services", href: "/services" },
            { label: "Process", href: "/about#process" },
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
      bottomNav: ["work", "services", "about", "pricing", "contact"],
    },
    langLabel: "FR",
  },

  en: {
    nav: { home: "Home", work: "Work", services: "Services", pricing: "Pricing", about: "About", contact: "Contact" },
    hero: {
      kicker: "Boutique studio near Annecy",
      title: "Calm, conversion-ready websites for local brands",
      subtitle: "Design, build and redesign showcase sites with integrated local SEO.",
      ctaPrimary: "Browse mockups",
      ctaSecondary: "Tell us about your project",
    },
    homeIntro: {
      title: "Independent studio on Lake Annecy",
      body:
        "HügoLab helps hospitality, artisans and creative businesses share their story online with simple, elegant and human websites.",
      highlights: [
        { title: "Creation & redesign", desc: "Showcase sites tailored to your offers and tone of voice." },
        { title: "Local SEO", desc: "Structure and copy that make you visible around Annecy." },
        { title: "Ongoing care", desc: "Light maintenance, copy tweaks and analytics guidance." },
      ],
    },
    homeProjects: {
      title: "Mockups & recent builds",
      intro: "A quick look at what we can craft — each mockup is ready to be tuned to your activity.",
      cta: "Open the full gallery",
      ctaHref: "/work",
    },
    homeApproach: {
      kicker: "How we work",
      title: "Clarity first, then the pixels",
      description: "Short workshops, editorial design and a lean integration to ship pages that read fast and feel premium.",
      slogan: "Clear stories, fast loading, conversion-focused.",
    },
    homeTestimonials: {
      kicker: "Mockup content",
      title: "Clients love the calm energy of our process",
      note: "Sample quotes used to demonstrate the layout.",
      items: [
        { quote: "Three weeks from kickoff to launch with a tone of voice that finally feels right.", name: "Claire Martin", role: "Maison Plume, Talloires" },
        { quote: "Simple steps, transparent budget and a site that delivers qualified leads every week.", name: "Ludovic Perrin", role: "Atelier Vélo du Semnoz" },
        { quote: "Our new site feels handcrafted, quick to load and visible on Google Maps.", name: "Sonia B.", role: "Ô Berges restaurant" },
      ],
    },
    whyUs: {
      kicker: "Why HügoLab",
      title: "A local solo studio shipping fast",
      cta: "Learn more about HügoLab",
      ctaHref: "/about",
      items: [
        {
          icon: "local",
          title: "Grounded around the lake",
          desc: "Based in Doussard for hands-on collaboration, in-person check-ins and local culture.",
        },
        {
          icon: "speed",
          title: "Fast production",
          desc: "Lean sprints, frequent approvals and shipping within a few weeks.",
        },
        {
          icon: "transparent",
          title: "Full transparency",
          desc: "Straightforward pricing, shared timelines and no jargon.",
        },
        {
          icon: "human",
          title: "Human relationship",
          desc: "One partner from discovery to launch and beyond.",
        },
        {
          icon: "design",
          title: "Design that breathes",
          desc: "Soft fonts, curated imagery and copy that tells your story with confidence.",
        },
      ],
    },
    servicesTeaser: {
      kicker: "What we do",
      title: "Launch-ready, modern sites built to perform",
      primaryCta: "See our services",
      primaryHref: "/services",
      secondaryCta: "View our work",
      secondaryHref: "/work",
      items: [
        {
          tag: "Landing page",
          title: "Landing Express",
          desc: "Single-page launchpad to capture leads or validate a new offer fast.",
          href: "/services#landing",
          cta: "Explore",
        },
        {
          tag: "Showcase site",
          title: "Full showcase",
          desc: "Five pages, contact form, analytics and local SEO to turn visitors into inquiries.",
          href: "/services#vitrine",
          cta: "Explore",
        },
        {
          tag: "Care",
          title: "Care & optimisation",
          desc: "Monthly maintenance, updates, backups and micro-optimisations when you need them.",
          href: "/services#maintenance",
          cta: "Explore",
        },
        {
          tag: "Identity",
          title: "Logo & light branding",
          desc: "Logo kit, color palette and quick brand guide to stay consistent across channels.",
          href: "/services#logo",
          cta: "Explore",
        },
      ],
    },
    process: {
      kicker: "Our process",
      title: "A clear four-step production",
      cta: "See the full process",
      ctaHref: "/about#process",
      steps: [
        {
          step: "1",
          title: "Discovery",
          desc: "We align on goals, pages, tone of voice and timeline.",
        },
        {
          step: "2",
          title: "Prototype",
          desc: "You approve layout, key copy and UI direction before development.",
        },
        {
          step: "3",
          title: "Build & SEO",
          desc: "React integration, performance tweaks and local SEO setup.",
        },
        {
          step: "4",
          title: "Launch",
          desc: "Domain setup, analytics, micro-training and optional care plan.",
        },
      ],
    },
    aboutTeaser: {
      kicker: "Studio",
      title: "Independent studio on Lake Annecy",
      desc: "We craft modern, credible, high-performing showcase sites for local businesses. The goal: turn visits into inquiries.",
      primaryCta: "Learn about the studio",
      primaryHref: "/about",
      secondaryCta: "View projects",
      secondaryHref: "/work",
    },
    services: {
      title: "Services",
      kicker: "What we do",
      cta: "See mockups",
      sections: [
        {
          id: "landing",
          tag: "Showcase website",
          title: "Business website",
          desc:
            "We design and launch your showcase website with clear copy, refined design and fast loading. We work with React/Next.js for a lean, future-proof front end. If you need to edit pages, we add a lightweight CMS.",
          bullets: [
            "Clear, mobile-first architecture",
            "Technical SEO (tags, perf, meta)",
            "Optional lightweight CMS (easy editing)",
            "Analytics & conversion tracking",
            "Deployment on Vercel + light maintenance",
          ],
          img: "/services/vitrine.jpg",
          imgAlt: "Showcase website by HügoLab",
          href: "#pricing",
        },
        {
          id: "vitrine",
          tag: "E-commerce",
          title: "Online store",
          desc:
            "A simple, reliable store with secure Stripe payments. React/Next.js front end, smooth checkout, order emails and a small dashboard. We set up only what you really need. ",
          bullets: [
            "Clean catalog & product pages",
            "Stripe payments (cards, Apple/Google Pay)",
            "Shipping or click & collect as needed",
            "Order & invoice emails",
            "Sales stats & conversion events",
          ],
          img: "/services/eshop.jpg",
          imgAlt: "Online store example",
          href: "#pricing",
        },
        {
          id: "logo",
          tag: "Brand identity",
          title: "Logo & visual identity",
          desc:
            "We craft an identity that looks good and works everywhere: logo, color palette, type and usage rules. Delivered with source files and a quick style guide to keep everything consistent.",
          bullets: [
            "2–3 creative routes with revisions",
            "Horizontal/vertical versions + favicon",
            "Quick style guide (colors, type, spacing)",
            "Social templates (optional)",
          ],
          img: "/services/branding.jpg",
          imgAlt: "Logo and identity work",
          href: "#pricing",
        },
        {
          id: "maintenance",
          tag: "Care",
          title: "Care & optimisation",
          desc:
            "We handle updates, backups, monitoring and micro improvements so your website keeps performing over time.",
          bullets: [
            "Monthly technical updates",
            "Backups & recovery plan",
            "Analytics and local SEO watch",
            "Micro enhancements included per plan",
          ],
          img: "/services/maintenance.jpg",
          imgAlt: "Website care and optimisation dashboard",
          href: "#pricing",
        },
      ],
    },
    servicesPage: {
      kicker: "Services & offerings",
      title: "Showcase sites, landing pages and ongoing care",
      desc: "Clear packages to launch or refresh your online presence. Every plan ships with mobile performance, SEO essentials and guidance so you stay autonomous.",
      ctaPrimary: "Book a call",
      ctaPrimaryHref: "/contact",
      ctaSecondary: "Download the deck",
      ctaSecondaryHref: "https://tally.so/r/mOQNRL",
    },
    work: { title: "Featured Work", kicker: "Case studies", viewMore: "See more mockups" },
    workPage: {
      kicker: "Portfolio",
      title: "Selected projects and demos",
      desc: "Websites and sector demos crafted for tourism, hospitality, outdoor activities and ambitious local businesses.",
      ctaPrimary: "Request a walkthrough",
      ctaPrimaryHref: "/contact",
    },
    about: {
      title: "Our story",
      kicker: "About us",
      p1: "HügoLab designs modern, fast, results-driven websites for local businesses in Annecy and growing brands. Founded by Mateo Hugues, our mission is simple: turn visits into inquiries, bookings, or sales.",
      p2: "We blend refined design, strong performance and 2025-ready AI tooling to ship clear, SEO-friendly, high-performing interfaces. Our method: listen, prototype, test, iterate — until it converts.",
      quote: "In the age of digital, your website is the front door to your brand: clear, fast, credible. Before showing up, most customers will check your site. Our job is to turn that visit into action.",
      quoteAuthor: "Mateo Hugues — HügoLab Founder",
    },
    aboutPage: {
      hero: {
        kicker: "Digital studio",
        title: "We craft conversion-driven web experiences",
        subtitle:
          "From our base in Annecy we help founders, hospitality brands and institutions tell their story with modern, elegant, high-performing websites.",
        pill: "HügoLab — founded 2025",
        ctaPrimary: "Book a discovery call",
        ctaSecondary: "Download the deck",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "Sector mockups ready", value: "10" },
        { label: "Showcase live within", value: "30 days" },
        { label: "Registered micro-business", value: "2025" },
      ],
      values: {
        title: "How we work",
        items: [
          {
            title: "Clarity first",
            desc: "Every page leads visitors toward the next action — inquiry, booking or checkout.",
          },
          {
            title: "Lean production",
          desc: "Short sprints and transparent approvals so your new site ships in a matter of weeks.",
          },
          {
            title: "Minimal tech",
            desc: "A modern React/Vite/Next.js stack with only the pieces required to stay reliable and scalable.",
          },
          {
            title: "Ongoing care",
            desc: "Analytics, local SEO and quarterly improvements to keep you ahead of competitors.",
          },
        ],
      },
      timeline: {
        title: "Milestones",
        items: [
          { year: "2025-04-01", title: "HügoLab launches", desc: "Micro-business registered with landing pages for artisans around Lake Annecy." },
          { year: "2025-05-15", title: "Showcase packages", desc: "Packaged Landing + Vitrine offers with Stripe deposits and sector-specific mockups." },
          { year: "2025-06-10", title: "Sector demos", desc: "Ready-to-customize demos for tourism, restaurants and outdoor brands." },
          { year: "2025-10-01", title: "Care & SEO plans", desc: "Quarterly optimisation retainers covering analytics, local SEO and micro updates." },
        ],
      },
    },
    contact: {
      title: "Let's talk about your project",
      kicker: "Contact",
      p: "Share a few lines about your business, goal and current website. We’ll reply within 24 hours with a clear plan and quote.",
      btn: "Open my email app",
    },
    footer: {
      rights: "All rights reserved.",
      builtBy: "Site by HügoLab",
      tagline:
        "Boutique web studio from Annecy. We ship fast, conversion-first websites for local businesses and growing brands.",
      availability: "Based in Annecy & Grenoble — partnering with clients across Europe.",
      ctaPrimary: "Schedule a call",
      ctaPrimaryUrl: "/#contact",
      ctaSecondary: "Send your brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "Studio",
          links: [
            { label: "About", href: "/about" },
            { label: "Process", href: "/about#process" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Offers",
          links: [
            { label: "Landing Express", href: "/services#landing" },
            { label: "Full showcase", href: "/services#vitrine" },
            { label: "Care plans", href: "/services#maintenance" },
            { label: "Logo & branding", href: "/services#logo" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Projects", href: "/work" },
            { label: "Services", href: "/services" },
            { label: "Process", href: "/about#process" },
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
        locationLabel: "Based in",
        socialsLabel: "Follow",
      },
      manageCookies: "Manage cookies",
      bottomNav: ["work", "services", "about", "pricing", "contact"],
    },
    langLabel: "EN",
  },
};

// --- Utils ------------------------------------------------------------------
function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const EMAIL_TEMPLATES = {
  FR: {
    subject: "Demande via hugolab.fr",
    body: "Bonjour HügoLab,\n\nJ’ai un projet de site :\n- Activité :\n- Objectif :\n- Site actuel (si oui) :\n\nMerci !",
  },
  EN: {
    subject: "Inquiry via hugolab.fr",
    body: "Hello HügoLab,\n\nI have a website project:\n- Business:\n- Goal:\n- Current site (if any):\n\nThanks!",
  },
};

function getEmailTemplate(langLabel) {
  const key = typeof langLabel === "string" ? langLabel.toUpperCase() : "FR";
  return EMAIL_TEMPLATES[key] ?? EMAIL_TEMPLATES.FR;
}

// NEW: robust email launcher + Gmail fallback (only if no client took over)
function openMail(to, subject = "", body = "") {
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const a = document.createElement("a");
  a.href = mailto;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // If nothing stole focus after ~1s, gently offer Gmail compose.
  let timer;
  const cancelFallback = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    document.removeEventListener("visibilitychange", cancelFallback);
    window.removeEventListener("blur", cancelFallback);
  };

  document.addEventListener("visibilitychange", cancelFallback);
  window.addEventListener("blur", cancelFallback);

  timer = setTimeout(() => {
    if (document.visibilityState === "hidden" || !document.hasFocus()) return;
    const gmail = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmail, "_blank", "noopener,noreferrer");
    cancelFallback();
  }, 1200);
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
  const items = [
    { label: t.nav.home ?? "Home", to: "/", aria: lang === "fr" ? "Retour à l’accueil HügoLab" : "Back to HügoLab home" },
    { label: t.nav.work, to: "/work", aria: lang === "fr" ? "Explorer les projets signés HügoLab" : "Explore HügoLab case studies" },
    { label: t.nav.services, to: "/services", aria: lang === "fr" ? "Découvrir les services HügoLab" : "Discover HügoLab services" },
    { label: t.nav.pricing, to: "/#pricing", aria: lang === "fr" ? "Consulter les tarifs HügoLab" : "See HügoLab pricing" },
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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(250,249,245,0.85)]">
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
              className="link-underline text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
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
            {t.hero.ctaSecondary}
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
              {t.hero.ctaSecondary}
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
          <h1 className="font-display mt-6 text-4xl font-medium leading-[1.08] tracking-tight text-[var(--ink)] md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{t.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              {t.hero.ctaPrimary}
              <span className="btn-arrow" aria-hidden>→</span>
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
            {[
              { value: "10", label: isFr ? "maquettes sectorielles" : "sector mockups" },
              { value: "< 24h", label: isFr ? "délai de réponse" : "reply time" },
              { value: "30 j", label: isFr ? "mise en ligne moyenne" : "average launch" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl text-[var(--ink)]">{stat.value}</dd>
                <p className="mt-1 text-xs leading-snug text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
            style={{ borderRadius: "180px 180px 28px 28px" }}
          >
            <div className="relative aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={HERO_IMAGES[index]}
                  alt={isFr ? "Aperçu d’une maquette HügoLab" : "Preview of a HügoLab mockup"}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute -left-4 bottom-8 hidden rounded-xl border border-[var(--border)] bg-white/95 px-4 py-3 shadow-[0_18px_50px_-20px_rgba(23,20,31,0.35)] backdrop-blur md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--violet-text)]">
              {isFr ? "Studio local" : "Local studio"}
            </p>
            <p className="mt-1 text-sm text-[var(--ink)]">
              {isFr ? "Annecy · Doussard · lac" : "Annecy · Doussard · lake"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroSection({ t }) {
  const intro = t.homeIntro;
  if (!intro) return null;
  const kicker = t.langLabel === "FR" ? "À propos" : "About";

  return (
    <section className="py-16 md:py-24">
      <div className="hugolab-container space-y-12">
        <div className="max-w-3xl">
          <p className="kicker">{kicker}</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{intro.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{intro.body}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {intro.highlights?.map((item, idx) => (
            <div key={item.title} className="card-editorial flex flex-col gap-3 p-6">
              <p className="font-display text-sm text-[var(--violet-text)]">{String(idx + 1).padStart(2, "0")}</p>
              <p className="text-base font-semibold text-[var(--ink)]">{item.title}</p>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
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

function TestimonialsSection({ data }) {
  if (!data) return null;
  return (
    <section id="testimonials" className="border-y border-[var(--border)] py-16 md:py-24">
      <div className="hugolab-container">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">{data.kicker}</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{data.title}</h2>
          </div>
          {data.note ? <p className="text-xs italic text-[var(--muted)]">{data.note}</p> : null}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.items?.map((item) => (
            <figure key={item.name} className="card-editorial flex h-full flex-col justify-between p-6">
              <blockquote>
                <span aria-hidden className="font-display block text-4xl leading-none text-[var(--violet)]">“</span>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)]">{item.quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-[var(--border)] pt-4">
                <p className="text-sm font-semibold text-[var(--ink)]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{item.role}</p>
              </figcaption>
            </figure>
          ))}
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
            <p className="kicker">{t.langLabel === "FR" ? "Maquettes" : "Mockups"}</p>
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
  const caseLabel = isFrench ? "Lire le cas client" : "Read the case study";
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
          {isExternalUrl(p.url) ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-semibold text-[var(--ink)]"
              aria-label={`${liveLabel} (${p.title})`}
            >
              {liveLabel}
            </a>
          ) : (
            <Link to={p.url} className="link-underline text-sm font-semibold text-[var(--ink)]" aria-label={`${liveLabel} (${p.title})`}>
              {liveLabel}
            </Link>
          )}
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

function Services({ t }) {
  const emailCopy = getEmailTemplate(t.langLabel);
  // petit composant pour une ligne “image + contenu” qui alterne gauche/droite
  function FeatureRow({ section, reverse = false }) {
    return (
      <div
        id={section.id || undefined}
        className={classNames(
          "grid items-start gap-8 md:grid-cols-2 scroll-mt-24",
          reverse ? "md:[&>div:first-child]:order-2" : ""
        )}
      >
        {/* Image */}
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
            <Link to="/work" className="btn-primary !px-5 !py-2.5">
              {t.services.cta}
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

  return (
    <section id="services" className="py-14 md:py-20">
      <SectionTitle kicker={t.services.kicker}>{t.services.title}</SectionTitle>

      <div className="mx-auto max-w-6xl space-y-14 px-4">
        {/* 1 */}
        <FeatureRow section={t.services.sections[0]} />
        {/* 2 (image à droite sur desktop) */}
        <FeatureRow section={t.services.sections[1]} reverse />
        {/* 3 */}
        <FeatureRow section={t.services.sections[2]} />
        {/* 4 */}
        {t.services.sections[3] && <FeatureRow section={t.services.sections[3]} reverse />}
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
              src="/about/hugolab-team.webp"   // ← your image (public/about/hugolab-team.webp)
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
  return <Navigate to="/#pricing" replace />;
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
              <IntroSection t={t} />
              <FeaturedMockups t={t} />
              <ApproachSection data={t.homeApproach} lang={t.langLabel} />
              <WhyUs section={t.whyUs} />
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
              <TestimonialsSection data={t.homeTestimonials} />
              <Contact t={t} />
            </main>
          }
        />
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

