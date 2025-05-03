import { fetchAllContent } from '@/lib/server/fetchAllContent'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export async function getStaticPaths() {
  const all = await fetchAllContent()
  const parcours = all.filter((item) => item.type === 'Parcours')

  const paths = parcours.map((item) => ({
    params: { slug: item.slug }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const all = await fetchAllContent()
  const current = all.find((item) => item.slug === params.slug && item.type === 'Parcours')

  if (!current) {
    return { notFound: true }
  }

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
