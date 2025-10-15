import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./la-seiche/components/Header.jsx";
import Footer from "./la-seiche/components/Footer.jsx";
import HomePage from "./la-seiche/pages/HomePage.jsx";
import RestaurantPage from "./la-seiche/pages/RestaurantPage.jsx";
import BarPage from "./la-seiche/pages/BarPage.jsx";
import LoisirsPage from "./la-seiche/pages/LoisirsPage.jsx";
import AgendaPage from "./la-seiche/pages/AgendaPage.jsx";
import PhotosPage from "./la-seiche/pages/PhotosPage.jsx";
import InfosPage from "./la-seiche/pages/InfosPage.jsx";
import BlogPage from "./la-seiche/pages/BlogPage.jsx";
import PrivatisationsPage from "./la-seiche/pages/PrivatisationsPage.jsx";

export default function LaSeiche() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = (() => {
      const meta = document.querySelector('meta[name="description"]');
      return meta ? meta.getAttribute("content") : "";
    })();

    document.title = "La Seiche — bar • restaurants • loisirs (maquette)";
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute(
      "content",
      "Maquette La Seiche : food court, bar signature, agenda live, privatisations et infos pratiques à Sévrier."
    );

    return () => {
      document.title = previousTitle;
      if (descriptionTag) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Header />
      <main className="pb-16">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="restaurant" element={<RestaurantPage />} />
          <Route path="bar" element={<BarPage />} />
          <Route path="loisirs" element={<LoisirsPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="photos" element={<PhotosPage />} />
          <Route path="infos" element={<InfosPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="privatisations" element={<PrivatisationsPage />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
