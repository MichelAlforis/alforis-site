'use client'

import { useState, useEffect, react } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'


/**
 * GenericCard: carte unique avec overlay d'actions (ex: bouton favori)
 */
const GenericCard = ({ item, index = 0, type, extra }) => {
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

  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="relative h-full group">
      {/* Action overlay (étoile, badge, etc.) */}
      {extra && (
        <div className="absolute top-2 right-2 z-30">
          {extra(item)}
        </div>
      )}

      <Animated.Page>
        <Link href={href} passHref>
          <Animated.Div
            {...getButtonProps(
              index,
              'flex flex-col h-full bg-ivoire dark:border-acier/70 hover:bg-ivoire/40 dark:hover:bg-ivoire/70 dark:bg-ivoire/40 text-anthracite dark:bg-acier-800 dark:text-acier-100 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-[1.03] cursor-pointer overflow-hidden'
            )}
          >
            {/* Image */}
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

            {/* Contenu */}
            <div className="flex flex-col flex-1 p-4">
              <span className="text-sm font-semibold text-doré uppercase mb-1">{itemType}</span>
              <h3 className="text-xl font-title mb-2 truncate">{title}</h3>
              <p className="text-sm text-anthracite/80 flex-1 line-clamp-3">{description}</p>
              {price && (
                <p className="text-sm font-bold text-ardoise mt-4">{price}</p>
              )}
            </div>
          </Animated.Div>
        </Link>
      </Animated.Page>
    </div>
  )
}

/**
 * SmartGrid: grille responsive avec Infinite Scroll et actions injectables
 */
export default function SmartGrid({
  data = [],
  type = '',
  filterKey = '',
  filterValue = '',
  emptyMessage = 'Aucun contenu disponible.',
  extra,
  infiniteRef
}) {
  const filtered = filterKey && filterValue
    ? data.filter(item => item[filterKey]?.toLowerCase() === filterValue.toLowerCase())
    : data

  if (!Array.isArray(filtered) || filtered.length === 0) {
    return <div className="text-center text-anthracite py-8">{emptyMessage}</div>
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((item, index) => {
        const isLast = index === filtered.length - 1
        return (
          <div key={item.slug || index} ref={isLast ? infiniteRef : null}>
            <GenericCard item={item} index={index} type={type} extra={extra} />
          </div>
        )
      })}
    </section>
  )
}
