'use client'

import { useEffect, useState } from 'react'
import HomeB2BMobile from './HomeB2BMobile'
import HomeB2BDesktop from './HomeB2BDesktop'

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