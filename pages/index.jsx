'use client'
// Ton fichier hébergé en ligne ici

import dynamic from "next/dynamic";
import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import Animated from '@/components/animated/Animated'
import KeyFigures from '@/components/home/KeyFigures'
import Contact from '@/components/home/Contact'
import useControlledScrollSections from '@/hooks/useControlledScrollSections'
import useButtonHover from '@/hooks/useButtonHover'
import Approach from "@/components/home/ApproachSection"
import AlforisHead from '@/components/AlforisHead'


export default function Home() {
  const sectionsData = [
    {
      id: 'hero',
      Component: HeroSection,
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'services',
      Component: ServicesCards,
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'approach',
      Component: Approach,
      extraClass: 'h-[1080px] overflow: visible flex flex-col justify-center items-center',
    },
    {
      id: 'figures',
      Component: KeyFigures,
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'contact',
      Component: Contact,
      extraClass: 'h-[1080px] flex flex-col justify-center items-center bg-opacity-0',
    },
  ];

  const { currentSection, currentSectionIndex, goToNextSection, goToPrevSection, isScrolling } =
    useControlledScrollSections(sectionsData.map(section => section.id))

  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
<AlforisHead title="ApprochePersonnalisee – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee." path="/index" />

<Animated.Page>
    <main className="relative pt-0 min-h-screen w-full bg-ivoire text-anthracite snap-y snap-mandatory">
      {sectionsData.map(({ id, Component, image, extraClass }, index) => (
        <section
          key={index}
          id={id}
          className={`snap-start relative ${extraClass} animate-fade-in`}
        >
          <div
            className={`
              absolute inset-0 w-full h-full z-0 bg-cover bg-center
              ${id === 'hero' ? 'bg-hero-mobile sm:bg-hero-desktop' : ''}
              ${id === 'services' ? 'bg-services-mobile sm:bg-services-desktop' : ''}
              ${id === 'approach' ? 'bg-approach-mobile sm:bg-approach-desktop' : ''}
              ${id === 'figures' ? 'bg-figures-mobile sm:bg-figures-desktop' : ''}
              ${id === 'contact' ? 'bg-contact-mobile sm:bg-contact-desktop' : ''}
            `}
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Component extraClass={`w-full px-4 ${extraClass}`} />
          </div>
        </section>
      ))}
    </main>
    </Animated.Page>
    </>
    
  )
}
