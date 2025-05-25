import DesinscriptionContent from './DesinscriptionContent'
/* app/desinscription/page.jsx */
export async function generateMetadata() {
  return {
  title: 'Désinscription',
  description: 'Confirmez votre désinscription à notre newsletter Alforis.',
  openGraph: {
    title: 'Désinscription – Alforis',
    description: 'Confirmez votre désinscription à notre newsletter Alforis.',
    url: 'https://www.alforis.fr/desinscription',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/desinscription.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/desinscription' },
}}




export default function Page() {
  return <DesinscriptionContent />
}