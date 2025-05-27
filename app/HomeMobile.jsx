`use client`

import React from 'react'
import Animated from '../components/animated/Animated'
import HeroSection from '../components/home/HeroSection'
import ServicesCards from '../components/home/ServicesCards'
import ApproachSection from '../components/home/ApproachSection'
import KeyFigures from '../components/home/KeyFigures'
import Contact from '../components/home/Contact'
import { motion } from 'framer-motion'

export default function HomeMobile() {
  return (
    <Animated.Page>
      {/* Scroll-snap container */}
      <main className="h-screen snap-y snap-mandatory overflow-y-auto scrollbar-hide">

        {/* 1. Hero Section (with background image) */}
        <motion.section
          id="hero"
          className="snap-start h-screen relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_hero.webp')" }}
          />
          <div className="relative z-base flex flex-col items-center justify-end px-6 pb-16">
            <HeroSection extraClass="text-center max-w-md mx-auto" />
          </div>
        </motion.section>

        {/* 2. Services Section (with background image) */}
        <motion.section
          id="services"
          className="snap-start relative h-auto"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_services.webp')" }}
          />
          <div className="relative z-base bg-ivoire bg-opacity-70 px-6 py-12">
            <ServicesCards extraClass="grid grid-cols-1 gap-6 max-w-md mx-auto" />
          </div>
        </motion.section>

        {/* 3. Approach Section (with background image) */}
        <motion.section
          id="approach"
          className="snap-start relative px-6 py-16"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_approach.webp')" }}
          />
          <div className="relative z-base max-w-md mx-auto">
            <ApproachSection extraClass="px-4 bg-ivoire bg-opacity-80 rounded-xl shadow-xl" />
          </div>
        </motion.section>

        {/* 4. Key Figures Section (no photo, solid background) */}
        <motion.section
          id="figures"
          className="snap-start bg-ardoise px-6 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <KeyFigures extraClass="max-w-md mx-auto text-ivoire" />
        </motion.section>

        {/* 5. Contact Section (no photo, gradient background) */}
        <motion.section
          id="contact"
          className="snap-start relative px-6 py-16 bg-gradient-to-b from-ardoise to-anthracite"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base max-w-md mx-auto bg-overlay bg-opacity-70 rounded-xl p-6">
            <Contact extraClass="text-ivoire" />
          </div>
        </motion.section>

      </main>
    </Animated.Page>
  )
}

