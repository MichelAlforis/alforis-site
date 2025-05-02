'use client'
import React from 'react'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import { animationSettings } from '@/lib/server/animationSettings'

const withMotion = (tag) =>
  ({ children, className = '', variant = 'fadeInUp' }) => {
    const settings = animationSettings[variant] ?? animationSettings.fadeInUp
    return (
      <ClientOnlyMotion
        as={tag}
        {...settings}
        className={className}
      >
        {children}
      </ClientOnlyMotion>
    )
  }

export const Animated = {
  Page: withMotion('div'),
  Wrapper: withMotion('div'),
  Div: withMotion('div'),
  Section: withMotion('section'),
  Article: withMotion('article'),
  H1: withMotion('h1'),
  H2: withMotion('h2'),
  H3: withMotion('h3'),
  P: withMotion('p')
}

export default Animated
