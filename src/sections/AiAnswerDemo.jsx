import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ETUDE } from "../data/etude-2026-09.js";

/*
  Illustration du produit « Visibilité IA » : une question de client, les pages que le
  moteur lit pour répondre (les plus citées dans notre étude), et le constat pour le
  cabinet. Aucun nom de cabinet n'est affiché : la réponse est volontairement floutée.
*/

const COPY = {
  fr: {
    engine: "Moteur de recherche IA",
    reading: "Pages les plus lues pour répondre",
    answer: "Réponse rédigée à partir de ces pages",
    verdict: "Votre cabinet est-il sur ces pages ?",
    verdictHint: "l’audit vous le dit, page par page.",
    caption: "Illustration — sources les plus citées dans notre étude de septembre 2026, toutes villes confondues.",
    toggle: "Profession",
  },
  en: {
    engine: "AI search engine",
    reading: "Pages most read to answer",
    answer: "Answer written from these pages",
    verdict: "Is your firm on these pages?",
    verdictHint: "the audit tells you, page by page.",
    caption: "Illustration — most-cited sources in our September 2026 study, all towns combined.",
    toggle: "Profession",
  },
};

export default function AiAnswerDemo({ lang = "fr", compact = false, showToggle = true }) {
  const t = COPY[lang] ?? COPY.fr;
  const reduce = useReducedMotion();
  const [key, setKey] = useState("expert-comptable");
  const data = ETUDE[key];
  const question = data.question[lang] ?? data.question.fr;
  const [typed, setTyped] = useState(reduce ? question.length : 0);

  // Frappe de la question, puis apparition des sources (désactivé si mouvement réduit)
  useEffect(() => {
    if (reduce) {
      setTyped(question.length);
      return undefined;
    }
    setTyped(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= question.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [question, reduce]);

  const done = typed >= question.length;
  const sources = compact ? data.sources.slice(0, 4) : data.sources;

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_40px_90px_-50px_rgba(23,20,31,0.45)]">
        {/* Barre de fenêtre */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--paper)] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          </div>
          <p className="hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:block">{t.engine}</p>
          {showToggle ? (
            <div role="group" aria-label={t.toggle} className="flex rounded-full border border-[var(--border)] bg-white p-0.5">
              {Object.entries(ETUDE).map(([k, v]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKey(k)}
                  aria-pressed={key === k}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    key === k ? "bg-[var(--ink)] text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {v.label[lang] ?? v.label.fr}
                </button>
              ))}
            </div>
          ) : (
            <span className="w-10" aria-hidden />
          )}
        </div>

        <div className={compact ? "space-y-4 p-5" : "space-y-5 p-6 md:p-7"}>
          {/* Question du client */}
          <div className="flex justify-end">
            <p className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--ink)] px-4 py-3 text-sm leading-relaxed text-white">
              <span className="sr-only">{question}</span>
              <span aria-hidden>
                {question.slice(0, typed)}
                {!done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-white/80" />}
              </span>
            </p>
          </div>

          {/* Sources lues */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{t.reading}</p>
            <ul className="mt-3 space-y-2">
              <AnimatePresence mode="popLayout">
                {done &&
                  sources.map((s, i) => (
                    <motion.li
                      key={`${key}-${s.domain}`}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: reduce ? 0 : 0.15 + i * 0.18, duration: 0.35 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-[46%] truncate text-[13px] font-semibold text-[var(--ink)] sm:w-[52%]">{s.domain}</span>
                      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--lavender)]">
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-[var(--violet)]"
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: `${s.pct}%` }}
                          transition={{ delay: reduce ? 0 : 0.3 + i * 0.18, duration: 0.7, ease: "easeOut" }}
                        />
                      </span>
                      <span className="w-10 text-right text-xs tabular-nums text-[var(--muted)]">{s.pct} %</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
            {!done && <div className="h-24" aria-hidden />}
          </div>

          {/* Réponse floutée : on montre la structure, pas des noms */}
          {!compact && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{t.answer}</p>
              <div className="mt-3 space-y-2" aria-hidden>
                {[92, 78, 85].map((w, i) => (
                  <span key={i} className="block h-2 rounded-full bg-[var(--surface)]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          )}

          {/* Constat */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ delay: reduce ? 0 : 1.3, duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-[var(--violet)]/40 bg-[var(--lavender)] px-4 py-3"
          >
            <span className="relative flex h-2.5 w-2.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--violet)] opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--violet-deep)]" />
            </span>
            <p className="text-sm text-[var(--ink)]">
              <span className="font-semibold">{t.verdict}</span>
              <span className="text-[var(--muted)]"> — {t.verdictHint}</span>
            </p>
          </motion.div>
          {/* En version compacte (posée sur une photo), la légende reste dans la carte pour rester lisible */}
          {compact && <p className="text-[11px] leading-snug text-[var(--muted)]">{t.caption}</p>}
        </div>
      </div>
      {!compact && (
        <figcaption className="mt-3 px-2 text-xs text-[var(--muted)]">
          {t.caption} ({data.sourcesBase[lang] ?? data.sourcesBase.fr})
        </figcaption>
      )}
    </figure>
  );
}
