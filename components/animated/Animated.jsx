import { Animated } from '@/components/animated/Animated'
'use client'

import React from 'react'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

const animationSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export const Animated = {
  Page: ({ children, className = '' }) => (
    <Animated.Div
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={className}
    >
      {children}
    </Animated.Div>
  ),

  Wrapper: ({ children, className = '' }) => (
    <Animated.Div
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={`animated-wrapper ${className}`}
    >
      {children}
    </Animated.Div>
  ),

  H1: ({ children, className = '' }) => (
    <Animated.H1
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={`animated-h1 ${className}`}
    >
      {children}
    </Animated.H1>
  ),

  H2: ({ children, className = '' }) => (
    <Animated.H2
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={`animated-h2 ${className}`}
    >
      {children}
    </Animated.H2>
  ),

  H3: ({ children, className = '' }) => (
    <Animated.H3
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={`animated-h3 ${className}`}
    >
      {children}
    </Animated.H3>
  ),

  P: ({ children, className = '' }) => (
    <Animated.P
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={`animated-p ${className}`}
    >
      {children}
    </Animated.P>
  ),

  Section: ({ children, className = '' }) => (
    <Animated.Section
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={className}
    >
      {children}
    </Animated.Section>
  ),

  Div: ({ children, className = '' }) => (
    <Animated.Div
      initial={animationSettings.initial}
      animate={animationSettings.animate}
      transition={animationSettings.transition}
      className={className}
    >
      {children}
    </Animated.Div>
  )
}

export default Animated;
