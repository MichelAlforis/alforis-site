import path from 'path'
import fs from 'fs'
import dynamic from 'next/dynamic'
import { getContentMeta } from '@/lib/server/getContent'    // à importer !
import { makeMetadata } from '@/lib/makeMetadata'           // à importer aussi !

export async function generateMetadata({ params }) {
  params = await params
  const { slug } = params
  const meta = await getContentMeta('studio', slug)
  if (!meta) return { title: 'Studio – Alforis' }
  return makeMetadata({ meta, slug, section: 'studio' })
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
  const { slug } = params

  const mod = await import(`../../../content/studio/${slug}.jsx`)
  const meta = mod.meta || {}

  const DynamicComponent = dynamic(
    () => import(`../../../content/studio/${slug}.jsx`).then((m) => m.default)
  )

  return (
    <>
      <section>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
          <a href="/blog" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
            <span aria-hidden="true">←</span>
            Retour au studio
          </a>
        </div>
      </section>
      <section className="main-content bg-ivoire text-anthracite py-16 px-4 md:px-12">
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
      </section>
    </>
  )
}
