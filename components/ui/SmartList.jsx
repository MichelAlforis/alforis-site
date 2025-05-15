// components/ui/SmartList.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Animated } from '@/components/animated/Animated'
import useButtonHover from '@/hooks/useButtonHover'

/**
 * Carte verticale élégante pour mobile-first, style Alforis.
 */
const SmartListItem = ({ item, index = 0, type }) => {
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
    <Link href={href} passHref>
      <Animated.Div
        {...getButtonProps(
          index,
          'flex items-start gap-4 py-4 border-b border-ivoire/40 hover:bg-ivoire/40 transition-colors rounded-lg px-2 sm:px-4'
        )}
      >
        <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="96px"
            placeholder="blur"
            blurDataURL="/assets/img/placeholder.png"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-medium uppercase text-doré mb-1">
            {itemType}
          </span>
          <h3 className="text-lg font-title text-ardoise leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-anthracite/80 mt-1 line-clamp-3">
            {description}
          </p>
          {price && (
            <p className="text-sm font-semibold text-ardoise mt-2">
              {price}
            </p>
          )}
        </div>
      </Animated.Div>
    </Link>
  )
}

/**
 * Liste verticale pour mobile ou affichage linéaire contextuel.
 */
const SmartList = ({
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
    return <p className="text-center text-anthracite py-6">{emptyMessage}</p>
  }

  return (
    <div className="divide-y divide-ivoire/20 fade-anim">
      {filtered.map((item, index) => (
        <SmartListItem key={item.slug || index} item={item} index={index} type={type} />
      ))}
    </div>
  )
}

export default SmartList
