// app/[locale]/b2b/solutions/page.jsx
import SolutionsPage from './solutionsPage'

export async function generateMetadata({ params }) {
  const { locale } = await params // ← AWAIT params

  const meta = {
    fr: {
      title: 'Partenariats de distribution institutionnelle | Alforis TPM',
      description: 'Construisons ensemble votre stratégie de distribution sur 4 marchés européens. Approche partenariale, sélective et transparente.'
    },
    en: {
      title: 'Institutional Distribution Partnerships | Alforis TPM',
      description: "Let's build your distribution strategy across 4 European markets together. Partnership-driven, selective and transparent approach."
    },
    es: {
      title: 'Alianzas de distribución institucional | Alforis TPM',
      description: 'Construyamos juntos su estrategia de distribución en 4 mercados europeos. Enfoque de alianza, selectivo y transparente.'
    },
    pt: {
      title: 'Parcerias de distribuição institucional | Alforis TPM',
      description: 'Construamos juntos a sua estratégia de distribuição em 4 mercados europeus. Abordagem de parceria, seletiva e transparente.'
    }
  }

  const currentMeta = meta[locale] || meta.fr

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/solutions`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      type: 'website',
      url: `https://www.alforis.fr/${locale}/b2b/solutions`,
      siteName: 'Alforis'
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description
    }
  }
}

export default function Page() {
  return <SolutionsPage />
}