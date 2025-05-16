import ClapContent from './ClapContent'
import { getContentMeta } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async function ClapPage({ params, searchParams }) {
  const { slug } = await params
  const { profil = '' } = await searchParams

  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  const { meta } = result

  if (!profil || !meta.profilesData?.[profil]) notFound()

  // Server Component
  return (
    <Suspense fallback={null}>
    <ClapContent
      slug={slug}
      profil={profil}
      meta={meta.profilesData[profil]}
    />
    </Suspense>
  )
}
