module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-simple-vars': {
      variables: () => couleurs,
  },
}
