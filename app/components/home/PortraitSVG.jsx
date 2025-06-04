// PortraitSVG.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ProtraitSVGConfig } from '../../../public/assets/img/svg/portrait';
import { couleurs } from '../../../styles/generated-colors';

const PortraitSVG = ({
  className,      // <-- on déstructure ici
  titleOverride,  // si vous voulez passer un titre en prop (optionnel)
}) => {
  const { title, d1, d2, d3, d4, d5, fill1, fill2, fill3, fill4, fill5 } = ProtraitSVGConfig;

  const getColor = (colorName) => {
    const key = colorName.split('.')[1];
    return couleurs[key] || 'black';
  };

  // On ne stocke plus initial/animate/transition dans chaque objet path : 
  const paths = [
    { d: d1, fill: getColor(fill1) },
    { d: d2, fill: getColor(fill2) },
    { d: d3, fill: getColor(fill3) },
    { d: d4, fill: getColor(fill4) },
    { d: d5, fill: getColor(fill5) },
  ];

  // Variants partagés par tous les <motion.path> :
  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        delay: i * 0.3,       // on espace chaque path de 0.3 s
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 317 561"
      aria-labelledby={title}
      className={className}
      // On n’utilise QUE initial / whileInView ici, plus de `animate` fixe :
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <title id={title}>{title}</title>

      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          fill={path.fill}
          
          // On lui donne les variants et un custom=index pour le delay
          variants={pathVariants}
          custom={index}
        />
      ))}
    </motion.svg>
  );
};

export default PortraitSVG;
