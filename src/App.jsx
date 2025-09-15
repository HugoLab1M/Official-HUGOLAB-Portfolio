'use client';
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================
// HügoLab — Portfolio Website (Agency Branding)
// Single-file React component (Tailwind + Framer Motion)
// =============================================

// --- Hero carousel images ----------------------------------------------------
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
];

// --- Projects (replace with real ones) --------------------------------------
const PROJECTS = [
  {
    slug: "au-coup-de-pompe",
    title: "Au Coup de Pompe — Repair & Snacks",
    tagline: "Local bike repair + snack bar with a modern, mobile-first site.",
    industry: "Local Business",
    stack: ["Next.js", "Tailwind", "Framer Motion", "SEO"],
    image:
      "https://images.unsplash.com/photo-1506224774223-ddd7c9131fc0?q=80&w=1400&auto=format&fit=crop",
    url: "https://example.com/au-coup-de-pompe",
    caseStudyUrl: "#case-au-coup-de-pompe",
  },
  {
    slug: "annecy-velos",
    title: "Annecy Vélos — Rentals",
    tagline: "Conversion-focused booking flow + dynamic pricing table.",
    industry: "Tourism",
    stack: ["React", "Tailwind", "Vite"],
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1400&auto=format&fit=crop",
    url: "https://example.com/annecy-velos",
    caseStudyUrl: "#case-annecy-velos",
  },
  {
    slug: "gelateria-lago",
    title: "Gelateria del Lago — Snack & Gelato",
    tagline: "Warm brand palette + photo-first menu & allergens labels.",
    industry: "Food & Beverage",
    stack: ["Astro", "Tailwind", "Image CDN"],
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1400&auto=format&fit=crop",
    url: "https://example.com/gelateria",
    caseStudyUrl: "#case-gelateria",
  },
];

// --- Contact / Socials -------------------------------------------------------
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mateo-hugues/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Email", href: "mailto:contact@hugolab.fr" },
];

const CONTACT = {
  email: "contact@hugolab.fr",
  phone: "+33 6 26 23 14 09",
  location: "Annecy • Paris • Remote",
};

// --- i18n strings ------------------------------------------------------------
const STRINGS = {
  fr: {
    nav: { work: "Projets", services: "Services", about: "À propos", contact: "Contact" },
    hero: {
      kicker: "Agence web créative à Annecy",
      title: "HügoLab — des sites modernes qui convertissent",
      subtitle:
        "Nous créons des sites vitrines et e‑commerce pour les entreprises locales et marques en croissance. Notre ADN : rapidité, SEO, et une expérience utilisateur pensée pour la conversion.",
      ctaPrimary: "Voir nos projets",
      ctaSecondary: "Discuter de votre besoin",
    },
    services: {
      title: "Services",
      items: [
        { t: "Site vitrine / e‑commerce", d: "Design & développement responsive, SEO technique, suivi analytique." },
        { t: "Refonte optimisée", d: "+ Vitesse, + conversions, + crédibilité." },
        { t: "Maintenance & SEO", d: "Mises à jour, sécurité, contenus, performance continue." },
      ],
    },
    work: { title: "Projets en avant" },
    about: {
      title: "Notre histoire",
      p1: "HügoLab est né d’une idée simple : offrir aux entreprises locales d’Annecy et d’ailleurs des sites modernes, rapides et vraiment utiles au business. L’agence a été fondée par Mateo Hugues, passionné de design et de stratégie digitale, avec la conviction qu’un bon site peut transformer une activité.",
      p2: "Notre approche : écouter, prototyper vite, tester et améliorer en continu. Nous aimons mêler créativité et rigueur technique pour livrer des solutions qui inspirent confiance et qui convertissent.",
    },
    contact: {
      title: "Parlons de votre projet",
      p: "Expliquez en 3 lignes votre activité, votre objectif, et si vous avez déjà un site. Nous revenons vers vous sous 24h avec un plan simple et un devis clair.",
      btn: "Écrire un message",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtBy: "Site par HügoLab",
    },
    langLabel: "FR",
  },
  en: {
    nav: { work: "Work", services: "Services", about: "About", contact: "Contact" },
    hero: {
      kicker: "Creative web agency from Annecy",
      title: "HügoLab — modern websites that convert",
      subtitle:
        "We build high‑performing showcase and e‑commerce sites for local businesses and growing brands. Our DNA: speed, SEO, and UX designed for conversions.",
      ctaPrimary: "See our projects",
      ctaSecondary: "Discuss your brief",
    },
    services: {
      title: "Services",
      items: [
        { t: "Business / e‑commerce websites", d: "Responsive design & dev, technical SEO, analytics." },
        { t: "High‑impact redesigns", d: "Faster, clearer, more credible." },
        { t: "Maintenance & SEO", d: "Updates, security, content, continuous performance." },
      ],
    },
    work: { title: "Featured Work" },
    about: {
      title: "Our story",
      p1: "HügoLab was born from a simple idea: giving local businesses in Annecy and beyond access to modern, fast, and business‑driven websites. Founded by Mateo Hugues, a finance and digital enthusiast, HügoLab combines strategy and design to help brands grow.",
      p2: "Our approach: listen, prototype fast, test with real users, and keep improving. We blend creativity with technical rigor to deliver solutions that inspire trust and drive sales.",
    },
    contact: {
      title: "Let's talk",
      p: "Tell us your business, your goal, and whether you already have a site. We’ll reply within 24 hours with a simple plan and quote.",
      btn: "Send a message",
    },
    footer: { rights: "All rights reserved.", builtBy: "Site by HügoLab" },
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
    { id: "work", label: t.nav.work },
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <a href="#top" className="flex items-center gap-3 group" aria-label="HügoLab — accueil">
  {/* Logo */}
  <img src="/logo.svg" alt="HügoLab" className="h-9 w-auto" />

  {/* Wordmark (hidden on very small screens) */}
  <span className="hidden sm:inline-block text-base font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:opacity-90 transition-opacity">
    HügoLab
  </span>
</a>
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
              {item.label}
            </a>
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
            <a href="#work" className="rounded-2xl px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black">
              {t.hero.ctaPrimary}
            </a>
            <a href="#contact" className="rounded-2xl px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700">
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

function ProjectCard({ p }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group block rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* HOVER ZOOM effect only on these grid images */}
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
          <a href={p.url} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
            Live →
          </a>
          <a href={p.caseStudyUrl} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            Case study
          </a>
        </div>
      </div>
    </motion.a>
  );
}

function Services({ t }) {
  return (
    <section id="services" className="py-14 md:py-20">
      <SectionTitle kicker="What we do">{t.services.title}</SectionTitle>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-5">
        {t.services.items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900"
          >
            <h3 className="font-medium mb-2">{s.t}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Work({ t }) {
  return (
    <section id="work" className="py-14 md:py-20">
      <SectionTitle kicker="Portfolio">{t.work.title}</SectionTitle>
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
      <SectionTitle kicker="Who we are">{t.about.title}</SectionTitle>
      <div className="max-w-3xl mx-auto px-4 text-neutral-700 dark:text-neutral-300 space-y-4">
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section id="contact" className="py-14 md:py-20">
      <SectionTitle kicker="Get in touch">{t.contact.title}</SectionTitle>
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
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 text-sm">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a href={`mailto:${CONTACT.email}`} className="inline-flex rounded-2xl px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black">
            {t.contact.btn}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <div>© {new Date().getFullYear()} HügoLab. {t.footer.rights}</div>
        <div className="flex items-center gap-3">
          <span>{t.footer.builtBy}</span>
          <a href="#top" className="underline underline-offset-4">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

// --- Main component ----------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("fr");
  const t = useMemo(() => STRINGS[lang], [lang]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Nav
        t={t}
        lang={lang}
        onLangToggle={() => setLang(lang === "fr" ? "en" : "fr")}
        onContactClick={() => (window.location.hash = "#contact")}
      />
      <main>
        <Hero t={t} />
        <Work t={t} />
        <Services t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

// --- Self-tests (basic smoke tests) -----------------------------------------
(function runSelfTests() {
  const tests = [];
  function assert(name, cond) {
    tests.push({ name, pass: !!cond });
  }
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
