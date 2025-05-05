const { couleurs } = require('./styles/generated-colors');

module.exports = {
  plugins: {
    'postcss-simple-vars': {
      variables: () => couleurs,
    },
    tailwindcss: {}, // ✅ Standard, pas besoin de @tailwindcss/postcss
    autoprefixer: {},
  },
};
