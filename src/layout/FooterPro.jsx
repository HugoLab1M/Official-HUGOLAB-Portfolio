import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
};

export default function FooterPro({ t, onManageCookies, contact, socials }) {
  const columns = t.footer.columns ?? [];
  const bottomNavKeys = t.footer.bottomNav ?? [];
  const safeContact = contact ?? { email: "", phone: "", location: "" };
  const safeSocials = Array.isArray(socials) ? socials : [];
  const firstRowColumns = columns.slice(0, 3);
  const remainingColumns = columns.slice(3);
  const legalColumn = columns.find((column) =>
    typeof column.title === "string" && column.title.toLowerCase().includes("legal")
  );
  const legalLinks = legalColumn?.links ?? [];

  return (
    <footer className="mt-24 bg-neutral-950 text-neutral-50">
      <div className="border-t border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,3fr)]">
            <div>
              <a href="#top" className="flex items-center gap-3" aria-label="Retour haut de page">
                <img src="/logo.svg" alt="HügoLab" className="h-10 w-auto" />
                <span className="text-lg font-semibold tracking-tight text-white">HügoLab</span>
              </a>
              <p className="mt-6 max-w-md text-sm text-neutral-300">{t.footer.tagline}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500">{t.footer.availability}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={t.footer.ctaPrimaryUrl}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                >
                  {t.footer.ctaPrimary}
                </a>
                <a
                  href={t.footer.ctaSecondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900"
                >
                  {t.footer.ctaSecondary}
                </a>
                <button
                  type="button"
                  onClick={onManageCookies}
                  className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900"
                >
                  {t.footer.manageCookies}
                </button>
              </div>
            </div>

            <div className="space-y-12">
              {firstRowColumns.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-3">
                  {firstRowColumns.map((column) => (
                    <div key={column.title}>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{column.title}</p>
                      <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                        {(column.links ?? []).map((link) => (
                          <li key={`${column.title}-${link.label}`}>
                            <a href={link.href} className="transition hover:text-white">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{t.footer.contact.title}</p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                    <li className="flex items-center gap-2 whitespace-nowrap">
                      <Mail className="h-3.5 w-3.5 text-neutral-500" />
                      <a href={`mailto:${safeContact.email}`} className="transition hover:text-white">
                        {safeContact.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-2 whitespace-nowrap">
                      <Phone className="h-3.5 w-3.5 text-neutral-500" />
                      <a href={`tel:${(safeContact.phone || "").replace(/\s+/g, "")}`} className="transition hover:text-white">
                        {safeContact.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2 whitespace-nowrap text-neutral-300">
                      <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                      <span>{safeContact.location}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{t.footer.contact.socialsLabel}</p>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-300">
                    {safeSocials.map((social) => {
                      const Icon = SOCIAL_ICONS[social.name] ?? null;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 transition hover:text-white"
                        >
                          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                          {social.name}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {remainingColumns.map((column) => (
                  <div key={column.title}>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{column.title}</p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                      {(column.links ?? []).map((link) => (
                        <li key={`${column.title}-${link.label}`}>
                          <a href={link.href} className="transition hover:text-white">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800/60 pt-6 text-xs text-neutral-500">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} HügoLab. {t.footer.rights}</div>
              <div className="flex flex-wrap items-center gap-4 text-neutral-400">
                <span>{t.footer.builtBy}</span>
                <nav className="flex flex-wrap items-center gap-3">
                  {bottomNavKeys.map((key) => {
                    let href = `/${key}`;
                    if (key === "pricing") href = "/#pricing";
                    if (key === "contact") href = "/#contact";
                    if (key === "work") href = "/#work";
                    if (key === "services") href = "/#services";
                    if (key === "about") href = "/about";
                    if (key === "home") href = "/";
                    return (
                      <a key={`bottom-${key}`} href={href} className="transition hover:text-white">
                        {t.nav[key]}
                      </a>
                    );
                  })}
                </nav>
                {legalLinks.length > 0 && (
                  <nav className="flex flex-wrap items-center gap-3">
                    {legalLinks.map((link) => (
                      <a key={`legal-${link.label}`} href={link.href} className="transition hover:text-white">
                        {link.label}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
