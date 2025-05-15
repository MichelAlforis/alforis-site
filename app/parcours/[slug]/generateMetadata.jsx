// app/parcours/[slug]/generateMetadata.jsx
import { getContentMeta } from '@/lib/server/getContent'

export async function generateMetadata({ params }) {
  const meta = getContentMeta('parcours', params.slug)
  if (!meta) return { title: 'Parcours – Alforis' }

  const title = `${meta.title} – Alforis`
  const description = meta.description || meta.title
  const url = `https://www.alforis.fr/parcours/${params.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'article',
      images: meta.image ? [meta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: meta.image ? [meta.image] : [],
    },
  }
}
