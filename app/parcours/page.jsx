// app/parcours/page.jsx

import { fetchAllParcours } from '@/lib/server/fetchAllParcours'
import ParcoursContent from './ParcoursContent'

export const dynamic = 'force-static'

export default async function Page({ searchParams }) {
  // Pagination côté serveur
  const allParcours = await fetchAllParcours()
  const pageSize = 6  // ajustez selon vos besoins
  const currentPage = parseInt(searchParams?.page ?? '1', 10)
  const totalPages = Math.ceil(allParcours.length / pageSize)
  const start = (currentPage - 1) * pageSize
  const content = allParcours.slice(start, start + pageSize)

  return (
    <ParcoursContent
      content={content}
      totalPages={totalPages}
    />
  )
}
