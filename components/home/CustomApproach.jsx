
'use client'
import { Animated } from '@/components/animated/Animated'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import ApprocheIcon from '@/assets/illustrations/approche.svg'

export default function CustomApproach() {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 py-16">

        {/* SVG animé */}
        <div className="flex justify-center md:w-1/3">
        <AnimatedSVGRenderer
          SvgComponent={ApprocheIcon}
          strokeColor="var(--stroke-color)"
          fillColor="var(--fill-color)"
          strokeWidth={7}
          duration={5}
          delayStep={0.8}
          tiltIntensity={1.5}
          className="block w-full h-auto"
          wrapperClassName="
            stroke-ardoise
            fill-doré
            w-[auto]
            max-w-[15vw]
            mx-auto
            aspect-[1024/1024]
          "
          viewBox="0 0 1024 1024"
          preserveAspectRatio="xMidYMid meet"
          height="100%"
          width="100%"
        />
         </div>

        {/* Texte animé */}
        <div className="md:w-2/3 flex flex-col justify-center gap-4">
        <Animated.Div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-anthracite">
            Chaque trajectoire est unique.
          </h2>
          <p className="text-base md:text-lg text-acier font-light leading-relaxed mb-6">
            Nous ne croyons pas aux solutions toutes faites.  
            Chaque accompagnement Alforis commence par une cartographie de vos objectifs profonds,  
            de votre horizon personnel, et de vos contraintes concrètes.
          </p>
        </Animated.Div>
        </div>
        </div>
    </section>
  )
}
