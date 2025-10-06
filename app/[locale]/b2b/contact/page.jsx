// app/[locale]/b2b/contact/page.jsx
import { getTranslations } from 'next-intl/server'
import ContactPage from './ContactPage'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.meta' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.alforis.fr/${locale}/b2b/contact`
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.alforis.fr/${locale}/b2b/contact`,
      siteName: 'Alforis'
    }
  }
}

export default function Page() {
  return <ContactPage />
}