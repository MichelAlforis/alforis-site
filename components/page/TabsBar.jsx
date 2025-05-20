// components/TabsBar.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TabsBar({ tabs = [], activeKey, onChange }) {
  return (
        <div className="relative flex flex-wrap justify-center overflow-x-auto space-x-4 px-4 pb-2">
      {/* Surbrillance partagée */}
      <motion.div
        layoutId="tab-highlight"
        className="absolute inset-y-0 bg-doré/40 rounded-full pointer-events-none"
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        style={{
          // on mesure le bouton actif via CSS custom properties inj. par JS plus bas
          left: `var(--highlight-left, 0px)`,
          width: `var(--highlight-width, 0px)`
        }}
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
              ? 'text-anthracite dark:text-ivoire'
              : 'text-ardoise dark:text-ivoire/70'}
              whitespace-nowrap overflow-hidden text-ellipsis
          `}
          aria-pressed={activeKey === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}