`use client`

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Animated from '../components/animated/Animated'
import HeroSection from '../components/home/HeroSection'
import Acte2_CartographieInvisible from '../components/home/Acte2_CartographieInvisible'
import Acte3_Engagement from '../components/home/Acte3_Engagement'
import Acte4_Structure from '../components/home/Acte4_Structure'
import Acte5_ChoixLucide from '../components/home/Acte5_ChoixLucide' // Added


export default function HomeMobile() {

  const mainRef = useRef(null)
  return (
    <Animated.Page>
    
      <main
        id="home-main"
        ref={mainRef}
        className="h-screen snap-y snap-mandatory overflow-y-auto scrollbar-hide"
      >
        {/* 1. Hero Section */}
        <motion.section
          id="hero"
          className="snap-start h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_hero.webp')" }}
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="relative z-base flex flex-col items-center justify-end px-6 pb-16">
            <HeroSection extraClass="text-center max-w-sm mx-auto animate-fadeInUp" />
            <motion.div
              className="mt-6 mb-4 animate-bounce"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="block w-6 h-6 bg-ivoire/80 rounded-full" />
            </motion.div>
          </div>
        </motion.section>

        {/* 2. Acte II Section - Cartographie Invisible */}
        <motion.section
          id="services" // Keeping id="services" for potential scroll navigation consistency
          className="snap-start h-screen relative" // Assuming full screen for Acte II
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* The Acte2_CartographieInvisible component has its own background */}
          <Acte2_CartographieInvisible extraClass="w-full h-full" />
        </motion.section>

        {/* 3. Acte III Section - L'Engagement */}
        <motion.section
          id="approach" // Keeping id="approach" for consistency
          className="snap-start h-screen relative" // Component itself is 300vh for internal scroll
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Acte3_Engagement extraClass="w-full h-full" />
        </motion.section>

        {/* 4. Acte IV Section - La Structure */}
        <motion.section
          id="figures" // Keeping id="figures" for consistency
          className="snap-start h-screen relative" // Acte4_Structure is designed for full screen
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // Consistent with other Acte sections
        >
          <Acte4_Structure extraClass="w-full h-full" />
        </motion.section>

        {/* 5. Acte V Section - Le Choix Lucide */}
        <motion.section
          id="contact" // Keeping id="contact" for consistency
          className="snap-start h-screen relative" // Acte5_ChoixLucide is designed for full screen
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // Consistent with other Acte sections
        >
          <Acte5_ChoixLucide extraClass="w-full h-full" />
        </motion.section>

      </main>
    </Animated.Page>
  )
}

