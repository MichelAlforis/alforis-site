'use client'
/* app/faq/FaqContent.jsx */


import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import AccordionCategory from '@/components/ui/AccordionCategory'
import { categoriesData } from '@/content/dataFAQ'
import Animated from '@/components/animated/Animated'

export default function FaqContent({ content, activeTab, onTabChange }){
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

  useEffect(() => {
    if (activeTab === 'expandAll') {
      expandAll()
      onTabChange('') // reset pour permettre re-click
    }
    if (activeTab === 'collapseAll') {
      collapseAll()
      onTabChange('')
    }
  }, [activeTab, allIds, onTabChange]) // <--- bien ajouter allIds en dépendance

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
      <section className="bg-ivoire dark:bg-acier rounded-xl">
        <div className="px-2 text-ivoire pt-4 md:pt-8">

          {/* Barre de recherche */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-acier" />
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-ardoise placeholder-ardoise/60 focus:outline-none focus:ring-2 focus:ring-vertSauge transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Effacer la recherche"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-ardoise/80 hover:text-ardoise"
                >
                 <X size={20} />
                </button>
              )}
            </div>
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
      </section>
    </Animated.Page>
  )
}
