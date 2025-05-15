// app/parcours/[slug]/page.jsx
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export async function generateStaticParams() {
  return getContentSlugs('parcours')
}

export default async function ParcoursPage({ params }) {
  const result = getContentMeta('parcours', params.slug)
  if (!result || !result.meta) notFound()

  const { meta } = result

  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      <ParcoursFormulaire meta={meta} slug={params.slug} />
    </main>
  )
}
