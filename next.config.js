// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Pour que Next.js traite aussi tes pages .mdx si besoin
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  webpack(config, { defaultLoaders, isServer }) {
    // --- 1) Gestion des SVG avec SVGR ---
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test instanceof RegExp && rule.test.test('.svg')
    )
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    // --- 2) (Optionnel) Ajout manuel du loader MDX si nécessaire ---
    // Avec withMDX, ce bloc n'est généralement pas requis,
    // mais tu peux le laisser si tu veux forcer le loader MDX ici :
    /*
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: { /* remark/rehype plugins ici *\/ },
        },
      ],
    })
    */

    return config
  },
}

// Seule exportation : intègre la config MDX **et** ta config Next principale
module.exports = withMDX(nextConfig)
