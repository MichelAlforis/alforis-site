// components/Navbar/NavLink.jsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function NavLink({ href, label, isHome }) {
  const pathname = usePathname()
  const router   = useRouter()
  const isActive = pathname === href

  const handleClick = () => {
    if (isActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push(href)
    }
  }

  // Choix de couleur : blanc sur la home, sinon doré si actif, acier sinon
  const colorClass = isHome
    ? 'text-ivoire hover:text-doré'
    : 'text-acier dark:text-ivoire hover:text-doré'

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      className={`nav-link ${colorClass}`}
    >
      {label}
      {/* soulignement animé pour actif */}
      <span
        className={`
          absolute bottom-0 left-1/2 h-0.5 bg-doré transition-all duration-300
          ${isActive ? 'w-full -translate-x-1/2' : 'w-0'}
        `}
      />
    </Link>
  )
}
