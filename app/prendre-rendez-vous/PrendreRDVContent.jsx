'use client'
import { React, useEffect, useState } from 'react'
import Animated from '@/components/animated/Animated'
import ContactSection from '@/components/ContactSection'
import { motion } from 'framer-motion'
import { pageConfig } from './pageConfig'


const rdvTypes = pageConfig.tabs

export default function PrendreRDVContent({ content, activeTab, onTabChange }) {
  // activeTab = 'appel' | 'visio' | 'patrimonial'
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

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
