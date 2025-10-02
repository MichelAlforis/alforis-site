import { fetchAllContent } from '@/lib/server/fetchAllContent'
import PageClient from './PageClient'

/* app/marketplace/page.jsx */
export async function generateMetadata() {
  return {
  title: 'Marketplace',
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
  const all = await fetchAllContent()
  console.log(all.map(x => x.type))
  const content = all.filter(item => ['Offres'].includes(item.type))
  return <PageClient content={content} />
}