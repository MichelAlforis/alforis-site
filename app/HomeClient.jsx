'use client'

import dynamic from 'next/dynamic'

// on importe ton composant responsive, sans SSR
const HomeResponsive = dynamic(
  () => import('@/components/Home/HomeResponsive'),
  { ssr: false }
)

export default function HomeClient() {
  return <HomeResponsive />
}

