import InfosSection from "../components/Newsletter.jsx";
import ReviewsTeaser from "../components/ReviewsTeaser.jsx";

const LEAD_BG =
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80";

export default function InfosPage() {
  return (
    <div className="bg-[var(--bg)]">
      <header className="relative isolate overflow-hidden">
        <img
          src={LEAD_BG}
          alt="Informations La Seiche"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110b07]/80 via-[#110b07]/40 to-[#110b07]/80" />
        <div className="relative mx-auto flex min-h-[400px] max-w-6xl flex-col justify-center gap-6 px-4 py-16 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.14em] uppercase">Informations pratiques</p>
          <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-5xl">
            Accès, horaires, newsletter et contacts directs
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Retrouvez les informations essentielles pour organiser votre venue à La Seiche : plan d’accès,
            contacts, horaires d’ouverture, newsletter hebdomadaire et liens vers les réseaux sociaux.
          </p>
        </div>
      </header>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" />
      </section>
      <InfosSection />
      <ReviewsTeaser />
    </div>
  );
}
