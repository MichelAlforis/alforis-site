// app/parcours/[slug]/contact/page.jsx
import ContactClient from './ContactClient'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentSlugs('parcours').map(({ slug }) => ({ slug }))
}

export default async function ContactPage({ params: { slug } }) {
  const { meta } = await getContentMeta('parcours', slug) || {}
  if (!meta) notFound()
  return <ContactClient meta={meta} slug={slug} />
}
