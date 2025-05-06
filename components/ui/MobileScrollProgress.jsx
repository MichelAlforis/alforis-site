'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const el = document.getElementById('__next')
    if (!el) return

    let frame
    let timeout

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const maxScroll = scrollHeight - clientHeight
      const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(ratio)

      if (scrollTop > 10) {
        setVisible(true)
        clearTimeout(timeout)
        timeout = setTimeout(() => setVisible(false), 1500)
      }

      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [pathname])

  // Convert progress to golden gradient (optional visual upgrade)
  const goldenGradient = `linear-gradient(to right, #bfb8a5, #c8b678, #d4bc5e)`

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 z-[9999] md:hidden transition-opacity duration-300 pointer-events-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full transition-all"
        style={{ width: `${progress * 100}%`, backgroundImage: goldenGradient }}
      ></div>
    </div>
  )
}