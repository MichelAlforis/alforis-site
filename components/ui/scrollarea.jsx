'use client'

import React, { forwardRef } from 'react'

/**
 * ScrollArea component pour défilement horizontal ou vertical
 * @param {{ children: React.ReactNode, horizontal?: boolean, vertical?: boolean, className?: string }} props
 */
export const ScrollArea = forwardRef(
  ({ children, horizontal = true, vertical = false, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={
        `${horizontal ? 'overflow-x-auto' : ''} ${vertical ? 'overflow-y-auto' : ''} ` +
        'scrollbar-thin scrollbar-thumb-steel scrollbar-track-light ' +
        `${className}`
      }
      {...props}
    >
      {children}
    </div>
  )
)
ScrollArea.displayName = 'ScrollArea'
