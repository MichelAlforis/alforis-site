import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useTransform, useScroll, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedSVGRenderer({
  SvgComponent,
  viewBox = '0 0 711 1089',
  className = '',
  strokeWidth = 7,
  strokeColor = 'var(--stroke-color)',
  fillColor = 'var(--fill-color)',
  duration = 3,
  delayStep = 0.5,
  width = '100%',
  height = '100%',
  wrapperClassName = 'w-full h-auto',
  hoverEffect = true,
  scrollEffect = true,
}) {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '0px 0px -10% 0px', once: true })


  const [pathLength, setPathLength] = useState(0);  // Animation de dessin (de 0 à 1)
  const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor);
  const [currentFillColor, setCurrentFillColor] = useState(fillColor);

  useEffect(() => {
    setIsClient(true); // Activation côté client après le premier rendu
  }, []);

  

  const hoverEffects = hoverEffect
    ? {
        onMouseEnter: () => {
          console.log("Survol détecté, inversion des couleurs.");
          setCurrentStrokeColor(fillColor); // Inverse les couleurs au survol
          setCurrentFillColor(strokeColor);
        },
        onMouseLeave: () => {
          console.log("Survol quitté, réinitialisation des couleurs.");
          setCurrentStrokeColor(strokeColor); // Réinitialise les couleurs au départ du survol
          setCurrentFillColor(fillColor);
        },
      }
    : {};

  // Effets de défilement
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 1], [3, -3]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const offsetX = (e.clientX - center.x) / 30;
    const offsetY = (e.clientY - center.y) / 30;
    x.set(offsetX);
    y.set(-offsetY);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollEffectStyles = scrollEffect
    ? {
        rotateX: scrollRotateX,
        rotateY: scrollRotateY,
        scale,
        opacity,
      }
    : {};

  if (!isClient) return null;

  return (
    <motion.div
      ref={ref} // Utilisation de la référence pour observer la visibilité
      className={`relative mx-auto ${wrapperClassName}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: 'easeInOut',
      }}
    >
      {SvgComponent && isInView && paths.length > 0 && ((
        <motion.svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid meet"
          style={{
            ...scrollEffectStyles,
            willChange: 'transform, opacity',
          }}
          onMouseEnter={hoverEffects.onMouseEnter}
          onMouseLeave={hoverEffects.onMouseLeave}
        >
          <SvgComponent
            ref={inViewRef}
            strokeColor={currentStrokeColor}
            fillColor={currentFillColor}
            strokeWidth={strokeWidth}
            duration={duration}
            delayStep={delayStep}
            pathLength={pathLength} // L'animation de dessin démarre quand l'élément devient visible
          />
        </motion.svg>
      ))}
    </motion.div>
  );
}
