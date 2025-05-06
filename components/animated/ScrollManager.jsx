'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function ScrollManager() {
  const pathname = usePathname()

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToTop()
    }, 100)

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
