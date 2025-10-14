export default function Footer() {
  return (
    <footer className="bg-[#2a0e0e] px-4 py-10 text-sm text-white/80 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>© La Seiche — Sévrier • Site de démonstration (maquette)</p>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="#agenda" className="transition hover:text-white">Agenda</a>
          <a href="#stands" className="transition hover:text-white">Stands</a>
          <a href="#privatiser" className="transition hover:text-white">Privatiser</a>
          <a href="mailto:contact@lemarchedelaseiche.com" className="transition hover:text-white">Email</a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            Facebook
          </a>
        </nav>
      </div>
    </footer>
  );
}
