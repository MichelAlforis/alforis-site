// app/[locale]/b2b/mentionslegal/page.jsx
import { getTranslations } from 'next-intl/server'
import MentionsLegalPage from './MentionsLegalesContent'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'mentionslegal.meta' })
  const url = `https://www.alforis.fr/${locale}/b2b/mentionslegal`

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
  return <MentionsLegalPage />
}
