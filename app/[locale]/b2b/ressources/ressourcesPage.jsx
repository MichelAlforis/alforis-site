'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import PageLayoutB2B from '@/components/b2b/PageLayoutB2B'
import CalComButtonB2B from '@/components/b2b/CalComButtonB2B'
import { 
  Download, 
  FileText, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  ExternalLink,
  MapPin,
  Clock,
  Newspaper,
  Shield,
  BarChart3,
  FileCheck,
  Users,
  Award,
  Mail,
  AlertCircle
} from 'lucide-react'

export default function RessourcesPage() {
  const t = useTranslations('ressources')
  const tCommon = useTranslations('common')
  const [openFaq, setOpenFaq] = useState(null)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonType, setComingSoonType] = useState('')

  // Configuration : activer quand les documents sont prêts
  const DOCUMENTS_AVAILABLE = false
  const PRESS_ARTICLES_AVAILABLE = false

  const documents = [
    { key: 'capabilities', icon: FileText, size: '2.4 MB', pages: 12, url: '/documents/capabilities.pdf' },
    { key: 'onepager', icon: FileCheck, size: '850 KB', pages: 1, url: '/documents/onepager.pdf' },
    { key: 'reporting', icon: BarChart3, size: '450 KB', pages: 2, url: '/documents/reporting.pdf' },
    { key: 'checklist', icon: CheckCircle, size: '320 KB', pages: 3, url: '/documents/checklist.pdf' },
    { key: 'vendor', icon: Shield, size: '1.8 MB', pages: 8, url: '/documents/vendor.pdf' },
    { key: 'compliance', icon: Award, size: '680 KB', pages: 4, url: '/documents/compliance.pdf' }
  ]

  const events = [
    { 
      key: 'patrimonia', 
      date: '2025-10-15', 
      location: 'Lyon', 
      type: 'salon',
      registrationUrl: 'https://www.patrimonia.fr'
    },
    { 
      key: 'fundspeople', 
      date: '2025-11-20', 
      location: 'Lisbonne', 
      type: 'conference',
      registrationUrl: 'https://www.fundspeople.com'
    },
    { 
      key: 'parisff', 
      date: '2025-12-10', 
      location: 'Paris', 
      type: 'forum',
      registrationUrl: 'https://www.parisfundforum.com'
    },
    { 
      key: 'iberian', 
      date: '2026-02-05', 
      location: 'Madrid', 
      type: 'summit',
      registrationUrl: 'https://www.iberiansummit.com'
    }
  ]

  const faqItems = ['tpm', 'remuneration', 'timelines', 'marketing']

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const handleDocumentClick = (doc) => {
    if (DOCUMENTS_AVAILABLE) {
      // Télécharger le document
      window.open(doc.url, '_blank')
    } else {
      // Afficher modal "Bientôt disponible"
      setComingSoonType('document')
      setShowComingSoon(true)
    }
  }

  const handleEventRegister = (event) => {
    // Ouvrir la page d'inscription de l'événement
    window.open(event.registrationUrl, '_blank')
  }

  const handleCalendarClick = () => {
    // Rediriger vers la page de planification (Cal.com ou autre)
    window.open('https://cal.com/alforis', '_blank')
  }

  const handleContactClick = () => {
    // Rediriger vers la page contact
    window.location.href = '/b2b/contact'
  }

  const handlePressArticleClick = (idx) => {
    if (PRESS_ARTICLES_AVAILABLE) {
      // Ouvrir l'article (URL à récupérer depuis les traductions si besoin)
      window.open('#', '_blank')
    } else {
      setComingSoonType('article')
      setShowComingSoon(true)
    }
  }

  const handleAllPressClick = () => {
    if (PRESS_ARTICLES_AVAILABLE) {
      window.location.href = '/presse'
    } else {
      setComingSoonType('article')
      setShowComingSoon(true)
    }
  }

  const handleRequestDocument = () => {
    // Rediriger vers contact avec pré-remplissage
    window.location.href = '/contact?sujet=demande-documents'
  }

  // Textes de la modal en fonction de la langue
  const getModalContent = () => {
    if (comingSoonType === 'document') {
      return {
        title: t('modal.document.title', { defaultValue: 'Documents en préparation' }),
        description: t('modal.document.description', { 
          defaultValue: 'Nos documents sont actuellement en cours de finalisation. Vous pouvez nous contacter pour recevoir une version préliminaire.' 
        }),
        close: tCommon('buttons.close', { defaultValue: 'Fermer' }),
        contact: tCommon('buttons.contact', { defaultValue: 'Nous contacter' })
      }
    } else {
      return {
        title: t('modal.article.title', { defaultValue: 'Articles à venir' }),
        description: t('modal.article.description', { 
          defaultValue: 'Nos articles de presse seront bientôt disponibles. Revenez prochainement !' 
        }),
        close: tCommon('buttons.close', { defaultValue: 'Fermer' }),
        contact: null
      }
    }
  }

  const modalContent = getModalContent()

  return (
    <PageLayoutB2B
      title={t('hero.title')}
      mdTitle={t('hero.title')}
      description={t('hero.subtitle')}
      introHeight="12vh"
    >
      {/* Modal "Bientôt disponible" */}
      {showComingSoon && (
        <div 
          className="fixed inset-0 bg-anthracite/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <div 
            className="bg-white dark:bg-anthracite rounded-2xl p-8 max-w-md w-full border-2 border-doré shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="bg-doré/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-doré" />
              </div>
              <h3 className="text-2xl font-title font-bold text-ardoise dark:text-vertSauge mb-3">
                {modalContent.title}
              </h3>
              <p className="text-acier dark:text-ivoire/70 mb-6">
                {modalContent.description}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-acier/30 text-acier dark:text-ivoire/70 hover:bg-acier/10 transition-colors"
                >
                  {modalContent.close}
                </button>
                {modalContent.contact && (
                  <button
                    onClick={handleRequestDocument}
                    className="flex-1 btn-alforis-primary"
                  >
                    {modalContent.contact}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ardoise via-anthracite to-acier text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-doré/20 border border-doré/50 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold text-doré">{t('hero.badge')}</span>
            </div>
            <p className="text-base md:text-lg text-ivoire/70 max-w-3xl mx-auto">
              {t('hero.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Documents téléchargeables */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('documents.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('documents.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <div 
                  key={doc.key}
                  onClick={() => handleDocumentClick(doc)}
                  className="bg-ivoire dark:bg-acier/20 rounded-xl p-6 border-2 border-doré/20 hover:border-doré/50 hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                >
                  {!DOCUMENTS_AVAILABLE && (
                    <div className="absolute top-3 right-3 bg-doré/90 text-ardoise text-xs font-bold px-2 py-1 rounded-full">
                      {t('status.comingSoon', { defaultValue: 'Bientôt' })}
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-doré/10 dark:bg-doré/20 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-doré" />
                    </div>
                    <div className="bg-vertSauge/10 dark:bg-vertSauge/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Download className="h-5 w-5 text-vertSauge" />
                    </div>
                  </div>

                  <h3 className="text-lg font-title font-bold text-ardoise dark:text-vertSauge mb-2">
                    {t(`documents.items.${doc.key}.title`)}
                  </h3>
                  <p className="text-sm text-anthracite dark:text-ivoire/70 mb-4 leading-relaxed">
                    {t(`documents.items.${doc.key}.desc`)}
                  </p>

                  <div className="flex items-center justify-between text-xs text-acier dark:text-ivoire/60">
                    <span>PDF · {doc.size}</span>
                    <span>{doc.pages} {t('documents.pages')}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-acier dark:text-ivoire/60 italic bg-ivoire dark:bg-acier/20 rounded-lg p-6 max-w-3xl mx-auto">
              {DOCUMENTS_AVAILABLE 
                ? t('documents.note')
                : t('documents.notAvailable', { 
                    defaultValue: '📋 Documents en cours de finalisation. Contactez-nous pour recevoir une version préliminaire adaptée à vos besoins.' 
                  })}
            </p>
          </div>
        </div>
      </section>

      {/* Calendrier & Événements */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('events.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('events.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {events.map((event) => (
              <div 
                key={event.key}
                className="bg-white dark:bg-anthracite/80 rounded-xl p-6 md:p-8 border-l-4 border-doré hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-doré/10 dark:bg-doré/20 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-doré" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-title font-bold text-ardoise dark:text-vertSauge">
                          {t(`events.items.${event.key}.name`)}
                        </h3>
                        <span className="text-xs text-vertSauge font-semibold uppercase">
                          {t(`events.types.${event.type}`)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm md:text-base text-anthracite dark:text-ivoire/70 mb-4">
                      {t(`events.items.${event.key}.desc`)}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-acier dark:text-ivoire/60">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleEventRegister(event)}
                    className="btn-alforis-outline flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <Users className="h-4 w-4" />
                    <span>{t('events.cta')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={handleCalendarClick}
              className="btn-alforis-retro inline-flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>{t('events.mainCta')}</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ TPM */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div 
                  key={item}
                  className="bg-ivoire dark:bg-acier/20 rounded-xl border-2 border-doré/20 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-doré/5 dark:hover:bg-doré/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-doré/10 dark:bg-doré/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-5 w-5 text-doré" />
                      </div>
                      <h3 className="text-base md:text-lg font-title font-bold text-ardoise dark:text-vertSauge">
                        {t(`faq.items.${item}.question`)}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-doré flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-doré flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-14">
                        <p className="text-sm md:text-base text-anthracite dark:text-ivoire/70 leading-relaxed">
                          {t(`faq.items.${item}.answer`)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-acier dark:text-ivoire/60 mb-4">
              {t('faq.moreQuestions')}
            </p>
            <button 
              onClick={handleContactClick}
              className="btn-alforis-outline inline-flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>{t('faq.contactCta')}</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Presse & Publications */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-ardoise via-anthracite to-ardoise text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-title font-bold mb-4 text-doré">
              {t('press.title')}
            </h2>
            <p className="text-lg text-ivoire/80 max-w-3xl mx-auto">
              {PRESS_ARTICLES_AVAILABLE 
                ? t('press.subtitle')
                : t('press.subtitleComingSoon', { 
                    defaultValue: 'Nos articles de presse seront bientôt disponibles. Restez connectés !' 
                  })}
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }, (_, idx) => (
              <div 
                key={idx}
                onClick={() => handlePressArticleClick(idx)}
                className="bg-acier/20 backdrop-blur-sm rounded-xl p-6 border border-doré/20 hover:border-doré/50 hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
              >
                {!PRESS_ARTICLES_AVAILABLE && (
                  <div className="absolute top-3 right-3 bg-doré/90 text-ardoise text-xs font-bold px-2 py-1 rounded-full">
                    {t('status.comingSoon', { defaultValue: 'Bientôt' })}
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-doré/20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-doré" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-ivoire/40 group-hover:text-doré transition-colors" />
                </div>

                <h3 className="text-lg font-title font-bold text-ivoire mb-2 group-hover:text-doré transition-colors">
                  {t(`press.articles.${idx}.title`)}
                </h3>
                <p className="text-sm text-ivoire/70 mb-4">
                  {t(`press.articles.${idx}.excerpt`)}
                </p>
                
                <div className="flex items-center justify-between text-xs text-ivoire/50">
                  <span>{t(`press.articles.${idx}.source`)}</span>
                  <span>{t(`press.articles.${idx}.date`)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={handleAllPressClick}
              className="btn-alforis-retro inline-flex items-center space-x-2"
            >
              <Newspaper className="h-5 w-5" />
              <span>{t('press.cta')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-title font-bold mb-6 text-ardoise dark:text-vertSauge">
            {t('finalCta.title')}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-acier dark:text-ivoire/80">
            {t('finalCta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalComButtonB2B type="info" />
          </div>
        </div>
      </section>
    </PageLayoutB2B>
  )
}