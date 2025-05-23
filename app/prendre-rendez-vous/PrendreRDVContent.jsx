'use client'
import { React, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { pageConfig } from './pageConfig'
import RDVTunnel from '@/components/calcom/RDVTunnel'
import CustomDisponibilityForm from '@/components/calcom/CustomDisponibilityForm'
import ContactSection from '@/components/calcom/ContactSection'

const rdvTypes = pageConfig.tabs

export default function PrendreRDVContent({ content, activeTab, onTabChange }) {
  const [booking, setBooking] = useState(null)
  const [fallback, setFallback] = useState(false)

  const handleFallback = () => setFallback(true)


  return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="main-content min-h-screen px-6 py-20 bg-ivoire text-anthracite dark:bg-acier/80 dark:text-ivoire"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
         
          {!booking && !fallback && activeTab && (
            <RDVTunnel
              type={activeTab}
              onConfirm={setBooking}
              onFallback={handleFallback}
            />
          )}

          {booking && (
            <ContactSection
              type={booking.type}
              date={booking.date}
              time={booking.time}
              onChangeType={onTabChange}
            />
          )}

          {fallback && !booking && (
            <CustomDisponibilityForm type={activeTab} />
          )}

        </div>
      </motion.section>

  )
}
