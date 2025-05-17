import MarketplaceContent from './MarketplaceContent'
import { fetchAllContent } from '@/lib/server/fetchAllContent'

/* app/marketplace/page.jsx */
export async function generateMetadata() {
  return {
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
}}



export default async function Page() {
  const offres = await fetchAllContent()
  return <MarketplaceContent offres={offres} />
}