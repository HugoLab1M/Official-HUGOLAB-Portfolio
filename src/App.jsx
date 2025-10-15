'use client';
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import CoupDePompe from "./demos/CoupDePompe.jsx";
import LeDeckPedalos from "./demos/LeDeckPedalos.jsx";
import SansPermisSaintJorioz from "./demos/SansPermisSaintJorioz.jsx";
import MicroEcoleParapente from "./demos/MicroEcoleParapente.jsx";
import CascadeNomadeCanyoning from "./demos/CascadeNomadeCanyoning.jsx";
import LaCuillereAOmble from "./demos/LaCuillereAOmble.jsx";
import PalaceLacLumiere from "./demos/PalaceLacLumiere.jsx";
import LaSeiche from "./demos/LaSeiche.jsx";
import PricingSection from "./components/PricingSection.jsx"; // +++
import CookieBanner, { getStoredConsent, storeConsent } from "./components/CookieBanner.jsx";
import { initAnalytics, disableAnalytics } from "./utils/analytics.js";
import TallyModal from "./components/TallyModal.jsx";
import WhyUs from "./sections/WhyUs.jsx";
import ServicesTeaser from "./sections/ServicesTeaser.jsx";
import ProcessSection from "./sections/Process.jsx";
import AboutTeaser from "./sections/AboutTeaser.jsx";
import MentionsLegales from "./legal/MentionsLegales.jsx";
import Confidentialite from "./legal/Confidentialite.jsx";
import CookiesPage from "./legal/Cookies.jsx";
import CGV from "./legal/CGV.jsx";
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
    image: "/images/la-seiche/1.jpg",
    url: "/demos/la-seiche",
    caseStudyUrl: "#case-la-seiche",
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
      kicker: "Agence web créative à Annecy",
      title: "HügoLab — Création de sites internet à Annecy",
      subtitle:
        "Nous créons des sites vitrines et e-commerce pour les entreprises locales de Haute-Savoie et marques en croissance. Notre ADN : design moderne, SEO local, et une expérience utilisateur pensée pour la conversion.",
      ctaPrimary: "Voir nos projets",
      ctaSecondary: "Discuter de votre besoin",
    },
    whyUs: {
      kicker: "Pourquoi HügoLab",
      title: "Une micro-agence locale engagée sur vos résultats",
      cta: "En savoir plus sur HügoLab",
      ctaHref: "/about",
      items: [
        {
          icon: "local",
          title: "Local & réactifs",
          desc: "Basés à Doussard, nous échangeons facilement et avançons étape par étape sur votre projet.",
        },
        {
          icon: "speed",
          title: "Rapide & propre",
          desc: "Stack moderne (React, Tailwind) pour des sites stables, modernes et faciles à faire évoluer.",
        },
        {
          icon: "seo",
          title: "SEO local intégré",
          desc: "Balises, performances et Google Business optimisés pour être visibles là où vos clients vous cherchent.",
        },
        {
          icon: "ai",
          title: "IA comme levier",
          desc: "Nous utilisons l’IA pour gagner du temps sur la production sans sacrifier la qualité du rendu final.",
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
        { label: "Maquettes sectorielles prêtes", value: "6" },
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
      title: "Parlons de votre projet",
      kicker: "Contact",
      p: "Expliquez en 3 lignes votre activité, votre objectif, et si vous avez déjà un site. Nous revenons vers vous sous 24h avec un plan simple et un devis clair.",
      btn: "Écrire un message",
      briefCta: "Envoyer le brief",
      logoCta: "Demander un devis logo",
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
      kicker: "Creative web agency from Annecy",
      title: "HügoLab — modern websites that convert",
      subtitle:
        "We build high-performing showcase and e-commerce sites for local businesses and growing brands. Our DNA: speed, SEO, and UX designed for conversions.",
      ctaPrimary: "See our projects",
      ctaSecondary: "Discuss your brief",
    },
    whyUs: {
      kicker: "Why HügoLab",
      title: "A local solo studio shipping fast",
      cta: "Learn more about HügoLab",
      ctaHref: "/about",
      items: [
        {
          icon: "local",
          title: "Local & responsive",
          desc: "Based in Doussard (Lake Annecy) for hands-on collaboration and easy check-ins.",
        },
        {
          icon: "speed",
          title: "Clean & modern",
          desc: "Modern stack (React, Tailwind) for stable, future-proof websites that stay easy to update.",
        },
        {
          icon: "seo",
          title: "Local SEO ready",
          desc: "Structured content, performance and Google Business setup to appear where clients search.",
        },
        {
          icon: "ai",
          title: "AI-assisted",
          desc: "We leverage AI to stay efficient while keeping a polished, human-focused result.",
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
        { label: "Sector mockups ready", value: "6" },
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
      title: "Let's talk",
      kicker: "Contact",
      p: "Tell us your business, your goal, and whether you already have a site. We’ll reply within 24 hours with a simple plan and quote.",
      btn: "Send a message",
      briefCta: "Send the brief",
      logoCta: "Request a logo quote",
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

function useDarkMode() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [enabled]);
  return [enabled, setEnabled];
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
      className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {lang.toUpperCase()}
    </button>
  );
}

function ThemeToggle() {
  const [enabled, setEnabled] = useDarkMode();
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      aria-label="Toggle theme"
      className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {enabled ? "Dark" : "Light"}
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
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="HügoLab — accueil">
          <img src="/logo.svg" alt="HügoLab" className="h-9 w-auto" />
          <span className="hidden sm:inline-block text-base font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:opacity-90 transition-opacity">
            HügoLab
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-label={item.aria}
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} onToggle={onLangToggle} />
          <ThemeToggle />
          <button onClick={onContactClick} className="hidden sm:inline-flex rounded-2xl text-sm px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black">
            {t.hero.ctaSecondary}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 p-2 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileLabel}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200/70 bg-white/95 px-4 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={`mobile-${item.label}`}
                to={item.to}
                onClick={closeMobile}
                aria-label={item.aria}
                className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
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
              className="rounded-xl bg-black px-3 py-2 text-sm font-medium text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
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
    <div className="max-w-6xl mx-auto px-4">
      {kicker ? (
        <p className="uppercase tracking-widest text-xs text-neutral-500 dark:text-neutral-400 mb-2">{kicker}</p>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{children}</h2>
    </div>
  );
}

function Hero({ t }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900" />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest text-xs text-neutral-500 dark:text-neutral-400 mb-3">{t.hero.kicker}</p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">{t.hero.title}</h1>
          <p className="text-neutral-700 dark:text-neutral-300 max-w-xl mb-6">{t.hero.subtitle}</p>
          <div className="flex gap-3">
            <a href="#work" className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={HERO_IMAGES[index]}
              alt={`HügoLab showcase ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// util pour ProjectCard
const isExternalUrl = (u) => /^https?:\/\//i.test(u);

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
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {p.stack.map((s) => (
            <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
          <span>{p.industry}</span>
          <span>•</span>
          <span>{p.slug}</span>
        </div>
        <h3 className="text-lg font-medium mb-1">{p.title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{p.tagline}</p>
        <div className="mt-3 flex items-center gap-3">
          {isExternalUrl(p.url) ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
              aria-label={`${liveLabel} (${p.title})`}
            >
              {liveLabel}
            </a>
          ) : (
            <Link to={p.url} className="text-sm underline underline-offset-4" aria-label={`${liveLabel} (${p.title})`}>
              {liveLabel}
            </Link>
          )}
          <a
            href={p.caseStudyUrl}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            aria-label={`${caseLabel} (${p.title})`}
          >
            {caseLabel}
          </a>
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
      className="group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-xl hover-lift"
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
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
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
          <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {section.tag}
          </p>
          <h3 className="text-xl md:text-2xl font-semibold">{section.title}</h3>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">{section.desc}</p>
  
          <ul className="mt-4 space-y-2 text-sm">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-black dark:bg-white"></span>
                <span className="text-neutral-700 dark:text-neutral-300">{b}</span>
              </li>
            ))}
          </ul>
  
          <div className="mt-5 flex gap-3">
            <a
              href="#work"
              className="rounded-2xl px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black
             transform-gpu transition-transform motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30 dark:focus:ring-white/30"
            >
              {t.services.cta}
            </a>
            <button
              type="button"
              onClick={() =>
                openMail(
                  CONTACT.email,
                  emailCopy.subject,
                  emailCopy.body
                )
              }
              className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm
              border border-neutral-300 dark:border-neutral-700
              transform-gpu transition-transform motion-safe:hover:scale-[1.05] motion-safe:active:scale-[0.98]
              hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
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
        <div className="mt-10 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-900"
          >
            {t.work.viewMore ?? (t.langLabel === "FR" ? "Voir davantage" : "See more")}
            <span aria-hidden>&rarr;</span>
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
          <div className="relative aspect-[16/9] md:aspect-[19/9] overflow-hidden rounded-3xl ring-1 ring-neutral-200 dark:ring-neutral-800">
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
        <div className="md:col-span-7 text-neutral-700 dark:text-neutral-300 space-y-4">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
      </div>

      {/* QUOTE centered BELOW image+text */}
      {t.about.quote && (
        <figure className="mt-8 md:mt-12 mx-auto max-w-3xl px-4 text-center">
          <blockquote className="rounded-2xl border border-neutral-200 bg-white/70 p-6 md:p-7 italic leading-relaxed text-neutral-800 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100">
            {t.about.quote}
          </blockquote>
          {t.about.quoteAuthor && (
            <figcaption className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t.about.quoteAuthor}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

function Contact({ t }) {
  const [siteBriefOpen, setSiteBriefOpen] = useState(false);
  const [logoBriefOpen, setLogoBriefOpen] = useState(false);

  return (
    <section id="contact" className="py-14 md:py-20">
      <SectionTitle kicker={t.contact.kicker}>{t.contact.title}</SectionTitle>
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t.contact.p}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">Email</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-neutral-900 transition hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300">
              {CONTACT.email}
            </a>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t.langLabel === "FR"
                ? "Nous répondons sous 24h avec un plan simple."
                : "We reply within 24h with a simple plan."}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{t.langLabel === "FR" ? "Téléphone" : "Phone"}</p>
            <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-neutral-900 transition hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300">
              {CONTACT.phone}
            </a>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t.langLabel === "FR"
                ? "Appel découverte (15 min) pour cadrer votre besoin."
                : "Discovery call (15 min) to scope your needs."}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{t.langLabel === "FR" ? "Zones d'intervention" : "Areas we cover"}</p>
            <p className="mt-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">{CONTACT.location}</p>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t.langLabel === "FR"
                ? "Présence locale, déplacements possibles sur rendez-vous."
                : "Local presence, on-site meetings on request."}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/90">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{t.langLabel === "FR" ? "Réseaux" : "Socials"}</p>
            <div className="mt-2 flex items-center gap-4 text-sm">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-900 transition hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
                >
                  {s.name === "LinkedIn" ? (
                    <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-4 w-4" />
                  ) : s.name === "Instagram" ? (
                    <img src="/icons/instagram.svg" alt="Instagram" className="h-4 w-4" />
                  ) : null}
                  {s.name}
                </a>
              ))}
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              {t.langLabel === "FR"
                ? "Suivez l’évolution des maquettes et des projets."
                : "Follow mockups and project updates."}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="btn-primary"
          >
            {t.contact.btn}
          </a>

          <button
            type="button"
            onClick={() => setSiteBriefOpen(true)}
            className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {t.contact.briefCta}
          </button>

          <button
            type="button"
            onClick={() => setLogoBriefOpen(true)}
            className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {t.contact.logoCta}
          </button>

          <a
            href="https://g.page/r/CSjpwPvLGK4YEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
            aria-label="Laisser un avis Google pour HügoLab (ouvre un nouvel onglet)"
          >
            <img src="/icons/google.svg" alt="Google" className="h-4 w-4" />
            Laisser un avis Google
          </a>
        </div>
      </div>

      {siteBriefOpen && (
        <TallyModal
          url="https://tally.so/r/mJ7Zgd"
          onClose={() => setSiteBriefOpen(false)}
          title="Brief site (gratuit)"
        />
      )}
      {logoBriefOpen && (
        <TallyModal
          url="https://tally.so/r/mOveKp"
          onClose={() => setLogoBriefOpen(false)}
          title="Brief logo (gratuit)"
        />
      )}
    </section>
  );
}

function AboutPage({ t }) {
  const page = t.aboutPage;
  const emailCopy = getEmailTemplate(t.langLabel);
  const valuesKicker = t.langLabel === "FR" ? "Notre méthode" : "Our method";
  const timelineKicker = t.langLabel === "FR" ? "Parcours" : "Journey";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-24 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="pill text-xs font-medium text-neutral-700 dark:text-neutral-200">
              {page.hero.pill}
            </span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">
              {page.hero.title}
            </h1>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300 md:text-lg">
              {page.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openMail(CONTACT.email, emailCopy.subject, emailCopy.body)}
                className="rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
              >
                {page.hero.ctaPrimary}
              </button>
              <a
                href={page.hero.ctaSecondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                {page.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {page.highlights.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white/90 px-5 py-6 text-center text-neutral-900 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-white"
              >
                <div className="text-3xl font-semibold md:text-4xl">{item.value}</div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About t={t} />

      <section className="py-16 md:py-20" id="process">
        <div className="mx-auto max-w-6xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{valuesKicker}</p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{page.values.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {page.values.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" id="timeline">
        <div className="mx-auto max-w-6xl px-4">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{timelineKicker}</p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{page.timeline.title}</h2>
          <div className="mt-10 space-y-6">
            {page.timeline.items.map((step) => (
              <div key={step.year} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{step.year}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{step.desc}</p>
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
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{t.servicesPage.kicker}</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{t.servicesPage.title}</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300 md:text-lg">{t.servicesPage.desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={t.servicesPage.ctaPrimaryHref}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              {t.servicesPage.ctaPrimary}
            </a>
            <a
              href={t.servicesPage.ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
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
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{t.workPage.kicker}</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{t.workPage.title}</h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300 md:text-lg">{t.workPage.desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={t.workPage.ctaPrimaryHref}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              {t.workPage.ctaPrimary}
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
  const t = useMemo(() => STRINGS[lang], [lang]);
  const emailCopy = useMemo(() => getEmailTemplate(t.langLabel), [t.langLabel]);

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
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      {/* La Nav reste affichée partout */}
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
      {/* Ici on gère les routes */}
      <Routes>
        {/* Page d’accueil (portfolio existant) */}
        <Route
          path="/"
          element={
            <main>
              <Hero t={t} />
              <WhyUs section={t.whyUs} />
              <AboutTeaser section={t.aboutTeaser} />
              <ServicesTeaser section={t.servicesTeaser} />
              <ProcessSection section={t.process} />
              <Work t={t} />
              <PricingSection 
              briefFormUrl="https://tally.so/r/mJ7Zgd"    // Brief site
              logoFormUrl="https://tally.so/r/mOveKp"     // Brief logo
              paymentLinks={{
                starterDeposit: "https://buy.stripe.com/eVq6oJ8QC3SzdoH6LV8so00",
                vitrineDeposit: "https://buy.stripe.com/5kQ6oJ7My0Gn1FZgmv8so01",
                maintenance49:  "https://buy.stripe.com/7sYdRbaYKagXbgz4DN8so02", // Basic
                maintenance99:  "https://buy.stripe.com/4gMaEZ7MygFl2K39Y78so03", // Premium
              }}
              />
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
        {/* Pages démos */}
        <Route path="/demos/coup-de-pompe" element={<CoupDePompe />} />
        <Route path="/demos/le-deck-pedalos" element={<LeDeckPedalos />} />
        <Route path="/demos/sans-permis-saint-jorioz" element={<SansPermisSaintJorioz />} />
        <Route path="/demos/micro-ecole-parapente" element={<MicroEcoleParapente />} />
        <Route path="/demos/cascade-nomade-canyoning" element={<CascadeNomadeCanyoning />} />
        <Route path="/demos/la-cuillere-a-omble" element={<LaCuillereAOmble />} />
        <Route path="/demos/palace-lac-lumiere" element={<PalaceLacLumiere />} />
        <Route path="/demos/la-seiche" element={<LaSeiche />} />
      </Routes>

      {/* Footer reste affiché partout */}
      <FooterPro
        t={t}
        onManageCookies={handleManageCookies}
        contact={CONTACT}
        socials={SOCIALS}
      />
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 shadow-lg transition hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
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

// --- Self-tests (basic smoke tests) -----------------------------------------
(function runSelfTests() {
  const tests = [];
  function assert(name, cond) { tests.push({ name, pass: !!cond }); }
  try {
    assert("Hero component defined", typeof Hero === "function");
    assert("Nav component defined", typeof Nav === "function");
    assert("Work component defined", typeof Work === "function");
    assert("Services component defined", typeof Services === "function");
    assert("About component defined", typeof About === "function");
    assert("Contact component defined", typeof Contact === "function");
    assert("Footer component defined", typeof Footer === "function");

    assert("Hero has 3+ images", Array.isArray(HERO_IMAGES) && HERO_IMAGES.length >= 3);

    ["fr", "en"].forEach((k) => {
      const tt = STRINGS[k];
      assert(`${k} strings exist`, !!tt);
      assert(`${k} nav`, !!tt.nav && tt.nav.work && tt.nav.services && tt.nav.about && tt.nav.contact);
      assert(`${k} hero`, !!tt.hero && tt.hero.title && tt.hero.kicker && tt.hero.subtitle);
      assert(`${k} contact`, !!tt.contact && tt.contact.title && tt.contact.btn);
    });

    assert("Projects array not empty", Array.isArray(PROJECTS) && PROJECTS.length > 0);
    PROJECTS.forEach((p, i) => {
      assert(`Project ${i} has image`, typeof p.image === "string" && p.image.length > 0);
      assert(`Project ${i} has url`, typeof p.url === "string" && p.url.length > 0);
    });
  } catch (e) {
    console.error("❌ HügoLab self-tests error:", e);
  } finally {
    const failed = tests.filter((t) => !t.pass);
    if (failed.length === 0) console.log("✅ HügoLab portfolio self-tests passed", tests);
    else console.warn("⚠️ HügoLab portfolio self-tests failed:", failed);
  }
})();
