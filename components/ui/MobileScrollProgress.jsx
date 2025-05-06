'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileScrollProgress() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const el = document.getElementById('__next')
    if (!el) return

    let frame
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const maxScroll = scrollHeight - clientHeight
      const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(ratio)
      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)

    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] md:hidden">
      <div
        className="h-full bg-doré transition-all"
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  )
}
