'use client'
import { useEffect,useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function AccordionItem({ item, isOpen, onToggle }) {

  return (
    <div className="border border-doré bg-white dark:bg-opacity-80 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${item.id}`}
        className="w-full flex justify-between items-center px-6 py-4 bg-vertSauge/40 focus:outline-none focus:ring-2 focus:ring-doré"
      >
        <span className="text-ardoise font-medium text-lg">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-doré"
        >
          <ChevronDown size={24} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`panel-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-6 text-ardoise"
          >
            {item.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
