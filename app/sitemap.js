import { getBaseUrl } from '@/lib/url'

export default function sitemap() {
  const baseUrl = getBaseUrl()
  const locales = ['fr', 'en', 'es', 'pt']
  const lastModified = new Date()

  const b2bPages = locales.map(locale => ({
    url: `${baseUrl}/${locale}/b2b`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [l, `${baseUrl}/${l}/b2b`])
      )
    }
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    ...b2bPages
  ]
}