/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8A765',   // Or doux – pour boutons, accents, éléments premium
          dark: '#A48648',      // Variante plus sombre
        },
        background: {
          DEFAULT: '#2E3A48',   // Bleu ardoise – fond principal
          light: '#4A5A6A',     // Bleu acier – fond secondaire
        },
        text: {
          DEFAULT: '#F5F5F5',   // Blanc cassé – texte sur fond sombre
          dark: '#1D1D1D',      // Noir anthracite – texte sur fond clair
        },
        steel: '#4A5A6A',        // Bleu acier (si besoin direct)
        gold: '#C8A765',         // Alias direct du doré
        navy: '#2E3A48',         // Alias direct du bleu ardoise
        cream: '#F5F5F5',        // Alias direct du blanc cassé
        anthracite: '#1D1D1D',   // Alias direct du noir anthracite
        'border-light': '#D1C5B0', // Bordure claire
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Inter', 'ui-sans-serif', 'system-ui'],
        title: ['"Playfair Display"', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
