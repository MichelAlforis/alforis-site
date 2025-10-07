'use client'

import Link from 'next/link'
import { FooterConfig } from './FooterConfig'
import { couleurs } from '@/styles/generated-colors.mjs'

export default function FooterDesktop() {
  const isExternal = (href = '') => /^https?:\/\//i.test(href)
  const isMailto = (href = '') => href.startsWith('mailto:')

  return (
    <footer className="bg-ardoise text-ivoire py-8 px-6">
      <div className="max-w-7xl mx-auto hidden md:grid grid-cols-2 gap-x-10 gap-y-2">
        {/* Col 1, Row 1: Logo + baseline */}
        <div className="flex flex-col justify-center col-start-1 row-start-1">
          <h2 className="mb-3 text-doré">{FooterConfig.title}</h2>
          <p className="text-vertSauge">{FooterConfig.description}</p>

          {/* Réseaux sociaux */}
          <div className="flex flex-row items-center mt-4 space-x-8 ml-8">
            {FooterConfig.tabsReseaux.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel || item.label}
                className="inline-flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  fill="currentColor"
                  viewBox={item.viewBox}
                  className="h-10 w-auto"
                  role="img"
                  aria-hidden={item.title ? 'false' : 'true'}
                >
                  {item.title ? <title>{item.title}</title> : null}
                  <path d={item.d} fill={couleurs.ivoire} stroke={couleurs.vertSauge} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Col 2, Row 1: Mentions/links */}
        <div className="flex flex-col items-end col-start-2 row-start-1 text-vertSauge space-y-1">
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
                  className="hover:text-doré transition text-right"
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
                  className="hover:text-doré transition text-right"
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
                className="hover:text-doré transition text-right"
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
