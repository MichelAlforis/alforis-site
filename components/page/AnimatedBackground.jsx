'use client'
// components/AnimatedBackground.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { couleurs } from '@/styles/generated-colors';

// Convertit "rgb(r g b)" en "rgba(r, g, b, alpha)"
const toRgba = (rgbString, alpha) => {
  const [r, g, b] = rgbString.match(/\d+/g);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Choix des couleurs selon le thème
  const color1 = isDark
    ? toRgba(couleurs.ivoire, 0.1)      // ivoire clair en mode sombre
    : toRgba(couleurs.anthracite, 0.05); // anthracite foncé en mode clair

  const color2 = isDark
    ? toRgba(couleurs.acier, 0.05)      // acier moyen en mode sombre
    : toRgba(couleurs.ardoise, 0.02);    // ardoise plus clair en mode clair

  return (
    <div className="absolute inset-0 -z-base overflow-hidden">
      <motion.span
        className="absolute rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${color1}, transparent)`,
          top: '-10%',
          left: '-10%',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      />
      <motion.span
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${color2}, transparent)`,
          bottom: '-15%',
          right: '-15%',
        }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
      />
    </div>
  );
}
