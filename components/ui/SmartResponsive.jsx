'use client'
// components/ui/SmartResponsive.jsx

import React from 'react'
import SmartGrid from './SmartGrid'
import SmartList from './SmartList'

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return isMobile
}

/**
 * Affiche SmartList sur mobile, SmartGrid sur desktop
 */
export default function SmartResponsive(props) {
  const isMobile = useIsMobile()

  return isMobile ? <SmartList {...props} /> : <SmartGrid {...props} />
}
