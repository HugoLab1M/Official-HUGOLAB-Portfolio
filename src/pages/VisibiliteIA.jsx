import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Repeat, ShieldCheck, CalendarClock, EyeOff } from "lucide-react";
import AiAnswerDemo from "../sections/AiAnswerDemo.jsx";
import { ETUDE, ENGINE, TOTAL } from "../data/etude-2026-09.js";
import { openMail } from "../utils/mail.js";

/*
  Pôle « Visibilité IA » — page d'atterrissage des cabinets contactés.
  Règles du projet radar-ia reprises ici : ne jamais laisser croire qu'un autre moteur
  que celui nommé a été testé, aucun chiffre qui ne soit pas dans l'étude, aucun cabinet nommé.
*/

const COPY = {
  fr: {
    kicker: "Visibilité IA · avocats et experts-comptables",
    title: "Quand un client demande à une IA quel cabinet choisir, êtes-vous dans la réponse ?",
    subtitle:
      "Nous vous montrons les pages que le moteur lit pour répondre — annuaires, comparateurs, sites de confrères — et celles où votre cabinet est absent. Un constat concret, mesurable, et surtout réparable.",
    ctaPrimary: "Demander l’audit de mon cabinet",
    ctaSecondary: "Ce que contient l’audit",
    contactedTitle: "Vous avez reçu un email de notre part ?",
    contactedBody: "Votre cabinet fait partie de notre étude : son audit est déjà prêt. Un simple « oui » en réponse à ce message suffit pour le recevoir.",

    studyKicker: "L’étude · septembre 2026",
    studyTitle: "Le moteur sait qui vous êtes. Il ne vous propose pas.",
    studyIntro: (n, r) =>
      `Nous avons posé à un moteur de recherche IA les questions d’un futur client, pour ${n} cabinets indépendants de Haute-Savoie et de Lyon — chaque question deux fois, ${r} réponses analysées.`,
    stats: {
      meilleur: "nommé de façon stable quand on demande « le meilleur » de sa ville",
      identifies: "correctement identifiés quand on tape leur nom",
      sansSite: "sans aucune page de leur propre site parmi les sources lues",
    },
    of: "sur",
    sourcesTitle: "Les pages qui écrivent la réponse",
    sourcesIntro:
      "Pour chaque ville, le moteur a lu exactement les mêmes pages à chaque exécution. La réponse change de formulation, pas de sources. C’est là que tout se joue.",
    sourcesShare: "des réponses la citent",
    method: (engine) =>
      `Méthode : ${engine}, interrogée les 18 et 19 septembre 2026. Résultats agrégés, aucun cabinet nommé. Les pourcentages portent sur les questions ouvertes (sans nom de cabinet).`,

    deliverKicker: "L’audit",
    deliverTitle: "Ce que vous recevez",
    deliverables: [
      {
        title: "Les questions de vos futurs clients",
        desc: "« Meilleur cabinet à [ville] », une question de besoin précis dans votre spécialité, et votre nom. Chacune posée deux fois.",
      },
      {
        title: "Les réponses intégrales",
        desc: "Horodatées, avec le moteur utilisé nommé. Vous lisez exactement ce que lit un client.",
      },
      {
        title: "La liste des pages citées",
        desc: "Annuaires, comparateurs, sites de confrères : celles qui décident de la réponse, et celles où vous êtes absent.",
      },
      {
        title: "Trois actions concrètes",
        desc: "Par ordre d’impact : les fiches à créer ou corriger, les pages à faire exister. Rien de vague.",
      },
    ],

    rigorKicker: "Rigueur",
    rigorTitle: "Un audit sur lequel vous pouvez vous appuyer",
    rigor: [
      {
        icon: "repeat",
        title: "Deux passages par question",
        desc: "Les réponses d’une IA varient. Chaque question est posée deux fois, en deux appels séparés.",
      },
      {
        icon: "shield",
        title: "Jamais d’alarme sur une seule réponse",
        desc: "Si les deux passages divergent, le résultat est marqué instable et les deux issues vous sont données.",
      },
      {
        icon: "calendar",
        title: "Moteur et date toujours nommés",
        desc: "Nous n’affirmons rien sur un moteur que nous n’avons pas interrogé.",
      },
      {
        icon: "private",
        title: "Document privé",
        desc: "Transmis par lien ou en PDF, jamais indexé par les moteurs de recherche.",
      },
    ],

    offerKicker: "Offre",
    offerTitle: "Mesurer d’abord, corriger ensuite",
    offers: [
      {
        name: "Audit visibilité IA",
        price: "490 €",
        note: "HT, une fois",
        desc: "Le constat complet pour votre cabinet, votre ville et votre spécialité.",
        bullets: ["Questions testées deux fois", "Réponses intégrales et sources citées", "Trois actions concrètes par ordre d’impact"],
      },
      {
        name: "Accompagnement",
        price: "690 €",
        note: "HT / mois",
        desc: "Pour ceux qui veulent que le constat change.",
        bullets: [
          "Correction des fiches et des pages qui décident de la réponse",
          "Mesure mensuelle, avec la même méthode",
          "Un point clair chaque mois : ce qui a bougé, ce qui reste",
        ],
        featured: true,
        mailSubject: "Accompagnement visibilité IA — mon cabinet",
      },
    ],
    offerCta: "En parler",

    faqKicker: "Questions fréquentes",
    faq: [
      {
        q: "Avez-vous testé ChatGPT ?",
        a: (engine) =>
          `Nos mesures actuelles portent sur un moteur : ${engine}. Nous ne prétendons pas mesurer ChatGPT, Gemini ou Perplexity sans les avoir interrogés. Chaque audit nomme le moteur utilisé et la date.`,
      },
      {
        q: "Est-ce du référencement (SEO) ?",
        a: () =>
          "C’est voisin, mais la cible est différente : nous ne cherchons pas à vous faire monter dans une liste de liens, nous travaillons les pages que le moteur lit pour rédiger sa réponse — fiches d’annuaire, comparateurs, et votre propre site.",
      },
      {
        q: "Pourquoi deux passages par question ?",
        a: () =>
          "Parce qu’une IA ne répond pas deux fois exactement pareil. Dans notre étude, les sources lues étaient identiques d’une exécution à l’autre, mais les cabinets nommés variaient. Deux passages évitent de vous alarmer — ou de vous rassurer — à tort.",
      },
      {
        q: "Qui voit l’audit ?",
        a: () => "Vous seul. Le document est privé, transmis par lien ou en PDF, et marqué pour ne jamais être indexé.",
      },
    ],

    finalTitle: "Voir ce qu’un moteur IA répond à vos futurs clients",
    finalBody: "Dites-nous votre cabinet, votre ville et votre spécialité. Nous revenons vers vous sous 24 h.",
    mailSubject: "Audit visibilité IA — mon cabinet",
    mailBody: "Bonjour,\n\nJe souhaite recevoir l’audit de visibilité IA de mon cabinet.\n- Cabinet :\n- Ville :\n- Spécialité :\n\nMerci.",
  },

  en: {
    kicker: "AI visibility · lawyers and accountants",
    title: "When a client asks an AI which firm to choose, are you in the answer?",
    subtitle:
      "We show you the pages the engine reads to answer — directories, comparison sites, other firms’ websites — and the ones where your firm is missing. Concrete, measurable and, above all, fixable.",
    ctaPrimary: "Request my firm’s audit",
    ctaSecondary: "What the audit contains",
    contactedTitle: "Did you receive an email from us?",
    contactedBody: "Your firm is part of our study: its audit is already done. A simple “yes” in reply to that email is all it takes to receive it.",

    studyKicker: "The study · September 2026",
    studyTitle: "The engine knows who you are. It just doesn’t recommend you.",
    studyIntro: (n, r) =>
      `We asked an AI search engine the questions a prospective client would ask, for ${n} independent firms in Haute-Savoie and Lyon — each question twice, ${r} answers analysed.`,
    stats: {
      meilleur: "named consistently when asked for “the best” in its town",
      identifies: "correctly identified when searched by name",
      sansSite: "with no page of their own website among the sources read",
    },
    of: "of",
    sourcesTitle: "The pages that write the answer",
    sourcesIntro:
      "In each town, the engine read exactly the same pages on every run. The wording changes; the sources don’t. That is where it is decided.",
    sourcesShare: "of answers cite it",
    method: (engine) =>
      `Method: ${engine}, queried on 18 and 19 September 2026. Aggregated results, no firm named. Percentages cover open questions (without a firm name).`,

    deliverKicker: "The audit",
    deliverTitle: "What you receive",
    deliverables: [
      {
        title: "Your prospective clients’ questions",
        desc: "“Best firm in [town]”, a specific need in your field, and your name. Each asked twice.",
      },
      { title: "The full answers", desc: "Timestamped, with the engine named. You read exactly what a client reads." },
      {
        title: "The list of cited pages",
        desc: "Directories, comparison sites, other firms: the pages that decide the answer, and those where you are missing.",
      },
      {
        title: "Three concrete actions",
        desc: "Ranked by impact: listings to create or fix, pages to publish. Nothing vague.",
      },
    ],

    rigorKicker: "Rigour",
    rigorTitle: "An audit you can rely on",
    rigor: [
      { icon: "repeat", title: "Two runs per question", desc: "AI answers vary. Each question is asked twice, in two separate calls." },
      {
        icon: "shield",
        title: "No alarm on a single answer",
        desc: "If the two runs disagree, the result is flagged unstable and both outcomes are shown.",
      },
      { icon: "calendar", title: "Engine and date always named", desc: "We never claim anything about an engine we did not query." },
      { icon: "private", title: "Private document", desc: "Shared by link or PDF, never indexed by search engines." },
    ],

    offerKicker: "Offer",
    offerTitle: "Measure first, then fix",
    offers: [
      {
        name: "AI visibility audit",
        price: "€490",
        note: "excl. VAT, one-off",
        desc: "The full picture for your firm, your town and your field.",
        bullets: ["Questions tested twice", "Full answers and cited sources", "Three concrete actions ranked by impact"],
      },
      {
        name: "Ongoing support",
        price: "€690",
        note: "excl. VAT / month",
        desc: "For firms that want the picture to change.",
        bullets: [
          "Fixing the listings and pages that decide the answer",
          "Monthly measurement, same method",
          "A clear monthly update: what moved, what remains",
        ],
        featured: true,
        mailSubject: "AI visibility support — my firm",
      },
    ],
    offerCta: "Talk to us",

    faqKicker: "FAQ",
    faq: [
      {
        q: "Did you test ChatGPT?",
        a: (engine) =>
          `Our current measurements cover one engine: ${engine}. We do not claim to measure ChatGPT, Gemini or Perplexity without querying them. Every audit names the engine and the date.`,
      },
      {
        q: "Is this SEO?",
        a: () =>
          "Close, but the target differs: we are not trying to climb a list of links, we work on the pages the engine reads to write its answer — directory listings, comparison sites and your own website.",
      },
      {
        q: "Why two runs per question?",
        a: () =>
          "Because an AI never answers exactly the same way twice. In our study the sources were identical between runs, but the firms named varied. Two runs avoid false alarms — and false comfort.",
      },
      { q: "Who sees the audit?", a: () => "Only you. The document is private, shared by link or PDF, and marked never to be indexed." },
    ],

    finalTitle: "See what an AI engine tells your prospective clients",
    finalBody: "Tell us your firm, your town and your field. We reply within 24 hours.",
    mailSubject: "AI visibility audit — my firm",
    mailBody: "Hello,\n\nI would like to receive the AI visibility audit for my firm.\n- Firm:\n- Town:\n- Field:\n\nThank you.",
  },
};

const RIGOR_ICONS = { repeat: Repeat, shield: ShieldCheck, calendar: CalendarClock, private: EyeOff };

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function Stat({ value, total, label, of }) {
  return (
    <div className="border-t border-white/15 pt-5">
      <p className="font-display text-5xl font-medium tracking-tight text-white md:text-6xl">
        {value}
        <span className="ml-2 text-xl text-white/50">
          {of} {total}
        </span>
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{label}</p>
    </div>
  );
}

export default function VisibiliteIA({ lang = "fr", email }) {
  const t = COPY[lang] ?? COPY.fr;
  const engine = ENGINE[lang] ?? ENGINE.fr;
  const [profession, setProfession] = useState("expert-comptable");
  const study = ETUDE[profession];
  const askAudit = () => openMail(email, t.mailSubject, t.mailBody);

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--lavender) 0%, transparent 70%)" }}
        />
        <div className="hugolab-container relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h1 className="font-display mt-6 text-4xl font-medium leading-[1.08] tracking-tight md:text-[3.4rem]">{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{t.subtitle}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={askAudit} className="btn-primary">
                {t.ctaPrimary}
                <span className="btn-arrow" aria-hidden>→</span>
              </button>
              <a href="#audit" className="btn-ghost">
                {t.ctaSecondary}
              </a>
            </div>
            <div className="mt-10 max-w-xl border-l-2 border-[var(--violet)] pl-5">
              <p className="text-sm font-semibold text-[var(--ink)]">{t.contactedTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{t.contactedBody}</p>
            </div>
          </div>
          <AiAnswerDemo lang={lang} />
        </div>
      </section>

      {/* ÉTUDE */}
      <section className="py-16 md:py-24">
        <div className="hugolab-container">
          <div className="rounded-[32px] bg-[var(--ink)] p-8 text-white md:p-14">
            <p className="kicker !text-white/60">{t.studyKicker}</p>
            <h2 className="font-display mt-5 max-w-3xl text-3xl font-medium leading-snug md:text-[2.6rem]">{t.studyTitle}</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{t.studyIntro(TOTAL.cabinets, TOTAL.reponses)}</p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Stat value={TOTAL.nommesMeilleur} total={TOTAL.cabinets} label={t.stats.meilleur} of={t.of} />
              <Stat value={TOTAL.identifies} total={TOTAL.cabinets} label={t.stats.identifies} of={t.of} />
              <Stat value={TOTAL.sansSiteSource} total={TOTAL.cabinets} label={t.stats.sansSite} of={t.of} />
            </div>
          </div>

          {/* Sources */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <motion.div {...reveal}>
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{t.sourcesTitle}</h3>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">{t.sourcesIntro}</p>
              <div role="group" aria-label="Profession" className="mt-6 inline-flex rounded-full border border-[var(--border-strong)] bg-white p-1">
                {Object.entries(ETUDE).map(([k, v]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={profession === k}
                    onClick={() => setProfession(k)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      profession === k ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {v.label[lang] ?? v.label.fr}
                  </button>
                ))}
              </div>
            </motion.div>
            <div className="card-editorial !translate-y-0 p-6 md:p-8" aria-live="polite">
              <ol className="space-y-5">
                {study.sources.map((s, i) => (
                  <li key={`${profession}-${s.domain}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-sm font-semibold">
                        <span className="font-display mr-3 text-[var(--violet-text)]">{String(i + 1).padStart(2, "0")}</span>
                        {s.domain}
                      </p>
                      <p className="text-sm tabular-nums text-[var(--muted)]">
                        <span className="font-semibold text-[var(--ink)]">{s.pct} %</span> {t.sourcesShare}
                      </p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--lavender)]">
                      <motion.div
                        key={`${profession}-${s.domain}-bar`}
                        className="h-full rounded-full bg-[var(--violet)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
                {study.label[lang] ?? study.label.fr} · {study.cabinets} {lang === "fr" ? "cabinets" : "firms"} ·{" "}
                {study.sourcesBase[lang] ?? study.sourcesBase.fr}. {t.method(engine)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUE VOUS RECEVEZ */}
      <section id="audit" className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)]/60 py-16 md:py-24">
        <div className="hugolab-container">
          <p className="kicker">{t.deliverKicker}</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight md:text-4xl">{t.deliverTitle}</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.deliverables.map((d, i) => (
              <motion.div key={d.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="card-editorial flex flex-col gap-3 p-6">
                <p className="font-display text-sm text-[var(--violet-text)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-base font-semibold">{d.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGUEUR */}
      <section className="py-16 md:py-24">
        <div className="hugolab-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker">{t.rigorKicker}</p>
            <h2 className="font-display mt-4 text-3xl font-medium tracking-tight md:text-4xl">{t.rigorTitle}</h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.rigor.map((r) => {
              const Icon = RIGOR_ICONS[r.icon];
              return (
                <div key={r.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--lavender)] text-[var(--violet-text)]">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFRE */}
      <section id="offre" className="scroll-mt-24 border-t border-[var(--border)] py-16 md:py-24">
        <div className="hugolab-container">
          <p className="kicker">{t.offerKicker}</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight md:text-4xl">{t.offerTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {t.offers.map((o) => (
              <div
                key={o.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  o.featured ? "border-transparent bg-[var(--ink)] text-white" : "border-[var(--border)] bg-white"
                }`}
              >
                <h3 className={`font-display text-2xl font-medium ${o.featured ? "text-white" : ""}`}>{o.name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${o.featured ? "text-white/70" : "text-[var(--muted)]"}`}>{o.desc}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 h-4 w-4 flex-none ${o.featured ? "text-[var(--violet)]" : "text-[var(--violet-text)]"}`} aria-hidden />
                      <span className={o.featured ? "text-white/90" : ""}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <p className={`font-display text-3xl ${o.featured ? "text-white" : ""}`}>
                    {o.price}
                    <span className={`ml-2 text-base font-normal ${o.featured ? "text-white/60" : "text-[var(--muted)]"}`}>{o.note}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => openMail(email, o.mailSubject ?? t.mailSubject, t.mailBody)}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      o.featured
                        ? "bg-[var(--violet-deep)] text-white hover:bg-[var(--violet-text)]"
                        : "bg-[var(--ink)] text-white hover:bg-[var(--violet-deep)]"
                    }`}
                  >
                    {t.offerCta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)] py-16 md:py-24">
        <div className="hugolab-container max-w-4xl">
          <p className="kicker">{t.faqKicker}</p>
          <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {t.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="font-display text-2xl leading-none text-[var(--violet-text)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{f.a(engine)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-8 pt-4">
        <div className="hugolab-container">
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--lavender)] p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(140,82,255,0.35) 0%, transparent 70%)" }}
            />
            <h2 className="font-display relative max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">{t.finalTitle}</h2>
            <p className="relative mt-4 max-w-xl leading-relaxed text-[var(--muted)]">{t.finalBody}</p>
            <button type="button" onClick={askAudit} className="btn-primary relative mt-8">
              {t.ctaPrimary}
              <span className="btn-arrow" aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
