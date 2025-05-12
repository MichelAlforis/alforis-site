'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import BlasonLogo from './BlasonLogo'
import TexteLogo from './TexteLogo'

export default function IntroOverlay({ onFinish }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onFinish) onFinish()
    }, 2000) // max total

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-ivoire z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <div className="relative w-full max-w-5xl h-40">
            {/* Blason Logo */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%', left: '50%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 -translate-x-full -translate-y-1/2"
            >
              <BlasonLogo className="w-24 h-24" />
            </motion.div>

            {/* Texte Logo */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%', left: '50%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 translate-x-0 -translate-y-1/2"
            >
              <TexteLogo className="w-32 h-12" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
