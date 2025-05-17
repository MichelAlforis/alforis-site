import MentionsLegalesContent from './MentionsLegalesContent'

/* app/mentions-legales/page.jsx */
export async function generateMetadata() {
  return {
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
}}



export default function Page() {
  return <MentionsLegalesContent />
}