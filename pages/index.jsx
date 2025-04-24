'use client'


import Link from 'next/link'
import HeroSection from '@/pages/home/HeroSection'
import ServicesCards from '@/pages/home/ServicesCards'
import HumanApproach from '@/pages/home/HumanApproach'
import LifeProfile from '@/pages/home/LifeProfile'
import CustomApproach from '@/pages/home/CustomApproach'
import KeyFigures from '@/pages/home/KeyFigures'
import Contact from '@/pages/Contact'
import useButtonHover from '@/hooks/useButtonHover'




export default function Home() {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  const fixedHeight = 600


  return (
    
    <main className="overflow-x-hidden bg-ivoire text-anthracite">
      <HeroSection />
      <ServicesCards />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 py-16 justify-center">

        {/* Bloc 1 - HumanApproach */}
        <Link href="/ApprochePersonnalisee" className="block w-full">
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-2xl transition-all transform hover:scale-105 cursor-pointer h-[600px]`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <HumanApproach />
          </div>
        </Link>

        {/* Bloc 2 - LifeProfile */}
        <Link href="/ProfilDeVie" className="block w-full">
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-xl transition-all transform hover:scale-105 cursor-pointer`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ borderRadius: '20px', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', height: `${fixedHeight}px` }}
          >
            <LifeProfile />
          </div>
        </Link>

        {/* Bloc 3 - CustomApproach */}
        <Link href="/Services" className="block w-full">
          <div
            className={`${buttonClass} p-8 bg-white shadow-lg rounded-xl transition-all transform hover:scale-105 cursor-pointer`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ borderRadius: '20px', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', height: `${fixedHeight}px` }}
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
