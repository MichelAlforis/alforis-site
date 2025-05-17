'use client'
/* app/HomeContent.jsx */


import HeroSection from '../components/home/HeroSection'
import ServicesCards from '../components/home/ServicesCards'
import ApproachSection from '../components/home/ApproachSection'
import KeyFigures from '../components/home/KeyFigures'
import Contact from '../components/home/Contact'
import { Animated } from '../components/animated/Animated'
import useControlledScrollSections from '../hooks/useControlledScrollSections'
import useButtonHover from '../hooks/useButtonHover'

export default function HomeContent() {
  const sections = [
    { id: 'hero', Component: HeroSection },
    { id: 'services', Component: ServicesCards },
    { id: 'approach', Component: ApproachSection },
    { id: 'figures', Component: KeyFigures },
    { id: 'contact', Component: Contact },
  ]

  const { goToNextSection, goToPrevSection } = useControlledScrollSections(
    sections.map((s) => s.id)
  )
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <Animated.Page>
      <main
        id="scroll-container"
        className="relative w-full text-anthracite snap-y snap-mandatory overflow-y-auto md:overflow-hidden md:snap-none"
      >
        {sections.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className="relative h-auto md:h-[100dvh] snap-start"
          >
            <picture className="absolute inset-0 w-full h-full z-0">
              <source
                media="(min-width: 640px)"
                srcSet={`/assets/img/home/D_${id}.webp`}
              />
              <img
                src={`/assets/img/home/M_${id}.webp`}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </picture>

            <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
              <Component extraClass="w-full" />
            </div>
          </section>
        ))}
      </main>
    </Animated.Page>
  )
}
