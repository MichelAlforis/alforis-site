'use client'

import Link from 'next/link'
import { FooterConfig } from './FooterConfig'
import { couleurs } from '@/styles/generated-colors.mjs'

export default function FooterMobile() {
  const isExternal = (href = '') => /^https?:\/\//i.test(href)
  const isMailto = (href = '') => href.startsWith('mailto:')

  return (
    <footer className="bg-ardoise py-8 px-6 text-ivoire">
      <div>
        <h3 className="text-2xl font-title font-bold mb-3 text-doré">
          {FooterConfig.title}
        </h3>
        <p className="text-sm font-light text-vertSauge max-w-xs">
          {FooterConfig.description}
        </p>
      </div>

      <div className="grid grid-cols-[20%_80%] gap-2 mt-4">
        {/* Réseaux sociaux */}
        <div className="flex flex-col items-start justify-center space-y-2 mt-4">
          {FooterConfig.tabsReseaux.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel || item.label}
              className="hover:opacity-80 transition inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox={item.viewBox}
                className="w-auto h-6"
                role="img"
                aria-hidden={item.title ? 'false' : 'true'}
              >
                {item.title ? <title>{item.title}</title> : null}
                <path d={item.d} fill={couleurs.ivoire} stroke={couleurs.vertSauge} />
              </svg>
            </a>
          ))}
        </div>

        {/* Liens */}
        <div className="flex flex-col gap-1 text-vertSauge text-sm items-end justify-center">
          <p className="text-ivoire mb-2">&copy; Alforis. Tous droits réservés.</p>

          {FooterConfig.tabsLinks.map((item, i) => {
            const aria = { 'aria-label': item.ariaLabel || item.label }

            if (item.onClick) {
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault()
                    item.onClick()
                  }}
                  className="hover:text-doré transition text-left"
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
                  className="hover:text-doré transition text-left"
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
                className="hover:text-doré transition text-left"
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
