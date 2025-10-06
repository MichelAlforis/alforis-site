// app/[locale]/b2b/ressources/page.jsx
import { unstable_setRequestLocale } from 'next-intl/server'
import RessourcesPage from './RessourcesPage'

export async function generateMetadata({ params }) {
  const { locale } = await params

  const meta = {
    fr: {
      title: 'Ressources & outils institutionnels | Alforis TPM',
      description: 'Documents, outils de conformité, calendrier événementiel et FAQ pour les asset managers et investisseurs institutionnels.'
    },
    en: {
      title: 'Resources & institutional tools | Alforis TPM',
      description: 'Documents, compliance tools, event calendar and FAQ for asset managers and institutional investors.'
    },
    es: {
      title: 'Recursos y herramientas institucionales | Alforis TPM',
      description: 'Documentos, herramientas de cumplimiento, calendario de eventos y FAQ para gestoras e inversores institucionales.'
    },
    pt: {
      title: 'Recursos e ferramentas institucionais | Alforis TPM',
      description: 'Documentos, ferramentas de conformidade, calendário de eventos e FAQ para gestoras e investidores institucionais.'
    }
  }

  const currentMeta = meta[locale] || meta.fr

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/ressources`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      type: 'website',
      url: `https://www.alforis.fr/${locale}/b2b/ressources`,
      siteName: 'Alforis'
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description
    }
  }
}

export default async function Page({ params }) {
  const { locale } = await params
  unstable_setRequestLocale(locale)
  
  return <RessourcesPage />
}