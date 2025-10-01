// src/pages/Home.jsx

export default function Home() {
    return (
      <main className="min-h-screen bg-white dark:bg-neutral-950">
        <section className="max-w-6xl mx-auto py-24 px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Bienvenue sur HügoLab</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Je crée des sites modernes, soignés et professionnels pour entrepreneurs et commerces.
          </p>
          <a
            href="/projects"
            className="inline-block bg-blue-600 text-white dark:bg-blue-500 px-6 py-3 rounded-xl font-medium shadow hover:shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Voir mes projets →
          </a>
        </section>
      </main>
    );
  }
  
