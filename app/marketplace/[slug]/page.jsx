// app/marketplace/[slug]/page.jsx
export { generateMetadata } from './generateMetadata'

import { MDXRemote } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

const components = { CTA }

export async function generateStaticParams() {
  // On génère un tableau de { slug } pour toutes les offres
  const slugs = await getContentSlugs('offres')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function OffrePage({ params }) {
  // ↳ Next.js 15 passe params comme Promise, il faut donc l’awaiter avant d’en extraire slug :contentReference[oaicite:0]{index=0}
  const { slug } = await params

  // ↳ getContentMeta est asynchrone, on attend donc aussi son résultat
  const result = await getContentMeta('offres', slug)
  if (!result?.meta) notFound()

  const { meta, content } = result

  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-auto mb-8 rounded-lg shadow object-cover"
        />
      )}

      <h1 className="text-4xl font-title text-ardoise mb-6 leading-snug">
        {meta.title}
      </h1>

      <article className="prose-alforis">
        {content && <MDXRemote source={content} components={components} />}
      </article>
    </main>
  )
}
