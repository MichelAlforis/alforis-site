// app/blog-studio/BlogStudioContent.jsx
'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { CategoryButton } from '@/components/ui/CategoryButton'
import { ScrollArea } from '@/components/ui/scrollarea'
import SmartResponsive from '@/components/ui/SmartResponsive'
import { ChevronUp, Sun, Moon, Star } from 'lucide-react'

export default function BlogStudioContent({ content }) {
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // onglets
  const types = ['All','Studio','Blog','Favorites']
  const [activeTab, setActiveTab] = useState('All')

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
        (item.excerpt||'').toLowerCase().includes(search.toLowerCase())
      )
  }, [content, activeTab, selectedCats, search, favorites])

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <div className="min-h-screen bg-ivoire dark:bg- acier/90 text-anthracite dark:text-acier transition-colors">
        {/* sous‐header (titre + toggle) */}
        <header className="sticky top-0 z-20 bg-ivoire/80 dark:bg-gray-900/80 backdrop-blur py-4">
          <div className="relative flex justify-center items-center px-6">
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="absolute right-6 p-2 rounded-full hover:bg-light dark:hover:bg-gray-700 transition"
            >
              {dark
                ? <Sun className="w-6 h-6 text-ardoise dark:text-gray-100" />
                : <Moon className="w-6 h-6 text-ardoise" />}
            </button>
          </div>
        </header>

        <main className="px-6 py-8 max-w-6xl mx-auto space-y-8">
          {/* onglets */}
          <section className="flex flex-wrap justify-center gap-4">
            {types.map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeTab===tab
                    ? 'bg-doré text-ivoire'
                    : 'bg-light text-doré border border-doré'
                }`}
                aria-pressed={activeTab===tab}
              >
                {tab==='All'       ? 'Tous'
                 : tab==='Studio'   ? '🎙️ Le Studio'
                 : tab==='Blog'     ? '📝 Le Blog'
                 :                    '⭐ Favoris'}
              </motion.button>
            ))}
          </section>

          {/* recherche & filtres */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Input
              placeholder="Rechercher…"
              value={search}
              onChange={e=>setSearch(e.target.value)}
              className="flex-1"
            />
            <ScrollArea className="w-full md:w-auto">
              <div className="flex space-x-3 py-2">
                {categories.map(cat=>(
                  <CategoryButton
                    key={cat}
                    label={cat}
                    subtext="Catégorie"
                    selected={selectedCats.has(cat)}
                    onClick={()=>{
                      const next=new Set(selectedCats)
                      next.has(cat)?next.delete(cat):next.add(cat)
                      setSelectedCats(next)
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>

          {/* listing */}
          {filtered.length>0 ? (
            <SmartResponsive
              data={filtered}
              type="blog"
              extra={item=>(
                <button
                  onClick={()=>toggleFavorite(item.slug)}
                  className="absolute z-30 top-2 right-2 p-2 bg-ivoire dark:bg-gray-800 rounded-full shadow hover:bg-doré transition"
                  aria-label={favorites.has(item.slug)
                    ? 'Retirer des favoris'
                    : 'Ajouter aux favoris'}
                >
                  <Star
                    className={`w-6 h-6 ${
                      favorites.has(item.slug)
                        ? 'fill-doré text-doré'
                        : 'text-gray-400'
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
        </main>

        {/* boutons de scroll */}
        <button
          onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-doré text-ivoire shadow-lg hover:bg-doré/90 transition"
          aria-label="Remonter"
        >
          <ChevronUp className="w-6 h-6"/>
        </button>
      </div>
    </Suspense>
  )
}
