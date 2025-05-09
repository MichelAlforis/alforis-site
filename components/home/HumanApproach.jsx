'use client'
import { Animated } from '@/components/animated/Animated'
import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer"
import Buste from '@/assets/illustrations/buste.svg'

// Définition correcte de l'objet `profilesData`
export const profilesData = {
  SvgComponent: Buste,
  title: "Notre approche est d’abord humaine.",
  paragraph: "Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé. Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire, c’est d’abord écouter son histoire."
}

export default function HumanApproach() {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center">

        {/* Visuel buste / texture humaine à gauche */}
        <div className="flex justify-center md:w-1/3">
          <AnimatedSVGRenderer
            SvgComponent={Buste}
            strokeColor="var(--stroke-color)"
            fillColor="var(--fill-color)"
            strokeWidth={7}
            duration={5}
            delayStep={0.8}
            className="block w-auto h-auto"
            wrapperClassName="
              stroke-ardoise
              fill-doré
              max-w-[15vw]
              w-[20vw]
              max-h-[500px]
              mx-auto
              aspect-[711/1089]
            "
            viewBox="0 0 711 1089"
            preserveAspectRatio="xMidYMid meet"
            height="100%"
            width="100%"
          />
        </div>

        {/* Texte narratif à droite */}
        <div className="md:w-2/3 flex flex-col justify-center gap-4">
          <Animated.Div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-anthracite">
              {profilesData.title}
            </h2>
            <p className="text-base md:text-lg text-acier font-light leading-relaxed">
              {profilesData.paragraph.split('. ').map((sentence, i) => (
                <span key={i}>
                  {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}<br />
                </span>
              ))}
            </p>
          </Animated.Div>
        </div>

      </div>
    </section>
  )
}
