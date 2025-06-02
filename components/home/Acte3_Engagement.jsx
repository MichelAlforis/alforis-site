'use client'
/* components/home/Acte3_Engagement.jsx */

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Acte3_Engagement({ extraClass = '' }) {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'], // Track scroll progress throughout the component
  })

  // Define text groups
  const textGroups = [
    [
      "Chaque patrimoine est une histoire.",
      "Chaque décision est une responsabilité.",
      "Chaque rencontre est une co-construction.",
    ],
    [
      "Mon métier, ce n’est pas de vendre des produits.",
      "C’est de mettre de la clarté là où d’autres entretiennent la complexité.",
    ],
    [
      "Vous n’êtes pas un portefeuille. Vous êtes une trajectoire de vie.",
    ],
  ]

  // Create opacity and y transformations for each group
  const groupAnimations = textGroups.map((_, i) => {
    const numGroups = textGroups.length;
    // Define a segment for each group, ensuring they don't all appear/disappear at the exact same scroll point.
    // Each segment is roughly 1/Nth of the scroll progress.
    // Add a small buffer/overlap for smoother transitions.
    const segmentDuration = 1 / numGroups;
    const start = i * segmentDuration;
    const end = (i + 1) * segmentDuration;

    // Opacity: Fade in at start of segment, fade out at end.
    // Full opacity for middle 60% of the segment.
    const opacity = useTransform(
      scrollYProgress,
      [
        start,
        start + segmentDuration * 0.2,
        end - segmentDuration * 0.2,
        end
      ],
      [0, 1, 1, 0]
    );

    // Y position: Move up into view, stay, then move up out of view.
    // Adjust values as needed for desired visual effect.
    const y = useTransform(
      scrollYProgress,
      [
        start,
        start + segmentDuration * 0.2,
        end - segmentDuration * 0.2,
        end
      ],
      ['40px', '0px', '0px', '-40px']
    );
    return { opacity, y };
  });

  const visualVariants = {
    hidden: { opacity: 0.3, scale: 0.9 }, // Start slightly visible for context
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay:0.2 } // Fluid ease
    },
  };

  return (
    <section
      ref={targetRef}
      className={`relative w-full h-[300vh] text-white ${extraClass}`} // Section needs to be taller for sticky scroll
    >
      {/* Background Visual: Placeholder for "wave of golden light, a hand gently emerges" */}
      <motion.div
        className="sticky top-0 h-screen w-full -z-10 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #B08D57 0%, #CFA76B 30%, #E0C9A6 60%, #edd9b9 100%)' }} // Refined Golden Gradient
        variants={visualVariants}
        initial="hidden"
        whileInView="visible" // Animate when section comes into view
        viewport={{ once: false, amount: 'some' }} // 'some' ensures it animates as it enters
      >
        <motion.p
            className="text-3xl md:text-4xl font-title text-black opacity-20"
        >
            [VISUAL: Wave of Golden Light - Hand Emerging]
        </motion.p>
      </motion.div>

      {/* Sticky Text Container: Centered and on top */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="max-w-2xl lg:max-w-3xl text-center p-4 md:p-8">
          {textGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              // Each group is absolutely positioned to stack and fade in/out at the same spot
              className="absolute inset-x-0 flex flex-col items-center justify-center px-4"
              style={{
                opacity: groupAnimations[groupIndex].opacity,
                y: groupAnimations[groupIndex].y,
              }}
            >
              {group.map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  // Styling for emotional impact and legibility
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 leading-tight tracking-tight"
                  style={{ textShadow: '0px 0px 10px rgba(0,0,0,0.3), 0px 0px 20px rgba(0,0,0,0.2)'}}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}