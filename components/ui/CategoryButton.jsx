'use client'

import React from 'react'

/**
 * CategoryButton component pour filtres avec texte secondaire
 * @param {{ label: string, subtext?: string, selected?: boolean, onClick?: () => void, className?: string }} props
 */
export function CategoryButton({ label, subtext, selected = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={
        `inline-flex flex-col items-center justify-center px-4 py-2 rounded-lg border transition-all focus:outline-none ` +
        (selected
          ? 'bg-doré text-ivoire border-doré'
          : 'bg-transparent text-doré border-doré') +
        ` ${className}`
      }
    >
      <span className="font-medium">{label}</span>
      {subtext && (
        <span className="text-sm text-steel mt-1" aria-label="sous-texte">
          {subtext}
        </span>
      )}
    </button>
  )
}
