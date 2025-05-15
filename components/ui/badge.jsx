'use client'
// components/ui/badge.jsx

import React from 'react'
import clsx from 'clsx'

/**
 * Badge component for tags and filters
 * @param {{ children: React.ReactNode, variant?: 'solid' | 'outline', className?: string }} props
 */
export function Badge({ children, variant = 'outline', className = '', ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors',
        variant === 'solid'
          ? 'bg-doré text-white'
          : 'border border-doré text-doré',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}