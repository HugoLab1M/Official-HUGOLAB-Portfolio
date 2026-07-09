import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { ArrowRight, ArrowDown, MapPin, Phone, Mail } from "lucide-react";

/*
  Refuge Altara — maquette vitrine "haut de gamme" :
  parallaxe au scroll, compteurs animés, image reveals, marquee,
  section sticky de storytelling. Démonstration du savoir-faire HügoLab.
*/

const NIGHT = "#12100E";
const SNOW = "#F4F0E9";
const AMBER = "#C98F4E";

const IMG = {
  hero: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80",
  valley: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  suite: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
  bath: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=80",
  table: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  fire: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80",
  peaks: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
};

/* ---------- primitives d'animation ---------- */

function Reveal({ children, delay = 0, y = 32, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageReveal({ src, alt, ratio = "aspect-[4/5]", className = "" }) {
  return (
    <div className={`relative overflow-hidden ${ratio} ${className}`}>
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-10 origin-top"
        style={{ background: NIGHT }}
        aria-hidden
      />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function Counter({ to, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(value, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    const unsub = value.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="altara-serif text-5xl md:text-6xl" style={{ color: AMBER }}>
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
    </div>
  );
}

function Marquee({ items }) {
  const content = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y py-5" style={{ borderColor: "rgba(244,240,233,0.12)" }} aria-hidden>
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {content.map((item, i) => (
          <span key={i} className="altara-serif flex items-center gap-12 text-2xl italic text-white/40">
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative flex h-[105vh] items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: yImg, scale }}>
        <img src={IMG.hero} alt="Le chalet Refuge Altara au bord d’un lac de montagne" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #12100E 4%, rgba(18,16,14,0.35) 45%, rgba(18,16,14,0.25))" }} />
      </motion.div>
      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: AMBER }}
        >
          Chalet d’exception · 1 620 m · Massif des Bauges
        </motion.p>
        <h1 className="altara-serif mt-6 max-w-3xl text-5xl leading-[1.05] text-white md:text-7xl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Le silence,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block italic"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: AMBER }}
            >
              en très grand luxe.
            </motion.span>
          </span>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#sejour"
            className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: SNOW, color: NIGHT }}
          >
            Réserver un séjour
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <p className="flex items-center gap-2 text-sm text-white/60">
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
            Faites défiler
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: AMBER }}>Le lieu</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="altara-serif mt-6 text-4xl leading-tight text-white md:text-5xl">
              Un ancien refuge d’alpage, <em style={{ color: AMBER }}>réinventé</em> pour huit hôtes.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md leading-relaxed text-white/60">
              Restauré pendant trois ans par des artisans du massif, Altara conjugue pierre du pays,
              chêne brossé et baies plein sud sur le lac. Quatre suites, un chef à demeure,
              un bain nordique sous les étoiles — et aucun voisin à moins d’un kilomètre.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#sejour" className="mt-10 inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold text-white transition-colors hover:text-[#C98F4E]" style={{ borderColor: AMBER }}>
              Découvrir les suites
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </div>
        <div className="relative">
          <motion.div style={{ y: y1 }}>
            <ImageReveal src={IMG.suite} alt="Suite du refuge : lit en chêne face à la baie vitrée sur les sommets" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-16 -left-10 hidden w-2/5 md:block">
            <ImageReveal src={IMG.fire} alt="Apéritif entre hôtes au salon du refuge" ratio="aspect-square" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-12 sm:grid-cols-3">
        <Counter to={1620} suffix=" m" label="d’altitude" />
        <Counter to={4} label="suites seulement" />
        <Counter to={360} suffix="°" label="de panorama" />
      </div>
    </section>
  );
}

const EXPERIENCES = [
  {
    img: IMG.table,
    title: "La table du chef",
    text: "Menu unique chaque soir, cuisiné au feu de bois avec les fermes du plateau.",
  },
  {
    img: IMG.bath,
    title: "Bain & soins",
    text: "Bain nordique, sauna panoramique et massages sur demande, face au vide.",
  },
  {
    img: IMG.peaks,
    title: "Guides privés",
    text: "Ski de rando, trail des crêtes ou lever de soleil en parapente — accompagné.",
  },
];

function Experiences() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: AMBER }}>Expériences</p>
        <h2 className="altara-serif mt-6 max-w-xl text-4xl leading-tight text-white md:text-5xl">
          Chaque journée s’écrit sur mesure.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {EXPERIENCES.map((xp, i) => (
          <Reveal key={xp.title} delay={i * 0.12} className="group">
            <ImageReveal src={xp.img} alt={xp.title} ratio="aspect-[3/4]" />
            <h3 className="altara-serif mt-6 text-2xl text-white transition-colors group-hover:text-[#C98F4E]">{xp.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{xp.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="sejour" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={IMG.valley} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(18,16,14,0.82)" }} />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: AMBER }}>Séjours 2026</p>
          <h2 className="altara-serif mt-6 text-4xl leading-tight text-white md:text-6xl">
            Le refuge se privatise, <em style={{ color: AMBER }}>rarement</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-white/60">
            22 semaines d’ouverture par an, du jeudi au dimanche ou à la semaine.
            Séjour à partir de 2 900 € la nuit, tout inclus, pour huit personnes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:sejour@refuge-altara.fr"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: AMBER, color: NIGHT }}
            >
              Demander les disponibilités
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="tel:+33450000000"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-[#C98F4E]"
            >
              <Phone className="h-4 w-4" aria-hidden />
              +33 4 50 00 00 00
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function RefugeAltara() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen" style={{ background: NIGHT, color: SNOW, fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital@1&display=swap');
        .altara-serif { font-family: 'Marcellus', Georgia, serif; }
        .altara-serif em, .altara-serif .italic, .altara-serif i { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; }
      `}</style>

      {/* barre de progression de lecture */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
        style={{ scaleX: progress, background: AMBER }}
        aria-hidden
      />

      {/* header transparent */}
      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <p className="altara-serif text-xl tracking-[0.2em] text-white">ALTARA</p>
          <a
            href="#sejour"
            className="rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-[#C98F4E] hover:text-[#C98F4E]"
          >
            Réserver
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <Marquee items={["Quatre suites", "Chef à demeure", "Bain nordique", "Guides privés", "Accès héliport", "Massif des Bauges"]} />
        <Story />
        <Stats />
        <Experiences />
        <Booking />
      </main>

      <footer className="border-t px-6 py-10" style={{ borderColor: "rgba(244,240,233,0.12)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Refuge Altara — Maquette démonstration HügoLab</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden /> Massif des Bauges</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" aria-hidden /> sejour@refuge-altara.fr</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
