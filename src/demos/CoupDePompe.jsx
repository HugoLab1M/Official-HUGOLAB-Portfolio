import React, { useEffect, useMemo, useState } from "react";

export default function CoupDePompe() {
  // --- i18n ---------------------------------------------------------------
  const I18N = useMemo(
    () => ({
      fr: {
        tag: "Location vélos · Snack · Détente",
        nav: { services: "Services", menu: "Menu", hours: "Horaires", contact: "Contact", reserve: "Réserver un vélo" },
        hero: {
          eyebrow: "Au bord de la piste cyclable",
          h1: "Location de vélos, snack & détente à Doussard (Lac d’Annecy)",
          p:
            "VTC, VAE, VTT, gravel & tandem. Smoothies, tartines & glaces. Sauna & bain nordique pour récupérer — le tout à deux pas du lac.",
          ctaPrimary: "Réserver un vélo",
          ctaGhost: "Voir le menu",
        },
        services: {
          h2: "Nos services",
          sub: "Tout pour une journée parfaite au bord du lac",
          bikes: {
            pill: "Location vélos",
            h3: "VTC, VAE, VTT, route, gravel & tandem",
            p: "Réservation en ligne, casques & antivols inclus. Conseil sur les plus belles boucles selon votre niveau.",
          },
          snack: {
            pill: "Snack · Glacier",
            h3: "Tartines, salades, smoothies & glaces",
            p: "Produits simples et de saison. Terrasse ensoleillée, musique douce, ambiance conviviale.",
          },
          relax: {
            pill: "Détente",
            h3: "Sauna & bain nordique",
            p: "Récupérez après la sortie : sauna sec et bain chaud (sur réservation). Terrain de pétanque à proximité.",
          },
          f1t: "Accès direct piste cyclable",
          f1p: "Départ idéal pour les familles et les sportifs",
          f2t: "Conseils & boucles",
          f2p: "Itinéraires proches, points baignade, parkings",
          f3t: "Réservation simple",
          f3p: "Paiement sécurisé · confirmation immédiate",
        },
        menu: {
          h2: "Menu — Exemples",
          sub: "Carte simplifiée — susceptibles d’évoluer selon la saison",
          i1t: "Tartine avocat & saumon",
          i1p: "Pain de campagne, avocat, saumon, citron, petite salade",
          i2t: "Salade César",
          i2p: "Poulet, parmesan, croûtons, sauce maison",
          i3t: "Panini mozzarella",
          i3p: "Tomates, basilic, huile d’olive",
          i4t: "Smoothies",
          i4p: "Fruits frais pressés — mangue, fruits rouges, banane…",
          i5t: "Glaces artisanales",
          i5p: "Vanille, chocolat, pistache, sorbets du moment",
          i6t: "Boissons",
          i6p: "Eaux, softs, cafés · carte des boissons sur place",
        },
        hours: {
          h2: "Horaires & accès",
          sub: "Horaires indicatifs saison été — à confirmer selon météo/affluence",
          h3: "Horaires",
          mon: "Lun–Ven",
          sat: "Samedi",
          sun: "Dimanche",
          note: "Hiver : horaires réduits. Appelez pour vérifier.",
          addr: "Adresse",
          phone: "Téléphone",
        },
        reserve: {
          h2: "Réserver un vélo",
          sub: "Réservation en ligne sécurisée — confirmation immédiate",
          p1: "Choisissez votre vélo (VAE, VTT, VTC, gravel, tandem), vos dates et le point de retrait.",
          p2: "Casques & antivols inclus. Paiement sécurisé.",
          cta: "Aller à la réservation",
        },
        reviews: {
          h2: "Ils ont aimé",
          sub: "Extraits d’avis clients (Google/TripAdvisor)",
          r1: "Tartine avocat-saumon excellente et terrasse très agréable après la balade à vélo.",
          r2: "Équipe super sympa, bons conseils de parcours. Vélos en très bon état.",
          r3: "Le sauna après la sortie, top pour récupérer. On reviendra !",
        },
        contact: { h2: "Contact & FAQ", sub: "Besoin d’un conseil ? Écrivez‑nous ou passez nous voir" },
        faq: {
          q1: "Faut‑il réserver à l’avance ?",
          a1: "C’est conseillé en été et les week‑ends. En semaine, nous avons souvent des disponibilités.",
          q2: "Livrez‑vous les vélos ?",
          a2: "Sur demande et selon disponibilité. Contactez‑nous pour un devis.",
          q3: "Y a‑t‑il des sièges enfants ?",
          a3: "Oui, sièges & remorques enfants disponibles en option (quantités limitées).",
        },
        footer: { rights: "Tous droits réservés.", findUs: "Nous trouver", links: "Liens utiles" },
        links: { reserve: "Réserver un vélo", menu: "Voir le menu", hours: "Horaires & accès" },
      },
      en: {
        tag: "Bike rental · Snack · Relax",
        nav: { services: "Services", menu: "Menu", hours: "Hours", contact: "Contact", reserve: "Book a bike" },
        hero: {
          eyebrow: "Right on the cycle path",
          h1: "Bike rental, snack & spa in Doussard (Lake Annecy)",
          p:
            "City, e‑bikes, MTBs, gravel & tandems. Smoothies, tartines & ice cream. Sauna & hot tub to recover — steps from the lake.",
          ctaPrimary: "Book a bike",
          ctaGhost: "See the menu",
        },
        services: {
          h2: "Our services",
          sub: "Everything for a perfect lakeside day",
          bikes: {
            pill: "Bike rental",
            h3: "City, e‑bikes, MTBs, road, gravel & tandem",
            p: "Online booking, helmets & locks included. Route tips to match your level.",
          },
          snack: {
            pill: "Snack · Ice cream",
            h3: "Tartines, salads, smoothies & ice cream",
            p: "Simple, seasonal products. Sunny terrace, laid‑back music, friendly vibe.",
          },
          relax: {
            pill: "Relax",
            h3: "Sauna & hot tub",
            p: "Recover after your ride: dry sauna & hot tub (booking required). Petanque court nearby.",
          },
          f1t: "Direct access to cycle path",
          f1p: "Perfect start for families & athletes",
          f2t: "Tips & routes",
          f2p: "Nearby loops, swim spots, parking",
          f3t: "Easy booking",
          f3p: "Secure payment · instant confirmation",
        },
        menu: {
          h2: "Menu — Highlights",
          sub: "Simplified selection — may vary by season",
          i1t: "Avocado & salmon tartine",
          i1p: "Country bread, avocado, salmon, lemon, side salad",
          i2t: "Caesar salad",
          i2p: "Chicken, parmesan, croutons, house dressing",
          i3t: "Mozzarella panini",
          i3p: "Tomatoes, basil, olive oil",
          i4t: "Smoothies",
          i4p: "Fresh fruits — mango, berries, banana…",
          i5t: "Artisanal ice cream",
          i5p: "Vanilla, chocolate, pistachio, seasonal sorbets",
          i6t: "Drinks",
          i6p: "Water, softs, coffee · full list on site",
        },
        hours: {
          h2: "Hours & access",
          sub: "Summer hours — may vary with weather/attendance",
          h3: "Opening hours",
          mon: "Mon–Fri",
          sat: "Saturday",
          sun: "Sunday",
          note: "Winter: reduced hours. Please call to check.",
          addr: "Address",
          phone: "Phone",
        },
        reserve: {
          h2: "Book a bike",
          sub: "Secure online booking — instant confirmation",
          p1: "Pick your bike (e‑bike, MTB, city, gravel, tandem), dates and pickup point.",
          p2: "Helmets & locks included. Secure payment.",
          cta: "Go to booking",
        },
        reviews: {
          h2: "What guests say",
          sub: "Highlights from Google/TripAdvisor",
          r1: "Great avocado‑salmon tartine and a lovely terrace after our ride.",
          r2: "Super friendly staff, great route tips. Bikes in excellent condition.",
          r3: "Sauna after the ride was perfect. We’ll be back!",
        },
        contact: { h2: "Contact & FAQ", sub: "Need a tip? Drop by or send us a message" },
        faq: {
          q1: "Should I book in advance?",
          a1: "Recommended in summer and on weekends. Weekdays often have availability.",
          q2: "Do you deliver bikes?",
          a2: "On request and subject to availability. Contact us for a quote.",
          q3: "Do you have child seats?",
          a3: "Yes, child seats & trailers available as options (limited quantities).",
        },
        footer: { rights: "All rights reserved.", findUs: "Find us", links: "Useful links" },
        links: { reserve: "Book a bike", menu: "See the menu", hours: "Hours & access" },
      },
    }),
    []
  );

  const initialLang = (typeof navigator !== "undefined" && (navigator.language || "fr").toLowerCase().startsWith("en")) ? "en" : "fr";
  const [lang, setLang] = useState(initialLang);

  // --- small effects ------------------------------------------------------
  useEffect(() => {
    // close mobile menu on route/lang change if you wire routing later
  }, [lang]);

  const t = I18N[lang];

  // --- helpers ------------------------------------------------------------
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Styles scoped to this component */}
      <style>{`
        :root{--blue:#0f3557;--blue2:#155a8a;--green:#1b7a6e;--sand:#f6efe7;--text:#1d1f24;--muted:#5d6875}
        *{box-sizing:border-box}
        body{margin:0}
        .container{width:min(1120px,92%);margin-inline:auto}
        header{position:sticky;top:0;z-index:40;backdrop-filter:saturate(160%) blur(8px);background:rgba(255,255,255,.75);border-bottom:1px solid rgba(15,53,87,.08)}
        .nav{display:flex;align-items:center;justify-content:space-between;padding:.8rem 0}
        .brand{display:flex;align-items:center;gap:.7rem}
        .brandLogo{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,var(--blue),var(--green));display:grid;place-items:center;color:#fff;font-weight:800}
        .brandName{font-family:Inter,system-ui,sans-serif;font-weight:800;color:var(--blue)}
        .small{font-size:.92rem;color:#4a5563}
        .muted{color:var(--muted)}
        .navLinks{display:flex;gap:1rem;align-items:center}
        .navLinks a{padding:.4rem .6rem;border-radius:10px;font-weight:600;color:var(--text);text-decoration:none}
        .navLinks a:hover{background:rgba(15,53,87,.07)}
        .pill{display:inline-block;padding:.18rem .5rem;border-radius:999px;background:#eef5fb;color:#0e3b61;font-weight:700;font-size:.8rem}
        .langBtn{border:1px solid rgba(15,53,87,.15);background:#fff;padding:.35rem .6rem;border-radius:10px;font-weight:600;cursor:pointer}
        .langBtn.active{background:var(--blue);color:#fff;border-color:var(--blue)}
        .burger{display:none;border:none;background:transparent;font-size:1.6rem}
        @media (max-width:900px){.navLinks{display:none}.burger{display:block}}

        .hero{position:relative;min-height:72vh;display:grid;place-items:center;color:#fff;background:#000}
        .heroBg{position:absolute;inset:0;background:url('/img/hero.jpg') center/cover no-repeat}
        .heroOv{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.55))}
        .heroC{position:relative;padding:6rem 0;text-align:center}
        .eyebrow{display:inline-block;margin-bottom:.8rem;padding:.2rem .6rem;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(6px);font-weight:700}
        h1{font-family:Inter,system-ui,sans-serif;font-weight:800;font-size:clamp(1.6rem,6vw,3rem);margin:.3rem 0}
        section{padding:3.8rem 0}
        h2{font-family:Inter,system-ui,sans-serif;font-weight:800;color:var(--blue);margin:0 0 1.2rem}
        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
        @media (max-width:900px){.grid3{grid-template-columns:1fr}}
        .card{background:#fff;border:1px solid rgba(15,53,87,.08);border-radius:16px;overflow:hidden;box-shadow:0 6px 28px rgba(15,53,87,.06)}
        .img{aspect-ratio:16/10;background:#eee center/cover no-repeat}
        .body{padding:1rem}
        .features{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
        @media (max-width:900px){.features{grid-template-columns:1fr}}
        .feature{padding:1rem;border-radius:16px;border:1px solid rgba(15,53,87,.08)}
        .cta{display:inline-block;padding:.8rem 1.1rem;border-radius:12px;font-weight:800;text-decoration:none}
        .primary{background:var(--sand);color:#0c2b46}
        .ghost{border:1.5px solid rgba(255,255,255,.85);color:#fff;margin-left:.6rem}
        .menu{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
        @media (max-width:900px){.menu{grid-template-columns:1fr}}
        .menuItem{display:flex;gap:.8rem;align-items:flex-start;padding:1rem;border:1px solid rgba(15,53,87,.08);border-radius:14px}
        .dot{min-width:10px;min-height:10px;border-radius:50%;background:var(--green);margin-top:.4rem}
        .hours{display:grid;grid-template-columns:1fr 1.2fr;gap:1rem}
        @media (max-width:900px){.hours{grid-template-columns:1fr}}
        table{width:100%;border-collapse:collapse}
        td{padding:.55rem;border-bottom:1px dashed rgba(15,53,87,.1)}
        .map{position:relative;aspect-ratio:16/10;border-radius:16px;overflow:hidden;border:1px solid rgba(15,53,87,.08)}
        .map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
        .review{padding:1rem;border:1px solid rgba(15,53,87,.08);border-radius:14px}
        footer{background:var(--sand);padding:2rem 0;margin-top:2rem;border-top:1px solid rgba(15,53,87,.1)}
        .footerGrid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:1rem}
        @media (max-width:900px){.footerGrid{grid-template-columns:1fr}}
      `}</style>

      {/* Header */}
      <header>
        <nav className="container nav" aria-label="Primary">
          <div className="brand">
            <div className="brandLogo" aria-hidden>AC</div>
            <div>
              <div className="brandName">Au Coup de Pompe</div>
              <div className="small muted">{t.tag}</div>
            </div>
          </div>
          <div className="navLinks" role="menubar">
            <a onClick={() => scrollToId("services")} role="menuitem">{t.nav.services}</a>
            <a onClick={() => scrollToId("menu")} role="menuitem">{t.nav.menu}</a>
            <a onClick={() => scrollToId("hours")} role="menuitem">{t.nav.hours}</a>
            <a onClick={() => scrollToId("contact")} role="menuitem">{t.nav.contact}</a>
            <a onClick={() => scrollToId("reserve")} className="pill" role="menuitem">{t.nav.reserve}</a>
            <div style={{ display: "flex", gap: ".25rem", alignItems: "center" }} aria-label="Language switcher">
              <button className={`langBtn ${lang === "fr" ? "active" : ""}`} onClick={() => setLang("fr")}>
                FR
              </button>
              <button className={`langBtn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
          </div>
          <button className="burger" aria-label="Menu" aria-expanded="false">☰</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="home" aria-label="Hero">
        <div className="heroBg" aria-hidden />
        <div className="heroOv" aria-hidden />
        <div className="heroC container">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>{t.hero.h1}</h1>
          <p style={{ maxWidth: 720, margin: ".5rem auto 1.2rem", color: "#e6eef7" }}>{t.hero.p}</p>
          <div>
            <a href="#reserve" className="cta primary">{t.hero.ctaPrimary}</a>
            <a href="#menu" className="cta ghost">{t.hero.ctaGhost}</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container">
        <h2>{t.services.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.services.sub}</p>
        <div className="grid3">
          <article className="card">
            <div className="img" style={{ backgroundImage: "url('/img/velo.jpg')" }} />
            <div className="body">
              <span className="pill">{t.services.bikes.pill}</span>
              <h3>{t.services.bikes.h3}</h3>
              <p>{t.services.bikes.p}</p>
            </div>
          </article>
          <article className="card">
            <div className="img" style={{ backgroundImage: "url('/img/snack.jpg')" }} />
            <div className="body">
              <span className="pill">{t.services.snack.pill}</span>
              <h3>{t.services.snack.h3}</h3>
              <p>{t.services.snack.p}</p>
            </div>
          </article>
          <article className="card">
            <div className="img" style={{ backgroundImage: "url('/img/sauna.jpg')" }} />
            <div className="body">
              <span className="pill">{t.services.relax.pill}</span>
              <h3>{t.services.relax.h3}</h3>
              <p>{t.services.relax.p}</p>
            </div>
          </article>
        </div>
        <div className="features" style={{ marginTop: 16 }}>
          <div className="feature">
            <strong>{t.services.f1t}</strong>
            <div className="muted">{t.services.f1p}</div>
          </div>
          <div className="feature">
            <strong>{t.services.f2t}</strong>
            <div className="muted">{t.services.f2p}</div>
          </div>
          <div className="feature">
            <strong>{t.services.f3t}</strong>
            <div className="muted">{t.services.f3p}</div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="container" aria-label="Menu">
        <h2>{t.menu.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.menu.sub}</p>
        <div className="menu">
          {[{ t: t.menu.i1t, p: t.menu.i1p }, { t: t.menu.i2t, p: t.menu.i2p }, { t: t.menu.i3t, p: t.menu.i3p }, { t: t.menu.i4t, p: t.menu.i4p }, { t: t.menu.i5t, p: t.menu.i5p }, { t: t.menu.i6t, p: t.menu.i6p }].map((m, i) => (
            <div className="menuItem" key={i}>
              <span className="dot" />
              <div>
                <strong>{m.t}</strong>
                <div className="muted">{m.p}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hours & access */}
      <section id="hours" className="container">
        <h2>{t.hours.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.hours.sub}</p>
        <div className="hours">
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>{t.hours.h3}</h3>
            <table aria-label="Opening hours">
              <tbody>
                <tr><td>{t.hours.mon}</td><td>09:00 – 18:30</td></tr>
                <tr><td>{t.hours.sat}</td><td>09:00 – 18:30</td></tr>
                <tr><td>{t.hours.sun}</td><td>09:00 – 18:30</td></tr>
              </tbody>
            </table>
            <p className="small muted">{t.hours.note}</p>
            <hr style={{ border: "none", borderTop: "1px solid rgba(15,53,87,.08)", margin: ".8rem 0" }} />
            <p><strong>{t.hours.addr}</strong> — 400 route du Taillefer, 74210 Doussard</p>
            <p><strong>{t.hours.phone}</strong> — <a href="tel:+33699193785">06 99 19 37 85</a></p>
          </div>
          <div className="map">
            <iframe
              title="Google Map"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=400%20route%20du%20Taillefer%2074210%20Doussard&output=embed"
            />
          </div>
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="container" aria-label="Reserve">
        <h2>{t.reserve.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.reserve.sub}</p>
        <div className="card" style={{ padding: 10, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: ".2rem 0" }}>{t.reserve.p1}</p>
            <p className="muted" style={{ margin: ".2rem 0" }}>{t.reserve.p2}</p>
          </div>
          <a className="cta primary" href="https://lokki.app/your-shop-or-real-url" target="_blank" rel="noopener noreferrer">{t.reserve.cta}</a>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container" aria-label="Avis">
        <h2>{t.reviews.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.reviews.sub}</p>
        <div className="grid3">
          <div className="review"><strong>★ ★ ★ ★ ☆</strong><br />{t.reviews.r1}</div>
          <div className="review"><strong>★ ★ ★ ★ ★</strong><br />{t.reviews.r2}</div>
          <div className="review"><strong>★ ★ ★ ★ ☆</strong><br />{t.reviews.r3}</div>
        </div>
      </section>

      {/* Contact & FAQ */}
      <section id="contact" className="container" aria-label="Contact & FAQ">
        <h2>{t.contact.h2}</h2>
        <p className="muted" style={{ marginTop: -12 }}>{t.contact.sub}</p>
        <div className="features">
          <div className="feature">
            <strong>{t.faq.q1}</strong>
            <div className="muted">{t.faq.a1}</div>
          </div>
          <div className="feature">
            <strong>{t.faq.q2}</strong>
            <div className="muted">{t.faq.a2}</div>
          </div>
          <div className="feature">
            <strong>{t.faq.q3}</strong>
            <div className="muted">{t.faq.a3}</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footerGrid">
          <div>
            <div className="brand" style={{ gap: ".6rem" }}>
              <div className="brandLogo" aria-hidden>AC</div>
              <div>
                <div className="brandName">Au Coup de Pompe</div>
                <div className="small muted">{t.tag}</div>
              </div>
            </div>
            <p className="small" style={{ margin: ".6rem 0 0" }}>© {new Date().getFullYear()} · {t.footer.rights}</p>
          </div>
          <div>
            <strong>{t.footer.findUs}</strong>
            <p className="small">400 route du Taillefer<br />74210 Doussard</p>
            <p className="small"><a href="tel:+33699193785">06 99 19 37 85</a></p>
          </div>
          <div>
            <strong>{t.footer.links}</strong>
            <p className="small">
              <a href="#reserve">{t.links.reserve}</a><br />
              <a href="#menu">{t.links.menu}</a><br />
              <a href="#hours">{t.links.hours}</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
