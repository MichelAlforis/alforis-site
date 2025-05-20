// components/TabsBar.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TabsBar({ tabs = [], activeKey, onChange }) {
  return (
        <div className="relative flex flex-shrink-0 flex-wrap justify-evenly overflow-x-auto space-x-4 px-4 pb-2">
      {/* Surbrillance partagée */}
        <motion.span
          layoutId="tab-underline"
          className="absolute bottom-0 h-1 bg-doré/40 rounded-full pointer-events-none"
          style={{
            left: 'var(--highlight-left)',
            width: 'var(--highlight-width)'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />

      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={e => {
            console.log('TabsBar onClick:', tab.key)
            // on lit la position/largeur du bouton et qu'on injecte en CSS
            const rect = e.currentTarget.getBoundingClientRect()
            document.documentElement.style.setProperty('--highlight-left', `${rect.left}px`)
            document.documentElement.style.setProperty('--highlight-width', `${rect.width}px`)
            onChange(tab.key)
          }}
          className={`
            relative z-base text-xl sm:text-xl flex-shrink-0 py-1 px-2 sm:px-10 
            text-sm sm:text-base font-medium transition rounded-full
            ${activeKey === tab.key
              ? 'font-semibold text-acier dark:text-ivoire'
              : 'text-acier/70  dark:text-ivoire/70'}
          `}
          aria-pressed={activeKey === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}