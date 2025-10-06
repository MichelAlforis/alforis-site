// app/components/footer/FooterDesktopB2B.jsx
'use client'

import Link from 'next/link'
import { useMessages, useTranslations } from 'next-intl'

const handleCookiePrefs = () => {
  if (window.cc_popup?.revokeChoice) window.cc_popup.revokeChoice()
}

export default function FooterDesktopB2B() {
  // Fallback automatique: si footer.b2b n'existe pas dans les messages, on retombe sur footer
  const messages = useMessages()
  const hasB2B = Boolean(messages?.footer?.b2b)
  const t = useTranslations(hasB2B ? 'footer.b2b' : 'footer')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ardoise text-ivoire py-8 px-6">
      <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
        {/* Colonne gauche : titre, description, réseaux */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-3 text-doré font-title">{t('title')}</h2>
          <p className="text-vertSauge font-sans">{t('description')}</p>

          <div className="flex mt-4 space-x-8 ml-1">
            <Link
              href="https://www.linkedin.com/company/alforis"
              target="_blank" rel="noopener"
              aria-label={t('social.linkedin')} title={t('social.linkedin')}
            >
              <svg viewBox="0 0 16 16" className="w-8 h-8 text-ivoire hover:text-doré transition-colors">
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Colonne droite : infos légales + liens + contact */}
        <div className="flex flex-col items-end text-vertSauge font-sans">
          <p className="text-ivoire mb-2">{t('legal.copyright', { year })}</p>

          <nav className="flex flex-col items-end">
            <Link href="/mentionslegales" className="hover:text-doré transition-colors text-right" aria-label={t('links.legalAria')}>
              {t('links.legal')}
            </Link>
            <Link href="/cgu-professionnels" className="hover:text-doré transition-colors text-right" aria-label={t('links.cguAria')}>
              {t('links.cgu')}
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-doré transition-colors text-right" aria-label={t('links.privacyAria')}>
              {t('links.privacy')}
            </Link>
            <Link href="/donnees-personnelles" className="hover:text-doré transition-colors text-right" aria-label={t('links.rgpdAria')}>
              {t('links.rgpd')}
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); handleCookiePrefs() }}
              className="hover:text-doré transition-colors text-right"
              aria-label={t('links.cookiesAria')}
            >
              {t('links.cookies')}
            </button>
          </nav>

          <a href={`mailto:${t('contact.email')}`} className="mt-3 hover:text-doré transition-colors text-right">
            {t('contact.label')}
          </a>
        </div>
      </div>
    </footer>
  )
}
