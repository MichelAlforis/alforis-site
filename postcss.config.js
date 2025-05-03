const { couleurs } = require('./styles/colors');

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-simple-vars': {
      variables: () => couleurs,
    },
  },
};
