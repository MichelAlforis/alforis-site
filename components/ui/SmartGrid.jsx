// components/ui/SmartGrid.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'

/**
 * Carte unifiée pour tous types de contenus.
 */
const GenericCard = ({ item, index = 0, type }) => {
  const { getButtonProps } = useButtonHover()

  const {
    title,
    description,
    image = '/assets/img/placeholder.png',
    slug,
    price = '',
    type: itemType = type,
    hrefPrefix = `/${type}`,
  } = item

  const href = `${hrefPrefix}/${slug}`

  return (
    <Animated.Page>
      <Link href={href} passHref>
        <Animated.Div
          {...getButtonProps(
            index,
            'flex flex-col h-full bg-ivoire text-anthracite rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer overflow-hidden'
          )}
        >
          <div className="relative h-48 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL="/assets/img/placeholder.png"
            />
          </div>
          <div className="flex flex-col flex-1 p-4">
            <span className="text-sm font-semibold text-doré uppercase mb-1">
              {itemType}
            </span>
            <h3 className="text-xl font-title mb-2">{title}</h3>
            <p className="text-sm text-anthracite/80 flex-1">{description}</p>
            {price && <p className="text-sm font-bold text-ardoise mt-4">{price}</p>}
          </div>
        </Animated.Div>
      </Link>
    </Animated.Page>
  )
}

/**
 * Grille unifiée avec cartes dynamiques.
 */
const SmartGrid = ({
  data = [],
  type = '',
  filterKey = '',
  filterValue = '',
  emptyMessage = 'Aucun contenu disponible.'
}) => {
  const filtered =
    filterKey && filterValue
      ? data.filter((item) => item[filterKey]?.toLowerCase() === filterValue.toLowerCase())
      : data

  if (!Array.isArray(filtered) || filtered.length === 0) {
    return (
      <div className="text-center text-anthracite py-8">
        {emptyMessage}
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-anim auto-rows-fr">
      {filtered.map((item, index) => (
        <div key={item.slug || index} className="h-full">
          <GenericCard item={item} index={index} type={type} />
        </div>
      ))}
    </section>
  )
}

export default SmartGrid
