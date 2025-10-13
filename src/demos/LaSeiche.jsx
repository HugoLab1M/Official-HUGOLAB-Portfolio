import { useEffect } from "react";
import Header from "./la-seiche/components/Header.jsx";
import Hero from "./la-seiche/components/Hero.jsx";
import Agenda from "./la-seiche/components/Agenda.jsx";
import Stands from "./la-seiche/components/Stands.jsx";
import PrivatisationCTA from "./la-seiche/components/Ctas.jsx";
import Instagram from "./la-seiche/components/Instagram.jsx";
import Newsletter from "./la-seiche/components/Newsletter.jsx";
import Footer from "./la-seiche/components/Footer.jsx";

export default function LaSeiche() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = (() => {
      const meta = document.querySelector('meta[name="description"]');
      return meta ? meta.getAttribute("content") : "";
    })();

    document.title = "La Seiche — bar • restaurants • loisirs (Sévrier)";
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute(
      "content",
      "Marché de la Seiche à Sévrier : agenda soirées, food-court, privatisation et newsletter."
    );

    return () => {
      document.title = previousTitle;
      if (descriptionTag) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F1730]">
      <Header />
      <main>
        <Hero />
        <Agenda />
        <Stands />
        <PrivatisationCTA />
        <Instagram />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
