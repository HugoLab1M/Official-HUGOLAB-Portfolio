const CONTACT_LINK = "mailto:contact@lemarchedelaseiche.com?subject=Privatisation%20La%20Seiche";

export default function PrivatisationCTA() {
  return (
    <section id="privatiser" className="bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 rounded-3xl bg-[var(--sand)]/70 px-4 py-12 shadow-sm ring-1 ring-[var(--border)]/70 sm:px-6 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="space-y-6">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            Privatisations & évènementiel
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] sm:text-4xl">
            Deux niveaux, scène équipée et 2 700&nbsp;m² à modeler pour vos équipages
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Anniversaire, lancement produit, séminaire, soirée dansante ou tournage : La Seiche adapte les
            espaces (stands culinaires, bars, rooftop, salles de jeux) à vos formats et assure accueil, technique
            et coordination.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <FeaturePill>Capacité 30 à 600 pers.</FeaturePill>
            <FeaturePill>Scène &amp; sonorisation</FeaturePill>
            <FeaturePill>Bar signature &amp; caves invitées</FeaturePill>
            <FeaturePill>Coordination sur-mesure</FeaturePill>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href={CONTACT_LINK}>Demander une privatisation</PrimaryButton>
            <GhostButton href="#infos">Consulter les infos pratiques</GhostButton>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl bg-white p-6 text-sm text-[var(--muted)] shadow-sm ring-1 ring-[var(--border)]/70 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-[-0.01em] leading-[1.1] text-[var(--ink)]">
            Formats disponibles
          </h3>
          <ul className="space-y-4 leading-relaxed">
            <li>
              <span className="font-semibold text-[var(--ink)]">Afterwork &amp; lancements</span>
              <br />
              Terrasse, bar signature, animation DJ light ou live acoustic.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Concerts &amp; soirées dansantes</span>
              <br />
              Plateau technique complet, billetterie intégrée, staff sécurité.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Séminaires &amp; ateliers</span>
              <br />
              Scène, écrans, espaces breakout, menus traiteur multi-stands.
            </li>
          </ul>
          <div className="border-t border-[var(--border)] pt-4 text-xs tracking-[0.1em] text-[var(--muted)]">
            Équipe dédiée • Réponses sous 48h • Partenaires techniques locaux
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ children }) {
  return (
    <span className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium tracking-[0.06em] text-[var(--muted)]">
      {children}
    </span>
  );
}

export function PrimaryButton({ href, children, onClick, className = "" }) {
  const base =
    "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-[#0B0B0B] transition focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-[var(--bg)] bg-[var(--brown)] hover:bg-[var(--brown-2)] hover:shadow-sm active:scale-[0.99] sm:w-auto";
  const combined = `${base} ${className}`.trim();

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
  const base =
    "inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brown)] hover:text-[var(--brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-[var(--bg)] sm:w-auto";
  const combined = `${base} ${className}`.trim();

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
