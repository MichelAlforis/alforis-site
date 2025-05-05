'use client'

import React from 'react'
import Link from 'next/link'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'

const ContentCard = ({ type = '', title = '', description = '', image = '', slug = '', index = 0 }) => {
  const { getButtonProps } = useButtonHover()

  const safeType = (type || 'parcours').toLowerCase().trim()
  const safeSlug = slug?.trim() || ''
  const href = `/${safeType}/${safeSlug}`
  const imageUrl = image || '/img/default-cover.jpg'

  return (
    <Animated.Main>
      <Link href={href} passHref>
        <Animated.Div
          {...getButtonProps(
            index,
            'flex flex-col h-full bg-ivoire text-anthracite rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden'
          )}
        >
          {/* Image avec dimension fixe */}
          <div className="h-48 w-full bg-center bg-cover" style={{ backgroundImage: `url(${imageUrl})` }} />

          {/* Contenu textuel */}
          <div className="flex flex-col flex-1 p-4">
            <span className="text-sm font-semibold text-doré uppercase mb-2">
              {type || 'Parcours'}
            </span>
            <h3 className="text-xl font-title mb-2">{title}</h3>
            <p className="text-sm text-anthracite/80 flex-1">{description}</p>
          </div>
        </Animated.Div>
      </Link>
    </Animated.Main>
  )
}

export default ContentCard
