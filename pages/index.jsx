'use client'

import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import Approach from '@/components/home/ApproachSection'
import KeyFigures from '@/components/home/KeyFigures'
import Contact from '@/components/home/Contact'
import Animated from '@/components/animated/Animated'
import useControlledScrollSections from '@/hooks/useControlledScrollSections'
import useButtonHover from '@/hooks/useButtonHover'
import AlforisHead from '@/components/AlforisHead'

// Mapping des visuels de fond selon la section
const bgImages = {
  hero:   { mobile: '/assets/img/home/M_intro.webp',   desktop: '/assets/img/home/D_intro.webp'   },
  services:{ mobile: '/assets/img/home/M_services.webp',desktop: '/assets/img/home/D_services.webp'},
  approach:{ mobile: '/assets/img/home/M_approach.webp',desktop: '/assets/img/home/D_approach.webp'},
  figures:{ mobile: '/assets/img/home/M_keyfigures.webp',desktop: '/assets/img/home/D_keyfigures.webp'},
  contact:{ mobile: '/assets/img/home/M_contact.webp',  desktop: '/assets/img/home/D_contact.webp'  },
}

export default function Home() {
  const sectionsData = [
    { id: 'hero',    Component: HeroSection },
    { id: 'services',Component: ServicesCards },
    { id: 'approach',Component: Approach },
    { id: 'figures', Component: KeyFigures },
    { id: 'contact', Component: Contact },
  ]

  // Scroll contrôlé desktop / snap mobile
  const { goToNextSection, goToPrevSection } = useControlledScrollSections(
    sectionsData.map(s => s.id)
  )

  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
      <AlforisHead
        title="ApprochePersonnalisee – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure."
        path="/index"
      />

      <Animated.Page>
        <main
          id="scroll-container"
          className={`
            relative w-full text-anthracite
            snap-y snap-mandatory overflow-y-auto
            md:overflow-hidden md:snap-none
          `}
        >
          {sectionsData.map(({ id, Component }) => (
            <section
              key={id}
              id={id}
              className="relative h-auto md:h-[100dvh] snap-start"
            >
              {/* 📷 Fond adaptatif mobile / desktop */}
              <picture className="absolute inset-0 w-full h-full z-0">
                <source
                  media="(min-width: 640px)"
                  srcSet={bgImages[id].desktop}
                />
                <img
                  src={bgImages[id].mobile}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain md:object-cover"
                />
              </picture>

              {/* 🚀 Contenu */}
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
