// app/blog-studio/page.jsx
import { fetchAllContent } from '@/lib/server/fetchAllContent'
import PageClient from './PageClient'

export async function generateMetadata() {
  return {
    title: 'Blog & Studio',
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
}

export default async function Page() {
  const all = await fetchAllContent()
  const content = all.filter(item => ['Blog','Studio'].includes(item.type))
  return <PageClient content={content} />
}
