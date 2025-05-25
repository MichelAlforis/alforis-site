// app/parcours/[slug]/page.jsx
import ClientParcoursWrapper from './ClientParcoursWrapper'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }) {
  const { slug } = await params
  const meta = await getContentMeta('parcours', slug)
  if (!meta) return { title: 'Parcours – Alforis' }

  const title = `${meta.title} – Alforis`
  const description = meta.description || meta.title
  const url = `https://www.alforis.fr/parcours/${slug}`

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


export async function generateStaticParams() {
  return getContentSlugs('parcours').map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  return <ClientParcoursWrapper meta={result.meta} slug={slug} />
}