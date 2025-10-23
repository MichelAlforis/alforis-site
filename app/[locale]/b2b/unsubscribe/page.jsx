// app/[locale]/b2b/unsubscribe/page.jsx
import UnsubscribePage from './UnsubscribePage'

export async function generateMetadata({ params }) {
  const { locale } = await params

  return {
    title: 'Désabonnement - Alforis',
    description: 'Gérez vos préférences d\'abonnement aux communications Alforis.',
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/unsubscribe`
    },
    robots: { index: false, follow: false }, // Pas d'indexation pour cette page
  }
}

export default function Page() {
  return <UnsubscribePage />
}
