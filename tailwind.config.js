/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#1f1d22",
        "ink-soft": "#6a6269",
        shell: "#fff8f7",
        "shell-strong": "#ffe3e0",
        "brand-red": "#c2001a",
        "brand-red-dark": "#900015",
        "brand-rose": "#ff6f61",
        "brand-sand": "#f7d7cc",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 50px -20px rgba(194, 0, 26, 0.45)",
        card: "0 22px 40px -25px rgba(144, 0, 21, 0.45)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(130deg, #c2001a 0%, #ff6f61 65%, #ffe3e0 100%)",
        "shell-gradient": "linear-gradient(135deg, #fffaf9 0%, #fff1ef 55%, #ffe3e0 100%)",
        "rose-radial": "radial-gradient(circle at 15% 20%, rgba(255, 111, 97, 0.28), transparent 60%)",
      },
    },
  },
  plugins: [],
};
