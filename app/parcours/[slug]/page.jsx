// app/parcours/[slug]/page.jsx
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export async function generateStaticParams() {

  // On génère un tableau de { slug } pour chaque fichier
  const slugs = getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
 }

 export default async function ParcoursPage({ params }) {

  // params est un Promise<{ slug: string }> en App Router Next.js 15
  const { slug } = await params
  // getContentMeta renvoie une Promise
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  const { meta } = result

   return (
     <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
       <ParcoursFormulaire meta={meta} slug={slug} />
     </main>
   )
 }
