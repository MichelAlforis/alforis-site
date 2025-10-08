'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { openCookieSettings } from '@/lib/cookieConsent' // ✅ import helper

export default function FooterDesktopB2B() {
  const t = useTranslations('footer.b2b')
  const year = new Date().getFullYear()

  const socialIcons = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/alforis',
      ariaLabel: t('social.linkedin'),
      d: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@alforis_finance',
      ariaLabel: t('social.youtube'),
      d: 'M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z'
    }
  ]

  return (
    <footer className="bg-ardoise text-ivoire py-8 px-6">
      <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
        {/* Colonne gauche : titre + baseline + réseaux */}
        <div className="flex flex-col justify-center col-start-1 row-start-1">
          <h2 className="mb-3 text-doré font-title">{t('title')}</h2>
          <p className="text-vertSauge font-sans">{t('description')}</p>

          <div className="flex items-center mt-4 space-x-8 ml-8">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                className="inline-flex hover:opacity-80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-auto h-10 text-ivoire hover:text-doré transition-colors duration-200"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={item.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Colonne droite : liens légaux */}
        <div className="flex flex-col items-end col-start-2 row-start-1 text-vertSauge font-sans">
          <p className="text-ivoire mb-2">
            {t('legal.copyright', { year })}
          </p>

          <Link
            href="/b2b/mentionslegales"
            className="hover:text-doré transition-colors duration-200 text-right"
            aria-label={t('links.legalAria')}
          >
            {t('links.legal')}
          </Link>

          <Link
            href="/b2b/confidentialite"
            className="hover:text-doré transition-colors duration-200 text-right"
            aria-label={t('links.privacyAria')}
          >
            {t('links.privacy')}
          </Link>

          <Link
            href="/b2b/cgu"
            className="hover:text-doré transition-colors duration-200 text-right"
            aria-label={t('links.cguAria')}
          >
            {t('links.cgu')}
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault()
              openCookieSettings() // ✅ utilise le helper centralisé
            }}
            className="hover:text-doré transition-colors duration-200 text-right"
            aria-label={t('links.cookiesAria')}
          >
            {t('links.cookies')}
          </button>
        </div>
      </div>
    </footer>
  )
}
