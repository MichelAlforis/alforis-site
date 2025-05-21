// components/Navbar/NavLink.jsx
'use client'

import Link from 'next/link'

export default function NavLink({ href, label, onClick, isActive }) {
  return (
    <Link 
        href={href} 
        onClick={onClick}
        className={`
          transition-colors duration-200
          ${isActive
            ? 'text-doré'
            : 'text-acier dark:text-ivoire hover:text-doré'
          }
        `}
      >
        {label}
    </Link>
  )
}
