// app/approchepersonnalisee/page.jsx

import ApprocheContent from './ApprocheContent.jsx'

export async function generateMetadata() {
  return {
    title: 'Approche Personnalisée – Alforis',
    description: 'Découvrez notre approche patrimoniale sur mesure, étape par étape.',
    openGraph: {
      title: 'Approche Personnalisée – Alforis',
      description: 'Une approche patrimoniale à la hauteur de vos enjeux.',
      url: 'https://www.alforis.fr/approche-personnalisee',
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'website',
      images: ['/assets/img/og/approche-personnalisee.png'],
    },
    alternates: { canonical: 'https://www.alforis.fr/approche-personnalisee' },
  }
}

export default function Page() {
  return <ApprocheContent />
}
