'use client'
import Link from "next/link";
import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer";
import { Animated } from "@/components/animated/Animated";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer'; // Utilisation de react-intersection-observer pour détecter la visibilité
import { couleurs } from "@/public/styles/generated-colors";

// Définir les SVG animés sous forme de JSX
import Buste from '@/assets/illustrations/buste';
import Approche from '@/assets/illustrations/approche';
import LifePic from '@/assets/illustrations/Lifepic';

export default function ApproachSection({ extraClass = ''}) {
  const [isSectionVisible, setIsSectionVisible] = useState(false); 
  const sectionRef = useRef(null);

  // Fonction de visibilité de la section
  const { ref, inView } = useInView({
    triggerOnce: true, // Ne déclencher l'animation qu'une seule fois
    threshold: 0.5, // Déclenche l'animation quand 50% de la section est visible
  });

  useEffect(() => {
    setIsSectionVisible(inView);
  }, [inView]);

  return (
    <section
      id="approach"
      className={`w-full overflow-hidden z-10 ${extraClass}`}
      ref={sectionRef}
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 py-16">
        {/* Section 1 */}
        <Link href="/ApprochePersonnalisee">
          <div className="p-8 ml-8 max-h-[25vh] flex flex-col md:flex-row justify-between bg-white bg-opacity-80 shadow-lg rounded-2xl transition-all transform hover:scale-105 cursor-pointer w-full sm:w-full md:w-2/3 lg:w-2/3 mx-auto">
              {/* Version SVG statique visible uniquement sur mobile */}

              <div className="hidden md:flex items-center justify-center md:w-1/3 max-w-[120px]">
                <AnimatedSVGRenderer
                  SvgComponent={Approche}
                  className="w-full h-auto"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  strokeColor={couleurs.ardoise}
                  fillColor={couleurs.doré}
                  strokeWidth={20}
                  duration={3}
                  delayStep={0.8}
                  tiltIntensity={1.5}
                  preserveAspectRatio="xMidYMid meet"
                  hoverEffect={true}
                  pathLengthEffect={false}
                  scrollEffect={false}
                />
              </div>



            <div className="md:w-2/3 flex flex-col justify-center gap-4 max-h-[500px] overflow-y-auto md:text-left text-center">
              <Animated.Div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-anthracite">
                  Notre approche est d’abord humaine.
                </h2>
                <p className="text-sm md:text-base text-acier font-light">
                  Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé. Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire, c’est d’abord écouter son histoire.
                </p>
              </Animated.Div>
            </div>
          </div>
        </Link>

        

        {/* Section 2 */}
        <Link href="/Profil-De-Vie">
          <div className="p-8 ml-8 max-h-[25vh] flex flex-col md:flex-row justify-between bg-white bg-opacity-80 shadow-lg rounded-2xl transition-all transform hover:scale-105 cursor-pointer w-full sm:w-full md:w-2/3 lg:w-2/3 mx-auto">
          <div className="hidden md:flex items-center justify-center md:w-1/3 max-w-[120px]">
          <AnimatedSVGRenderer
            SvgComponent={LifePic}
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
            strokeColor={couleurs.ardoise}
            fillColor={couleurs.doré}
            strokeWidth={20}
            duration={3}
            delayStep={0.8}
            tiltIntensity={1.5}
            preserveAspectRatio="xMidYMid meet"
            hoverEffect={true}
            pathLengthEffect={false}
            scrollEffect={false}
          />
        </div>


            <div className="md:w-2/3 flex flex-col justify-center gap-4 max-h-[500px] overflow-y-auto md:text-left text-center">
              <Animated.Div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-anthracite">
                  Prêt à vous découvrir autrement ?
                </h2>
                <p className="text-sm md:text-base text-acier font-light">
                  Le Profil de Vie vous permet de faire le point, en quelques questions clés, sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez faire grandir demain.
                </p>
              </Animated.Div>
            </div>
          </div>
        </Link>

        {/* Section 3 */}
        <Link href="/Services">
          <div className="p-8 ml-8 max-h-[25vh] flex flex-col md:flex-row justify-between bg-white bg-opacity-80 shadow-lg rounded-2xl transition-all transform hover:scale-105 cursor-pointer w-full sm:w-full md:w-2/3 lg:w-2/3 mx-auto">
          <div className="hidden md:flex items-center justify-center md:w-1/3 max-w-[100px]">
              <AnimatedSVGRenderer
                SvgComponent={Buste}
                className="w-full h-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
                strokeColor={couleurs.ardoise}
                fillColor={couleurs.doré}
                strokeWidth={12}
                duration={3}
                delayStep={0.8}
                tiltIntensity={1.5}
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 711 1089"
                hoverEffect={true} // Désactive l'effet hover
                pathLengthEffect={false} // Désactive l'animation du dessin
                scrollEffect={false} // Désactive l'effet de défilement
              />
            </div>

            <div className="md:w-2/3 flex flex-col justify-center gap-4 max-h-[500px] overflow-y-auto md:text-left text-center">
              <Animated.Div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-anthracite">
                  Chaque trajectoire est unique.
                </h2>
                <p className="text-sm md:text-base text-acier font-light">
                  Nous ne croyons pas aux solutions toutes faites. Chaque accompagnement Alforis commence par une cartographie de vos objectifs profonds, de votre horizon personnel, et de vos contraintes concrètes.
                </p>
              </Animated.Div>
            </div>
          </div>
        </Link>
        
      </div>
    </section>
  );
}
