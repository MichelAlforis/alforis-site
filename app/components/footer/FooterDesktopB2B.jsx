'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FooterConfigB2B } from './FooterConfigB2B'

export default function FooterDesktopB2B() {
  const t = useTranslations('footer.b2b')
  const year = new Date().getFullYear()

  const isExternal = (href = '') => /^https?:\/\//i.test(href)
  const isMailto = (href = '') => href.startsWith('mailto:')

  return (
    <footer className="bg-ardoise text-ivoire py-8 px-6">
      <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
        {/* Colonne gauche : Logo + baseline + réseaux */}
        <div className="flex flex-col justify-center col-start-1 row-start-1">
          <h2 className="mb-3 text-doré font-title">{t('title')}</h2>
          <p className="text-vertSauge font-sans">{t('description')}</p>

          {/* Réseaux sociaux */}
          <div className="flex flex-row items-center mt-4 space-x-8 ml-8">
            {FooterConfigB2B.tabsReseaux.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel || item.name}
                className="inline-flex hover:opacity-80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  fill="currentColor"
                  viewBox={item.viewBox || '0 0 24 24'}
                  className="w-auto h-10 text-ivoire hover:text-doré transition-colors duration-200"
                  role="img"
                  aria-hidden={item.title ? 'false' : 'true'}
                >
                  {item.title ? <title>{item.title}</title> : null}
                  <path d={item.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Colonne droite : Mentions/links */}
        <div className="flex flex-col items-end col-start-2 row-start-1 text-vertSauge font-sans">
          <p className="text-ivoire mb-2">© Alforis. {t('legal.copyright', { year })}</p>

          {FooterConfigB2B.tabsLinks.map((item, i) => {
            const aria = { 'aria-label': item.ariaLabel || item.label }

            if (item.onClick) {
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    item.onClick()
                  }}
                  className="hover:text-doré transition-colors duration-200 text-right"
                  {...aria}
                >
                  {item.label}
                </button>
              )
            }

            if (isMailto(item.href) || isExternal(item.href)) {
              return (
                <a
                  key={i}
                  href={item.href}
                  target={isExternal(item.href) ? '_blank' : undefined}
                  rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
                  className="hover:text-doré transition-colors duration-200 text-right"
                  {...aria}
                >
                  {item.label}
                </a>
              )
            }

            // Lien interne Next.js
            return (
              <Link
                key={i}
                href={item.href}
                className="hover:text-doré transition-colors duration-200 text-right"
                {...aria}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
