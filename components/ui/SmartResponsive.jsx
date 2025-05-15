// components/ui/SmartResponsive.jsx
'use client'

import React from 'react'
import SmartGrid from '@/components/ui/SmartGrid'
import SmartList from '@/components/ui/SmartList'

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
 * Rend automatiquement une grille ou une liste selon la taille d'écran
 */
const SmartResponsive = ({
  data = [],
  type = '',
  filterKey = '',
  filterValue = '',
  emptyMessage = 'Aucun contenu disponible.'
}) => {
  const isMobile = useIsMobile()

  const sharedProps = { data, type, filterKey, filterValue, emptyMessage }

  return isMobile ? (
    <SmartList {...sharedProps} />
  ) : (
    <SmartGrid {...sharedProps} />
  )
}

export default SmartResponsive
