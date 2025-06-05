// components/TabsBar.jsx
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TabsBar({ tabs = [], activeKey, onChange }) {
  // tableau de refs pour pouvoir mesurer chaque bouton
  const btnRefs = useRef([])
  const [isTwoColumns, setIsTwoColumns] = useState(false)

  useEffect(() => {
    const checkColumns = () => {
      const widths = btnRefs.current.map(el => (el ? el.offsetWidth : 0))
      const maxWidth = Math.max(...widths, 0)
      setIsTwoColumns(maxWidth * 2 < window.innerWidth)
    }
    checkColumns()
    window.addEventListener('resize', checkColumns)
    return () => window.removeEventListener('resize', checkColumns)
  }, [tabs])

  return (
    <div
      className={`
        grid 
        ${isTwoColumns ? 'grid-cols-2 gap-4' : 'grid-cols-1'} 
        sm:grid-cols-2 
        md:flex md:flex-row 
        justify-center text-center 
        px-4 pb-2
      `}
    >
      
      {tabs.map(tab => {
        const isActive = activeKey === tab.key
        return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`
                    relative z-base flex-shrink-0 py-1 px-1 sm:px-6
                    text-l sm:text-xl md:text-xl transition rounded-full
                  ${isActive 
                    ? 'text-acier font-medium bg-doré/50 dark:text-ivoire' 
                    : 'text-acier/70 font-normal dark:text-ivoire/70'}     
                `}
                aria-pressed={isActive}
              >
            {tab.label}

            {isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 inset-x-2 h-1 bg-doré/40 rounded-full pointer-events-none"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
