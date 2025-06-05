import {withSentryConfig} from '@sentry/nextjs';
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

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "alforis",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});