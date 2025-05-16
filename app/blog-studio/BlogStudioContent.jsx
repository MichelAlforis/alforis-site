'use client'

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { CategoryButton } from '@/components/ui/CategoryButton'
import { ScrollArea } from '@/components/ui/ScrollArea'
import SmartResponsive from '@/components/ui/SmartResponsive'
import { ChevronUp, Sun, Moon, Star } from 'lucide-react'
import { Suspense } from 'react'

export default function EnhancedBlogStudioContent({ content }) {
  // Thème clair/sombre
  const [dark, setDark] = useState(false)

  // Appliquer la classe 'dark' sur <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // Onglets : Tous, Studio, Blog, Favoris
  const types = ['All', 'Studio', 'Blog', 'Favorites']
  const [activeTab, setActiveTab] = useState('All')

  // Catégories
  const categories = useMemo(
    () => Array.from(new Set(content.map(c => c.category))).filter(Boolean),
    [content]
  )
  const [selectedCats, setSelectedCats] = useState(new Set())

  // Recherche
  const [search, setSearch] = useState('')

  // Pagination infinie
  const pageSize = 9
  const [page, setPage] = useState(1)

  // Favoris stockés localement
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('alforisFavorites')
    return new Set(JSON.parse(stored) || [])
  })

  // Persistance des favoris
  useEffect(() => {
    localStorage.setItem('alforisFavorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const toggleFavorite = (slug) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  // Filtrage selon onglet, catégories, recherche, favoris
  const filtered = useMemo(() => {
    return content
      .filter(item => {
        if (activeTab === 'Favorites') return favorites.has(item.slug)
        return activeTab === 'All' || item.type === activeTab
      })
      .filter(item => !selectedCats.size || selectedCats.has(item.category))
      .filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.excerpt || '').toLowerCase().includes(search.toLowerCase())
      )
  }, [content, activeTab, selectedCats, search, favorites])

  // Pagination
  const sliced = filtered.slice(0, page * pageSize)
  const observer = useRef(null)
  const lastRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && sliced.length < filtered.length) {
          setPage(p => p + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [sliced, filtered]
  )

  // Reset pagination quand filtre change
  useEffect(() => setPage(1), [activeTab, selectedCats, search])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-ivoire dark:bg-gray-900 text-anthracite dark:text-gray-100 transition-colors">
        {/* En-tête fixe */}
        <header className="sticky top-0 z-20 bg-ivoire/80 dark:bg-gray-900/80 backdrop-blur py-4">
          <div className="relative flex justify-center items-center px-6">
            <h1 className="text-5xl font-semibold font-title text-center">Blog & Studio</h1>
            <button
              onClick={() => setDark(prev => !prev)}
              aria-label="Toggle theme"
              className="absolute right-6 p-2 rounded-full hover:bg-light dark:hover:bg-gray-700 transition"
            >
              {dark ? (
                <Sun className="w-6 h-6 text-ardoise dark:text-gray-100" />
              ) : (
                <Moon className="w-6 h-6 text-ardoise" />
              )}
            </button>
          </div>
        </header>

        <main className="px-6 py-8 max-w-6xl mx-auto space-y-8">
          {/* Onglets de sélection */}
          <section className="flex flex-wrap justify-center gap-4">
            {types.map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeTab === tab
                    ? 'bg-doré text-white'
                    : 'bg-light text-doré border border-doré'
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab === 'All' && 'Tous'}
                {tab === 'Studio' && '🎙️ Le Studio'}
                {tab === 'Blog' && '📝 Le Blog'}
                {tab === 'Favorites' && '⭐ Favoris'}
              </motion.button>
            ))}
          </section>

          {/* Barre de recherche et filtres */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Input
              placeholder="Rechercher..."
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
                    onClick={() => {
                      const newSelectedCats = new Set(selectedCats)
                      if (newSelectedCats.has(cat)) newSelectedCats.delete(cat)
                      else newSelectedCats.add(cat)
                      setSelectedCats(newSelectedCats)
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>

          {/* Affichage du contenu */}
          {filtered.length > 0 ? (
            <SmartResponsive
              data={sliced}
              type="blog"
              extra={item => (
                <button
                  onClick={() => toggleFavorite(item.slug)}
                  className="absolute z-30 top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-doré transition"
                  aria-label={favorites.has(item.slug) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
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
              infiniteRef={lastRef}
            />
          ) : (
            <p className="text-center text-steel">Aucun contenu pour ces critères.</p>
          )}
        </main>

        {/* Bouton remonter */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-doré text-white shadow-lg hover:bg-doré/90 transition"
          aria-label="Remonter"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </Suspense>
  )
}
