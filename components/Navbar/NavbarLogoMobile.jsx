'use client';

import React, { useState, useEffect } from 'react';
import { usePathname }       from 'next/navigation';
import { motion, useSpring } from 'framer-motion';
import useScrollPosition     from '@/hooks/useScrollPosition';
import { useTheme }          from '@/styles/ThemeDark';
import { couleurs }          from '@/styles/generated-colors';
import { SVGConfig }         from './navbarLogoConfig';

export default function NavbarLogoMobile({ className = '' }) {
  // 1) Contexte & hooks
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const { dark: isDark } = useTheme();
  const scrollY = useScrollPosition();

  // 2) Parallax & scale
  const yParallax     = useSpring(scrollY / 12,            { stiffness: 150, damping: 25 });
  const scaleParallax = useSpring(scrollY > 80 ? 0.85 : 1, { stiffness: 200, damping: 20 });

  // 3) Animation d’ouverture (Home uniquement)
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setOpened(true), 800);
      return () => clearTimeout(timer);
    }
    setOpened(true);
  }, [isHome]);

  // 4) Base color
  const baseColor = (isDark || isHome) ? couleurs.ivoire : couleurs.acier;

  // 5) Tap interaction
  const [revealed, setRevealed] = useState(false);
  const handleTap = () => setRevealed(r => !r);

  // 6) PathLength
  const pathLength = revealed ? 1 : opened ? 0.7 : 0;

  // 7) Transitions nommées
  const fadeIn   = { opacity:    { duration: 0.8, ease: 'easeOut' } };
  const drawLogo = { pathLength: { duration: 1.4, ease: 'easeInOut' } };
  const drawText = {
    pathLength:  { duration: 1.0, ease: 'easeInOut' },
    strokeWidth: { duration: 0.3 }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2234 500"
      preserveAspectRatio="xMidYMid meet"
      className={`w-auto ${className}`}
      style={{
        y:           yParallax,
        scale:       scaleParallax,
        cursor:      'pointer',
        touchAction: 'manipulation'
      }}
      initial={{ opacity: 0 }}
      animate={opened ? { opacity: 1 } : {}}
      transition={fadeIn}
      onTap={handleTap}
    >
      {/* — Logo principal */}
      <motion.path
        d={SVGConfig.d1}
        fill={revealed ? couleurs.doré : baseColor}
        stroke={revealed ? couleurs.doré : baseColor}
        strokeWidth={revealed ? 20 : 5}
        fillRule="evenodd"
        clipRule="evenodd"
        initial={{ pathLength: 0 }}
        animate={{ pathLength }}
        transition={drawLogo}
        style={{ strokeLinecap: 'butt' }}
      />

      {/* — Texte (dessiné/effacé uniquement onTap) */}
      <motion.path
        d={SVGConfig.d2}
        fill="none"
        stroke={revealed ? couleurs.doré : baseColor}
        strokeWidth={15}
        initial={false}                              /* pas de dessin au chargement */
        animate={{ pathLength: revealed ? 1 : 0 }}  /* 1 = full, 0 = none */
        transition={drawText}
        style={{ strokeLinecap: 'butt' }}
      />
    </motion.svg>
  );
}
