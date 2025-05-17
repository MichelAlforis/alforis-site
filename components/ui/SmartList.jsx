'use client'
// components/ui/SmartList.jsx

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'

/**
 * Rendu d’un item de la liste verticale
 */
function SmartListItem({ item, index = 0, type, extra }) {
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
    <div className="relative">
      {extra && (
        <div className="absolute top-3 right-3 z-30">
          {extra(item)}
        </div>
      )}
      <Link href={href} passHref>
        <Animated.Div
          {...getButtonProps(
            index,
            'flex items-start gap-4 py-4 border-b border-ivoire/40 dark:border-gray-700 hover:bg-ivoire/40 dark:hover:bg-gray-700 transition-colors rounded-lg px-2 sm:px-4 cursor-pointer'
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
            <span className="text-xs font-medium uppercase text-doré mb-1 truncate">
              {itemType}
            </span>
            <h3 className="text-lg font-title text-ardoise dark:text-gray-100 leading-tight line-clamp-2 truncate">
              {title}
            </h3>
            <p className="text-sm text-anthracite/80 dark:text-gray-400 mt-1 line-clamp-3 truncate">
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
    </div>
  )
}

/**
 * Liste verticale intelligente
 */
export default function SmartList({
  data = [],
  type = '',
  filterKey = '',
  filterValue = '',
  emptyMessage = 'Aucun contenu disponible.',
  extra,
  infiniteRef,
}) {
  const filteredData =
    filterKey && filterValue
      ? data.filter((item) => item[filterKey] === filterValue)
      : data

  if (!filteredData.length) {
    return <p className="text-center p-4">{emptyMessage}</p>
  }

  return (
    <div ref={infiniteRef}>
      {filteredData.map((item, index) => (
        <SmartListItem
          key={item.slug ?? index}
          item={item}
          index={index}
          type={type}
          extra={extra}
        />
      ))}
    </div>
  )
}
