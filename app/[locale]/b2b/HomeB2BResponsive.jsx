'use client'

import { useEffect, useState } from 'react'
import HomeB2BMobile from '@/app/[locale]/b2b/HomeB2BMobile'
import HomeB2BDesktop from '@/app/[locale]/b2b/HomeB2BDesktop'

export default function HomeB2BResponsive() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? <HomeB2BMobile /> : <HomeB2BDesktop />
}