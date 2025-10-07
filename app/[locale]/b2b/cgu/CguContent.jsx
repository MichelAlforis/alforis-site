'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function CguContent() {
  const t = useTranslations('cgu')

  const Section = ({ id, children }) => (
    <section id={id} className="space-y-2">
      <h2 className="text-2xl font-semibold">{t(`${id}.title`)}</h2>
      {children}
    </section>
  )

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-anthracite min-h-screen py-8 px-4 pt-24"
    >
      <div className="max-w-4xl mx-auto bg-ivoire/90 dark:bg-acier/40 p-8 rounded-2xl shadow-xl space-y-8">

        <header className="mb-6">
          <h1 className="text-3xl font-bold">{t('meta.title')}</h1>
          <p className="text-anthracite/80 mt-2">{t('meta.description')}</p>
        </header>

        <Section id="object">
          <p>{t('object.p1')}</p>
          <p>{t('object.p2')}</p>
        </Section>

        <Section id="access">
          <p>{t('access.p1')}</p>
          <p>{t('access.p2')}</p>
        </Section>

        <Section id="use">
          <p>{t('use.p1')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('use.items.law')}</li>
            <li>{t('use.items.security')}</li>
            <li>{t('use.items.content')}</li>
          </ul>
        </Section>

        <Section id="responsibility">
          <p>{t('responsibility.p1')}</p>
          <p>{t('responsibility.p2')}</p>
        </Section>

        <Section id="links">
          <p>{t('links.p1')}</p>
        </Section>

        <Section id="ip">
          <p>{t('ip.p1')}</p>
          <p>{t('ip.p2')}</p>
        </Section>

        <Section id="data">
          <p>{t('data.p1')}</p>
          <p>{t('data.p2')}</p>
        </Section>

        <Section id="law">
          <p>{t('law.p1')}</p>
        </Section>
      </div>
    </motion.section>
  )
}
