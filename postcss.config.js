const couleurs = require('./styles/generated-colors.js')?.couleurs ?? {};

module.exports = {
  plugins: {
    'postcss-simple-vars': { variables: () => couleurs },
    tailwindcss: {},
    autoprefixer: {},
  },
};
