'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Render its children into the #global-overlay container.
 */
export default function OverlayPortal({ children }) {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const ov = document.getElementById('global-overlay')
    if (!ov) {
      console.warn('OverlayPortal: #global-overlay introuvable')
      return
    }
    setContainer(ov)
  }, [])

  if (!container) return null

  return createPortal(children, container)
}
