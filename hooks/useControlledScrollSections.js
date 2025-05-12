// hooks/useControlledScrollSections.js
import { useEffect, useRef, useState } from 'react'
import { useScrollContainer } from './useScrollContainer'

export default function useControlledScrollSections(sectionIds, cooldown = 1000) {
  const scrollContainer = useScrollContainer()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    if (!scrollContainer) return

    const handleWheel = (e) => {
      e.preventDefault()
      if (isScrolling) return
      if (e.deltaY > 30) goToNextSection()
      else if (e.deltaY < -30) goToPrevSection()
    }
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e) => {
      if (isScrolling) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (delta > 30) goToNextSection()
      else if (delta < -30) goToPrevSection()
    }

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scrollContainer, currentSectionIndex, isScrolling])

  const goToSection = (idx) => {
    if (idx < 0 || idx >= sectionIds.length) return
    setIsScrolling(true)
    const target = document.getElementById(sectionIds[idx])
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setCurrentSectionIndex(idx)
    setTimeout(() => setIsScrolling(false), cooldown)
  }
  const goToNextSection = () => goToSection(currentSectionIndex + 1)
  const goToPrevSection = () => goToSection(currentSectionIndex - 1)

  return {
    currentSection: sectionIds[currentSectionIndex],
    currentSectionIndex,
    goToNextSection,
    goToPrevSection,
    isScrolling,
  }
}
