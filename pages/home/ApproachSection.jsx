'use client'
import Link from "next/link";
import AnimatedSVGRenderer from "@/components/animated/AnimatedSVGRenderer";
import { Animated } from "@/components/animated/Animated";
import { sections } from "@/components/HomeData";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer'; // Utilisation de react-intersection-observer pour détecter la visibilité
import { couleurs } from "@/styles/colors";


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
        {sections.map((section, index) => (
          <Link key={index} href={section.link}>
            <div className="p-8 ml-8 max-h-[25vh] flex flex-col md:flex-row justify-between bg-white  bg-opacity-80 shadow-lg rounded-2xl transition-all transform hover:scale-105 cursor-pointer w-full sm:w-full md:w-2/3 lg:w-2/3 mx-auto">
              <div className="flex justify-between md:w-1/3 max-h-[500px] w-[80%] mx-auto md:mx-0 z40">
                <AnimatedSVGRenderer
                  SvgComponent={section.SvgComponent}
                  strokeColor={couleurs.ardoise}
                  fillColor={couleurs.doré}
                  strokeWidth={12}
                  duration={3}
                  delayStep={0.8}
                  tiltIntensity={1.5}
                  className="block w-full h-auto"
                  wrapperClassName="stroke-doré fill-ardoise w-[auto] max-w-[15vw] mx-auto aspect-[1000/1000]"
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="xMidYMid meet"
                  height="100%"
                  width="100%"
                  hoverEffect={true}
                  scrollEffect={true}
                  inView={isSectionVisible} // Utilisation de la visibilité de la section
                />
              </div>

      


                {/* Texte dynamique à droite */}
                <div className="md:w-2/3 flex flex-col justify-center gap-4 max-h-[500px] overflow-y-auto md:text-left text-center">
                  <Animated.Div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-semibold text-anthracite">
                      {section.title}
                    </h2>
                    <p className="text-sm md:text-base text-acier font-light">
                      {section.paragraph}
                    </p>
                  </Animated.Div>
                </div>
              </div>
            </Link>
          
        ))}
      </div>
    </section>
  );
}
