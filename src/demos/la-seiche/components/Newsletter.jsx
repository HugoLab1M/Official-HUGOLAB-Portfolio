import { useState } from "react";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

export default function Newsletter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="bg-[#fff5f5] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[#f4c5ca] bg-white px-8 py-12 shadow-md">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c1121f]">Newsletter</p>
        <h2 className="mt-4 text-3xl font-semibold text-[#2a0e0e]">Recevoir la prog’ & les soirées</h2>
        <p className="mt-4 text-sm text-[#451315]/75">
          Une fois par semaine : agenda DJ, stands éphémères, offres spéciales et privatisations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <PrimaryButton onClick={() => setOpen(true)}>S’inscrire</PrimaryButton>
          <GhostButton href="mailto:contact@lemarchedelaseiche.com" className="bg-[#fff5f5] text-[#c1121f] hover:bg-[#c1121f] hover:text-white">
            Contacter
          </GhostButton>
        </div>

        <div className="mt-8 space-y-2 text-sm text-[#2a0e0e]/80">
          <p>
            Email :{" "}
            <a className="font-medium text-[#c1121f] transition hover:text-[#8d0f18]" href="mailto:contact@lemarchedelaseiche.com">
              contact@lemarchedelaseiche.com
            </a>
          </p>
          <p>
            Adresse :
            <a
              href="https://maps.google.com/?q=35%20route%20de%20Piron%2C%2074320%20S%C3%A9vrier"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium text-[#c1121f] transition hover:text-[#8d0f18]"
            >
              35 route de Piron, 74320 Sévrier
            </a>
          </p>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#f4c5ca] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#2a0e0e]">Inscription newsletter</h3>
                <p className="mt-2 text-sm text-[#451315]/70">
                  Formulaire hébergé sur Tally (placeholder) — remplacez l’URL par votre lien définitif.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#f4c5ca] px-3 py-1 text-sm text-[#c1121f] transition hover:bg-[#fff5f5]"
              >
                Fermer
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[#f4c5ca] bg-[#fff5f5]">
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
