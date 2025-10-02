// postcss.config.mjs
import { couleurs } from './styles/generated-colors.mjs';

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // remplace "postcss-easy-import" par l’officiel
    'postcss-import': {},
    // garde l’imbrication
    'postcss-nested': {},
    // injecte tes variables couleur
    'postcss-simple-vars': {
      variables: couleurs
    },
    // si tu utilises Tailwind
    tailwindcss: {},
    // autoprefixer standard
    autoprefixer: {},
  }
};
