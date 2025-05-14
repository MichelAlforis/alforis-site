'use client'
import { useState, useMemo } from 'react'
import { categoriesData } from '@/content/dataFAQ.mdx'
import AccordionCategory from '@/components/ui/AccordionCategory'

export default function FAQ() {
  const allIds = categoriesData.flatMap(c => c.questions.map(q => q.id))
  const [openMap, setOpenMap] = useState(
    Object.fromEntries(allIds.map((id) => [id, false]))
  )
  const [search, setSearch] = useState('')

  const toggle = (id) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }))

  const expandAll = () =>
    setOpenMap(Object.fromEntries(allIds.map((id) => [id, true])))

  const collapseAll = () =>
    setOpenMap(Object.fromEntries(allIds.map((id) => [id, false])))

  const filtered = useMemo(() => {
    if (!search.trim()) return categoriesData
    const term = search.toLowerCase()

    return categoriesData
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(term) ||
            String(q.answer).toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.questions.length)
  }, [search])

  return (
    <footer className="bg-ardoise py-16">
      <div className="main-content mx-auto px-6 text-white">
        <h2 className="text-4xl font-title mb-8 text-center">FAQ - Questions fréquentes</h2>

        {/* Recherche */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher dans la FAQ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-lg bg-ivoire text-ardoise placeholder-ardoise/60 focus:outline-none focus:ring-2 focus:ring-doré"
          />
        </div>

        {/* Tout déplier / tout refermer */}
        <div className="mb-12 flex gap-4 justify-center">
          <button onClick={expandAll} className="btn-alforis-retro">Tout déplier</button>
          <button onClick={collapseAll} className="btn-alforis-outline">Tout refermer</button>
        </div>

        {/* Affichage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filtered.map((cat) => (
            <AccordionCategory
              key={cat.id}
              category={cat}
              openMap={openMap}
              toggle={toggle}
            />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-ivoire/80">
              Aucune question ne correspond à votre recherche.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
