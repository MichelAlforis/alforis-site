'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function MobileScrollProgress() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()
  const pathname = usePathname()

  useEffect(() => {
    let hideTimeout

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? scrollY / docHeight : 0
      setProgress(ratio)

      if (scrollY > 20) {
        setVisible(true)
        clearTimeout(hideTimeout)
        hideTimeout = setTimeout(() => setVisible(false), 1200)
      }
    }

    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(hideTimeout)
    }
  }, [pathname])

  // Animate width smoothly
  useEffect(() => {
    controls.start({
      width: `${progress * 100}%`,
      transition: { duration: 0.2, ease: 'easeOut' },
    })
  }, [progress, controls])

  return (
    <div
      className={`fixed inset-x-0 top-0 h-1 z-50 md:hidden transition-opacity duration-300 pointer-events-none
        ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Track */}
      <div className="h-full bg-ivoire/20">
        {/* Progress indicator with golden gradient and soft shadow */}
        <motion.div
          className="h-full rounded-r-full bg-gradient-to-r from-doré via-ivoire to-doré shadow-sm"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  )
}