'use client'

import { useState } from 'react'

const useButtonHover = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const getButtonProps = (index, className = 'btn-alforis-retro') => {
    const isHovered = hoveredIndex === index

    return {
      onMouseEnter: () => setHoveredIndex(index),
      onMouseLeave: () => setHoveredIndex(null),
      whileTap: {
        scale: 0.96,
        y: 1,
      },
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
      },
      className: `${className} ${isHovered ? 'drop-shadow-doré shadow-pressed-inner' : ''}`,
    }
  }

  return { getButtonProps }
}

export default useButtonHover
