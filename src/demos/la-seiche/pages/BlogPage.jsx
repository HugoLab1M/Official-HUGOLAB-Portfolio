const ARTICLES = [
  {
    title: "Carton Comedy Club",
    excerpt:
      "Plateau stand-up installé chaque semaine à La Seiche : humoristes locaux, talents émergents, ambiance conviviale et programmation évolutive.",
    cta: "Voir les prochaines dates",
    href: "/demos/la-seiche/agenda",
    tag: "Stand-up • Humour",
  },
  {
    title: "Soirées dansantes",
    excerpt:
      "Rock’n’roll avec DJ Shrek, soirées BSK (Bachata / Salsa / Kizomba), bal country avec la CBarn Family, petit bal du dimanche avec orchestres régionaux.",
    cta: "Programme danse",
    href: "/demos/la-seiche/agenda",
    tag: "Danse & live",
  },
  {
    title: "Expériences food & mixologie",
    excerpt:
      "Napoli Pizza, Atelier Burger, Le Sain Bol, bar du Vieux Rhum : focus sur les cartes saisonnières, accords cocktails & tapas, nouveautés terrasse.",
    cta: "Découvrir les stands",
    href: "/demos/la-seiche/restaurant",
    tag: "Restauration",
  },
];

export default function BlogPage() {
  return (
    <section className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-[var(--ink)]">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">La Seiche — Journal</p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] sm:text-[2.3rem]">
            Actualités, coulisses et temps forts du food court
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Ce blog éditorialise les animations de Sévrier : focus artistes, rencontres avec les chefs invités,
            coulisses des soirées et tips pour profiter du site. Des modules additionnels pourront être intégrés
            pour publier reportages, podcasts ou interviews vidéos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group flex flex-col gap-4 rounded-3xl bg-[#F6E7D2] p-6 shadow-sm ring-1 ring-[rgba(102,69,33,0.25)] transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--muted)] shadow-sm">
                {article.tag}
              </span>
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{article.excerpt}</p>
              <span className="mt-auto text-sm font-medium text-[var(--brown)] group-hover:underline">
                {article.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
