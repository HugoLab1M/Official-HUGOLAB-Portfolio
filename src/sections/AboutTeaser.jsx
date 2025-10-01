export default function AboutTeaser({ section }) {
  if (!section) return null;

  return (
    <section className="py-14 md:py-20" id="about-teaser">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {section.kicker ? (
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{section.kicker}</p>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">
          {section.title}
        </h2>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 md:text-lg">
          {section.desc}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {section.primaryCta && (
            <a
              href={section.primaryHref}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              {section.primaryCta}
            </a>
          )}
          {section.secondaryCta && (
            <a
              href={section.secondaryHref}
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              {section.secondaryCta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
