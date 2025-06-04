'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { SignatureSVGConfig } from '@/public/assets/img/svg/SignatureSVGconfig'
import { couleurs } from '@/styles/generated-colors.mjs'

export default function SignatureSVG({
  className = '',
  strokeColor = couleurs.ivoire
}) {
  const { title, paths } = SignatureSVGConfig

  // Variantes communes pour chaque chemin
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: i => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 2.5, bounce: 0, delay: 0.3 + i * 0.05 },
        opacity: { duration: 0.5, delay: 0.5 + i * 0.02 },
      },
    }),
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="28.4 28.9 301.8 168.9"
      className={className}
      strokeLinecap="round"
      aria-labelledby={title ? 'signature-title' : undefined}
      aria-hidden={!title}
      focusable="false"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {title && <title id="signature-title">{title}</title>}

      {paths.map((d, i) => (
        <motion.path
          key={i}
          custom={i}
          d={d}
          variants={pathVariants}
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  )
}
