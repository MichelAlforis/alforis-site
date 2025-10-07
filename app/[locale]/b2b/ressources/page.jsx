// app/[locale]/b2b/ressources/page.jsx
import { getTranslations } from 'next-intl/server'
import RessourcesPage from './ressourcesPage'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ressources.meta' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/ressources`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.alforis.fr/${locale}/b2b/ressources`,
      siteName: 'Alforis'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description')
    }
  }
}

export default function Page() {
  return <RessourcesPage />
}