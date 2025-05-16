// app/parcours/[slug]/clap-de-fin/page.jsx
import ClapDeFin from '@/components/parcours/ClapDeFin'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ClapPage({ params, searchParams }) {
  const { slug } = params
  // On récupère directement le profil depuis la query string
  const profil = searchParams.profil || ''

  // Récupération des métadonnées
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  const { meta } = result

  // Si pas de profil ou profil non défini dans les données, 404
  if (!profil || !meta.profilesData?.[profil]) notFound()

  // Tout est OK, on affiche
  return <ClapDeFin profil={profil} meta={meta} />
}
