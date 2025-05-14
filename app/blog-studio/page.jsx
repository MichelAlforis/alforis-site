/* app/blog-studio/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Blog & Studio – Alforis',
  description:
    'Vision libre et sans filtre du patrimoine. Vidéos, réflexions, articles stratégiques.',
  keywords: [
    'studio patrimoine',
    'blog gestion de patrimoine',
    'stratégie patrimoniale',
  ],
  openGraph: {
    title: 'Blog & Studio – Alforis',
    description:
      'Vision libre et sans filtre du patrimoine. Vidéos, réflexions, articles stratégiques.',
    url: 'https://www.alforis.fr/blog-studio',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/blog-studio.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/blog-studio' },
}

import BlogStudioContent from './BlogStudioContent'
import { fetchAllContent } from '@/lib/server/fetchAllContent'  // ✅ Correct (named import)

export default async function Page() {
  const content = await fetchAllContent()
  
  return <BlogStudioContent content={content} />
}