// components/TabsBar.jsx
'use client'

import React from 'react'

export default function TabsBar({ tabs = [], activeKey, onChange }) {
  return (
    <div className="flex w-full justify-center overflow-x-auto space-x-2 px-4 pb-2">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange && onChange(tab.key)}
          className={`whitespace-nowrap py-1 px-3 rounded-full text-sm font-medium transition ${
              activeKey === tab.key
                ? 'bg-doré text-ivoire'
                : 'bg-light text-dore'
              }
          `}
          aria-pressed={activeKey === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}