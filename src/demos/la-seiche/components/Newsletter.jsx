import { useState } from "react";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

export default function Newsletter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-4xl rounded-3xl border border-black/5 bg-white px-8 py-12 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-[#0E7490]">Newsletter</p>
        <h2 className="mt-4 text-3xl font-semibold text-[#0F1730]">Recevoir la prog’ & les soirées</h2>
        <p className="mt-4 text-sm text-[#0F1730]/70">
          Une fois par semaine : agenda DJ, stands éphémères, offres spéciales et privatisations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <PrimaryButton onClick={() => setOpen(true)}>S’inscrire</PrimaryButton>
          <GhostButton href="mailto:contact@lemarchedelaseiche.com">Contacter</GhostButton>
        </div>

        <div className="mt-8 space-y-2 text-sm text-[#0F1730]/80">
          <p>Email : <a className="text-[#0E7490] hover:underline" href="mailto:contact@lemarchedelaseiche.com">contact@lemarchedelaseiche.com</a></p>
          <p>
            Adresse :
            <a
              href="https://maps.google.com/?q=35%20route%20de%20Piron%2C%2074320%20S%C3%A9vrier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E7490] hover:underline"
            >
              35 route de Piron, 74320 Sévrier
            </a>
          </p>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0F1730]">Inscription newsletter</h3>
                <p className="mt-2 text-sm text-[#0F1730]/70">
                  Formulaire hébergé sur Tally (placeholder) — remplacez l’URL par votre lien définitif.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#0F1730]/15 px-3 py-1 text-sm"
              >
                Fermer
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/5">
              <iframe
                title="Newsletter La Seiche"
                src="https://tally.so/r/XXXXXXXX"
                className="h-[360px] w-full"
                allow="clipboard-write"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
