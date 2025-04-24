'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import useButtonHover from '@/hooks/useButtonHover'

export default function Button({
  children,
  onClick,
  to = '',
  index = 0,
  className = '',
  type = 'button',
  sound = true,
}) {
  const router = useRouter()
  const { getButtonProps } = useButtonHover()

  const handleClick = (e) => {
    if (sound) {
      const clickSound = new Audio('/sounds/click-retro.wav')
      clickSound.volume = 0.5
      clickSound.play()
    }

    if (to) {
      setTimeout(() => router.push(to), 180)
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      {...getButtonProps(index, className)}
    >
      {children}
    </motion.button>
  )
}
