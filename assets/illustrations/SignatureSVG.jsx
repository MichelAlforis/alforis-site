'use client'
import React from 'react';
import { motion } from 'framer-motion';

// Placeholder SVG Signature component
// Replace path 'd' attribute with actual signature path data if available.
// The viewBox, strokeWidth, and animation parameters might need adjustment
// based on the actual SVG.
export default function SignatureSVG({ className = '', strokeColor = "currentColor" }) {
  const signatureVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2.5, bounce: 0 },
        opacity: { duration: 0.5, delay: 0.2 }
      }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 100" // Adjusted viewBox for a more typical signature aspect ratio
      className={`w-48 h-24 md:w-64 md:h-32 ${className}`} // Example sizing
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.path
        d="M20 70 Q 50 20 100 50 T 200 60 Q 230 80 280 40" // A more complex placeholder path
        fill="transparent"
        stroke={strokeColor} // Use prop for color
        strokeWidth="3" // Adjusted stroke width
        variants={signatureVariants}
      />
    </motion.svg>
  );
}
