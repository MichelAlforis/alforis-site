import { Animated } from '@/components/animated/Animated'
'use client'
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer"
import Buste from '@assets/illustrations/buste.svg';


export default function HumanApproach() {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">

      
          {/* Visuel buste / texture humaine */}
          <AnimatedSVGRenderer
            SvgComponent={Buste}
            strokeColor="var(--stroke-color)"
            fillColor="var(--fill-color)"
            strokeWidth={7}
            duration={5}
            delayStep={0.8}
            className="block w-full h-auto"
            wrapperClassName="
              stroke-ardoise
              fill-doré
              w-[auto]       /* Largeur automatique */
              max-w-[10vw]   /* Limite la largeur max */
              mx-auto        /* Centrer le SVG */
              aspect-[711/1089]  /* Maintien du ratio */
            "
            viewBox="0 0 711 1089"  /* Assurez-vous que le viewBox est bien ajusté */
            preserveAspectRatio="xMidYMid meet"  /* Conserve le ratio sans découper */
            height="100%"   /* Hauteur automatique pour ajuster le contenu */
            width="100%"   /* Largeur ajustable selon le conteneur */
          />

        {/* Texte narratif */}
        <Animated.Div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-anthracite">
            Notre approche est d’abord humaine.
          </h2>
          <p className="text-base md:text-lg text-acier font-light leading-relaxed">
            Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé.<br />
            Vos intuitions, vos blessures, vos moteurs.<br />
            Car comprendre une trajectoire, c’est d’abord écouter son histoire.
          </p>
        </Animated.Div>

      </div>
    </section>
  )
}
