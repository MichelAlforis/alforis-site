'use client'
import { React, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { pageConfig } from './pageConfig'
import RDVTunnel from '@/components/calcom/RDVTunnel'
import CustomDisponibilityForm from '@/components/calcom/CustomDisponibilityForm'
import ContactSection from '@/components/calcom/ContactSection'
import ConfirmationRDV from '@/components/calcom/ConfirmationRDV'

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
      >
        <div className="text-center space-y-12">
         
          {!booking && !fallback && activeTab && (
            <RDVTunnel
              type={activeTab}
              onConfirm={setBooking}
              onFallback={handleFallback}
            />
          )}

          {booking && (
            <ConfirmationRDVForm
              type={booking.type}
              date={booking.date}
              time={booking.time}
              onRestart={() => { setBooking(null); setFallback(false) }}
              agendaUrl="https://cal.com/alforis" // ou ton lien complet
            />
          )}

          {fallback && !booking && (
            <CustomDisponibilityForm type={activeTab} />
          )}

        </div>
      </motion.section>

  )
}
