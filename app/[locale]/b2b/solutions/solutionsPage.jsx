'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import PageLayoutB2B from '@/components/pageB2B/PageLayoutB2B'
import { CheckCircle, Handshake, Shield, Target, TrendingUp, Award, Users, BarChart3, ChevronRight, Phone, Download } from 'lucide-react'

export default function SolutionsPage() {
  const t = useTranslations('solutions')

  const pillars = ['selectivity', 'alignment', 'independence']
  const profiles = ['boutiques', 'specialists', 'emerging']
  const phases = ['foundation', 'acceleration', 'maturity']

  return (
    <PageLayoutB2B
      title={t('hero.title')}
      mdTitle={t('hero.title')}
      description={t('hero.subtitle')}
      introHeight="12vh"
    >
{/* Hero Section */}
<section className="bg-gradient-to-br from-ardoise via-anthracite to-acier text-white py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block bg-doré/20 border border-doré/50 rounded-full px-4 py-2 mb-6">
        <span className="text-sm font-semibold text-doré">{t('hero.badge')}</span>
      </div>
      {/* RETIRE le h1 et le p subtitle - ils sont déjà dans le header */}
      <p className="text-base md:text-lg text-ivoire/80 leading-relaxed">
        {t('hero.intro')}
      </p>
    </div>
  </div>
</section>

      {/* Partnership Vision */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('partnership.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80">{t('partnership.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const icons = [Handshake, Target, Shield]
              const Icon = icons[idx]
              return (
                <div key={pillar} className="bg-ivoire dark:bg-acier/20 rounded-2xl p-8 border-2 border-doré/20 hover:border-doré/50 hover:shadow-xl transition-all duration-300">
                  <div className="bg-doré/10 dark:bg-doré/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-doré" />
                  </div>
                  <h3 className="text-xl font-title font-bold text-ardoise dark:text-vertSauge mb-4">
                    {t(`partnership.pillars.${pillar}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-anthracite dark:text-ivoire/80 leading-relaxed">
                    {t(`partnership.pillars.${pillar}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('ideal.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80">{t('ideal.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, idx) => {
              const icons = [TrendingUp, Award, Users]
              const Icon = icons[idx]
              return (
                <div key={profile} className="bg-white dark:bg-anthracite/80 rounded-2xl p-8 border-l-4 border-vertSauge hover:shadow-lg transition-shadow">
                  <Icon className="h-10 w-10 text-vertSauge mb-4" />
                  <h3 className="text-xl font-title font-bold text-ardoise dark:text-vertSauge mb-4">
                    {t(`ideal.profiles.${profile}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-anthracite dark:text-ivoire/80 leading-relaxed">
                    {t(`ideal.profiles.${profile}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section id="engagement" className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('engagement.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80">{t('engagement.subtitle')}</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {phases.map((phase) => (
              <div key={phase} className="bg-gradient-to-r from-ivoire to-doré/5 dark:from-acier/20 dark:to-doré/10 rounded-2xl p-6 md:p-8 border-l-4 border-doré shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-doré text-ivoire px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                    {t(`engagement.phases.${phase}.tag`)}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-title font-bold text-ardoise dark:text-vertSauge mb-2">
                      {t(`engagement.phases.${phase}.title`)}
                    </h3>
                    <p className="text-sm text-acier dark:text-ivoire/60 italic mb-4">
                      {t(`engagement.phases.${phase}.objectives`)}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-vertSauge flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-anthracite dark:text-ivoire/70">
                        {t(`engagement.phases.${phase}.deliverables.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('how.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80">{t('how.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {Array.from({ length: 4 }, (_, idx) => (
              <div key={idx} className="bg-white dark:bg-anthracite/80 rounded-xl p-6 border-2 border-transparent hover:border-doré/30 transition-all">
                <h3 className="text-lg font-title font-bold text-ardoise dark:text-vertSauge mb-3">
                  {t(`how.practices.${idx}.title`)}
                </h3>
                <p className="text-sm text-anthracite dark:text-ivoire/70 leading-relaxed">
                  {t(`how.practices.${idx}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section id="results" className="py-16 md:py-24 bg-gradient-to-br from-ardoise via-anthracite to-ardoise text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-bold mb-4 text-doré">
              {t('results.title')}
            </h2>
            <p className="text-lg md:text-xl text-ivoire/80">{t('results.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {Array.from({ length: 5 }, (_, idx) => (
              <div key={idx} className="flex items-start space-x-4 bg-acier/20 backdrop-blur-sm rounded-xl p-6 border border-doré/20">
                <BarChart3 className="h-6 w-6 text-doré flex-shrink-0 mt-1" />
                <p className="text-base md:text-lg text-ivoire leading-relaxed">
                  {t(`results.milestones.${idx}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('cases.title')}
            </h2>
            <p className="text-lg text-acier dark:text-ivoire/70">{t('cases.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 2 }, (_, idx) => (
              <div key={idx} className="bg-ivoire dark:bg-acier/20 rounded-2xl p-8 border-l-4 border-vertSauge">
                <h3 className="text-lg font-bold text-vertSauge mb-4">
                  {t(`cases.items.${idx}.type`)}
                </h3>
                <div className="space-y-3 text-sm text-anthracite dark:text-ivoire/80">
                  <p>
                    <strong className="text-ardoise dark:text-vertSauge">Défi:</strong> {t(`cases.items.${idx}.challenge`)}
                  </p>
                  <p>
                    <strong className="text-ardoise dark:text-vertSauge">Approche:</strong> {t(`cases.items.${idx}.approach`)}
                  </p>
                  <p className="bg-vertSauge/10 dark:bg-vertSauge/20 p-4 rounded-lg border-l-2 border-vertSauge">
                    <strong className="text-vertSauge">Résultats:</strong> {t(`cases.items.${idx}.results`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-acier dark:text-ivoire/80">{t('pricing.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {['retainer', 'success'].map((model) => (
              <div key={model} className="bg-white dark:bg-anthracite/80 rounded-xl p-8 border-2 border-doré/20">
                <h3 className="text-xl font-title font-bold text-ardoise dark:text-vertSauge mb-3">
                  {t(`pricing.model.${model}.title`)}
                </h3>
                <p className="text-sm text-anthracite dark:text-ivoire/70 mb-4">
                  {t(`pricing.model.${model}.desc`)}
                </p>
                <p className="text-lg font-bold text-doré">
                  {t(`pricing.model.${model}.amount`)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm italic text-acier dark:text-ivoire/60 bg-white dark:bg-anthracite/60 rounded-lg p-6">
            {t('pricing.model.note')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-12 text-center">
            {t('faq.title')}
          </h2>

          <div className="space-y-6">
            {Array.from({ length: 4 }, (_, idx) => (
              <div key={idx} className="bg-ivoire dark:bg-acier/20 rounded-xl p-6 border-l-4 border-doré">
                <h3 className="text-lg font-bold text-ardoise dark:text-vertSauge mb-3">
                  {t(`faq.items.${idx}.q`)}
                </h3>
                <p className="text-sm text-anthracite dark:text-ivoire/70 leading-relaxed">
                  {t(`faq.items.${idx}.a`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-ardoise via-acier to-ardoise text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-title font-bold mb-6 text-doré">
            {t('cta.title')}
          </h2>
          
          <p className="text-xl mb-4 text-ivoire/90">{t('cta.subtitle')}</p>
          <p className="text-base mb-6 text-ivoire/70">{t('cta.process')}</p>
          <p className="text-sm italic text-ivoire/60 mb-10">{t('cta.commitment')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-alforis-retro flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
              <Phone className="h-5 w-5" />
              <span>{t('cta.btn')}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <button className="btn-alforis-outline flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
              <Download className="h-5 w-5" />
              <span>{t('cta.alternative')}</span>
            </button>
          </div>
        </div>
      </section>
    </PageLayoutB2B>
  )
}