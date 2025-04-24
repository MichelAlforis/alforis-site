'use client'
import { useEffect, useState } from "react"

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY || 0)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Init value

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollPosition
}
