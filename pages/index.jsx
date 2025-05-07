import HeroSection from '@/components/home/HeroSection'
import ServicesCards from '@/components/home/ServicesCards'
import Approach from '@/components/home/ApproachSection'
import KeyFigures from '@/components/home/KeyFigures'
import Contact from '@/components/home/Contact'

const sectionsData = [
  {
    id: 'hero',
    Component: HeroSection,
    image: '/assets/img/M_intro.webp',            // Mobile fallback
    imageDesktop: '/assets/img/D_intro.webp',     // Desktop image
    extraClass: 'min-h-screen md:h-[1080px] flex flex-col justify-center items-center',
    useImage: true,                                // ✅ Rendu via <picture>
  },
  {
    id: 'services',
    Component: ServicesCards,
    bgClass: 'bg-services-mobile md:bg-services-desktop', // ✅ Déclaré dans tailwind.config.js
    extraClass: 'min-h-screen md:h-[1080px] flex flex-col justify-center items-center',
    useImage: false, // ❌ ne pas faire de <img> ici
  },
  {
    id: 'approach',
    Component: Approach,
    bgClass: 'bg-approach-mobile md:bg-approach-desktop',
    extraClass: 'min-h-screen md:h-[1080px] overflow-visible flex flex-col justify-center items-center',
    useImage: false,
  },
  {
    id: 'figures',
    Component: KeyFigures,
    bgClass: 'bg-figures-mobile md:bg-figures-desktop',
    extraClass: 'min-h-screen md:h-[1080px] flex flex-col justify-center items-center',
    useImage: false,
  },
  {
    id: 'contact',
    Component: Contact,
    bgClass: 'bg-contact-mobile md:bg-contact-desktop',
    extraClass: 'min-h-screen md:h-[1080px] flex flex-col justify-center items-center bg-opacity-0',
    useImage: false,
  },
]

export default function HomePage() {
  return (
    <>
      {sectionsData.map(({ id, Component, image, imageDesktop, bgClass, extraClass, useImage }, index) => (
        <section
          key={id}
          id={id}
          className={`snap-start relative bg-cover bg-center ${bgClass || ''} ${extraClass} animate-fade-in`}
        >
          {useImage && (
            <picture className="absolute inset-0 z-0 w-full h-full">
              <source srcSet={imageDesktop} media="(min-width: 768px)" type="image/webp" />
              <img
                src={image}
                alt={`${id} background`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          )}

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Component extraClass={`w-full px-4 ${extraClass}`} />
          </div>
        </section>
      ))}
    </>
  )
}
