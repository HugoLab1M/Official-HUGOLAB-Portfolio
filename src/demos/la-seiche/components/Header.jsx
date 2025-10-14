import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./Ctas.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Agenda", href: "#agenda" },
    { label: "Stands", href: "#stands" },
    { label: "Privatiser", href: "#privatiser" },
    { label: "Maquette", href: "#maquette" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#f4c5ca] bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-[0.35em] uppercase text-[#c1121f]">
          La Seiche
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#2a0e0e] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#c1121f]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <PrimaryButton href="#maquette">Obtenir la maquette</PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-[#c1121f]/20 px-3 py-2 text-sm font-medium text-[#c1121f] md:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#f4c5ca] bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-[#2a0e0e] transition hover:bg-[#fff0f0]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <PrimaryButton href="#maquette" className="mt-4 w-full">
            Obtenir la maquette
          </PrimaryButton>
        </div>
      ) : null}
    </header>
  );
}
