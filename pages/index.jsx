'use client'

import { useEffect, useState } from 'react'
import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import Animated from '@/components/animated/Animated'
import KeyFigures from '@/components/home/KeyFigures'
import Contact from '@/components/home/Contact'
import useControlledScrollSections from '@/hooks/useControlledScrollSections'
import useButtonHover from '@/hooks/useButtonHover'
import Approach from '@/components/home/ApproachSection'
import AlforisHead from '@/components/AlforisHead'

export default function Home() {
  const sectionsData = [
    { id: 'hero', Component: HeroSection },
    { id: 'services', Component: ServicesCards },
    { id: 'approach', Component: Approach },
    { id: 'figures', Component: KeyFigures },
    { id: 'contact', Component: Contact },
  ];

  const { currentSection, currentSectionIndex, goToNextSection, goToPrevSection, isScrolling } =
    useControlledScrollSections(sectionsData.map(section => section.id))

  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
      <AlforisHead
        title="ApprochePersonnalisee – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee."
        path="/index"
      />

      <Animated.Page>
        <main
          id="scroll-container"
          className="relative w-full overflow-y-auto text-anthracite snap-y snap-mandatory md:overflow-hidden md:snap-none"
        >
          {sectionsData.map(({ id, Component }, index) => (
            <section
  key={index}
  id={id}
  className="relative h-[100dvh] snap-start overflow-hidden"
>
  {/* ✅ Fond mobile */}
  <div
    className={`
      absolute inset-0 w-full h-full sm:hidden z-0 bg-center bg-no-repeat bg-[length:auto_100%]
      ${id === 'hero' ? 'bg-hero-mobile' : ''}
      ${id === 'services' ? 'bg-services-mobile' : ''}
      ${id === 'approach' ? 'bg-approach-mobile' : ''}
      ${id === 'figures' ? 'bg-figures-mobile' : ''}
      ${id === 'contact' ? 'bg-contact-mobile' : ''}
    `}
  />

  {/* ✅ Fond desktop */}
  <div
    className={`
      absolute inset-0 w-full h-full hidden sm:block z-0 bg-cover bg-center
      ${id === 'hero' ? 'bg-hero-desktop' : ''}
      ${id === 'services' ? 'bg-services-desktop' : ''}
      ${id === 'approach' ? 'bg-approach-desktop' : ''}
      ${id === 'figures' ? 'bg-figures-desktop' : ''}
      ${id === 'contact' ? 'bg-contact-desktop' : ''}
    `}
  />

  {/* ✅ Contenu */}
  <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
    <Component extraClass="w-full" />
  </div>
</section>

          ))}
        </main>
      </Animated.Page>
    </>
  )
}
