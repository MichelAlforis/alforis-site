import remarkGfm from 'remark-gfm'
import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  // Dynamic import for ESM-only module
  const { default: remarkGfmPlugin } = await import('remark-gfm')

  // Setup MDX with remark-gfm
  const mdx = withMDX({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [remarkGfmPlugin]
    }
  })

  return mdx({
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack(config) {
      // Support SVG imports via @svgr/webpack
      const fileLoaderRule = config.module.rules.find(
        rule => rule.test?.test?.('.svg')
      )
      if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      })

      return config
    }
  })
}

export default nextConfig
