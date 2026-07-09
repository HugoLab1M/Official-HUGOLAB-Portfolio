import { MapPin, Zap, Search, Sparkles, Eye, Handshake, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const ICON_MAP = {
  local: MapPin,
  speed: Zap,
  seo: Search,
  ai: Sparkles,
  transparent: Eye,
  human: Handshake,
  design: Palette,
};

export default function WhyUs({ section }) {
  if (!section) return null;
  const items = section.items ?? [];

  return (
    <section className="py-16 md:py-24" id="why-us">
      <div className="mx-auto max-w-6xl px-4">
        {section.kicker ? <p className="kicker">{section.kicker}</p> : null}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--ink)] md:text-4xl">{section.title}</h2>
          {section.cta && (
            <Link to={section.ctaHref} className="btn-ghost whitespace-nowrap !px-5 !py-2.5">
              {section.cta}
            </Link>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Sparkles;
            return (
              <div key={item.title} className="card-editorial group flex h-full flex-col gap-4 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--lavender)] text-[var(--violet-text)] transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
