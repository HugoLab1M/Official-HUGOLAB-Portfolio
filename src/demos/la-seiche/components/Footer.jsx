export default function Footer() {
  return (
    <footer className="bg-white px-4 py-10 text-sm text-[#0F1730]/70 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-black/5 pt-6 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>© La Seiche — Sévrier • Site de démonstration (maquette)</p>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="#agenda" className="transition hover:text-[#0E7490]">Agenda</a>
          <a href="#stands" className="transition hover:text-[#0E7490]">Stands</a>
          <a href="#privatiser" className="transition hover:text-[#0E7490]">Privatiser</a>
          <a href="mailto:contact@lemarchedelaseiche.com" className="transition hover:text-[#0E7490]">Email</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#0E7490]">
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
