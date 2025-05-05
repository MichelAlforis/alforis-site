const { couleurs } = require('./styles/generated-colors'); // ✅
module.exports = {
  plugins: {
    'postcss-simple-vars': {
      variables: () => couleurs,
    },
    tailwindcss: {}, // ✅ CORRECT
    autoprefixer: {},
  },
};
