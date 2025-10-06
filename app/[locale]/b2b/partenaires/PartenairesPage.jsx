'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import PageLayoutB2B from '@/components/b2b/PageLayoutB2B'
import { CheckCircle, Handshake, Shield, Target, TrendingUp, Award, FileCheck, MessageSquare, ClipboardCheck, Rocket, ChevronRight, Phone, ArrowRight } from 'lucide-react'
import CalComButtonB2B from '@/components/b2b/CalComButtonB2B'

export default function PartenairesPage() {
  const t = useTranslations('partenaires')

  const pillars = ['selectivity', 'alignment', 'independence']
  const criteria = ['ucits', 'aum', 'philosophy', 'marketing', 'commitment']
  const onboardingSteps = ['initial', 'review', 'compliance', 'contract', 'launch']

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

      {/* Notre philosophie de partenariat */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('philosophy.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('philosophy.subtitle')}
            </p>
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
                    {t(`philosophy.pillars.${pillar}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-anthracite dark:text-ivoire/80 leading-relaxed">
                    {t(`philosophy.pillars.${pillar}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-doré/10 to-vertSauge/10 dark:from-doré/20 dark:to-vertSauge/20 rounded-2xl p-8 border-l-4 border-doré">
            <p className="text-base md:text-lg text-anthracite dark:text-ivoire/80 italic text-center">
              {t('philosophy.quote')}
            </p>
          </div>
        </div>
      </section>

      {/* Critères d'éligibilité */}
      <section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('eligibility.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('eligibility.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {criteria.map((criterion, idx) => {
              const icons = [FileCheck, TrendingUp, Award, ClipboardCheck, Handshake]
              const Icon = icons[idx]
              return (
                <div key={criterion} className="bg-white dark:bg-anthracite/80 rounded-xl p-6 md:p-8 border-l-4 border-vertSauge hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-vertSauge/10 dark:bg-vertSauge/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-vertSauge" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-title font-bold text-ardoise dark:text-vertSauge mb-2">
                        {t(`eligibility.criteria.${criterion}.title`)}
                      </h3>
                      <p className="text-sm md:text-base text-anthracite dark:text-ivoire/70 leading-relaxed">
                        {t(`eligibility.criteria.${criterion}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-acier dark:text-ivoire/60 italic bg-white dark:bg-anthracite/60 rounded-lg p-6 max-w-3xl mx-auto">
              {t('eligibility.note')}
            </p>
          </div>
        </div>
      </section>

      {/* Processus d'onboarding */}
      <section className="py-16 md:py-24 bg-white dark:bg-anthracite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-title font-semibold text-ardoise dark:text-vertSauge mb-4">
              {t('onboarding.title')}
            </h2>
            <p className="text-lg md:text-xl text-acier dark:text-ivoire/80 max-w-3xl mx-auto">
              {t('onboarding.subtitle')}
            </p>
          </div>

          {/* Timeline horizontale pour desktop */}
          <div className="hidden md:block max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-doré via-vertSauge to-doré"></div>
              
              <div className="grid grid-cols-5 gap-4">
                {onboardingSteps.map((step, idx) => {
                  const icons = [MessageSquare, ClipboardCheck, Shield, FileCheck, Rocket]
                  const Icon = icons[idx]
                  return (
                    <div key={step} className="relative">
                      <div className="flex flex-col items-center mb-6">
                        <div className="bg-white dark:bg-anthracite border-4 border-doré w-24 h-24 rounded-full flex items-center justify-center mb-4 relative z-10">
                          <Icon className="h-10 w-10 text-doré" />
                        </div>
                        <span className="bg-doré text-white px-3 py-1 rounded-full text-sm font-bold">
                          {t(`onboarding.steps.${step}.number`)}
                        </span>
                      </div>
                      
                      <div className="bg-ivoire dark:bg-acier/20 rounded-xl p-6 text-center">
                        <h3 className="text-base font-title font-bold text-ardoise dark:text-vertSauge mb-3">
                          {t(`onboarding.steps.${step}.title`)}
                        </h3>
                        <p className="text-xs text-anthracite dark:text-ivoire/70 leading-relaxed">
                          {t(`onboarding.steps.${step}.desc`)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Version mobile */}
          <div className="md:hidden space-y-6 max-w-2xl mx-auto">
            {onboardingSteps.map((step, idx) => {
              const icons = [MessageSquare, ClipboardCheck, Shield, FileCheck, Rocket]
              const Icon = icons[idx]
              return (
                <div key={step} className="bg-ivoire dark:bg-acier/20 rounded-xl p-6 border-l-4 border-doré">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-doré/10 dark:bg-doré/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-doré" />
                    </div>
                    <div className="flex-1">
                      <span className="bg-doré text-white px-2 py-1 rounded-full text-xs font-bold">
                        {t(`onboarding.steps.${step}.number`)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-title font-bold text-ardoise dark:text-vertSauge mb-3">
                    {t(`onboarding.steps.${step}.title`)}
                  </h3>
                  <p className="text-sm text-anthracite dark:text-ivoire/70 leading-relaxed">
                    {t(`onboarding.steps.${step}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Témoignage / Logos */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-ardoise via-anthracite to-ardoise text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-title font-bold mb-4 text-doré">
              {t('testimonial.title')}
            </h2>
            <p className="text-lg text-ivoire/80">{t('testimonial.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-acier/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-doré/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-doré/20 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-8 w-8 text-doré" />
                </div>
                <div>
                  <p className="text-lg md:text-xl text-ivoire italic leading-relaxed mb-4">
                    "{t('testimonial.quote')}"
                  </p>
                  <p className="text-sm text-vertSauge font-semibold">
                    {t('testimonial.author')}
                  </p>
                  <p className="text-xs text-ivoire/60">
                    {t('testimonial.position')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-ivoire/60 mb-6">{t('testimonial.partners')}</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {Array.from({ length: 3 }, (_, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-doré/20">
                    <div className="w-32 h-12 flex items-center justify-center text-ivoire/40 text-xs">
                      Partner {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}

<section className="py-16 md:py-24 bg-ivoire dark:bg-ardoise/50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl md:text-4xl font-title font-bold mb-6 text-ardoise dark:text-vertSauge">
      {t('cta.title')}
    </h2>
    
    <p className="text-xl mb-4 text-acier dark:text-ivoire/80">{t('cta.subtitle')}</p>
    <p className="text-base mb-8 text-anthracite dark:text-ivoire/70">{t('cta.description')}</p>

    <div className="bg-white dark:bg-anthracite/80 rounded-2xl p-8 border-2 border-doré/20 mb-8">
      <h3 className="text-lg font-title font-bold text-ardoise dark:text-vertSauge mb-4">
        {t('cta.process.title')}
      </h3>
      <ul className="space-y-3 text-left max-w-2xl mx-auto">
        {Array.from({ length: 4 }, (_, idx) => (
          <li key={idx} className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-vertSauge flex-shrink-0 mt-0.5" />
            <span className="text-sm text-anthracite dark:text-ivoire/70">
              {t(`cta.process.steps.${idx}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <CalComButtonB2B type="partnership" />
    </div>

    <p className="text-sm italic text-acier dark:text-ivoire/60 mt-8">
      {t('cta.commitment')}
    </p>
  </div>
</section>
    </PageLayoutB2B>
  )
}