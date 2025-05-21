// components/Navbar/PriorityNav.jsx
'use client'

import { useRef, useState, useEffect } from 'react'
import NavLink from './NavLink'
import Dropdown from './Dropdown'

export default function PriorityNav({ links, isHome }) {
  const always     = links.filter(l => l.alwaysVisible)
  const candidates = links.filter(l => !l.alwaysVisible)
  const containerRef = useRef(null)
  const [count, setCount] = useState(candidates.length)

  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth || 0
      const slotW = 120
      const totalSlots = Math.floor(width / slotW)
      if (totalSlots >= always.length + candidates.length) {
        setCount(candidates.length)
      } else {
        const slotsForCandidates = totalSlots - always.length - 1
        setCount(Math.max(0, Math.min(candidates.length, slotsForCandidates)))
      }
    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [always.length, candidates.length])

  const primary  = candidates.slice(0, count)
  const overflow = candidates.slice(count)

  return (
    <nav
      ref={containerRef}
      className="relative flex items-center lg:flex-1 h-nav, overflow-visible!"
    >
      {/* ← on isole le scroll horizontal dans CE conteneur */}
      <div className="flex-1 flex items-center space-x-6 overflow-x-auto whitespace-nowrap">
        {always.map(l => <NavLink key={l.href} href={l.href} label={l.label} isHome={isHome} />)}
        {primary.map(l => <NavLink key={l.href} href={l.href} label={l.label} isHome={isHome} />)}
      </div>

      {/* ← dropdown peut déborder librement */}
      {overflow.length > 0 && (
        <Dropdown label="Plus" isHome={isHome} >
          {overflow.map(l => <NavLink key={l.href} href={l.href} label={l.label} isHome={isHome} />)}
        </Dropdown>
      )}
    </nav>
  )
}
