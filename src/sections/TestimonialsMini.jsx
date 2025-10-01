export default function TestimonialsMini({ section }) {
  if (!section || !Array.isArray(section.quotes) || section.quotes.length === 0) {
    return null;
  }

  return (
    <section className="py-14 md:py-20" id="testimonials">
      <div className="mx-auto max-w-6xl px-4">
        {section.kicker ? (
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 dark:text-neutral-400">{section.kicker}</p>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white md:text-3xl">{section.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {section.quotes.map((quote, idx) => (
            <figure
              key={`${quote.author}-${idx}`}
              className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <blockquote className="text-sm text-neutral-700 dark:text-neutral-300">{quote.text}</blockquote>
              <figcaption className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                {quote.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
