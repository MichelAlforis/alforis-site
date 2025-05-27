// components/ui/MobileScrollProgress.jsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollPosition from '@/hooks/useScrollPosition'

export default function MobileScrollProgress() {
  const scrollY = useScrollPosition()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // Log scroll position for debugging
  useEffect(() => {
    console.log('MobileScrollProgress scrollY:', scrollY)

    const el = document.scrollingElement || document.body
    const totalHeight = el.scrollHeight - el.clientHeight
    const ratio = totalHeight > 0 ? scrollY / totalHeight : 0
    setProgress(ratio)

    if (scrollY > 20) {
      setVisible(true)
    }

    // hide after a short delay on each scroll event
    const hideTimeout = setTimeout(() => {
      if (scrollY <= 20) setVisible(false)
    }, 1200)

    return () => clearTimeout(hideTimeout)
  }, [scrollY, pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="progress-bar"
          className="fixed inset-x-0 top-0 h-2 z-50 md:hidden pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-full bg-ivoire/20">
            <motion.div
              className="h-full rounded-r-full bg-gradient-to-r from-acier via-ivoire to-acier dark:from-ivoire dark:via-doré dark:to-ivoire shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}