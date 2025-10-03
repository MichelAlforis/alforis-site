import remarkGfm from 'remark-gfm'
import withMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.js')

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  const { default: remarkGfmPlugin } = await import('remark-gfm')

  const mdx = withMDX({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [remarkGfmPlugin]
    }
  })

  const baseConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
    },
    
    compress: true,
    
    async headers() {
      return [
        {
          source: '/assets/img/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/:locale/b2b',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
        {
          source: '/sitemap.xml',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, s-maxage=3600',
            },
          ],
        },
      ]
    },
    
    webpack(config) {
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
  }

  return mdx(withNextIntl(baseConfig))
}

export default nextConfig