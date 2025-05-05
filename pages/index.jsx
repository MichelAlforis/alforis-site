'use client'
// Ton fichier hébergé en ligne ici

import dynamic from "next/dynamic";
import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import { Animated } from '@/components/animated/Animated'
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
      image: '/assets/img/D_intro.png',
      extraClass: 'min-h-screen flex flex-col items-center',
    },
    {
      id: 'services',
      Component: ServicesCards,
      image: '/assets/img/D_services.png',
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'approach',
      Component: Approach,
      image: '/assets/img/D_approach.png',
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'figures',
      Component: KeyFigures,
      image: '/assets/img/D_keyfigures.png',
      extraClass: 'h-[1080px] flex flex-col justify-center items-center',
    },
    {
      id: 'contact',
      Component: Contact,
      image: '/assets/img/D_contact.png',
      extraClass: 'h-[1080px] flex flex-col justify-center items-center bg-opacity-0',
    },
  ];

  const { currentSection, currentSectionIndex, goToNextSection, goToPrevSection, isScrolling } =
    useControlledScrollSections(sectionsData.map(section => section.id))

  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
<AlforisHead title="ApprochePersonnalisee – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee." path="/index" />
    <main className="relative pt-0 min-h-screen w-full bg-ivoire text-anthracite snap-y snap-mandatory">
      {sectionsData.map(({ id, Component, image, extraClass }, index) => (
        <section
          key={index}
          id={id}
          className={`snap-start relative ${extraClass} animate-fade-in`}
        >
          <img
            src={image}
            alt={`${id} background`}
            className="absolute inset-0 w-full h-full object-cover z-0"
            loading="lazy"
          />
          <div className="relative z-10 w-full min-h-full flex flex-col items-start justify-start">
          <Component extraClass={`w-full px-4 ${extraClass}`} />
          </div>
        </section>
      ))}
    </main>
    </>
  )
}
