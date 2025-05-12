const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // si tu utilises /app
    './styles/globals.css' 
  ],
  
  theme: {
    extend: {
      colors: {
        doré: "#C8A765",
        ardoise: "#2E3A48",
        acier: "#4A5A6A",
        ivoire: "#F5F5F5",
        anthracite: "#1D1D1D",
        beigeClair: "#D1C5B0"
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        title: ['Neue Montreal', 'sans-serif'],
      },
      fontSize: {
        'md': '1rem',  // Définir text-md à 1rem (taille par défaut)
      },
      boxShadow: {
        retro: '0 0 0 2px #C8A765, 0 0 10px #C8A76566',
        'pressed-inner': 'inset 0 2px 6px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        doré: '0 0 8px #C8A765',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
          '100%': { transform: 'scale(1.05)', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(-2px, -1px)' },
          '60%': { transform: 'translate(1px, 2px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'scale-up': 'scaleUp 0.2s ease-in-out',
        glitch: 'glitch 0.3s ease-in-out',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin(
      
      function ({ matchUtilities, theme }) {
      const flattenColorPalette = (colors) =>
        Object.entries(colors).flatMap(([key, value]) =>
          typeof value === 'object'
            ? Object.entries(value).map(([subKey, subValue]) => [
                `${key}-${subKey}`,
                subValue,
              ])
            : [[key, value]]
        );
      
      const colors = flattenColorPalette(theme('colors'));

      matchUtilities(
        {
          fill: (value) => ({ '--fill-color': value }),
        },
        { values: Object.fromEntries(colors) }
      );

      matchUtilities(
        {
          stroke: (value) => ({ '--stroke-color': value }),
        },
        { values: Object.fromEntries(colors) }
      );
    }),

    function ({ addUtilities }) {
      addUtilities({
        '.scroll-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
      });
    },
  ],
};
