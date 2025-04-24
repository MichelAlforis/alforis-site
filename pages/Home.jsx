'use client'
import AlforisHead from '@/components/AlforisHead'

import React from 'react'
import Link from 'next/link'
import useButtonHover from '@/hooks/useButtonHover'
import HeroSection from '@/pages/home/HeroSection'
import HumanApproach from '@/pages/home/HumanApproach'
import ServicesCards from '@/pages/home/ServicesCards'
import KeyFigures from '@/pages/home/KeyFigures'
import CustomApproach from '@/pages/home/CustomApproach'
import LifeProfile from '@/pages/home/LifeProfile'
import Contact from '@/pages/Contact'

export default function Home() {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  const fixedHeight = 600

  return (
    <main<AlforisHead title="Home – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page home." path="/Home" />
 className="overflow-x-hidden bg-ivoire text-anthracite">
      <HeroSection />
      <ServicesCards />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 py-16 justify-center">
        {/* Section HumanApproach */}
        <Link
          href="/approche"
          className="block w-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-xl transition-all transform hover:scale-105 cursor-pointer`}
            style={{
              borderRadius: '20px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              height: `${fixedHeight}px`,
            }}
          >
            <HumanApproach />
          </div>
        </Link>

        {/* Section LifeProfile */}
        <Link
          href="/profil-de-vie"
          className="block w-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-xl transition-all transform hover:scale-105 cursor-pointer`}
            style={{
              borderRadius: '20px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              height: `${fixedHeight}px`,
            }}
          >
            <LifeProfile />
          </div>
        </Link>

        {/* Section CustomApproach */}
        <Link
          href="/services"
          className="block w-full"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-xl transition-all transform hover:scale-105 cursor-pointer`}
            style={{
              borderRadius: '20px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              height: `${fixedHeight}px`,
            }}
          >
            <CustomApproach />
          </div>
        </Link>
      </section>

      <section className="py-16">
        <KeyFigures />
      </section>

      <section className="py-16">
        <Contact />
      </section>
    </main>
  )
}
