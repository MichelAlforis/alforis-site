import { useEffect, useState } from 'react'

export function useScrollContainer() {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('__next') || window
      setContainer(el)
    }
  }, [])

  return container
}