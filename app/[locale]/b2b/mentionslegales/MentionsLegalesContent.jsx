'use client'

import { useTranslations } from 'next-intl'

export default function MentionsLegalPage() {
  const t = useTranslations('mentionslegal')

  const Section = ({ id, children }) => (
    <section id={id} className="space-y-2">
      <h2 className="text-2xl font-semibold">{t(`${id}.title`)}</h2>
      {children}
    </section>
  )

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">{t('meta.title')}</h1>
        <p className="text-anthracite/80 mt-2">{t('meta.description')}</p>
      </header>

      <main className="max-w-4xl mx-auto bg-ivoire/90 dark:bg-acier/40 p-8 rounded-2xl shadow-xl space-y-8">
        <Section id="editor">
          <p>{t('editor.l1')}</p>
          <p>{t('editor.l2')}</p>
          <p>{t('editor.l3')}</p>
          <p>{t('editor.l4')}</p>
          <p>{t('editor.l5')}</p>
          <p>{t('editor.l6')}</p>
        </Section>

        <Section id="activity">
          <p>{t('activity.p1')}</p>
          <p>{t('activity.p2')}</p>
          <p>{t('activity.p3')}</p>
        </Section>

        <Section id="hosting">
          <p>{t('hosting.p1')}</p>
          <p>{t('hosting.p2')}</p>
          <p>{t('hosting.p3')}</p>
        </Section>

        <Section id="ip">
          <p>{t('ip.p1')}</p>
          <p>{t('ip.p2')}</p>
        </Section>

        <Section id="privacy">
          <p>{t('privacy.p1')}</p>
          <p>{t('privacy.p2')}</p>
          <p>{t('privacy.p3')}</p>
          <p>{t('privacy.p4')}</p>
        </Section>

        <Section id="liability">
          <p>{t('liability.p1')}</p>
          <p>{t('liability.p2')}</p>
          <p>{t('liability.p3')}</p>
        </Section>

        <Section id="links">
          <p>{t('links.p1')}</p>
        </Section>

        <Section id="law">
          <p>{t('law.p1')}</p>
        </Section>
      </main>
    </div>
  )
}
