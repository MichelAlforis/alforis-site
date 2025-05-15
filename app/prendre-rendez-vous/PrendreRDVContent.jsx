'use client'
/* app/prendre-rendez-vous/PrendreRDVContent.jsx */


import React, { useState } from 'react'
import Animated from '@/components/animated/Animated'
import ContactSection from '@/components/ContactSection'
import { motion } from 'framer-motion'

const rdvTypes = [
  { type: 'appel', label: 'Appel téléphonique', emoji: '📞' },
  { type: 'visio', label: 'Rendez-vous en visio', emoji: '💻' },
  { type: 'patrimonial', label: 'Rendez-vous patrimonial', emoji: '📍' },
]

export default function PrendreRDVContent() {
  const [selectedType, setSelectedType] = useState(null)

  return (
    <Animated.Page>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="main-content min-h-screen px-6 py-20 bg-ivoire text-anthracite"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h1 className="text-3xl md:text-5xl font-title font-semibold">
            Choisissez votre rendez-vous
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rdvTypes.map(({ type, label, emoji }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`border rounded-2xl p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md hover:border-doré/80 bg-white/70 ${
                  selectedType === type
                    ? 'border-doré bg-white'
                    : 'border-transparent'
                }`}
              >
                <div className="text-5xl mb-4">{emoji}</div>
                <div className="text-xl font-medium text-anthracite">{label}</div>
              </button>
            ))}
          </div>

          {selectedType && (
            <div className="mt-12">
              <ContactSection
                type={selectedType}
                onChangeType={setSelectedType}
              />
            </div>
          )}
        </div>
      </motion.main>
    </Animated.Page>
  )
}
