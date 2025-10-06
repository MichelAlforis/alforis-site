'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import PageLayoutB2B from '@/components/pageB2B/PageLayoutB2B'
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    societe: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    
    try {
      const response = await fetch('/api/contact-b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ nom: '', prenom: '', email: '', telephone: '', societe: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Form error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayoutB2B
      title={t('hero.title')}
      mdTitle={t('hero.title')}
      description={t('hero.subtitle')}
      introHeight="12vh"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-ardoise via-anthracite to-acier text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-doré/20 border border-doré/50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-doré">{t('hero.badge')}</span>
          </div>
          <p className="text-base md:text-lg text-ivoire/70 max-w-3xl mx-auto">
            {t('hero.intro')}
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div>
              <h2 className="text-2xl font-title font-semibold text-ardoise dark:text-vertSauge mb-8">
                {t('form.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={t('form.prenom')}
                    className="px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  />
                  <input
                    type="text"
                    required
                    placeholder={t('form.nom')}
                    className="px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                <input
                  type="email"
                  required
                  placeholder={t('form.email')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder={t('form.telephone')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none"
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                />
                <input
                  type="text"
                  placeholder={t('form.societe')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none"
                  value={formData.societe}
                  onChange={(e) => setFormData({...formData, societe: e.target.value})}
                />
                <textarea
                  required
                  placeholder={t('form.message')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-acier/20 dark:border-acier/40 bg-ivoire dark:bg-anthracite text-ardoise dark:text-ivoire focus:border-doré outline-none resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-alforis-retro w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? t('form.sending') : t('form.submit')}</span>
                  <ChevronRight className="h-5 w-5" />
                </button>

                {status === 'success' && (
                  <div className="bg-vertSauge/10 border border-vertSauge rounded-lg p-4">
                    <p className="text-vertSauge text-sm">{t('form.success')}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{t('form.error')}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Coordonnées */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-title font-semibold text-ardoise dark:text-vertSauge mb-6">
                  {t('info.title')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-doré/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-doré" />
                    </div>
                    <div>
                      <p className="font-semibold text-ardoise dark:text-vertSauge">{t('info.phone')}</p>
                      <a href="tel:+33646462291" className="text-acier dark:text-ivoire/70 hover:text-doré">
                        +33 (0)6 46 46 22 91
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-doré/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-doré" />
                    </div>
                    <div>
                      <p className="font-semibold text-ardoise dark:text-vertSauge">{t('info.email')}</p>
                      <a href="mailto:michel.marques@alforis.fr" className="text-acier dark:text-ivoire/70 hover:text-doré">
                        michel.marques@alforis.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-doré/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-doré" />
                    </div>
                    <div>
                      <p className="font-semibold text-ardoise dark:text-vertSauge">{t('info.location')}</p>
                      <p className="text-acier dark:text-ivoire/70">
                        Paris • Luxembourg • Madrid • Lisbon
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-doré/10 to-vertSauge/10 dark:from-doré/20 dark:to-vertSauge/20 rounded-xl p-6 border-l-4 border-doré">
                <p className="text-sm text-anthracite dark:text-ivoire/80 italic">
                  {t('info.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayoutB2B>
  )
}