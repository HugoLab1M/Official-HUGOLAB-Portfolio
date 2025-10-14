export default function PrivatisationCTA() {
  const subject = encodeURIComponent("Privatisation La Seiche");
  const body = encodeURIComponent(
    "Bonjour,\n\nJe souhaite privatiser un espace au Marché de la Seiche.\nDate souhaitée :\nNombre de personnes :\nBesoin DJ / technique :\nBudget estimé :\n\nMerci pour votre retour !"
  );

  return (
    <section id="privatiser" className="bg-[#fff5f5] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-[#f4c5ca] bg-white px-10 py-12 shadow-xl sm:px-12 lg:flex-row lg:items-center">
        <div className="lg:w-1/2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">Privatisation</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#2a0e0e] sm:text-[2.25rem]">
            Privatiser La Seiche pour vos soirées & événements
          </h2>
          <p className="mt-4 text-sm text-[#451315]/80">
            1 200 m² intérieur + 1 500 m² extérieur, scène, cuisine partagée et équipe bar à votre service. Nous adaptons l’espace aux afterworks, séminaires, concerts privés ou lancements de produit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <PrimaryButton
              href={`mailto:contact@lemarchedelaseiche.com?subject=${subject}&body=${body}`}
              className="shrink-0"
            >
              Demander un devis
            </PrimaryButton>
            <GhostButton href="#agenda" className="border-transparent bg-[#fff5f5] text-[#c1121f] hover:bg-[#c1121f] hover:text-white">
              Voir l’agenda
            </GhostButton>
          </div>
        </div>

        <div className="grid flex-1 gap-4 text-left text-sm text-[#451315]/80 sm:grid-cols-2">
          {[
            "Module scène + sonorisation",
            "Bar cocktails & caves invitées",
            "Food-court 8 stands tournants",
            "Vestiaires, sécurité & ticketing",
          ].map((item) => (
            <div key={item} className="card h-full rounded-2xl border-[#f4c5ca] bg-[#fff1f1] px-5 py-4 shadow-sm">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#c1121f]/80">
                Option
              </span>
              <p className="mt-2 font-medium text-[#2a0e0e]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrimaryButton({ href, children, onClick, className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const rest = "bg-[#c1121f] hover:bg-[#8d0f18] focus-visible:outline-[#c1121f]";

  const combined = `${base} ${rest} ${className}`.trim();

  return href ? (
    <a href={href} className={combined}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={combined}>
      {children}
    </button>
  );
}

export function GhostButton({ href, children, onClick, className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const rest = "border border-[#c1121f] text-[#c1121f] hover:bg-[#c1121f] hover:text-white focus-visible:outline-[#c1121f]";

  const combined = `${base} ${rest} ${className}`.trim();

  return href ? (
    <a href={href} className={combined}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={combined}>
      {children}
    </button>
  );
}
