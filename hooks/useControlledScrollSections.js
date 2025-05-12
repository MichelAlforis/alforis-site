import { useEffect, useRef, useState } from 'react'

export default function useControlledScrollSections(sectionIds, cooldown = 1000) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return

    const handleWheel = (e) => {
      if (isScrolling) return

      if (e.deltaY > 30) {
        goToNextSection()
      } else if (e.deltaY < -30) {
        goToPrevSection()
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isScrolling) return

      const touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY.current - touchEndY

      if (delta > 30) {
        goToNextSection()
      } else if (delta < -30) {
        goToPrevSection()
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSectionIndex, isScrolling])

  const goToSection = (index) => {
    if (index < 0 || index >= sectionIds.length) return

    setIsScrolling(true)
    const target = document.getElementById(sectionIds[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setCurrentSectionIndex(index)
    }

    setTimeout(() => {
      setIsScrolling(false)
    }, cooldown)
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
