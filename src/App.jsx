'use client';
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CoupDePompe from "./demos/CoupDePompe.jsx";
import LeDeckPedalos from "./demos/LeDeckPedalos.jsx";
import SansPermisSaintJorioz from "./demos/SansPermisSaintJorioz.jsx";
import MicroEcoleParapente from "./demos/MicroEcoleParapente.jsx";
import CascadeNomadeCanyoning from "./demos/CascadeNomadeCanyoning.jsx";
import LaCuillereAOmble from "./demos/LaCuillereAOmble.jsx";
import PricingSection from "./components/PricingSection.jsx"; // +++

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
  location: "Annecy • Paris • Remote",
};

// --- i18n strings ------------------------------------------------------------
const STRINGS = {
  fr: {
    nav: { work: "Projets", services: "Services", pricing: "Offres", about: "À propos", contact: "Contact" },
    hero: {
      kicker: "Agence web créative à Annecy",
      title: "HügoLab — Création de sites internet à Annecy",
      subtitle:
        "Nous créons des sites vitrines et e-commerce pour les entreprises locales de Haute-Savoie et marques en croissance. Notre ADN : rapidité, SEO, et une expérience utilisateur pensée pour la conversion.",
      ctaPrimary: "Voir nos projets",
      ctaSecondary: "Discuter de votre besoin",
    },
    services: {
      title: "Services",
      kicker: "Ce que nous faisons",
      cta: "Voir les maquettes",
      sections: [
        {
          tag: "Site vitrine",
          title: "Création de site vitrine",
          desc:
            "Nous concevons et mettons en ligne votre site vitrine : design soigné, texte clair, chargement rapide. Nous travaillons en React/Next.js pour un front ultra-léger et durable. Si besoin, on ajoute un petit CMS pour éditer vos pages en autonomie.",
          bullets: [
            "Architecture claire & mobile-first",
            "SEO technique (balises, perf, méta)",
            "CMS léger optionnel (édition simple)",
            "Analytics & mesure des conversions",
            "Mise en ligne sur Vercel + maintenance légère",
          ],
          img: "/services/vitrine.jpg",
          imgAlt: "Exemple de site vitrine par HügoLab",
          href: "#work",
        },
        {
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
          href: "#work",
        },
        {
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
          href: "#work",
        },
      ],
    },
    work: { title: "Projets en avant", kicker: "Nos réalisations" },
    about: {
      title: "Notre histoire",
      kicker: "À propos",
      p1: "HügoLab est une jeune entreprise dynamique qui conçoit des sites modernes, orientés résultats pour les artisans, entreprises, associations, institutions et particuliers de Haute-Savoie. Fondée par Mateo Hugues, passionné de design et de stratégie digitale, notre mission est simple : transformer une visite en prise de contact, réservation ou vente.",
      p2: "Nous allions design soigné, et leviers d’IA pour produire des interfaces claires, SEO-friendly et mesurables. Notre approche ? Comprendre vos besoins, concevoir et tester — jusqu’à obtenir un site à votre image qui attire, séduit et convertit vos visiteurs.",
      quote: "À l’ère du digital, votre site web est bien plus qu’une vitrine : c’est la première impression que vos clients se font de votre marque. Clair, attractif et crédible, il reflète votre identité et inspire confiance. Chez HügoLab, notre mission est de traduire fidèlement la réalité de votre activité en page internet, pour que vos visiteurs deviennent vos clients.",
      quoteAuthor: "Mateo Hugues — Fondateur de HügoLab",
    },
    aboutPage: {
      hero: {
        kicker: "Studio digital",
        title: "Nous concevons des expériences web qui donnent envie d’agir",
        subtitle:
          "Basés à Annecy, nous accompagnons entrepreneurs, marques et institutions à mettre en lumière leur savoir-faire avec des sites rapides, élégants et mesurables.",
        pill: "HügoLab — fondé en 2022",
        ctaPrimary: "Planifier un appel",
        ctaSecondary: "Télécharger la plaquette",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "+ projets livrés", value: "35" },
        { label: "Délai moyen (sem.)", value: "3" },
        { label: "Clients récurrents", value: "82%" },
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
            desc: "Sprints courts, validations rapides. Nous livrons un site prêt à performer en quelques semaines.",
          },
          {
            title: "Tech minimaliste",
            desc: "Stack moderne (React, Vite, Next.js) avec uniquement les briques utiles pour rester rapide et évolutif.",
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
          { year: "2022", title: "Premiers sites vitrine", desc: "Lancement de HügoLab et premiers projets pour artisans autour du lac d’Annecy." },
          { year: "2023", title: "Offres e-commerce", desc: "Mise en place des parcours Stripe et optimisation mobile pour locations & boutiques." },
          { year: "2024", title: "Démos sectorielles", desc: "Création de modèles dédiés tourisme, restauration, outdoor pour accélérer les mises en ligne." },
          { year: "2025", title: "Accompagnement global", desc: "Refonte de marques, maintenance SEO et campagnes d’acquisition en continu." },
        ],
      },
    },
    contact: {
      title: "Parlons de votre projet",
      kicker: "Contact",
      p: "Expliquez en 3 lignes votre activité, votre objectif, et si vous avez déjà un site. Nous revenons vers vous sous 24h avec un plan simple et un devis clair.",
      btn: "Écrire un message",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtBy: "Site par HügoLab",
      tagline:
        "Studio web indépendant basé à Annecy. Nous concevons des sites rapides et orientés conversion pour les entreprises locales et marques ambitieuses.",
      availability: "Basés à Annecy & Paris — missions partout en France.",
      ctaPrimary: "Planifier un échange",
      ctaPrimaryUrl: "#contact",
      ctaSecondary: "Envoyer mon brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "À propos",
          links: [
            { label: "Notre histoire", href: "/about" },
            { label: "Nos références", href: "/#work" },
            { label: "Offres & tarifs", href: "/#pricing" },
            { label: "FAQ & contact", href: "/#contact" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "Site vitrine", href: "/#services" },
            { label: "E-commerce", href: "/#services" },
            { label: "Identité visuelle", href: "/#services" },
            { label: "Maintenance & SEO", href: "/#pricing" },
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
    },
    langLabel: "FR",
  },

  en: {
    nav: { work: "Work", services: "Services", pricing: "Pricing", about: "About", contact: "Contact" },
    hero: {
      kicker: "Creative web agency from Annecy",
      title: "HügoLab — modern websites that convert",
      subtitle:
        "We build high-performing showcase and e-commerce sites for local businesses and growing brands. Our DNA: speed, SEO, and UX designed for conversions.",
      ctaPrimary: "See our projects",
      ctaSecondary: "Discuss your brief",
    },
    services: {
      title: "Services",
      kicker: "What we do",
      cta: "See mockups",
      sections: [
        {
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
          href: "#work",
        },
        {
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
          href: "#work",
        },
        {
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
          href: "#work",
        },
      ],
    },
    work: { title: "Featured Work", kicker: "Case studies" },
    about: {
      title: "Our story",
      kicker: "About us",
      p1: "HügoLab designs modern, fast, results-driven websites for local businesses in Annecy and growing brands. Founded by Mateo Hugues, our mission is simple: turn visits into inquiries, bookings, or sales.",
      p2: "We blend refined design, strong performance and 2025-ready AI tooling to ship clear, SEO-friendly, measurable interfaces. Our method: listen, prototype, test, iterate — until it converts.",
      quote: "In the age of digital, your website is the front door to your brand: clear, fast, credible. Before showing up, most customers will check your site. Our job is to turn that visit into action.",
      quoteAuthor: "Mateo Hugues — HügoLab Founder",
    },
    aboutPage: {
      hero: {
        kicker: "Digital studio",
        title: "We craft conversion-driven web experiences",
        subtitle:
          "From our base in Annecy we help founders, hospitality brands and institutions tell their story with fast, elegant, measurable websites.",
        pill: "HügoLab — founded 2022",
        ctaPrimary: "Book a discovery call",
        ctaSecondary: "Download the deck",
        ctaSecondaryUrl: "https://tally.so/r/mOQNRL",
      },
      highlights: [
        { label: "Projects shipped", value: "35+" },
        { label: "Avg. timeline (weeks)", value: "3" },
        { label: "Repeat clients", value: "82%" },
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
            desc: "Short sprints and quick approvals so your new site ships in a matter of weeks.",
          },
          {
            title: "Minimal tech",
            desc: "A modern React/Vite/Next.js stack with only the pieces required to stay fast and scalable.",
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
          { year: "2022", title: "First showcase sites", desc: "HügoLab launches with websites for artisans around Lake Annecy." },
          { year: "2023", title: "E-commerce flows", desc: "We roll out Stripe-ready booking and checkout journeys for tourism & retail." },
          { year: "2024", title: "Sector demos", desc: "Launch of ready-to-customize demos for tourism, restaurants and outdoor brands." },
          { year: "2025", title: "Full-service care", desc: "Brand refresh, maintenance retainers and performance marketing to support growth." },
        ],
      },
    },
    contact: {
      title: "Let's talk",
      kicker: "Contact",
      p: "Tell us your business, your goal, and whether you already have a site. We’ll reply within 24 hours with a simple plan and quote.",
      btn: "Send a message",
    },
    footer: {
      rights: "All rights reserved.",
      builtBy: "Site by HügoLab",
      tagline:
        "Boutique web studio from Annecy. We ship fast, conversion-first websites for local businesses and growing brands.",
      availability: "Based in Annecy & Paris — partnering with clients across Europe.",
      ctaPrimary: "Schedule a call",
      ctaPrimaryUrl: "#contact",
      ctaSecondary: "Send your brief",
      ctaSecondaryUrl: "https://tally.so/r/mJ7Zgd",
      columns: [
        {
          title: "About",
          links: [
            { label: "Our story", href: "/about" },
            { label: "Selected work", href: "/#work" },
            { label: "Pricing", href: "/#pricing" },
            { label: "FAQs", href: "/#contact" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "Showcase websites", href: "/#services" },
            { label: "E-commerce", href: "/#services" },
            { label: "Visual identity", href: "/#services" },
            { label: "Care & SEO", href: "/#pricing" },
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
  const items = [
    { label: t.nav.work, to: "/#work", isHash: true },
    { label: t.nav.services, to: "/#services", isHash: true },
    { label: t.nav.pricing, to: "/#pricing", isHash: true },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.contact, to: "/#contact", isHash: true },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" aria-label="HügoLab — accueil">
          <img src="/logo.svg" alt="HügoLab" className="h-9 w-auto" />
          <span className="hidden sm:inline-block text-base font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:opacity-90 transition-opacity">
            HügoLab
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
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
        </div>
      </nav>
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

function ProjectCard({ p }) {
  const CardInner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
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
            <a href={p.url} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
              Live →
            </a>
          ) : (
            <Link to={p.url} className="text-sm underline underline-offset-4">
              Live →
            </Link>
          )}
          <a href={p.caseStudyUrl} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            Case study
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
        <a href={p.url} target="_blank" rel="noreferrer" className="block">
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
        className={classNames(
          "grid items-start gap-8 md:grid-cols-2",
          reverse ? "md:[&>div:first-child]:order-2" : ""
        )}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <div className="aspect-[4/3] md:aspect-[3/2]">
            <img
              src={section.img}
              alt={section.imgAlt}
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
      </div>
    </section>
  );
}

function Work({ t }) {
  return (
    <section id="work" className="py-14 md:py-20">
      <SectionTitle kicker={t.work.kicker}>{t.work.title}</SectionTitle>
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard p={p} key={p.slug} />
        ))}
      </div>
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
  return (
    <section id="contact" className="py-14 md:py-20">
      <SectionTitle kicker={t.contact.kicker}>{t.contact.title}</SectionTitle>
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t.contact.p}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900"
          >
            <div className="text-xs text-neutral-500">Email</div>
            <div className="font-medium">{CONTACT.email}</div>
          </a>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500">Phone</div>
            <div className="font-medium">{CONTACT.phone}</div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500">Location</div>
            <div className="font-medium">{CONTACT.location}</div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500 mb-2">Socials</div>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 text-sm"
                >
                  {s.name}
                </a>
              ))}
            </div>
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

          <a
            href="https://g.page/r/CSjpwPvLGK4YEAE/review"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            aria-label="Laisser un avis Google pour HügoLab (ouvre un nouvel onglet)"
          >
            Laisser un avis Google
          </a>
        </div>
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
                rel="noreferrer"
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
                className="rounded-2xl border border-neutral-200 bg-white/90 px-5 py-6 text-neutral-900 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-white"
              >
                <div className="text-3xl font-semibold md:text-4xl">{item.value}</div>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About t={t} />

      <section className="py-16 md:py-20">
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

      <section className="py-16 md:py-20">
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

function Footer({ t }) {
  const phoneHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
  const navColumns = t.footer.columns ?? [];

  return (
    <footer className="mt-24 bg-neutral-950 text-neutral-50">
      <div className="border-t border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-16">
          <div className="grid gap-12 md:grid-cols-[minmax(0,2.4fr)_minmax(0,3fr)]">
            <div>
              <a href="#top" className="flex items-center gap-3" aria-label="HügoLab — retour haut de page">
                <img src="/logo.svg" alt="HügoLab" className="h-10 w-auto" />
                <span className="text-lg font-semibold tracking-tight text-white">HügoLab</span>
              </a>
              <p className="mt-6 max-w-md text-sm text-neutral-300">{t.footer.tagline}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500">{t.footer.availability}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={t.footer.ctaPrimaryUrl}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                >
                  {t.footer.ctaPrimary}
                </a>
                <a
                  href={t.footer.ctaSecondaryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900"
                >
                  {t.footer.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {navColumns.map((col) => (
                <div key={col.title}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{col.title}</p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                    {col.links.map((link) => (
                      <li key={`${col.title}-${link.label}`}>
                        <a href={link.href} className="transition hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{t.footer.contact.title}</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  <li>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500">{t.footer.contact.emailLabel}</span>
                    <a href={`mailto:${CONTACT.email}`} className="transition hover:text-white">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500">{t.footer.contact.phoneLabel}</span>
                    <a href={phoneHref} className="transition hover:text-white">
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500">{t.footer.contact.locationLabel}</span>
                    <p className="text-neutral-300">{CONTACT.location}</p>
                  </li>
                </ul>
                <div className="mt-4">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500">{t.footer.contact.socialsLabel}</span>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-white"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800/60 pt-6 text-xs text-neutral-500">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} HügoLab. {t.footer.rights}</div>
              <div className="flex flex-wrap items-center gap-4">
                <span>{t.footer.builtBy}</span>
                <a href="#top" className="transition hover:text-white">
                  {t.langLabel === "FR" ? "Remonter" : "Back to top"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main component ----------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("fr");
  const location = useLocation();
  const t = useMemo(() => STRINGS[lang], [lang]);
  const emailCopy = useMemo(() => getEmailTemplate(t.langLabel), [t.langLabel]);

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
              <Work t={t} />
              <Services t={t} />
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
        {/* Pages démos */}
        <Route path="/demos/coup-de-pompe" element={<CoupDePompe />} />
        <Route path="/demos/le-deck-pedalos" element={<LeDeckPedalos />} />
        <Route path="/demos/sans-permis-saint-jorioz" element={<SansPermisSaintJorioz />} />
        <Route path="/demos/micro-ecole-parapente" element={<MicroEcoleParapente />} />
        <Route path="/demos/cascade-nomade-canyoning" element={<CascadeNomadeCanyoning />} />
        <Route path="/demos/la-cuillere-a-omble" element={<LaCuillereAOmble />} />
      </Routes>

      {/* Footer reste affiché partout */}
      <Footer t={t} />
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
