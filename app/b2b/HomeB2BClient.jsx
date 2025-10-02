'use client'

import dynamic from 'next/dynamic'

const HomeB2BResponsive = dynamic(
  () => import('./HomeB2BResponsive'),
  { ssr: false }
)

export default function HomeB2BClient() {
  return <HomeB2BResponsive />
}