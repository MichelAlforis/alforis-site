

/* app/confidentialite/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Politique de confidentialité – Alforis',
  description:
    'Consultez notre politique de confidentialité, conforme au RGPD et garantie de la protection de vos données personnelles.',
  openGraph: {
    title: 'Politique de confidentialité – Alforis',
    description:
      'Consultez notre politique de confidentialité, conforme au RGPD et garantie de la protection de vos données personnelles.',
    url: 'https://www.alforis.fr/confidentialite',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/confidentialite.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/confidentialite' },
}

import ConfidentialiteContent from './ConfidentialiteContent'

export default function Page() {
  return <ConfidentialiteContent />
}
