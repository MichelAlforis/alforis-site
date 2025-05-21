// components/Navbar/Dropdown.jsx
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const isHome   = pathname === '/'


  return (
    <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className={clsx(
            'flex items-center px-3 py-2 font-semibold uppercase transition-colors duration-200 dark:text-ivoire hover:text-doré hover:bg-ivoire',
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
            'dropdown-menu absolute right-0 mt-2 w-auto rounded shadow-lg overflow-visible z-nav',

            /* small text on all children */
            '!text-xs !leading-tight',

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
