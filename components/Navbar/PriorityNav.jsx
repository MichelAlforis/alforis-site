'use client'

import { useRef, useState, useEffect } from 'react'
import NavLink from './NavLink'       // votre composant Link stylé
import Dropdown from './Dropdown'     // votre composant Dropdown « More »


export default function PriorityNav({ links, isActive, handleLinkClick}) {
  const always     = links.filter(l => l.alwaysVisible)
  const candidates = links.filter(l => !l.alwaysVisible)
  const containerRef = useRef(null)
  const [count, setCount] = useState(candidates.length)

  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth || 0
      const slotW = 120
      // On réserve count = nombre de candidates que l’on peut afficher
      const max = Math.floor(width / slotW) - 1 - always.length
      setCount(Math.max(0, Math.min(candidates.length, max)))
    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [candidates.length, always.length])

  const primary  = candidates.slice(0, count)
  const overflow = candidates.slice(count)

  return (
<nav 
  ref={containerRef} 
  className="flex items-center overflow-visible relative
            ${isHome ? 'text-ivoire' : 'text-acier dark:text-ivoire'"
    >
      
  {always.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      isActive={isActive(link.href)}
      onClick={() => handleLinkClick(link.href)}
    />
  ))}

  {primary.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      isActive={isActive(link.href)}
      onClick={() => handleLinkClick(link.href)}
    />
  ))}

  {overflow.length > 0 && (
    <Dropdown label="More">
      {overflow.map(link => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={isActive(link.href)}
          onClick={() => handleLinkClick(link.href)}
        />
      ))}
    </Dropdown>
  )}
</nav>

  )
}
