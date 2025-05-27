// MobileScrollProgress.jsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollPosition from '@/hooks/useScrollPosition'

export default function MobileScrollProgress({ containerRef }) {
  const scrollY = useScrollPosition(containerRef)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // On écoute exactement le même élément pour le scroll et le ratio
    const el = containerRef?.current 
             || document.scrollingElement 
             || document.documentElement
    const total = el.scrollHeight - el.clientHeight
    setProgress(total > 0 ? scrollY / total : 0)

    if (scrollY > 20) {
      setVisible(true)
      const hide = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(hide)
    }
  }, [scrollY, containerRef])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 top-0 h-1 z-50 md:hidden pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-full bg-ivoire/50">
            <motion.div
              className="h-full rounded-r-full bg-gradient-to-r from-doré to-ivoire shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 1) * 100}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
