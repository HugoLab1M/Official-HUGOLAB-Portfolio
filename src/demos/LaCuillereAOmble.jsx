import { MapPin, Phone, Clock, UtensilsCrossed } from "lucide-react";

export default function LaCuillereAOmble() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black grid place-items-center">
              <UtensilsCrossed size={16}/>
            </div>
            <div>
              <p className="font-semibold">La Cuillère à Omble</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Duingt • Lac d’Annecy</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#carte" className="hover:opacity-80">La carte</a>
            <a href="#histoire" className="hover:opacity-80">Notre histoire</a>
            <a href="#galerie" className="hover:opacity-80">Galerie</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
            <a href="tel:+33450443071" className="rounded-2xl px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black">Réserver</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-neutral-500 dark:text-neutral-400">Cuisine de lac, produits frais</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">La Cuillère à Omble</h1>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              Restaurant à Duingt, face au lac d’Annecy. Cuisine de saison, vins sélectionnés, terrasse lumineuse.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1"><MapPin size={14}/> Quai du Port, Duingt</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1"><Clock size={14}/> Jeu–Lun 9:00–22:00</span>
              <a href="tel:+33450443071" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1"><Phone size={14}/> +33 4 50 44 30 71</a>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#carte" className="rounded-2xl px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black">Voir la carte</a>
              <a href="#contact" className="rounded-2xl px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700">Nous contacter</a>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800">
            <img src="/omble/hero.jpg" alt="Terrasse avec vue sur le lac" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Carte (3 highlights) */}
      <section id="carte" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">La carte</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { src: "/omble/dish-1.jpg", t: "Omble chevalier", d: "Beurre citronné, herbes du jardin." },
              { src: "/omble/dish-2.jpg", t: "Filet de féra", d: "Cuisson douce, légumes de saison." },
              { src: "/omble/dessert.jpg", t: "Dessert du moment", d: "Pâtisserie maison, fruits." },
            ].map((x,i)=>(
              <div key={i} className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="h-44 w-full overflow-hidden">
                  <img src={x.src} alt={x.t} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-medium">{x.t}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Carte et prix susceptibles d’évoluer selon arrivage. Réservation conseillée.</p>
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-start">
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800">
            <img src="/omble/interior.jpg" alt="Salle du restaurant" className="h-full w-full object-cover"/>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Notre histoire</h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              Une cuisine sincère, un service attentif et la passion du terroir savoyard. Nous travaillons des produits frais,
              au fil des saisons et des pêches du lac.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({length:8}).map((_,i)=>(
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
                <img src={`/omble/gallery-${i+1}.jpg`} alt={`Galerie ${i+1}`} className="h-full w-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6">
            <p className="text-lg font-semibold mb-2">Réserver</p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">Par téléphone ou sur place.</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+33450443071" className="rounded-2xl px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black">
                <Phone size={14} className="mr-1 inline"/> Appeler
              </a>
              <a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer" className="rounded-2xl px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700">
                <MapPin size={14} className="mr-1 inline"/> Itinéraire
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <iframe
              title="Duingt"
              className="h-64 w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=6.187%2C45.828%2C6.225%2C45.855&layer=mapnik&marker=45.839%2C6.206"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
