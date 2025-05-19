'use client'
import React from 'react'
import Animated from '@/components/animated/Animated'
import ContactSection from '@/components/ContactSection'
import { motion } from 'framer-motion'

const rdvTypes = [
  { type: 'appel', label: 'Appel téléphonique', emoji: '📞' },
  { type: 'visio', label: 'Rendez-vous en visio', emoji: '💻' },
  { type: 'patrimonial', label: 'Rendez-vous patrimonial', emoji: '📍' },
]

export default function PrendreRDVContent({ content, activeTab, onTabChange }) {
  // activeTab = 'appel' | 'visio' | 'patrimonial'

  return (
    <Animated.Page>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="main-content min-h-screen px-6 py-20 bg-ivoire text-anthracite dark:bg-acier/80 dark:text-ivoire"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">

          {/* Section de prise de RDV si un type est sélectionné */}
          {activeTab && (
            <div className="mt-12">
              <ContactSection
                type={activeTab}
                onChangeType={onTabChange}
              />
            </div>
          )}
        </div>
      </motion.main>
    </Animated.Page>
  )
}
