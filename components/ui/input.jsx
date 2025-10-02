import { forwardRef } from 'react'
import cn from 'classnames'

/**
 * Input component with optional icon
 * Props:
 * - icon: React node displayed before the input
 * - className: additional tailwind classes for the wrapper
 * - ...props: native input attributes
 */
export const Input = forwardRef(({ icon, className = '', ...props }, ref) => (
  <div
    className={cn(
      'flex items-center border border-acier-300 rounded-lg px-4 py-2',
      className
    )}
  >
    {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
    <input
      ref={ref}
      className="flex-1 bg-transparent outline-none text-base"
      {...props}
    />
  </div>
))
Input.displayName = 'Input'
