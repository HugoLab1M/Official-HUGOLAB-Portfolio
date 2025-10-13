export default function PrivatisationCTA() {
  const subject = encodeURIComponent("Privatisation La Seiche");
  const body = encodeURIComponent(
    "Bonjour,\n\nJe souhaite privatiser un espace au Marché de la Seiche.\nDate souhaitée :\nNombre de personnes :\nBesoin DJ / technique :\nBudget estimé :\n\nMerci pour votre retour !"
  );
  return (
    <section id="privatiser" className="bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-5xl rounded-3xl border border-black/5 bg-white px-8 py-12 shadow-sm text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#0E7490]">Privatisation</p>
        <h2 className="mt-4 text-3xl font-semibold text-[#0F1730]">Privatiser un espace</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[#0F1730]/70">
          Afterwork, anniversaire, séminaire ou lancement de produit : nos espaces modulables s'adaptent, avec équipes bar, restauration et animations.
        </p>
        <PrimaryButton
          href={`mailto:contact@lemarchedelaseiche.com?subject=${subject}&body=${body}`}
          className="mt-8"
        >
          Demander un devis
        </PrimaryButton>
      </div>
    </section>
  );
}

export function PrimaryButton({ href, children, onClick, className = "" }) {
  const base = "btn-primary";
  return href ? (
    <a href={href} className={`${base} ${className}`.trim()}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={`${base} ${className}`.trim()}>
      {children}
    </button>
  );
}

export function GhostButton({ href, children, onClick, className = "" }) {
  const base = "btn-ghost";
  return href ? (
    <a href={href} className={`${base} ${className}`.trim()}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={`${base} ${className}`.trim()}>
      {children}
    </button>
  );
}
