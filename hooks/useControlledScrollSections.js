'use client'
// hooks/useControlledScrollSections.js

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Custom hook to control scrolling between full-screen sections.
 * @param {string[]} sectionIds - Array of element IDs for each scrollable section.
 * @param {object} options
 * @param {number} options.cooldown - Minimum time (ms) between section navigations.
 * @param {React.RefObject} options.containerRef - Optional ref to scroll container; defaults to window/document.
 */
export default function useControlledScrollSections(
  sectionIds,
  { cooldown = 1000, containerRef = null } = {}
) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const touchStartY = useRef(null)
  const cooldownTimeout = useRef(null)

  // Determine the scroll container (window or custom ref)
  const getContainer = () => {
    if (containerRef && containerRef.current) return containerRef.current
    if (typeof window !== 'undefined') return window
    return null
  }

  // Scroll to a specific section index
  const goToSection = useCallback(
    (idx) => {
      if (idx < 0 || idx >= sectionIds.length) return
      const target = document.getElementById(sectionIds[idx])
      if (!target) return

      setIsScrolling(true)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setCurrentSectionIndex(idx)

      clearTimeout(cooldownTimeout.current)
      cooldownTimeout.current = setTimeout(
        () => setIsScrolling(false),
        cooldown
      )
    },
    [sectionIds, cooldown]
  )

  const goToNextSection = useCallback(
    () => goToSection(currentSectionIndex + 1),
    [currentSectionIndex, goToSection]
  )

  const goToPrevSection = useCallback(
    () => goToSection(currentSectionIndex - 1),
    [currentSectionIndex, goToSection]
  )

  useEffect(() => {
    const container = getContainer()
    if (!container || typeof window === 'undefined') return

    const handleWheel = (e) => {
      if (isScrolling) return
      // Threshold to avoid micro scrolls
      if (e.deltaY > 20) {
        e.preventDefault()
        goToNextSection()
      } else if (e.deltaY < -20) {
        e.preventDefault()
        goToPrevSection()
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isScrolling || touchStartY.current == null) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (delta > 30) goToNextSection()
      else if (delta < -30) goToPrevSection()
      touchStartY.current = null
    }

    const eventTarget = container === window ? document : container
    eventTarget.addEventListener('wheel', handleWheel, { passive: false })
    eventTarget.addEventListener('touchstart', handleTouchStart, { passive: true })
    eventTarget.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      eventTarget.removeEventListener('wheel', handleWheel)
      eventTarget.removeEventListener('touchstart', handleTouchStart)
      eventTarget.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(cooldownTimeout.current)
    }
  }, [isScrolling, goToNextSection, goToPrevSection, containerRef])

  return {
    currentSection: sectionIds[currentSectionIndex],
    currentSectionIndex,
    isScrolling,
    goToSection,
    goToNextSection,
    goToPrevSection,
  }
}
