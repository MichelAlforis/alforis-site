import { getBaseUrl } from '@/lib/url'

export default function sitemap() {
  const baseUrl = getBaseUrl()
  const locales = ['fr', 'en', 'es', 'pt']
  const lastModified = new Date()

  // Pages B2B multilingues (priorité haute)
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
    // Page d'accueil (priorité maximale)
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    // Pages B2B (priorité haute)
    ...b2bPages,
    // Vous pouvez ajouter d'autres pages ici
  ]
}