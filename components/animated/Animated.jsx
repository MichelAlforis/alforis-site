'use client'

import React from 'react'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

const animationSettings = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  slideFromLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  slideFromRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  }
}

const tags = [
  'div', 'section', 'article', 'h1', 'h2', 'h3', 'p', 'span', 'button',
  'ul', 'li', 'nav', 'header', 'footer', 'main'
]

function withMotion(tag) {
  return function AnimatedComponent({
    children,
    className = '',
    variant = 'fadeInUp',
    onAnimationComplete,
    ...props
  }) {
    const settings = animationSettings[variant] || animationSettings.fadeInUp
    const MotionTag = ClientOnlyMotion[tag] || ClientOnlyMotion.div

    return (
      <MotionTag
        {...settings}
        {...props}


        
        className={className}
      >
        {children}
      </MotionTag>
    )
  }
}


export const Animated = tags.reduce((acc, tag) => {
  const key = tag.charAt(0).toUpperCase() + tag.slice(1)
  acc[key] = withMotion(tag)
  return acc
}, {})

// Raw = les composants non animés, si besoin
export const Raw = tags.reduce((acc, tag) => {
  const key = tag.charAt(0).toUpperCase() + tag.slice(1)
  acc[key] = function RawComponent({ children, className = '', ...props }) {
    const Tag = tag
    return (
      <Tag {...props} className={className}>
        {children}
      </Tag>
    )
  }
  return acc
}, {})

// Ajout du composant Animated.Page
Animated.Page = function AnimatedPage({ children, className = '', variant = 'fadeInUp', ...props }) {
  const settings = animationSettings[variant] || animationSettings.fadeInUp
  const MotionDiv = ClientOnlyMotion.div

  return (
    <MotionDiv
      {...settings}
      {...props}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}


export default Animated
