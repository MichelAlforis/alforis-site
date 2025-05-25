// app/studio/[slug]/page.jsx
export { generateMetadata } from './generateMetadata'

import path from 'path'
import fs from 'fs'
import dynamic from 'next/dynamic'


// app/marketplace/[slug]/generateMetadata.jsx
import { getContentMeta } from '@/lib/server/getContent'

export async function generateMetadata({ params }) {
  const meta = getContentMeta('Studio', params.slug)
  if (!meta) return { title: 'Studio – Alforis' }

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
  const studioDir = path.join(process.cwd(), 'content/studio')
  const files = fs.readdirSync(studioDir)

  return files
    .filter((file) => file.endsWith('.js') || file.endsWith('.jsx'))
    .map((file) => ({
      slug: file.replace(/\.jsx?$/, ''),
    }))
}

export default async function StudioPage({ params }) {
  // ‣ params est un Promise<{ slug: string }>
  const { slug } = await params                                    // :contentReference[oaicite:0]{index=0}

  // On importe dynamiquement le méta + le composant
  const mod = await import(`../../../content/studio/${slug}.jsx`)
  const meta = mod.meta || {}

  // On prépare un DynamicComponent pour le rendu client si besoin
  const DynamicComponent = dynamic(
    () =>
      import(`../../../content/studio/${slug}.jsx`).then((m) => m.default)
  )

  return (
         <>
     <head>
    {/* Breadcrumb ou lien retour */}
  <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
    <a href="/blog" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
      <span aria-hidden="true">←</span>
      Retour au blog
    </a>
  </div>
  </head> 
    <main className="main-content bg-ivoire text-anthracite py-16 px-4 md:px-12">

      <article className="max-w-3xl mx-auto fade-anim">
        {meta.image && (
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full max-w-[900px] mx-auto h-auto mb-8 rounded-lg shadow object-cover"
          />
        )}

        <h1 className="main-title text-center mb-12">{meta.title}</h1>
        <DynamicComponent />
      </article>
    </main>
    </>
  )
}
