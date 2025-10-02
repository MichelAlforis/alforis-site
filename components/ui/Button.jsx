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
   
    if (sound && typeof window !== 'undefined' && 'vibrate' in navigator) {
     navigator.vibrate(30) // vibration de 30ms
   }

    if (to) {
      setTimeout(() => router.push(to), 30)
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
