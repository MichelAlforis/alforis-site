'use client'

import React from 'react'
import ContentCard from './ContentCard'

const BlogStudioGrid = ({ content = [] }) => {
  // Filtrage ici
  const filteredContent = content.filter((item) => item.type === 'Blog' || item.type === 'Studio')

  if (!Array.isArray(filteredContent) || filteredContent.length === 0) {
    return (
      <div className="text-center text-anthracite py-8">
        Aucun article trouvé.
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-anim auto-rows-fr">
      {filteredContent.map((item) => (
        <div key={item.slug} className="h-full">
          <ContentCard {...item} />
        </div>
      ))}
    </section>
  )
}

export default BlogStudioGrid
