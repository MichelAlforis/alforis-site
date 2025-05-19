// app/parcours/page.jsx
import { fetchAllParcours } from '@/lib/server/fetchAllParcours'
import PageClient from './PageClient'

export const dynamic = 'force-static'

export default async function Page({ searchParams }) {
  // Pagination côté serveur
  const content = await fetchAllParcours()

  return (
    <PageClient
      content={content}
    />
  )
}
