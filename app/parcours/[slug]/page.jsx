// app/parcours/[slug]/page.jsx
import ClientParcoursWrapper from './ClientParcoursWrapper'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import { makeMetadata } from '@/lib/makeMetadata'

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = await getContentMeta('parcours', slug)
  return makeMetadata({ meta: meta || {}, slug, section: 'parcours' })
}


export async function generateStaticParams() {
  const slugs = await getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = await params;
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  return <ClientParcoursWrapper meta={result.meta} slug={slug} />
}