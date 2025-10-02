// lib/server/fetchAllParcours.js
import { getContentSlugs, getContentMeta } from './getContent'

/**
 * Récupère la liste complète des parcours
 */
export async function fetchAllParcours() {
  const slugs = getContentSlugs('parcours')
  const items = []

  for (const { slug } of slugs) {
    const result = await getContentMeta('parcours', slug)
    if (!result?.meta) continue
    items.push({
      ...result.meta,
      slug,
      type: 'Parcours',
    })
  }

  return items
}
