'use client'

import React from 'react'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import { animationSettings } from '@/lib/server/animationSettings'

// Liste des tags HTML que tu veux animer
const tags = [
  'div', 'section', 'article', 'h1', 'h2', 'h3', 'p', 'span', 'button',
  'ul', 'li', 'nav', 'header', 'footer', 'main'
]

// Fonction génératrice
function withMotion(tag) {
  return function AnimatedComponent({ children, className = '', variant = 'fadeInUp', ...props }) {
    const settings = animationSettings[variant] ?? animationSettings.fadeInUp
    const MotionTag = ClientOnlyMotion[tag] || ClientOnlyMotion.div

    return (
      <MotionTag {...settings} {...props} className={className}>
        {children}
      </MotionTag>
    )
  }
}

// Génération automatique des composants : Animated.Div, Animated.Span, etc.
export const Animated = tags.reduce((acc, tag) => {
  const key = tag.charAt(0).toUpperCase() + tag.slice(1)
  acc[key] = withMotion(tag)
  return acc
}, {})

export default Animated
