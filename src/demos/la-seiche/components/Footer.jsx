import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Accueil", href: "/demos/la-seiche" },
  { label: "Restaurant", href: "/demos/la-seiche/restaurant" },
  { label: "Bar", href: "/demos/la-seiche/bar" },
  { label: "Sorties & loisirs", href: "/demos/la-seiche/loisirs" },
  { label: "Agenda", href: "/demos/la-seiche/agenda" },
  { label: "Photos", href: "/demos/la-seiche/photos" },
  { label: "Infos", href: "/demos/la-seiche/infos" },
  { label: "Blog", href: "/demos/la-seiche/blog" },
];

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://www.instagram.com/marchedelaseiche/", label: "Instagram La Seiche" },
  { Icon: Facebook, href: "https://www.facebook.com/lemarchedelaseiche", label: "Facebook La Seiche" },
  { Icon: MessageCircle, href: "https://wa.me/33626231409", label: "WhatsApp La Seiche" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] pb-12 pt-10">
      <div className="mx-auto max-w-7xl border-t border-[var(--border)] px-4 pt-8 text-sm text-[var(--muted)] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-2">
            <p className="text-sm font-medium text-[var(--ink)]">
              © La Seiche — Sévrier • Maquette réalisée par Hugolab
            </p>
            <p className="text-xs leading-relaxed">
              Prototype haute-fidélité pour présenter le food court, les bars, l’agenda live et les offres
              privatisation de La Seiche au bord du lac d’Annecy.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-[var(--ink)]">
            {LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ) : (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              )
            )}
          </nav>
          <div className="flex items-center gap-3 text-[var(--ink)] opacity-80">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition hover:border-[var(--brown)] hover:text-[var(--brown)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className="transition hover:text-[var(--brown)]">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className="transition hover:text-[var(--brown)]">
      {children}
    </a>
  );
}
