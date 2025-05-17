// app/parcours/[slug]/page.jsx

import ClientParcoursWrapper from './ClientParcoursWrapper'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentSlugs('parcours').map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  return <ClientParcoursWrapper meta={result.meta} slug={slug} />
}