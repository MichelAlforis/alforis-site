'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, Mail, MessageCircle, Phone, X } from 'lucide-react'

export default function HeroB2BSection({ 
  extraClass = '', 
  buttonClass = '', 
  onMouseEnter = () => {}, 
  onMouseLeave = () => {} 
}) {
  const t = useTranslations('home.hero')
  const tModal = useTranslations('home.hero.contactModal')
  const router = useRouter()
  const [showOptions, setShowOptions] = useState(false)
  
  const contactOptions = [
    {
      icon: Calendar,
      title: tModal('options.calendar.title'),
      description: tModal('options.calendar.description'),
      action: () => window.open('https://calendly.com/votre-lien', '_blank'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: tModal('options.email.title'),
      description: tModal('options.email.description'),
      action: () => router.push('/contact'),
      color: 'from-doré to-yellow-600'
    },
    {
      icon: MessageCircle,
      title: tModal('options.chat.title'),
      description: tModal('options.chat.description'),
      action: () => {
        const message = encodeURIComponent(tModal('options.chat.whatsappMessage'))
        window.open(`https://wa.me/33646462291?text=${message}`, '_blank')
      },
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Phone,
      title: tModal('options.phone.title'),
      description: tModal('options.phone.description'),
      action: () => window.location.href = 'tel:+33646462291',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const handleMainCTAClick = () => {
    setShowOptions(true)
  }
    
  return (
    <section className={`w-full min-h-screen flex flex-col items-center justify-center text-center px-4 ${extraClass}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-6 px-6 py-2 bg-doré/20 backdrop-blur-sm rounded-full text-sm font-semibold text-doré border border-doré/30"
      >
        {t('badge')}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold leading-tight mb-6 text-ivoire max-w-5xl"
      >
        {t('title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl md:text-2xl mb-4 text-doré font-light"
      >
        {t('countries')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-md md:text-lg text-ivoire/90 font-light mb-10 max-w-4xl mx-auto leading-relaxed"
      >
        {t('description')}
      </motion.p>

      {/* CTA Principal */}
      <motion.button
        onClick={handleMainCTAClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          ${buttonClass} 
          relative z-50
          bg-doré text-anthracite 
          px-10 py-4 rounded-full 
          font-bold text-lg 
          shadow-xl hover:shadow-2xl 
          transition-all 
          inline-flex items-center gap-3 
          group
          cursor-pointer
          hover:bg-doré/90
        `}
      >
        {t('cta')}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Modal Options de Contact */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-anthracite to-ardoise rounded-3xl p-8 md:p-12 max-w-3xl w-full shadow-2xl border border-doré/30"
            >
              {/* Bouton Fermer */}
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-6 right-6 text-ivoire/60 hover:text-ivoire transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Titre */}
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-ivoire mb-3">
                  {tModal('title')}
                </h3>
                <p className="text-ivoire/70 text-lg">
                  {tModal('subtitle')}
                </p>
              </div>

              {/* Grille d'Options */}
              <div className="grid md:grid-cols-2 gap-4">
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      option.action()
                      setShowOptions(false)
                    }}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left transition-all border border-white/10 hover:border-doré/50 overflow-hidden"
                  >
                    {/* Gradient Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} mb-4 shadow-lg`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold text-ivoire mb-2 group-hover:text-doré transition-colors">
                        {option.title}
                      </h4>
                      
                      <p className="text-sm text-ivoire/60 group-hover:text-ivoire/80 transition-colors">
                        {option.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-doré opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-semibold">{tModal('selectButton')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Note */}
              <p className="text-center text-ivoire/50 text-sm mt-8">
                {tModal('note')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}