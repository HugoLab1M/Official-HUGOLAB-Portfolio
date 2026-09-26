import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* Les trois pôles HügoLab. Le premier (Visibilité IA) est mis en avant. */
export default function Branches({ data }) {
  if (!data) return null;
  return (
    <section id="poles" className="scroll-mt-24 py-16 md:py-24">
      <div className="hugolab-container">
        <div className="max-w-2xl">
          <p className="kicker">{data.kicker}</p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{data.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{data.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr_1fr]">
          {data.items.map((item, idx) => {
            const featured = idx === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              >
                <Link
                  to={item.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 ${
                    featured
                      ? "border-transparent bg-[var(--ink)] text-white shadow-[0_40px_90px_-45px_rgba(23,20,31,0.7)]"
                      : "border-[var(--border)] bg-white hover:border-[var(--violet)] hover:shadow-[0_24px_60px_-30px_rgba(23,20,31,0.25)]"
                  }`}
                >
                  {featured && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-50 blur-3xl"
                      style={{ background: "radial-gradient(circle, rgba(140,82,255,0.55) 0%, transparent 70%)" }}
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-4">
                    <p className={`font-display text-sm ${featured ? "text-[var(--violet)]" : "text-[var(--violet-text)]"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    {item.badge ? (
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                          featured ? "bg-[var(--violet-deep)] text-white" : "bg-[var(--lavender)] text-[var(--violet-text)]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className={`font-display relative mt-6 text-2xl font-medium md:text-[1.7rem] ${featured ? "text-white" : "text-[var(--ink)]"}`}>
                    {item.title}
                  </h3>
                  <p className={`relative mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${featured ? "text-white/50" : "text-[var(--muted)]"}`}>
                    {item.forWho}
                  </p>
                  <p className={`relative mt-4 text-sm leading-relaxed ${featured ? "text-white/75" : "text-[var(--muted)]"}`}>{item.desc}</p>
                  <ul className="relative mt-5 space-y-2 text-sm">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span aria-hidden className={"mt-[7px] h-1.5 w-1.5 flex-none bg-[var(--violet)]"} />
                        <span className={featured ? "text-white/90" : "text-[var(--ink)]"}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
                    <p className={`font-display text-xl ${featured ? "text-white" : "text-[var(--ink)]"}`}>{item.price}</p>
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${featured ? "text-white" : "text-[var(--violet-text)]"}`}
                    >
                      {item.cta}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
