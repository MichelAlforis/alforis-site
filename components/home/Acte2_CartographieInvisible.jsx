'use client'
/* components/home/Acte2_CartographieInvisible.jsx */

import { motion } from 'framer-motion'

export default function Acte2_CartographieInvisible({ extraClass = '' }) {
  // Abstract fluid universe effect (conceptual)
  // This could be a series of nested divs with animated gradients or opacities
  // Or a more complex SVG or canvas animation if performance allows
  const fluidUniverseBackground = (
    <motion.div
      className="absolute inset-0 overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
    >
      {/* Example: Animated gradients - this can be much more complex */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            "linear-gradient(45deg, #001f3f 0%, #0074D9 50%, #7FDBFF 100%)",
            "linear-gradient(45deg, #7FDBFF 0%, #0074D9 50%, #001f3f 100%)",
            "linear-gradient(45deg, #001f3f 0%, #0074D9 50%, #7FDBFF 100%)",
          ],
          transition: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ mixBlendMode: 'overlay' }}
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          ],
          transition: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        }}
      />
    </motion.div>
  );

  const textBlocks = [
    "J’ai été conseiller, créateur de fonds, distributeur de produits structurés. J’ai vu tous les étages du bâtiment.",
    "Ce que je vous apporte aujourd’hui, ce n’est pas une solution toute faite. C’est une vision globale, éclairée.",
    "Je vous aide à comprendre les flux, les leviers, les marges… et à décider en toute connaissance."
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <motion.section
      className={`relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden ${extraClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is in view
    >
      {fluidUniverseBackground}

      <motion.div
        className="z-10 p-4 md:p-8 max-w-3xl"
        variants={containerVariants}
      >
        {textBlocks.map((text, index) => (
          <motion.p
            key={index}
            className="text-xl md:text-2xl text-acier dark:text-gray-200 mb-8 font-light leading-relaxed"
            variants={itemVariants}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </motion.section>
  );
}
