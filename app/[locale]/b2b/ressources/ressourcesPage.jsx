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
  Award
} from 'lucide-react'

export default function RessourcesPage() {
  const t = useTranslations('ressources')
  const [openFaq, setOpenFaq] = useState(null)

  const documents = [
    { key: 'capabilities', icon: FileText, size: '2.4 MB', pages: 12 },
    { key: 'onepager', icon: FileCheck, size: '850 KB', pages: 1 },
    { key: 'reporting', icon: BarChart3, size: '450 KB', pages: 2 },
    { key: 'checklist', icon: CheckCircle, size: '320 KB', pages: 3 },
    { key: 'vendor', icon: Shield, size: '1.8 MB', pages: 8 },
    { key: 'compliance', icon: Award, size: '680 KB', pages: 4 }
  ]

  const events = [
    { key: 'patrimonia', date: '2025-10-15', location: 'Lyon', type: 'salon' },
    { key: 'fundspeople', date: '2025-11-20', location: 'Lisbonne', type: 'conference' },
    { key: 'parisff', date: '2025-12-10', location: 'Paris', type: 'forum' },
    { key: 'iberian', date: '2026-02-05', location: 'Madrid', type: 'summit' }
  ]

  const faqItems = ['tpm', 'remuneration', 'timelines', 'marketing']

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  return (
    <PageLayoutB2B
      title={t('hero.title')}
      mdTitle={t('hero.title')}
      description={t('hero.subtitle')}
      introHeight="12vh"
    >
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
                  className="bg-ivoire dark:bg-acier/20 rounded-xl p-6 border-2 border-doré/20 hover:border-doré/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
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
              {t('documents.note')}
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

                  <button className="btn-alforis-outline flex items-center justify-center space-x-2 whitespace-nowrap">
                    <Users className="h-4 w-4" />
                    <span>{t('events.cta')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="btn-alforis-retro inline-flex items-center space-x-2">
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
            <button className="btn-alforis-outline inline-flex items-center space-x-2">
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
              {t('press.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }, (_, idx) => (
              <div 
                key={idx}
                className="bg-acier/20 backdrop-blur-sm rounded-xl p-6 border border-doré/20 hover:border-doré/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
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
            <button className="btn-alforis-retro inline-flex items-center space-x-2">
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