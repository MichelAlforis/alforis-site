import { fetchAllContent } from '@/lib/server/fetchAllContent'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export async function getStaticPaths() {
  const parcours = await fetchAllContent()
  const paths = parcours.map((item) => ({
    params: { slug: item.slug }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const parcours = await fetchAllContent()
  const current = parcours.find((item) => item.slug === params.slug)

  const mod = await import(`@/content/parcours/${params.slug}.jsx`)
  const meta = mod.meta

  return {
    props: {
      meta,
      slug: params.slug,
      ...current
    }
  }
}

export default function ParcoursPage({ meta, slug }) {
  return <ParcoursFormulaire meta={meta} slug={slug} />
}
