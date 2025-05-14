// next.config.js
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // On filtre les règles pour exclure les fichiers .svg du traitement par file-loader
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test instanceof RegExp && rule.test.test('.svg')
    )

    if (fileLoaderRule) {
      // On exclut les fichiers .svg pour éviter qu'ils soient traités par file-loader
      fileLoaderRule.exclude = /\.svg$/i
    }

    // On ajoute une règle pour traiter les fichiers .svg avec @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,  // Limite l'utilisation de cette règle aux fichiers .js, .jsx, .ts, .tsx
      use: ['@svgr/webpack'], // Utilisation de svgr pour convertir les SVG en composants React
    })

    return config
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // Important pour permettre les exports JS
    providerImportSource: "@mdx-js/react",
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'], // ajoute .mdx ici
})

module.exports = nextConfig
