import { MapPin, Zap, Search, Sparkles } from "lucide-react";

const ICON_MAP = {
  local: MapPin,
  speed: Zap,
  seo: Search,
  ai: Sparkles,
};

export default function WhyUs({ section }) {
  if (!section) return null;
  const items = section.items ?? [];

  return (
    <section className="py-14 md:py-20" id="why-us">
      <div className="mx-auto max-w-6xl px-4">
        {section.kicker ? (
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{section.kicker}</p>
        ) : null}
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl text-neutral-900 dark:text-white">
            {section.title}
          </h2>
          {section.cta && (
            <a
              href={section.ctaHref}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              {section.cta}
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Sparkles;
            return (
              <div
                key={item.title}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white transition group-hover:scale-105 dark:bg-neutral-100 dark:text-neutral-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
