export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Nos Parcours – Alforis',
  description: 'Découvrez nos parcours personnalisés adaptés à votre trajectoire.',
  openGraph: {
    title: 'Nos Parcours – Alforis',
    description: 'Découvrez nos parcours personnalisés adaptés à votre trajectoire.',
    url: 'https://www.alforis.fr/parcours',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/parcours.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/parcours' },
}

import { fetchAllParcours } from '@/lib/server/fetchAllParcours'
import ParcoursContent from './ParcoursContent'

export default async function Page({ searchParams }) {
  // 1. fetch all items
  const all = await fetchAllParcours()

  // 2. determine current page & total pages
  const pageSize = 5
  const currentPage = parseInt(searchParams?.page || '1', 10)
  const totalPages  = Math.ceil(all.length / pageSize)

  // 3. slice out only the 5 items for this page
  const start = (currentPage - 1) * pageSize
  const pageItems = all.slice(start, start + pageSize)

  return (
    <ParcoursContent
      content={pageItems}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
