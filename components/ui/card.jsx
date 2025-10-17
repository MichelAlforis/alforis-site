import { forwardRef } from 'react'
import cn from 'classnames'

/**
 * Card container component - UX améliorée
 * Props:
 * - className: additional tailwind classes
 * - variant: 'default' | 'elevated' | 'premium' | 'outlined'
 * - hover: boolean - active l'effet hover
 */
export const Card = forwardRef(({
  className = '',
  children,
  variant = 'default',
  hover = false,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-ivoire dark:bg-anthracite/40 rounded-2xl shadow-sm-soft border border-acier/20 dark:border-acier/10',
    elevated: 'bg-ivoire dark:bg-anthracite/40 rounded-2xl shadow-md-soft border border-acier/10',
    premium: 'bg-gradient-to-br from-ivoire to-ivoire/95 dark:from-anthracite/50 dark:to-anthracite/40 rounded-2xl shadow-premium border border-doré/20',
    outlined: 'bg-transparent rounded-2xl border-2 border-acier/30 dark:border-acier/20',
  }

  const hoverEffect = hover
    ? 'transition-all duration-300 ease-premium hover:shadow-lg-soft hover:scale-[1.02] hover:-translate-y-1 cursor-pointer'
    : 'transition-shadow duration-300'

  return (
    <div
      ref={ref}
      className={cn(
        variants[variant],
        hoverEffect,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = 'Card'

/**
 * CardHeader component for titles and subtitles
 */
export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 sm:px-8 pt-6 sm:pt-8', className)} {...props}>
    {children}
  </div>
)

/**
 * CardTitle component for card titles
 */
export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={cn('text-2xl font-semibold text-ardoise dark:text-ivoire mb-2', className)} {...props}>
    {children}
  </h3>
)

/**
 * CardDescription component for card descriptions
 */
export const CardDescription = ({ className = '', children, ...props }) => (
  <p className={cn('text-base text-acier dark:text-acier/80', className)} {...props}>
    {children}
  </p>
)

/**
 * CardContent component for main content
 */
export const CardContent = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 sm:px-8 pb-6 sm:pb-8', className)} {...props}>
    {children}
  </div>
)

/**
 * CardFooter component for actions or additional info
 */
export const CardFooter = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-acier/10', className)} {...props}>
    {children}
  </div>
)
