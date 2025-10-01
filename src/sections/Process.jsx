import { Lightbulb, Layout, Code2, Rocket } from "lucide-react";

const ICONS = [Lightbulb, Layout, Code2, Rocket];

export default function Process({ section }) {
  if (!section) return null;
  const steps = section.steps ?? [];

  return (
    <section className="py-14 md:py-20" id="process">
      <div className="mx-auto max-w-6xl px-4">
        {section.kicker ? (
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{section.kicker}</p>
        ) : null}
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl text-neutral-900 dark:text-white">{section.title}</h2>
          {section.cta && (
            <a
              href={section.ctaHref}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              {section.cta}
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = ICONS[index] ?? Lightbulb;
            return (
              <div
                key={step.title}
                className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{step.step}</p>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
