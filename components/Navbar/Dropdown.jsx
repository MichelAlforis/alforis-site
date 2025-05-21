// components/Navbar/Dropdown.jsx
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          flex items-center px-3 py-2 
          text-base font-medium 
          transition-colors duration-200
          text-acier dark:text-ivoire hover:text-doré
        `}
        aria-expanded={open}
      >
        {label}
        <Menu size={16} className="ml-1" />
      </button>

      {open && (
        <div className="
          absolute right-0 mt-2 w-48
          bg-ivoire dark:bg-ardoise 
          rounded shadow-lg overflow-hidden z-50
        ">
          {children}
        </div>
      )}
    </div>
  )
}
