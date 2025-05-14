/* app/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
  description: 'Découvrez notre approche patrimoniale sur mesure.',
  openGraph: {
    title: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
    description: 'Découvrez notre approche patrimoniale sur mesure.',
    url: 'https://www.alforis.fr/',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/home.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/' },
}

import HomeContent from './HomeContent'

export default function Page() {
  return <HomeContent />
}