/* app/desinscription/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Désinscription – Alforis',
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
}

import DesinscriptionContent from './DesinscriptionContent'

export default function Page() {
  return <DesinscriptionContent />
}