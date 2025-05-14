/* app/mentions-legales/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Mentions légales – Alforis',
  description: 'Consultez nos mentions légales détaillées et conformes à la réglementation en vigueur.',
  openGraph: {
    title: 'Mentions légales – Alforis',
    description: 'Consultez nos mentions légales détaillées et conformes à la réglementation en vigueur.',
    url: 'https://www.alforis.fr/mentions-legales',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/mentions-legales.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/mentions-legales' },
}

import MentionsLegalesContent from './MentionsLegalesContent'

export default function Page() {
  return <MentionsLegalesContent />
}