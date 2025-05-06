import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  pathLengthEffect = true,  // Commande pour activer/désactiver l'effet pathLength
  scrollEffect = true,
}) {
  const [isClient, setIsClient] = useState(false);
  const [pathLength, setPathLength] = useState(0); // Animation de dessin (de 0 à 1)
  const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor);
  const [currentFillColor, setCurrentFillColor] = useState(fillColor);

  // Calculer l'aspect ratio à partir du viewBox
  const [widthBox, heightBox] = viewBox.split(' ').slice(2).map(Number);  // Extraire largeur et hauteur de viewBox
  const aspectRatio = widthBox / heightBox;

  // Assurez-vous que le composant est rendu côté client
  useEffect(() => {
    setIsClient(true); // Activation côté client après le premier rendu
  }, []);

  // Si l'élément devient visible dans le DOM (qu'il soit visible dans le viewport ou non), commencez l'animation.
  useEffect(() => {
    if (pathLengthEffect) {
      setPathLength(1); // L'animation commence automatiquement quand le SVG devient visible
    }
  }, [pathLengthEffect]);

  // Effet hover
  const hoverEffects = hoverEffect
    ? {
        onMouseEnter: () => {
          setCurrentStrokeColor(fillColor); // Inverse les couleurs au survol
          setCurrentFillColor(strokeColor);
        },
        onMouseLeave: () => {
          setCurrentStrokeColor(strokeColor); // Réinitialise les couleurs
          setCurrentFillColor(fillColor);
        },
      }
    : {};

  // Empêche le rendu côté serveur
  if (!isClient) return null;

  return (
    <motion.div
      className={`relative mx-auto ${wrapperClassName}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        aspectRatio: aspectRatio, // Utilisation de la propriété CSS aspect-ratio
      }}
    >
      {SvgComponent && (
        <motion.svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid meet"
          onMouseEnter={hoverEffects.onMouseEnter}
          onMouseLeave={hoverEffects.onMouseLeave}
          style={{
            position: 'absolute', // Absolu pour que le SVG remplisse le conteneur
            top: 0,
            left: 0,
            width: '100%', // Remplir toute la largeur du conteneur
            height: '100%', // Remplir toute la hauteur du conteneur
          }}
        >
          <SvgComponent
            strokeColor={currentStrokeColor}
            fillColor={currentFillColor}
            strokeWidth={strokeWidth}
            duration={duration}
            delayStep={delayStep}
            pathLength={pathLengthEffect ? pathLength : 1} // L'animation de dessin démarre quand l'élément devient visible
          />
        </motion.svg>
      )}
    </motion.div>
  );
}
