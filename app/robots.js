import { getBaseUrl } from '@/lib/url'

export default function robots() {
  const baseUrl = getBaseUrl()
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}