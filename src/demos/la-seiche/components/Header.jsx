import { useState } from "react";
import { Link } from "react-router-dom";
import { GhostButton, PrimaryButton } from "./Ctas.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Agenda", href: "#agenda" },
    { label: "Stands", href: "#stands" },
    { label: "Privatiser", href: "#privatiser" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#fafafa]/80 border-b border-black/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-[0.35em] uppercase text-[#0F1730]">
          La Seiche
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#0F1730] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#0E7490]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <PrimaryButton href="#contact">Venir ce soir</PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-[#0F1730]/10 px-3 py-2 text-sm font-medium text-[#0F1730] md:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-[#0F1730] transition hover:bg-[#0E7490]/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <PrimaryButton href="#contact" className="mt-4 w-full">
            Venir ce soir
          </PrimaryButton>
        </div>
      ) : null}
    </header>
  );
}
