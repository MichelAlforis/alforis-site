'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import HeroB2BSection from '../b2b/Components/Home/HeroB2BSection'
import useButtonHover from '@/hooks/useButtonHover'

// Dynamic imports
const CountriesSection = dynamic(() => import('../b2b/Components/Home/CountriesSection'), { ssr: false })
const RoleSection = dynamic(() => import('../b2b/Components/Home/RoleSection'), { ssr: false })
const DifferentiatorsSection = dynamic(() => import('../b2b/Components/Home/DifferentiatorsSection'), { ssr: false })
const ServicesB2BSection = dynamic(() => import('../b2b/Components/Home/ServicesB2BSection'), { ssr: false })
const TargetsSection = dynamic(() => import('../b2b/Components/Home/TargetsSection'), { ssr: false })
const ContactB2BSection = dynamic(() => import('../b2b/Components/Home/ContactB2BSection'), { ssr: false })

export default function HomeB2BMobile() {
  const mainRef = useRef(null)
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <Animated.Page>
      <main
        id="home-b2b-main"
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
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/img/b2b/M_hero_b2b.webp"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </motion.div>
          <div className="relative z-base flex flex-col items-center justify-end px-3 pb-16">
            <HeroB2BSection extraClass="text-center max-w-sm mx-auto animate-fadeInUp" />
          </div>
        </motion.section>

        {/* 2. Notre rôle */}
        <motion.section
          id="role"
          className="snap-start relative h-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base bg-ivoire/90 dark:bg-anthracite/90 px-3 py-12">
            <RoleSection extraClass="" />
          </div>
        </motion.section>

        {/* 3. Zones couvertes */}
        <motion.section
          id="countries"
          className="snap-start bg-gradient-to-br from-ardoise to-anthracite py-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base">
            <CountriesSection extraClass="text-ivoire" />
          </div>
        </motion.section>

        {/* 4. Différenciateurs */}
        <motion.section
          id="differentiators"
          className="snap-start relative px-3 py-16"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base max-w-md mx-auto">
            <DifferentiatorsSection extraClass="px-3 bg-ivoire/90 dark:bg-acier/80 rounded-2xl shadow-2xl py-6" />
          </div>
        </motion.section>

        {/* 5. Services */}
        <motion.section
          id="services"
          className="snap-start bg-gradient-to-br from-anthracite to-ardoise py-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base">
            <ServicesB2BSection extraClass="text-ivoire max-w-sm mx-auto" />
          </div>
        </motion.section>

        {/* 6. Interlocuteurs */}
        <motion.section
          id="targets"
          className="snap-start relative py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base bg-ivoire/90 dark:bg-anthracite/90 px-3 py-12">
            <TargetsSection extraClass="" />
          </div>
        </motion.section>

        {/* 7. Contact CTA */}
        <motion.section
          id="contact"
          className="snap-start relative py-16 bg-gradient-to-b from-ardoise to-anthracite"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-base max-w-md mx-auto bg-acier/30 backdrop-blur-sm rounded-2xl p-6 border border-doré/30">
            <ContactB2BSection 
              extraClass="text-ivoire" 
              buttonClass={buttonClass}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
        </motion.section>

      </main>
    </Animated.Page>
  )
}
