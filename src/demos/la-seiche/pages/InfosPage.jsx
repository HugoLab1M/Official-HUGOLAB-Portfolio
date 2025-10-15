import InfosSection from "../components/Newsletter.jsx";
import ReviewsTeaser from "../components/ReviewsTeaser.jsx";

export default function InfosPage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">
            Informations pratiques
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-[1.1] sm:text-[2.3rem]">
            Accès, horaires, newsletter et contacts directs
          </h1>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Retrouvez les informations essentielles pour organiser votre venue à La Seiche : plan d’accès,
            contacts, horaires d’ouverture, newsletter hebdomadaire et liens vers les réseaux sociaux.
          </p>
        </div>
      </section>
      <InfosSection />
      <ReviewsTeaser />
    </div>
  );
}
