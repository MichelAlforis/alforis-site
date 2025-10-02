'use client'

import React from 'react'
import { motion } from 'framer-motion'

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
  },
}

const tags = [
  'div','section','article','h1','h2','h3','p','span',
  'button','ul','li','nav','header','footer','main'
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
    // on prend la primitive motion[tag] ou on retombe sur motion.div
    const MotionTag = motion[tag] || motion.div

    return (
      <MotionTag
        {...settings}
        {...props}
        onAnimationComplete={onAnimationComplete}
        className={className}
      >
        {children}
      </MotionTag>
    )
  }
}

export const Animated = tags.reduce((acc, tag) => {
  const key = tag[0].toUpperCase() + tag.slice(1)
  acc[key] = withMotion(tag)
  return acc
}, {})

// pour la page complète
Animated.Page = function AnimatedPage({
  children,
  className = '',
  variant = 'fadeInUp',
  ...props
}) {
  const settings = animationSettings[variant] || animationSettings.fadeInUp
  return (
    <motion.div {...settings} {...props} className={className}>
      {children}
    </motion.div>
  )
}

export default Animated
