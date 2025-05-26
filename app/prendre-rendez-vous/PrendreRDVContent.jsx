'use client'
import { React, useState } from 'react'

import { motion } from 'framer-motion'
import { pageConfig } from './pageConfig'
import BookingEmded from '@/components/calcom/BookingEmbed'

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
         
        <BookingEmded type={activeTab} />

        </div>
      </motion.section>

  )
}
