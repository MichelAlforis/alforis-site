// app/parcours/[slug]/clap-de-fin/page.jsx
import ClapDeFin from '@/components/parcours/ClapDeFin'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

// Génère les paramètres statiques pour Next.js
export async function generateStaticParams() {
  const slugs = getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

// Page de remerciement finale
export default async function ClapPage({ params, searchParams }) {
  // Next.js 15: params et searchParams sont asynchrones
  const { slug } = await params
  const { profil: rawProfil } = await searchParams

  // Normalisation des apostrophes pour correspondre aux clés de profilesData
  const profil = rawProfil ? rawProfil.replace(/'/g, '’') : ''

  // Vérifie la présence et la validité du profil
  if (!profil) {
    notFound()
  }

  // Récupération des métadonnées du parcours
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) {
    notFound()
  }
  const { meta } = result

  // Vérifie que le profil existe bien dans meta.profilesData
  if (!meta.profilesData?.[profil]) {
    notFound()
  }

  return <ClapDeFin profil={profil} meta={meta} />
}
