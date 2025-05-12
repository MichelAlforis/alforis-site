'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import Animated from '@/components/animated/Animated'
import KeyFigures from '@/components/home/KeyFigures'
import Contact from '@/components/home/Contact'
import Approach from "@/components/home/ApproachSection"
import AlforisHead from '@/components/AlforisHead'

const bgClasses = {
  hero: 'bg-hero-mobile sm:bg-hero-desktop',
  services: 'bg-services-mobile sm:bg-services-desktop',
  approach: 'bg-approach-mobile sm:bg-approach-desktop',
  figures: 'bg-figures-mobile sm:bg-figures-desktop',
  contact: 'bg-contact-mobile sm:bg-contact-desktop',
}

// ✅ Composant par section avec useInView encapsulé
function SectionWrapper({ id, Component, onVisible }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      onVisible(id)
    }
  }, [inView, id, onVisible])

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start relative min-h-screen flex flex-col justify-center items-center animate-fade-in"
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <Component extraClass="w-full" />
      </div>
    </section>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  const sectionsData = [
    { id: 'hero', Component: HeroSection },
    { id: 'services', Component: ServicesCards },
    { id: 'approach', Component: Approach },
    { id: 'figures', Component: KeyFigures },
    { id: 'contact', Component: Contact },
  ]

  return (
    <>
      <AlforisHead
        title="ApprochePersonnalisee – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee."
        path="/index"
      />

      {/* ✅ FOND animé avec AnimatePresence */}
      <AnimatePresence mode="wait">
  <motion.div
    key={activeSection}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className={`
      fixed inset-0 w-full z-1 bg-cover bg-center
      min-h-[700px] md:min-h-[1028px]
      ${bgClasses[activeSection]}`} 
  />
</AnimatePresence>
{console.log('activeSection is:', activeSection)}
{console.log('🔍 activeSection:', activeSection)}
{console.log('🧱 classes BG appliquées:', bgClasses[activeSection])}


      <Animated.Page>
        <main className="relative pt-0 min-h-screen w-full text-anthracite snap-y snap-proximity">
          {sectionsData.map(({ id, Component }) => (
            <SectionWrapper
              key={id}
              id={id}
              Component={Component}
              onVisible={setActiveSection}
            />
          ))}
        </main>
      </Animated.Page>
    </>
  )
}
