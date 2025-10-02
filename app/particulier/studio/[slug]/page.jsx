import { getContentMeta } from '@/lib/server/getContent'
import { makeMetadata } from '@/lib/makeMetadata'

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = await getContentMeta('studio', slug)
  return makeMetadata({ meta: meta || {}, slug, section: 'studio' })
}

export async function generateStaticParams() {
  // Temporairement désactivé - pas de contenu studio pour l'instant
  return []
}

export default async function StudioPage() {
  return (
    <section className="main-content bg-ivoire text-anthracite py-16 px-4 md:px-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="main-title text-center mb-12">Studio en construction</h1>
        <p className="text-center">Cette section sera bientôt disponible.</p>
      </article>
    </section>
  )
}
