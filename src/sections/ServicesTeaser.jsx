export default function ServicesTeaser({ section }) {
  if (!section) return null;
  const items = section.items ?? [];

  return (
    <section className="py-14 md:py-20" id="services-teaser">
      <div className="mx-auto max-w-6xl px-4">
        {section.kicker ? (
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{section.kicker}</p>
        ) : null}
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold md:text-3xl text-neutral-900 dark:text-white">{section.title}</h2>
          <div className="flex flex-wrap gap-2">
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

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{item.tag}</p>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.desc}</p>
              </div>
              <a
                href={item.href}
                className="mt-6 inline-flex w-max items-center gap-1 text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-700 hover:dark:text-neutral-300"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
