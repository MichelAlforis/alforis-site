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
    { d: d1, fill: getColor(fill1), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1.5, delay: 0 } },
    { d: d2, fill: getColor(fill2), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1.5, delay: 0.3 } },
    { d: d3, fill: getColor(fill3), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1.5, delay: 0.6 } },
    { d: d4, fill: getColor(fill4), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1.5, delay: 0.9 } },
    { d: d5, fill: getColor(fill5), initial: { opacity: 0, pathLength: 0 }, animate: { opacity: 1, pathLength: 1 }, transition: { duration: 1.5, delay: 1.2 } },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 317 561"
      width="100%"
      height="auto"
      aria-labelledby={title}
      initial="initial"
      animate="animate" // This will be overridden by whileInView if whileInView is also "animate"
      whileInView="animate" // Ensures animation plays when SVG is in view
      viewport={{ once: true }} // Animation plays once
    >
      <title id={title}>{title}</title>
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          fill={path.fill}
          // Variants could be used here if preferred, but direct props are fine for this case
                          initial={path.initial} // initial and animate props on children will respect parent's whileInView
                          animate={path.animate}
                          transition={path.transition}
        />
      ))}
    </motion.svg>
  );
};

export default PortraitSVG;
