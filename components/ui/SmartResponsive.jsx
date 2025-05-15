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
 * Rend SmartGrid ou SmartList selon la largeur
 */
export default function SmartResponsive({ data = [], type = '', filterKey = '', filterValue = '', emptyMessage = 'Aucun contenu disponible.', extra, infiniteRef }) {
  const isMobile = useIsMobile()
  const sharedProps = { data, type, filterKey, filterValue, emptyMessage, extra, infiniteRef }

  return isMobile
    ? <SmartList {...sharedProps} />
    : <SmartGrid {...sharedProps} />
}