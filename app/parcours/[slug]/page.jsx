// app/parcours/[slug]/page.jsx
import FormPage from './FormPage'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ParcoursPage({ params: { slug } }) {
  const { meta } = await getContentMeta('parcours', slug) || {}
  if (!meta) notFound()

  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      <FormPage meta={meta} slug={slug} />
    </main>
  )
}
