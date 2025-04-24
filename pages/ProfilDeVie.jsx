'use client'

import { useEffect } from 'react'
import AlforisHead from '@/components/AlforisHead'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import Link from 'next/link'
import useButtonHover from '@/hooks/useButtonHover'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import LifePic from '@/assets/illustrations/lifeprofile.svg'
import Animated.Page from '@/components/animated/Animated'

export default function ProfilDeVie() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <>
      <AlforisHead
        title="Profil de Vie – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure à travers notre page Profil de Vie."
        path="/profil-de-vie"
      />

      <Animated.Page>
        <main className="relative bg-ivoire text-anthracite overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 mt-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-ivoire/80 to-ivoire" />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full blur-2xl opacity-10 bg-doré" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center pt-12 pb-20 px-6 bg-white rounded-3xl shadow-sm border border-beigeClair">
            <Animated.H1
              className="text-4xl md:text-5xl font-title font-semibold mb-6 text-ardoise"
            >
              Le profil de vie : votre point de départ
            </Animated.H1>

            <Animated.P className="text-lg md:text-xl text-acier mb-8">
              Ce questionnaire rapide vous aide à poser les bonnes questions sur votre trajectoire, vos priorités profondes et ce que vous voulez vraiment construire. C’est une invitation à vous (re)découvrir.
            </Animated.P>

            <Animated.Div className="flex flex-col items-center">
              <Link href="/profildevie/ProfilDeVieFormulaire">
                <button
                  className={`${buttonClass} px-8 py-4 rounded-xl text-white bg-doré transition transform hover:scale-105 shadow-md hover:shadow-lg`}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  Commencer mon profil de vie
                </button>
              </Link>

              <div className="mt-10">
                <AnimatedSVGRenderer
                  SvgComponent={LifePic}
                  strokeColor="var(--stroke-color)"
                  fillColor="var(--fill-color)"
                  strokeWidth={6}
                  duration={3}
                  delayStep={0.4}
                  tiltIntensity={1.5}
                  className="block w-full h-auto"
                  wrapperClassName="stroke-doré fill-ardoise max-w-[12vw] aspect-[1000/1000] mx-auto drop-shadow-xl"
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="xMidYMid meet"
                  height="100%"
                  width="100%"
                />
              </div>
            </Animated.Div>
          </div>
        </main>
      </Animated.Page>
    </>
  )
}