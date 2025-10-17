const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        doré: 'rgb(242 158 76)',        // #F29E4C → Accent chaud lisible (remplace E28F5A)
        ardoise: 'rgb(31 59 77)',       // #1F3B4D → Bleu pétrole profond (remplace #2E3A48 si souhaité)
        acier: 'rgb(91 109 127)',       // #5B6D7F → Support froid doux
        ivoire: 'rgb(243 243 243)',     // #F3F3F3 → Fond plus lisible que #F5F5F5
        anthracite: 'rgb(34 34 34)',    // #222222 → Texte légèrement renforcé
        vertSauge: 'rgb(181 191 161)', // #B5BFA1 → Neutre doux mieux différencié
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        title: ['Neue Montreal', 'sans-serif'],
      },
      fontSize: {
        md: '1rem',
      },
      spacing: {
        nav: 'var(--nav-height)',           // h-nav → hauteur navbar
        navbarOffset: 'var(--navbar-offset)',  // mt-navbarOffset → marge
        // Espacements personnalisés pour une meilleure respiration
        18: '4.5rem',   // 72px
        22: '5.5rem',   // 88px
        26: '6.5rem',   // 104px
        30: '7.5rem',   // 120px
        34: '8.5rem',   // 136px
        section: '5rem',      // Espacement entre sections
        'section-lg': '7rem', // Espacement large entre sections
      },
      boxShadow: {
        retro: '0 0 0 2px #C8A765, 0 0 10px #C8A76566',
        'pressed-inner': 'inset 0 2px 6px rgba(0, 0, 0, 0.3)',
        // Système d'ombres amélioré pour plus de profondeur
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm-soft': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'md-soft': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'lg-soft': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
        'xl-soft': '0 12px 32px 0 rgba(0, 0, 0, 0.15)',
        'premium': '0 20px 50px -12px rgba(31, 59, 77, 0.25)',
        'glow-doré': '0 0 20px rgba(242, 158, 76, 0.3)',
        'glow-ardoise': '0 0 20px rgba(31, 59, 77, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'scale-up': 'scaleUp 0.2s ease-in-out',
        glitch: 'glitch 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'premium': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      scale: {
        98: '0.98',
      },
    },
  },
  plugins: [
    // Plugin officiel de typographie pour générer les classes 'prose'
    require('@tailwindcss/typography'),
    // Personnalisation des utilitaires 'fill' et 'stroke'
    plugin(function ({ matchUtilities, theme }) {
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
        { fill: (value) => ({ '--fill-color': value }) },
        { values: Object.fromEntries(colors) }
      );
      matchUtilities(
        { stroke: (value) => ({ '--stroke-color': value }) },
        { values: Object.fromEntries(colors) }
      );
    }),
    // Utilitaire pour le scrolling fluide sur iOS
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scroll-touch': { '-webkit-overflow-scrolling': 'touch' },
      });
    }),
  ],
};
