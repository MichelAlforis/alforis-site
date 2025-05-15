'use client'
/* app/faq/FaqContent.jsx */


import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import AccordionCategory from '@/components/ui/AccordionCategory'
import { categoriesData } from '@/content/dataFAQ.mdx'
import Animated from '@/components/animated/Animated'

export default function FaqContent() {
  const allIds = useMemo(
    () => categoriesData.flatMap(c => c.questions.map(q => q.id)),
    []
  )
  const [openMap, setOpenMap] = useState(
    Object.fromEntries(allIds.map(id => [id, false]))
  )
  const [search, setSearch] = useState('')

  const toggle = id =>
    setOpenMap(prev => ({ ...prev, [id]: !prev[id] }))

  const expandAll = () =>
    setOpenMap(Object.fromEntries(allIds.map(id => [id, true])))

  const collapseAll = () =>
    setOpenMap(Object.fromEntries(allIds.map(id => [id, false])))

  const filtered = useMemo(() => {
    if (!search.trim()) return categoriesData
    const term = search.toLowerCase()
    return categoriesData
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q =>
            q.question.toLowerCase().includes(term) ||
            (typeof q.answer === 'string' && q.answer.toLowerCase().includes(term))
        ),
      }))
      .filter(cat => cat.questions.length > 0)
  }, [search])

  return (
    <Animated.Page>
      <footer className="bg-ardoise py-16">
        <div className="main-content mx-auto px-6 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-title mb-8 text-center"
          >
            FAQ - Questions fréquentes
          </motion.h2>

          {/* Barre de recherche */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-ivoire/70" />
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-ivoire text-ardoise placeholder-ardoise/60 focus:outline-none focus:ring-2 focus:ring-doré transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ardoise/80 hover:text-ardoise"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Contrôles d'expansion */}
          <div className="mb-12 flex gap-4 justify-center">
            <button
              onClick={expandAll}
              className="btn-alforis-retro"
            >
              Tout déplier
            </button>
            <button
              onClick={collapseAll}
              className="btn-alforis-outline"
            >
              Tout refermer
            </button>
          </div>

          {/* Liste de catégories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatePresence>
              {filtered.map(cat => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <AccordionCategory
                    category={cat}
                    openMap={openMap}
                    toggle={toggle}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="col-span-full text-center text-ivoire/80">
                Aucune réponse ne correspond à votre recherche.
              </p>
            )}
          </div>
        </div>
      </footer>
    </Animated.Page>
  )
}
