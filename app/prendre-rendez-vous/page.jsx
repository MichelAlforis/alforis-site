import PrendreRDVContent from './PrendreRDVContent'

/* app/prendre-rendez-vous/page.jsx */
export async function generateMetadata() {
  return {
  title: 'Prendre rendez-vous – Alforis',
  description:
    'Réservez un appel, une visio ou un rendez-vous patrimonial avec notre équipe.',
  openGraph: {
    title: 'Prendre rendez-vous – Alforis',
    description:
      'Réservez un appel, une visio ou un rendez-vous patrimonial avec notre équipe.',
    url: 'https://www.alforis.fr/prendre-rendez-vous',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/prendre-rendez-vous.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/prendre-rendez-vous' },
}}



export default function Page() {
  return <PrendreRDVContent />
}