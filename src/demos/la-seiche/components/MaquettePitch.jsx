import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

export default function MaquettePitch() {
  const mailto =
    "mailto:bonjour@hugolab.fr?subject=Maquette%20La%20Seiche&body=Bonjour%20Mat%C3%A9o%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20la%20maquette%20La%20Seiche.%20Nous%20pouvons%20%C3%A9changer%20cette%20semaine%20%3F";

  return (
    <section id="maquette" className="bg-[#ffe9ec] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-[#f4c5ca] bg-white p-10 shadow-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fff5f5] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c1121f]">
            Proposition HügoLab
          </span>
          <h2 className="mt-6 text-3xl font-semibold leading-snug text-[#2a0e0e] sm:text-[2.25rem]">
            Un micro-site pensé pour transformer vos recherches Google & Maps en réservations
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#451315]/85">
            <p>
              Bonjour,
            </p>
            <p>
              Je m’appelle Matéo, fondateur de HügoLab (studio web à Annecy). J’aide les entreprises du lac d’Annecy à transformer les recherches Google/Maps en réservations et ventes avec des sites rapides, clairs et faciles à maintenir. Votre temps est précieux : mon objectif n’est pas de vous en faire perdre, mais de vous aider à en gagner — et à en gagner davantage.
            </p>
            <p>
              Votre concept « bar • restaurants • loisirs » sur 1 200 m² int. / 1 500 m² ext. et les horaires du soir se prêtent bien à un agenda qui convertit. Je peux vous envoyer une maquette 100 % gratuite d’un micro-site :
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Agenda (calendrier partageable) ;</li>
              <li>boutons « Venir ce soir » / « Privatiser » ;</li>
              <li>stands (cartes/temps d’attente) ;</li>
              <li>newsletter & Facebook intégrés.</li>
            </ul>
            <p>
              Intéressé(e) pour que je vous partage la maquette ?
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <PrimaryButton href={mailto}>Oui, envoyez la maquette</PrimaryButton>
            <GhostButton href="https://www.hugolab.fr" className="bg-[#fff5f5] text-[#c1121f] hover:bg-[#c1121f] hover:text-white">
              Voir d’autres réalisations
            </GhostButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
