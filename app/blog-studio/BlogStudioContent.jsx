'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { CategoryButton } from '@/components/ui/CategoryButton'
import { ScrollArea } from '@/components/ui/scrollarea'
import SmartResponsive from '@/components/ui/SmartResponsive'
import { ChevronUp, Star } from 'lucide-react'

export default function BlogStudioContent({ content, activeTab, onTabChange }) {
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // onglets
  const types = ['All', 'Studio', 'Blog', 'Favorites']

  // catégories
  const categories = useMemo(() => {
    if (!Array.isArray(content)) return []
    return [...new Set(content.map(c => c.category))].filter(Boolean)
  }, [content])
  const [selectedCats, setSelectedCats] = useState(new Set())

  // recherche
  const [search, setSearch] = useState('')

  // favoris (localStorage)
  const [favorites, setFavorites] = useState(() => new Set())
  useEffect(() => {
    const stored = window.localStorage.getItem('alforisFavorites')
    if (stored) setFavorites(new Set(JSON.parse(stored)))
  }, [])
  useEffect(() => {
    window.localStorage.setItem(
      'alforisFavorites',
      JSON.stringify([...favorites])
    )
  }, [favorites])

  const toggleFavorite = slug => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  // filtrage combiné (onglet, catégories, recherche)
  const filtered = useMemo(() => {
    if (!Array.isArray(content)) return []
    return content
      .filter(item =>
        activeTab === 'Favorites'
          ? favorites.has(item.slug)
          : activeTab === 'All' || item.type === activeTab
      )
      .filter(item =>
        !selectedCats.size || selectedCats.has(item.category)
      )
      .filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.excerpt || '').toLowerCase().includes(search.toLowerCase())
      )
  }, [content, activeTab, selectedCats, search, favorites])

  // Gestion de la sélection des catégories
  const toggleCategory = (cat) => {
    setSelectedCats(prev => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <div className="dark:bg-acier/90 text-anthracite dark:text-acier transition-colors">
        {/* sous‐header (titre + toggle) */}
        <section className="max-w-6xl mx-auto space-y-8">
          {/* recherche & filtres */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Input
              placeholder="Rechercher…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1"
            />
            <ScrollArea className="w-full md:w-auto">
              <div className="flex space-x-3 py-2">
                {categories.map(cat => (

                  <CategoryButton
                    key={cat}
                    label={cat}
                    subtext="Catégorie"
                    selected={selectedCats.has(cat)}
                    onClick={() => toggleCategory(cat)} // Corrected onClick handler
                  />

                ))}
              </div>
            </ScrollArea>
          </div>

          {/* listing */}
          {filtered.length > 0 ? (
            <SmartResponsive
              data={filtered}
              type="blog"
              extra={item => (
                <button
                  onClick={() => toggleFavorite(item.slug)}
                  className="bg-ivoire/10 dark:bg-acier/80 rounded-full shadow hover:bg-vertSauge transition"
                  aria-label={favorites.has(item.slug)
                    ? 'Retirer des favoris'
                    : 'Ajouter aux favoris'}
                >
                  <Star
                    className={`w-3 h-3 md:w-6 md:h-6 ${
                      favorites.has(item.slug)
                        ? 'fill-doré text-doré'
                        : 'text-acier-400'
                    }`}
                  />
                </button>
              )}
            />
          ) : (
            <p className="text-center text-steel">
              Aucun contenu pour ces critères.
            </p>
          )}
        </section>

        {/* boutons de scroll */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-doré text-ivoire shadow-lg hover:bg-doré/90 transition"
          aria-label="Remonter"
        >
          <ChevronUp className="w-3 h-3 md:w-6 md:h-6" />
        </button>
      </div>
    </Suspense>
  )
}
