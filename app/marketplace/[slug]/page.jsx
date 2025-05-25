// app/marketplace/[slug]/page.jsx
export { generateMetadata } from './generateMetadata'

import { MDXRemote } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

const components = { CTA }

// app/marketplace/[slug]/generateMetadata.jsx
import { getContentMeta } from '@/lib/server/getContent'

export async function generateMetadata({ params }) {
  const meta = getContentMeta('offres', params.slug)
  if (!meta) return { title: 'Offres – Alforis' }

  const title = `${meta.title} – Alforis`
  const description = meta.description || meta.title
  const url = `https://www.alforis.fr/offres/${params.slug}`

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
         <>
     <head>
    {/* Breadcrumb ou lien retour */}
  <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
    <a href="/marketplace" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
      <span aria-hidden="true">←</span>
      Retour au blog
    </a>
  </div>
  </head> 
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
    </>
  )
}
