import React from 'react';
import { motion } from 'framer-motion';
import { ProtraitSVGConfig } from '../../../public/assets/img/svg/portrait';
import { couleurs } from '../../../styles/generated-colors';

const PortraitSVG = () => {
  const { title, d1, d2, d3, d4, d5, fill1, fill2, fill3, fill4, fill5 } = ProtraitSVGConfig;

  const getColor = (colorName) => {
    const key = colorName.split('.')[1];
    return couleurs[key] || 'black'; // Default to black if color not found
  };

  const paths = [
    { d: d1, fill: getColor(fill1), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1, delay: 0 } },
    { d: d2, fill: getColor(fill2), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1, delay: 0.2 } },
    { d: d3, fill: getColor(fill3), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1, delay: 0.4 } },
    { d: d4, fill: getColor(fill4), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1, delay: 0.6 } },
    { d: d5, fill: getColor(fill5), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1, delay: 0.8 } },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 317 561" // Adjusted viewBox to match SVG dimensions from portrait.js (d1 path goes up to 317 width and 561 height)
      width="100%" // Make it responsive
      height="auto" // Maintain aspect ratio
      aria-labelledby={title}
      initial="initial"
      animate="animate"
    >
      <title id={title}>{title}</title>
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          fill={path.fill}
          initial={path.initial}
          animate={path.animate}
          transition={path.transition}
        />
      ))}
    </motion.svg>
  );
};

export default PortraitSVG;
