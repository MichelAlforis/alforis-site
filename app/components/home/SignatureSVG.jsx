'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SignatureSVGConfig } from '@/public/assets/img/svg/SignatureSVGconfig'
import { couleurs } from '@/styles/generated-colors'

const SignatureSVG = ({
  className = '',
  strokeColor = 'text-doré',
  fillColor = 'text-doré'
}) => {
  const { title, d1 } = SignatureSVGConfig

  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        delay: i * 0.3,
        ease: 'easeInOut',
      },
    }),
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 472 337"
      fill={fillColor}
      stroke="currentColor"
      strokeWidth="2"
      className={`w-auto h-auto ${strokeColor} ${className}`}
      aria-labelledby={title ? 'signature-title' : undefined}
      aria-hidden={!title}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {title && <title id="signature-title">{title}</title>}

      <motion.path
        d={d1}
        variants={pathVariants}
        custom={0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export default SignatureSVG
