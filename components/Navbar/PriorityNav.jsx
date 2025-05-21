// components/Navbar/PriorityNav.jsx
'use client'

import { useRef, useState, useEffect } from 'react'
import NavLink from './NavLink'
import Dropdown from './Dropdown'


export default function PriorityNav({ links }) {
  const always     = links.filter(l => l.alwaysVisible)
  const candidates = links.filter(l => !l.alwaysVisible)
  const containerRef = useRef(null)
  const [count, setCount] = useState(candidates.length)


  useEffect(() => {
    const update = () => {
      const width = containerRef.current?.offsetWidth || 0
      const slotW = 120 // ajustez selon votre style
      const max    = Math.floor(width / slotW) - 1 - always.length
      setCount(Math.max(0, Math.min(candidates.length, max)))
    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [candidates.length, always.length])

  const primary  = candidates.slice(0, count)
  const overflow = candidates.slice(count)

  return (
    <nav ref={containerRef} className="flex items-center overflow-visible relative">
      {always.map(link => <NavLink key={link.href} {...link} />)}
      {primary.map(link => <NavLink key={link.href} {...link} />)}

      {overflow.length > 0 && (
        <Dropdown label="Plus">
          {overflow.map(link => <NavLink key={link.href} {...link} />)}
        </Dropdown>
      )}
    </nav>
  )
}
