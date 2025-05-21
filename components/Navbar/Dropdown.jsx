// components/Navbar/Dropdown.jsx
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import clsx from 'clsx'

export default function Dropdown({ label, children, isHome }) {
  const [open, setOpen] = useState(false)


  return (
    <div  className={clsx(
            'flex-col items-center px-3 py-2 font-semibold uppercase transition-colors duration-200 dark:text-ivoire hover:text-doré hover:bg-ivoire rounded-full',
            isHome ? 'text-ivoire hover:text-doré' : 'text-acier hover:text-doré'
          )}>

        <button
          onClick={() => setOpen(o => !o)}
          className={clsx(
            'more flex items-center px-3 py-2 font-semibold uppercase transition-colors duration-200 dark:text-ivoire hover:text-doré hover:bg-ivoire rounded-full',
            isHome ? 'text-ivoire' : 'text-acier'
          )}
          aria-expanded={open}
        >
          {label}
          <Menu size={16} className="ml-1" />
        </button>
      

      {open && (
        <div
          className={clsx(
            /* dropdown container */
            'dropdown-menu absolute right-0 mt-2 w-auto rounded shadow-lg overflow-visible z-nav rounded-xl',

            /* background & color depending on home */
            isHome
              ? 'bg-transparent text-ivoire'
              : 'bg-ivoire/10 dark:bg-acier/10 backdrop-blur-2xl text-acier'
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
