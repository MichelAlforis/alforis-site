'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const handleCookiePrefs = () => {
  if (window.cc_popup && typeof window.cc_popup.revokeChoice === 'function') {
    window.cc_popup.revokeChoice()
  } else {
    setTimeout(() => {
      if (window.cc_popup && typeof window.cc_popup.revokeChoice === 'function') {
        window.cc_popup.revokeChoice()
      } else {
        alert("La gestion des cookies n'est pas encore prête. Merci de réessayer dans un instant.")
      }
    }, 300)
  }
}

export default function FooterMobileB2B() {
  const t = useTranslations('footer.b2b')
  const year = new Date().getFullYear()
  const [open, setOpen] = useState({})

  const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }))

  return (
    <footer className="bg-ardoise text-ivoire py-8 px-6 md:hidden">
      <div className="max-w-md mx-auto">
        {/* En-tête */}
        <div className="mb-6">
          <h2 className="text-2xl font-title font-bold mb-2 text-doré">
            {t('title')}
          </h2>
          <p className="text-sm font-sans text-vertSauge leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Sections (Solutions / Partners / Resources / Company) */}
        <div className="space-y-3 mb-6">
          {[
            { base: 'sections.solutions', links: ['wealth', 'advisory', 'tax', 'transmission'] },
            { base: 'sections.partners',  links: ['become', 'space', 'affiliation', 'api'] },
            { base: 'sections.resources', links: ['documentation', 'cases', 'webinars', 'blog'] },
            { base: 'sections.company',   links: ['about', 'team', 'careers', 'press'] },
          ].map((grp) => {
            const title = t(`${grp.base}.title`)
            return (
              <div key={grp.base} className="border-b border-vertSauge/20">
                <button
                  onClick={() => toggle(grp.base)}
                  className="w-full flex justify-between items-center py-3.5 text-left"
                  aria-expanded={!!open[grp.base]}
                  aria-controls={`section-${grp.base}`}
                >
                  <h3 className="text-ivoire font-sans font-semibold text-base">{title}</h3>
                  <svg
                    className={`w-5 h-5 text-vertSauge transition-transform duration-300 ${open[grp.base] ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                <div
                  id={`section-${grp.base}`}
                  className={`overflow-hidden transition-all duration-300 ${open[grp.base] ? 'max-h-96 pb-4' : 'max-h-0'}`}
                >
                  <ul className="space-y-2.5 pl-2">
                    {grp.links.map((k) => (
                      <li key={k}>
                        <Link
                          href="#"
                          className="text-sm font-sans text-vertSauge hover:text-doré transition-colors duration-200 block py-1"
                        >
                          {t(`${grp.base}.${k}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact pro */}
        <div className="mb-6 pb-6 border-b border-vertSauge/20">
          <p className="text-ivoire font-sans font-semibold mb-3 text-sm">
            {t('contactPro')}
          </p>
          <div className="text-sm font-sans text-vertSauge space-y-2">
            <p className="hover:text-doré transition-colors duration-200">
              {t('contact.phone')}
            </p>
            <p>
              <a href={`mailto:${t('contact.email')}`} className="hover:text-doré transition-colors duration-200">
                {t('contact.email')}
              </a>
            </p>
            <p className="text-vertSauge/90">{t('contact.address')}</p>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex gap-6 mb-6 justify-center pb-6 border-b border-vertSauge/20">
          <a
            href="https://www.linkedin.com/company/alforis"
            target="_blank" rel="noopener noreferrer"
            aria-label={t('social.linkedin')} title={t('social.linkedin')}
            className="hover:opacity-70 transition-opacity duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
              className="w-7 h-7 text-ivoire hover:text-doré transition-colors duration-200"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
          </a>
        </div>

        {/* Bloc légal + conformité */}
        <div className="text-xs font-sans text-vertSauge space-y-2 mb-6 text-center leading-relaxed">
          <p className="text-ivoire font-semibold mb-3">
            {t('legal.copyright', { year })}
          </p>
          <p className="text-vertSauge/90">{t('legal.status')}</p>
          <p className="text-vertSauge/90">{t('legal.rcs')}</p>
          <p className="text-vertSauge/90">{t('legal.orias')}</p>
          {/* conformité optionnelle */}
          <div className="mt-4 pt-4 space-y-2 border-t border-vertSauge/20">
            <p className="text-vertSauge/80"><span className="text-doré mr-2">✓</span>{t('compliance.chamber')}</p>
            <p className="text-vertSauge/80"><span className="text-doré mr-2">✓</span>{t('compliance.iso')}</p>
            <p className="text-vertSauge/80"><span className="text-doré mr-2">✓</span>{t('compliance.rgpd')}</p>
          </div>
        </div>

        {/* Liens légaux */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs font-sans text-vertSauge pt-6 border-t border-vertSauge/20">
          <Link href="/mentionslegales" className="hover:text-doré transition-colors" aria-label={t('links.legalAria')}>
            {t('links.legal')}
          </Link>
          <Link href="/cgu-professionnels" className="hover:text-doré transition-colors" aria-label={t('links.cguAria')}>
            {t('links.cgu')}
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-doré transition-colors" aria-label={t('links.privacyAria')}>
            {t('links.privacy')}
          </Link>
          <Link href="/donnees-personnelles" className="hover:text-doré transition-colors" aria-label={t('links.rgpdAria')}>
            {t('links.rgpd')}
          </Link>
          <button
            onClick={(e) => { e.preventDefault(); handleCookiePrefs() }}
            className="hover:text-doré transition-colors"
            aria-label={t('links.cookiesAria')}
          >
            {t('links.cookies')}
          </button>
        </div>
      </div>
    </footer>
  )
}
