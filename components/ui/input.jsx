import { forwardRef, useState } from 'react'
import cn from 'classnames'

/**
 * Input component with optional icon - UX améliorée
 * Props:
 * - icon: React node displayed before the input
 * - className: additional tailwind classes for the wrapper
 * - error: boolean - active l'état d'erreur
 * - success: boolean - active l'état de succès
 * - ...props: native input attributes
 */
export const Input = forwardRef(({
  icon,
  className = '',
  error = false,
  success = false,
  disabled = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const baseClasses = 'flex items-center rounded-lg px-4 py-3 transition-all duration-300 ease-premium'

  const stateClasses = cn({
    // État normal
    'border border-acier/30 bg-ivoire dark:bg-anthracite/30': !error && !success && !disabled,
    'hover:border-acier/50': !error && !success && !disabled && !isFocused,
    'border-ardoise ring-4 ring-ardoise/10': !error && !success && isFocused,

    // État erreur
    'border-red-400 bg-red-50 dark:bg-red-900/10': error,
    'ring-4 ring-red-100 dark:ring-red-900/20': error && isFocused,

    // État succès
    'border-green-400 bg-green-50 dark:bg-green-900/10': success,
    'ring-4 ring-green-100 dark:ring-green-900/20': success && isFocused,

    // État désactivé
    'border-acier/20 bg-acier/5 cursor-not-allowed opacity-60': disabled,
  })

  return (
    <div
      className={cn(baseClasses, stateClasses, className)}
    >
      {icon && (
        <span className={cn(
          'mr-3 flex-shrink-0 transition-colors duration-200',
          {
            'text-acier': !error && !success && !isFocused,
            'text-ardoise': isFocused && !error && !success,
            'text-red-500': error,
            'text-green-500': success,
          }
        )}>
          {icon}
        </span>
      )}
      <input
        ref={ref}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'flex-1 bg-transparent outline-none text-base placeholder:text-acier/50',
          'text-anthracite dark:text-ivoire',
          'disabled:cursor-not-allowed',
          {
            'text-red-600 dark:text-red-400': error,
            'text-green-600 dark:text-green-400': success,
          }
        )}
        {...props}
      />
    </div>
  )
})
Input.displayName = 'Input'

/**
 * Label component for inputs
 */
export const Label = forwardRef(({ className = '', children, required = false, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'block text-sm font-semibold text-anthracite dark:text-ivoire mb-2',
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
))
Label.displayName = 'Label'

/**
 * Helper text component for inputs
 */
export const HelperText = ({ className = '', error = false, children, ...props }) => (
  <p
    className={cn(
      'text-sm mt-2 transition-colors duration-200',
      error ? 'text-red-500' : 'text-acier dark:text-acier/70',
      className
    )}
    {...props}
  >
    {children}
  </p>
)
