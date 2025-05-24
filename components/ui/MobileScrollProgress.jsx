// components/ui/MobileScrollProgress.jsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import useScrollPosition from '@/hooks/useScrollPosition'

export default function MobileScrollProgress() {
  const scrollY = useScrollPosition()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()
  const pathname = usePathname()

  // update progress & visibility on scroll changes
  useEffect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const ratio = docHeight > 0 ? scrollY / docHeight : 0
    setProgress(ratio)

    if (scrollY > 20) {
      setVisible(true)
      const hideTimeout = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(hideTimeout)
    }
  }, [scrollY, pathname])

  // animate width smoothly
  useEffect(() => {
    controls.start({
      width: `${progress * 100}%`,
      transition: { duration: 0.2, ease: 'easeOut' },
    })
  }, [progress, controls])

  return (
    <div
      className={`
            fixed inset-x-0 top-0
            h-2                      /* 2px de hauteur */
            z-[70]                   /* au-dessus du header */
            md:hidden                /* caché en desktop */
            transition-opacity duration-300 pointer-events-none
            ${visible ? 'opacity-100' : 'opacity-0'}
        ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-full bg-ivoire/20">
        <motion.div
          className="
            h-full rounded-r-full
            bg-gradient-to-r from-acier via-ivoire to-acier
            dark:bg-gradient-to-r from-ivoire via-doré to-ivoire
            shadow-sm
          "
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  )
}
