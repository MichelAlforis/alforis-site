// app/[locale]/b2b/partenaires/page.jsx
import PartenairesPage from './PartenairesPage'

export async function generateMetadata({ params }) {
  const { locale } = await params // ← AWAIT params

  const meta = {
    fr: {
      title: 'Devenir partenaire de distribution | Alforis TPM',
      description: 'Rejoignez les sociétés de gestion que nous représentons. Sélectivité, alignement stratégique et transparence pour une collaboration durable.'
    },
    en: {
      title: 'Become a distribution partner | Alforis TPM',
      description: "Join the asset managers we represent. Selectivity, strategic alignment and transparency for lasting collaboration."
    },
    es: {
      title: 'Convertirse en socio de distribución | Alforis TPM',
      description: 'Únase a las gestoras que representamos. Selectividad, alineación estratégica y transparencia para una colaboración duradera.'
    },
    pt: {
      title: 'Tornar-se parceiro de distribuição | Alforis TPM',
      description: 'Junte-se às gestoras que representamos. Seletividade, alinhamento estratégico e transparência para uma colaboração duradoura.'
    }
  }

  const currentMeta = meta[locale] || meta.fr

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/partenaires`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      type: 'website',
      url: `https://www.alforis.fr/${locale}/b2b/partenaires`,
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
  return <PartenairesPage />
}