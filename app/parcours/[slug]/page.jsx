import { notFound }         from 'next/navigation'
import { fetchAllContent }  from '@/lib/server/fetchAllContent'
import ParcoursFormulaire   from '@/components/parcours/ParcoursFormulaire'

/*─────────────────────────────────────────────────────────────*/
/* 1 ▸ routes statiques                                        */
/*─────────────────────────────────────────────────────────────*/
export async function generateStaticParams () {
  const all = await fetchAllContent()
  return all
    .filter(i => i.type === 'Parcours')
    .map(({ slug }) => ({ slug }))
}



