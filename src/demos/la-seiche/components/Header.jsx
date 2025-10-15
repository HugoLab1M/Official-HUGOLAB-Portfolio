import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { PrimaryButton } from "./Ctas.jsx";

const NAV_ITEMS = [
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

export default function Header() {
  const [open, setOpen] = useState(false);

  const renderNavLink = (item, onClick) => {
    const isRoute = item.href.startsWith("/");
    const className =
      "text-[var(--ink)] opacity-80 transition-colors hover:opacity-100 hover:text-[var(--brown)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

    return isRoute ? (
      <Link key={item.href} to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    ) : (
      <a key={item.href} href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 text-[var(--ink)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-base font-semibold tracking-[-0.01em] text-[var(--ink)] transition hover:text-[var(--brown)]"
        >
          La Seiche
        </Link>

        <nav className="hidden items-center gap-6 text-[15px] tracking-normal md:flex">
          {NAV_ITEMS.map((item) => renderNavLink(item))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] opacity-70 transition hover:border-[var(--brown)] hover:text-[var(--brown)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <PrimaryButton href="/demos/la-seiche/privatisations">Privatisations</PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--ink)] md:hidden"
          aria-expanded={open}
          aria-label="Ouvrir la navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] bg-white px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-2 text-sm tracking-normal">
            {NAV_ITEMS.map((item) => renderNavLink(item, () => setOpen(false)))}
          </nav>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] opacity-70 transition hover:border-[var(--brown)] hover:text-[var(--brown)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brown)] focus-visible:ring-opacity-40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <PrimaryButton href="/demos/la-seiche/privatisations" className="mt-5">
            Privatisations
          </PrimaryButton>
        </div>
      ) : null}
    </header>
  );
}
