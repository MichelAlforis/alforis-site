'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import { Animated } from '@/components/animated/Animated'
import { useScrollContainer } from '@/hooks/useScrollContainer'
import { couleurs } from '@/public/styles/generated-colors'

import Buste from '@/assets/illustrations/buste'
import Approche from '@/assets/illustrations/approche'
import LifePic from '@/assets/illustrations/Lifepic'

export default function ApproachSection({ extraClass = '' }) {
  const scrollContainer = useScrollContainer()

  // on passe root à useInView pour qu’il observe dans notre scroll-container
  const [ref, inView] = useInView({
    root: scrollContainer,
    threshold: 0.5,
    triggerOnce: true,
  })
  const [animate, setAnimate] = useState(false)
  useEffect(() => { if (inView) setAnimate(true) }, [inView])

  const cards = [
    {
      href: '/ApprochePersonnalisee',
      title: 'Notre approche est d’abord humaine.',
      text: `Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé.
Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire,
c’est d’abord écouter son histoire.`,
      Svg: Approche,
      strokeWidth: 20,
    },
    {
      href: '/Profil-De-Vie',
      title: 'Prêt à vous découvrir autrement ?',
      text: `Le Profil de Vie vous permet de faire le point, en quelques questions clés,
sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez
faire grandir demain.`,
      Svg: LifePic,
      strokeWidth: 20,
    },
    {
      href: '/Services',
      title: 'Chaque trajectoire est unique.',
      text: `Nous ne croyons pas aux solutions toutes faites. Chaque accompagnement
Alforis commence par une cartographie de vos objectifs profonds,
de votre horizon personnel, et de vos contraintes concrètes.`,
      Svg: Buste,
      strokeWidth: 12,
    },
  ]

  return (
    <section
      id="approach"
      ref={ref}
      className={`w-full py-16 ${extraClass}`}
    >
      <div className="space-y-8 px-4 md:px-0 max-w-xl mx-auto">
        {cards.map(({ href, title, text, Svg, strokeWidth }, i) => (
          <Link key={i} href={href} passHref className="block group">
              <div className="hidden sm:flex flex-shrink-0 p-6 items-center justify-center min-w-[80px]">
                {/* Illustration */}
                <div className="hidden sm:flex flex-shrink-0 p-6 items-center justify-center">
                  <AnimatedSVGRenderer
                    SvgComponent={Svg}
                    wrapperClassName="w-20 h-20 md:w-24 md:h-24"
                    strokeColor={couleurs.ardoise}
                    fillColor={couleurs.doré}
                    strokeWidth={strokeWidth}
                    duration={3}
                    delayStep={0.8}
                    tiltIntensity={1.5}
                    preserveAspectRatio="xMidYMid meet"
                    hoverEffect={true}
                    pathLengthEffect={true}
                  />
                </div>
                {/* Texte */}
                <div className="flex-1 p-6">
                  <Animated.Div
                    initial={{ opacity: 0, x: 40 }}
                    animate={animate ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-semibold text-anthracite mb-3">
                      {title}
                    </h2>
                    <p className="text-base md:text-lg text-acier leading-relaxed">
                      {text}
                    </p>
                  </Animated.Div>
                </div>
              </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
