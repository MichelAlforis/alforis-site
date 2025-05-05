"use client";

import { useEffect, useState } from "react";
import { Animated } from '@/components/animated/Animated';
import { GoldLink } from "@/hooks/useGoldEffect";
import Button from '@/components/ui/Button';

export default function HeroSection({ extraClass = '' }) {

  return (
    <section className={`relative w-full z-10 ${extraClass}`}>


      {/* Contenu central */}
      <div className="flex justify-center items-center relative w-full z-10 px-4 mt-8 md:mt-12">
        <div className="text-center max-w-3xl">
    {/* Sceau positionné au-dessus */}


          <Animated.H1 className="text-2xl md:text-5xl font-title font-bold text-anthracite leading-snug mb-6">
            Chez Alforis, on ne commence pas par les chiffres. <br />
            On commence par <GoldLink href="/ProfilDeVie">vous</GoldLink>.
          </Animated.H1>

          <Animated.P className="text-base md:text-lg text-acier font-light mb-8 w-full">
            Le patrimoine ne dit rien par lui-même. Il prend sens s’il raconte une histoire : <strong>la vôtre</strong>.
          </Animated.P>

          <Button to="/Profil-De-Vie" index={1} className="btn-alforis-rdv">
            Commencer mon diagnostic
          </Button>
        </div>
      </div>

    </section>
    
  );
}