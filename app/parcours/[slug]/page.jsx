import FormPage from './FormPage'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateStaticParams() {
  const slugs = getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ParcoursPage({ params }) {
  const { slug } = params
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  const { meta } = result

  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      <Suspense fallback={null}>
        <FormPage meta={meta} slug={slug} />
      </Suspense>
    </main>
  )
}
