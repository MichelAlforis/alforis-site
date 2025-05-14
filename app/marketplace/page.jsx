/* app/marketplace/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Marketplace – Alforis',
  description: 'Découvrez nos prestations de conseil patrimonial et réservez en ligne en toute transparence.',
  keywords: ['marketplace', 'conseil patrimonial', 'Alforis'],
  openGraph: {
    title: 'Marketplace – Alforis',
    description: 'Découvrez nos prestations de conseil patrimonial et réservez en ligne en toute transparence.',
    url: 'https://www.alforis.fr/marketplace',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/marketplace.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/marketplace' },
}

import MarketplaceContent from './MarketplaceContent'
import { fetchAllOffres } from '@/lib/server/fetAllOffres'

export default async function Page() {
  const offres = await fetchAllOffres()
  return <MarketplaceContent offres={offres} />
}