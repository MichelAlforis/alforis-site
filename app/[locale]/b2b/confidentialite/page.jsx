import { getTranslations } from 'next-intl/server'
import ConfidentialiteContent from './ConfidentialiteContent'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'confidentialite.meta' })
  const url = `https://www.alforis.fr/${locale}/b2b/confidentialite`

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url,
      siteName: 'Alforis',
      locale: locale === 'fr' ? 'fr_FR' : locale,
      type: 'website'
    }
  }
}

export default function Page() {
  return <ConfidentialiteContent />
}
