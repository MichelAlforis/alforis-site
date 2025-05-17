import ServicesContent from './ServicesContent'
/* app/services/page.jsx */
export async function generateMetadata() {
  return {
  title: 'Services – Alforis',
  description: 'Explorez nos expertises pour piloter votre trajectoire de vie en toute sérénité.',
  openGraph: {
    title: 'Services – Alforis',
    description: 'Explorez nos expertises pour piloter votre trajectoire de vie en toute sérénité.',
    url: 'https://www.alforis.fr/services',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/services.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/services' },
}}


export default function Page() {
  return <ServicesContent />
}