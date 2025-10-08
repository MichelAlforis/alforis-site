'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/styles/ThemeDark';
import { couleurs } from '@/styles/generated-colors.mjs';
import { SVGConfig } from './navbarLogoConfig';
import Color from 'colorjs.io';
import useSectionContrast from '@/hooks/useSectionContrast'

export default function NavbarLogoMobile({ className = '', isTransparent }) {
  const pathname = usePathname();
  const { dark: isDark } = useTheme();

  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (isTransparent) {
      const timer = setTimeout(() => setOpened(true), 800);
      return () => clearTimeout(timer);
    }
    setOpened(true);
  }, [isTransparent]);

  const [revealed, setRevealed] = useState(false);
  const handleTap = () => setRevealed(r => !r);
  const pathLength = revealed ? 1 : opened ? 0.7 : 0;

  const ivoryColor = new Color(couleurs.ivoire);
  const acierColor = new Color(couleurs.acier);
  const range = ivoryColor.range(acierColor, { space: 'oklab', outputSpace: 'srgb' });

  const [scrollColor, setScrollColor] = useState(couleurs.ivoire);
  useEffect(() => {
    if (pathname !== '/') return;
    const main = document.getElementById('home-main');
    if (!main) return;
    const onScroll = () => {
      const total = main.scrollHeight - main.clientHeight;
      const ratio = total > 0 ? main.scrollTop / total : 0;
      const t = ratio <= 0.5 ? ratio * 2 : 2 - ratio * 2;
      const col = range(t).toString();
      setScrollColor(ratio > 0.05 ? col : couleurs.ivoire);
    };
    main.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => main.removeEventListener('scroll', onScroll);
  }, [pathname, range]);

  // 🌈 Nouvelle logique : détection du contraste de la section visible
  const onDark = useSectionContrast({
  watchDom: true,
  excludeHeaderOverride: (pathname) => /^\/(fr|en|es|pt)\/b2b\/?$/.test(pathname),
  fallback: () => false
})

console.log('[NavbarLogoMobile] onDark:', onDark)

  // 🎨 Détermine la couleur finale
  let fillColor;
  if (revealed) {
    fillColor = couleurs.doré;
  } else if (onDark) {
    fillColor = couleurs.ivoire;
  } else {
    fillColor = couleurs.anthracite || couleurs.acier;
  }

  console.log('[NavbarLogoMobile] fillColor:', fillColor)

  const fadeIn = { opacity: { duration: 0.8, ease: 'easeOut' } };
  const drawLogo = { pathLength: { duration: 1.4, ease: 'easeInOut' } };
  const drawText = { pathLength: { duration: 1.0, ease: 'easeInOut' }, strokeWidth: { duration: 0.3 } };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2234 500"
      preserveAspectRatio="xMidYMid meet"
      className={`w-auto ${className}`}
      style={{ cursor: 'pointer', touchAction: 'manipulation' }}
      initial={{ opacity: 0 }}
      animate={opened ? { opacity: 1 } : {}}
      transition={fadeIn}
      onTap={handleTap}
    >
      <motion.path
        d={SVGConfig.d1}
        fill={fillColor}
        stroke={fillColor}
        strokeWidth={revealed ? 20 : 5}
        fillRule="evenodd"
        clipRule="evenodd"
        initial={{ pathLength: 0 }}
        animate={{ pathLength }}
        transition={drawLogo}
        style={{ strokeLinecap: 'butt' }}
      />
      <motion.path
        d={SVGConfig.d2}
        fill="none"
        stroke={fillColor}
        strokeWidth={15}
        initial={false}
        animate={{ pathLength: revealed ? 1 : 0 }}
        transition={drawText}
        style={{ strokeLinecap: 'butt' }}
      />
    </motion.svg>
  );
}
