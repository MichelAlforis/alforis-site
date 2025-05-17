import BlogStudioContent from './BlogStudioContent'
import { fetchAllContent } from '@/lib/server/fetchAllContent'

export async function generateMetadata() {
  return {
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
}

export default async function Page() {
  const all = await fetchAllContent()
  const content = all.filter(
    (item) => item.type === 'Blog' || item.type === 'Studio'
  )

  // console.log('🟡 FILTERED Blog & Studio :', content)
  return <BlogStudioContent content={content} />
}
