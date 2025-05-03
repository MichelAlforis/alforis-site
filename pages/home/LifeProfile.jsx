
'use client'
import { Animated } from '@/components/animated/Animated'
import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer"
import LifePic from '@/assets/illustrations/lifeprofile.svg';

export default function LifeProfile() {
  return (
    <section>
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">

        {/* Illustration côté gauche */}
        <div className="flex justify-center md:w-1/3">
        <AnimatedSVGRenderer
          SvgComponent={LifePic}
          strokeColor="var(--stroke-color)"
          fillColor="var(--fill-color)"
          strokeWidth={7}
          duration={3}
          delayStep={0.5}
          tiltIntensity={1.5}
          className="block w-full h-auto"
          wrapperClassName="
            stroke-doré
            fill-ardoise
            w-[auto]       /* Largeur automatique */
            max-w-[15vw]   /* Limite la largeur max */
            mx-auto        /* Centrer le SVG */
            aspect-[1000/1000]  /* Maintien du ratio */
          "
          viewBox="0 0 1000 1000"  /* Assurez-vous que le viewBox est bien ajusté */
          preserveAspectRatio="xMidYMid meet"  /* Conserve le ratio sans découper */
          height="100%"   /* Hauteur automatique pour ajuster le contenu */
          width="100%"   /* Largeur ajustable selon le conteneur */
        />
        </div>

        {/* Texte et bouton */}
        <div className="md:w-2/3 flex flex-col justify-center gap-4">
        <Animated.Div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-anthracite">
            Prêt à vous découvrir autrement ?
          </h2>
          <p className="text-base md:text-lg text-acier font-light leading-relaxed mb-6">
            Le <strong>Profil de Vie</strong> vous permet de faire le point, en quelques questions clés,
            sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez faire grandir demain.
          </p>
        </Animated.Div>
        </div>
      </div>
    </section>
  )
}
