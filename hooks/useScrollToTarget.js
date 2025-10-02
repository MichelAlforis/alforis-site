'use client'
// hooks/useScrollToTarget.js
import { useEffect, useState } from "react"

export default function useScrollToTarget(targetId, offset = 250) {
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const checkProximity = () => {
      const el = document.getElementById(targetId)
      if (!el) return
      const rect = el.getBoundingClientRect()
      setIsNear(rect.top < offset && rect.bottom > 0)
    }

    checkProximity()
    window.addEventListener("scroll", checkProximity)
    return () => window.removeEventListener("scroll", checkProximity)
  }, [targetId, offset])

  return isNear
}
