'use client'

import { useEffect, useState } from 'react'
import HomeMobile from '@/app/particulier/HomeMobile'
import HomeDesktop from '@/app/particulier/HomeDesktop'

export default function HomeResponsive() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? <HomeMobile /> : <HomeDesktop />
}
