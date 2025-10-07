'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FooterConfigB2B } from './FooterConfigB2B'

export default function FooterMobileB2B() {
  const t = useTranslations('footer.b2b')
  const year = new Date().getFullYear()

  const isExternal = (href = '') => /^https?:\/\//i.test(href)
  const isMailto = (href = '') => href.startsWith('mailto:')

  return (
    <footer className="bg-ardoise py-8 px-6 md:hidden">
      <div>
        <h3 className="text-2xl font-title font-bold mb-3 text-doré">
          {t('title')}
        </h3>
        <p className="text-sm font-sans font-light text-vertSauge max-w-xs">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-[20%_80%] gap-2 mt-4">
        {/* Colonne réseaux sociaux */}
        <div className="flex flex-col items-start justify-center space-y-2 mt-4">
          {FooterConfigB2B.tabsReseaux.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel || item.name}
              className="hover:opacity-80 transition-opacity duration-200 inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox={item.viewBox || '0 0 24 24'}
                className="w-auto h-6 text-ivoire hover:text-doré transition-colors duration-200"
                role="img"
                aria-hidden={item.title ? 'false' : 'true'}
              >
                {item.title ? <title>{item.title}</title> : null}
                <path d={item.d} />
              </svg>
            </a>
          ))}
        </div>

        {/* Colonne liens */}
        <div className="flex flex-col gap-1 text-vertSauge text-sm font-sans items-end justify-center">
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
                  className="hover:text-doré transition-colors duration-200 text-left"
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
                  className="hover:text-doré transition-colors duration-200 text-left"
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
                className="hover:text-doré transition-colors duration-200 text-left"
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
