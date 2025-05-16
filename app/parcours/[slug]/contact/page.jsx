// app/parcours/[slug]/contact/page.jsx
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import ContactClient from './ContactClient'

export async function generateStaticParams() {
  const slugs = await getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = params
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()

  return <ContactClient slug={slug} meta={result.meta} />
}
