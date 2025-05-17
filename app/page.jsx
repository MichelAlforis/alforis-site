import HomeContent from './HomeContent'

/* app/page.jsx */
export async function generateMetadata() {
  return {
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
}}



export default function Page() {
  return <HomeContent />
}