'use client'

import { motion } from 'framer-motion';
import { forwardRef } from 'react'


function createComponent(tag) {
  return forwardRef(function ClientOnlyMotionComponent({ children, ...props }, ref) {
    const MotionTag = motion[tag]
    return <MotionTag ref={ref} {...props}>{children}</MotionTag>
  })
}

const ClientOnlyMotion = forwardRef(function ClientOnlyMotion({ as = 'div', children, ...props }, ref) {
  const MotionTag = motion[as] || motion.div
  return <MotionTag ref={ref} {...props}>{children}</MotionTag>
})

// Ajout des raccourcis : ClientOnlyMotion.div, .section, .span, etc.
const tags = ['div', 'section', 'span', 'header', 'main', 'footer', 'article', 'aside', 'ul', 'li', 'h1', 'h2', 'h3', 'p', 'button']

for (const tag of tags) {
  ClientOnlyMotion[tag] = createComponent(tag)
}

export default ClientOnlyMotion
