// components/OffreCard.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'

const OffreCard = ({ type = '', title = '', description = '', image = '', slug = '', price = '', index = 0 }) => {
  const { getButtonProps } = useButtonHover()
  const imageUrl = image || '/img/default-cover.jpg'
  const href = `/marketplace/${slug}`

  return (
    <Animated.Page>
      <Link href={href} passHref>
        <Animated.Div
          {...getButtonProps(
            index,
            'flex flex-col h-full bg-ivoire text-anthracite rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden'
          )}
        >
          {/* Image de couverture */}
          <div className="h-48 w-full bg-center bg-cover" style={{ backgroundImage: `url(${imageUrl})` }} />

          {/* Contenu textuel */}
          <div className="flex flex-col flex-1 p-4">
            <span className="text-sm font-semibold text-doré uppercase mb-1">{type}</span>
            <h3 className="text-xl font-title mb-2">{title}</h3>
            <p className="text-sm text-anthracite/80 flex-1">{description}</p>
            <p className="text-sm font-bold text-ardoise mt-4">{price}</p>
          </div>
        </Animated.Div>
      </Link>
    </Animated.Page>
  )
}

export default OffreCard