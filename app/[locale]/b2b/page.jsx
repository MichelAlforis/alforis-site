import HomeB2BResponsive from './HomeB2BResponsive'
import { getTranslations } from 'next-intl/server'
import { getBaseUrl } from '@/lib/url'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = getBaseUrl()
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'pt_PT',
      url: `${baseUrl}/${locale}/b2b`,
      siteName: 'Alforis B2B',
      images: [
        {
          url: `${baseUrl}/${locale}/b2b/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/${locale}/b2b/opengraph-image`]
    },
    
    alternates: {
      canonical: `${baseUrl}/${locale}/b2b`,
      languages: {
        'fr': `${baseUrl}/fr/b2b`,
        'en': `${baseUrl}/en/b2b`,
        'es': `${baseUrl}/es/b2b`,
        'pt': `${baseUrl}/pt/b2b`,
        'x-default': `${baseUrl}/fr/b2b`
      }
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  }
}

export default async function B2BPage({ params }) {
  const { locale } = await params
  const baseUrl = getBaseUrl()
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Alforis B2B',
    description: 'Distribution asset management services across Europe',
    url: `${baseUrl}/${locale}/b2b`,
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Luxembourg' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' }
    ],
    availableLanguage: ['French', 'English', 'Spanish', 'Portuguese'],
    inLanguage: locale,
    memberOf: {
      '@type': 'Organization',
      name: 'AFTPM'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeB2BResponsive />
    </>
  )
}