'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import { extractPathsFromReactSvg } from '@/hooks/useExtractPathsFromSvg'
import useScrollPosition from '@/hooks/useScrollPosition'

export default function AnimatedSVGRenderer({
  SvgComponent,
  viewBox = '0 0 711 1089',
  className = '',
  strokeWidth = 7,
  strokeColor = 'var(--stroke-color)',
  fillColor = 'var(--fill-color)',
  duration = 15,
  delayStep = 1.2,
  width = '100%',
  height = '100%',
  wrapperClassName = 'w-full h-auto',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '0px 0px -10% 0px', once: true })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scrollPosition = useScrollPosition()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [-3, 3])
  const scrollRotateY = useTransform(scrollYProgress, [0, 1], [3, -3])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (!isMobile && typeof window !== 'undefined') {
      const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
      const handleMouseMove = (e) => {
        const offsetX = (e.clientX - center.x) / 30
        const offsetY = (e.clientY - center.y) / 30
        x.set(offsetX)
        y.set(-offsetY)
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  const paths = extractPathsFromReactSvg(<SvgComponent />)

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto ${wrapperClassName}`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: 'easeInOut',
      }}
    >
      {isInView && paths.length > 0 && (
        <motion.svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid meet"
          style={{
            rotateX: isMobile ? scrollRotateX : springY,
            rotateY: isMobile ? scrollRotateY : springX,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
          }}
        >
          {paths.map((path, i) => (
            <motion.path
              key={i}
              d={path.props.d}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={fillColor}
              fillOpacity={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration,
                ease: 'easeInOut',
                delay: i * delayStep,
              }}
            />
          ))}
        </motion.svg>
      )}
    </motion.div>
  )
}
