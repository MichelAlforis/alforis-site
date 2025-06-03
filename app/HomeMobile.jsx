`use client`

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Animated from '../components/animated/Animated'
import HeroSection from '../components/home/HeroSection'
import ServicesCards from '../components/home/ServicesCards'
import ApproachSection from '../components/home/ApproachSection'
import KeyFigures from '../components/home/KeyFigures'
import Contact from '../components/home/Contact'


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

        {/* 2. Services Section */}
        <motion.section
          id="services"
          className="snap-start relative h-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_services.webp')" }}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="relative z-base bg-ivoire bg-opacity-95 px-6 py-12">
            <ServicesCards extraClass="grid grid-cols-1 divide-y divide-ardoise-light" />
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          </div>
        </motion.section>

        {/* 3. Approach Section */}
        <motion.section
          id="approach"
          className="snap-start relative px-6 py-16"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/img/home/M_approach.webp')" }}
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1 }}
          />
          <div className="relative z-base max-w-md mx-auto">
            <ApproachSection extraClass="px-4 bg-ivoire bg-opacity-80 rounded-2xl shadow-2xl py-6" />
          </div>
        </motion.section>

        {/* 4. Key Figures Section (solid background) */}
        <motion.section
          id="figures"
          className="snap-start bg-ardoise px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-sm mx-auto text-center space-y-4">
            <KeyFigures extraClass="text-ivoire" />
          </div>
        </motion.section>

        {/* 5. Contact Section (gradient bg) */}
        <motion.section
          id="contact"
          className="snap-start relative px-6 py-16 bg-gradient-to-b from-ardoise to-anthracite"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base max-w-md mx-auto bg-overlay bg-opacity-70 rounded-2xl p-6">
            <Contact extraClass="text-ivoire" />
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <button className="bg-ivoire text-anthracite font-semibold py-3 px-8 rounded-full shadow-inner">
                Prendre rendez-vous
              </button>
            </motion.div>
          </div>
        </motion.section>

      </main>
    </Animated.Page>
  )
}

