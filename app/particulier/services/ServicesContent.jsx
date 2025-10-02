'use client'
/* app/services/ServicesContent.jsx */

import React, { useState, useEffect } from 'react'
import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import { Settings, DollarSign, Users, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { pageConfig } from './pageConfig'

const services = pageConfig.tabs

export default function ServicesContent({ content, activeTab, onTabChange }) {
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
 
  // Trouver le service actuellement sélectionné
  const current = services.find(service => service.key === activeTab);

  return (
    <Animated.Page>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="main-content bg-ivoire text-doré dark:bg-acier dark:text-ivoire py-16 px-6"
      >
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          {/* Tabs */}

          {/* Content */}
          <div className="relative">
            {current && (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-ivoire/40 bg-opacity-90 rounded-2xl shadow-xl p-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-vertSauge text-ivoire dark:bg-doré p-4 rounded-full">
                      <current.icon size={32} />
                    </div>
                  </div>
                  <NoWidowText as="h2" className="Text-doré dark:text-vertSauge text-2xl font-semibold mb-2">
                    {current.label}
                  </NoWidowText>
                  <p className="italic mb-4">{current.subtitle}</p>
                  <p className="leading-relaxed mb-6">{current.description}</p>
                  <Button className="btn-alforis-outline">En savoir plus</Button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.section>
    </Animated.Page>
  )
}
