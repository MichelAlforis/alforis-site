import { MDXRemote } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import { makeMetadata } from '@/lib/makeMetadata'

const components = { CTA }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = await getContentMeta('offres', slug)
  return makeMetadata({ meta: meta || {}, slug, section: 'marketplace' })
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs('offres')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = await params;
  const result = await getContentMeta('offres', slug)
  if (!result?.meta) notFound()

  const { meta, content } = result

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <a href="/marketplace" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
          <span aria-hidden="true">←</span>
          Retour à la Marketplace
        </a>
      </section>
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
