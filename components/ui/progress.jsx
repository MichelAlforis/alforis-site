'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import cn from 'classnames'

/**
 * ProgressBar component styled for Alforis
 * @param {number} value - current progress value
 * @param {number} max - maximum progress value
 * @param {string} className - additional container classes
 */
export default function ProgressBar({ value = 0, max = 100, className = '' }) {
  const controls = useAnimation()
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    controls.start({
      width: `${percentage}%`,
      transition: { duration: 0.8, ease: 'easeOut' },
    })
  }, [percentage, controls])

  return (
    <div
      className={cn(
        'w-full h-3 bg-ardoise/30 rounded-full overflow-hidden shadow-inner',
        className
      )}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-ivoire via-doré to-ivoire shadow-md"
        initial={{ width: 0 }}
        animate={controls}
      />
    </div>
  )
}