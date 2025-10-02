import { forwardRef } from 'react'
import cn from 'classnames'

/**
 * Card container component
 * Props:
 * - className: additional tailwind classes
 */
export const Card = forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-ivoire rounded-2xl shadow-sm border border-acier-200',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'

/**
 * CardHeader component for titles and subtitles
 */
export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 pt-6', className)} {...props}>
    {children}
  </div>
)

/**
 * CardContent component for main content
 */
export const CardContent = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 pb-6', className)} {...props}>
    {children}
  </div>
)
