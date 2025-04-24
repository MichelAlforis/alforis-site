import { Animated } from '@/components/animated/Animated'
'use client'

import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import Image from 'next/image'
import Sceau from '@/components/animated/HeroSceau'
import {GoldLink } from "@/hooks/useGoldEffect"
import Button from '@/components/ui/Button'

export default function HeroSection() {

  return (
        <section className="hero-block no-margin relative min-h-[90vh] flex items-center justify-center bg-ivoire px-6 overflow-hidden">

        {/* Ancrage pour scroll */}
        <div id="hero-anchor" className="absolute top-0 left-0 w-full pt-16 h-1 scroll-mt-16" />

        {/* Fond illustré */}
        <div className="no-margin absolute inset-0 z-0">
          <Image
            src="/assets/img/texture-bg.jpg"
            alt="Fond texture"
            fill
            className="object-cover opacity-50"
          />
        </div>

        {/* ✅ Le sceau centré */}
        <div className="absolute top-[120px] left-1/2 -translate-x-1/2  z-30 animate-alforis-reveal">
          <Sceau className=" h-[80px] md:h-[60px] w-auto"/>
        </div>

      {/* Contenu central */}
      <Animated.Div
        className="relative z-10 max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-anthracite leading-snug mb-6">
          Chez Alforis, on ne commence pas par les chiffres. <br />
          On commence par <GoldLink href="/ProfilDeVie">vous</GoldLink>..
        </h1>

        <p className="text-base md:text-lg text-acier font-light mb-8">
          Le patrimoine ne dit rien par lui-même. Il prend sens s’il raconte une histoire : <strong>la vôtre</strong>.
        </p>

            <Button to="/ProfilDeVie" index={1} className="btn-alforis-rdv">
            Commencer mon diagnostic
            </Button>
            
      </Animated.Div>
    </section>
  )
}
