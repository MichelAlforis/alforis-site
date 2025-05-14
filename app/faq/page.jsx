/* app/faq/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'FAQ – Alforis',
  description: 'Questions fréquentes sur nos services et notre expertise patrimoniale.',
  openGraph: {
    title: 'FAQ – Alforis',
    description: 'Questions fréquentes sur nos services et notre expertise patrimoniale.',
    url: 'https://www.alforis.fr/faq',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/faq.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/faq' },
}

import FaqContent from './FaqContent'

export default function Page() {
  return <FaqContent />
}