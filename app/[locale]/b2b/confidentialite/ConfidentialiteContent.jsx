'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function ConfidentialiteContent() {
  const t = useTranslations('confidentialite')

  const Block = ({ id, children }) => (
    <section id={id} className="space-y-2">
      <h2 className="text-2xl font-semibold">{t(`${id}.title`)}</h2>
      {children}
    </section>
  )

  const P = ({ k }) => <p>{t(k)}</p>

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-anthracite min-h-screen py-8 px-4 pt-24"
    >
      <div className="max-w-4xl mx-auto bg-ivoire/90 dark:bg-acier/40 p-8 rounded-2xl shadow-xl space-y-8">
        <Block id="intro">
          <P k="intro.p1" />
        </Block>

        <Block id="controller">
          <P k="controller.p1" />
          <P k="controller.p2" />
        </Block>

        <Block id="purposes">
          <ul className="list-disc list-inside space-y-1">
            <li>{t('purposes.items.lead')}</li>
            <li>{t('purposes.items.meeting')}</li>
            <li>{t('purposes.items.b2b')}</li>
            <li>{t('purposes.items.security')}</li>
            <li>{t('purposes.items.analytics')}</li>
          </ul>
        </Block>

        <Block id="legalBases">
          <ul className="list-disc list-inside space-y-1">
            <li>{t('legalBases.items.consent')}</li>
            <li>{t('legalBases.items.contract')}</li>
            <li>{t('legalBases.items.legit')}</li>
            <li>{t('legalBases.items.legal')}</li>
          </ul>
        </Block>

        <Block id="recipients">
          <P k="recipients.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('recipients.items.hosting')}</li>
            <li>{t('recipients.items.crm')}</li>
            <li>{t('recipients.items.emailing')}</li>
            <li>{t('recipients.items.analytics')}</li>
          </ul>
          <P k="recipients.p2" />
        </Block>

        <Block id="retention">
          <P k="retention.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('retention.items.prospect')}</li>
            <li>{t('retention.items.client')}</li>
            <li>{t('retention.items.legal')}</li>
            <li>{t('retention.items.security')}</li>
          </ul>
        </Block>

        <Block id="security">
          <P k="security.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('security.items.access')}</li>
            <li>{t('security.items.encryption')}</li>
            <li>{t('security.items.monitoring')}</li>
            <li>{t('security.items.contract')}</li>
          </ul>
        </Block>

        <Block id="cookies">
          <P k="cookies.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('cookies.items.technical')}</li>
            <li>{t('cookies.items.analytics')}</li>
            <li>{t('cookies.items.preference')}</li>
          </ul>
          <P k="cookies.p2" />
        </Block>

        <Block id="transfers">
          <P k="transfers.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('transfers.items.adequacy')}</li>
            <li>{t('transfers.items.scc')}</li>
            <li>{t('transfers.items.consent')}</li>
          </ul>
        </Block>

        <Block id="rights">
          <P k="rights.p1" />
          <ul className="list-disc list-inside space-y-1">
            <li>{t('rights.items.access')}</li>
            <li>{t('rights.items.rectification')}</li>
            <li>{t('rights.items.erasure')}</li>
            <li>{t('rights.items.object')}</li>
            <li>{t('rights.items.portability')}</li>
            <li>{t('rights.items.restriction')}</li>
          </ul>
          <P k="rights.p2" />
        </Block>

        <Block id="complaints">
          <P k="complaints.p1" />
        </Block>

        <Block id="minors">
          <P k="minors.p1" />
        </Block>

        <Block id="changes">
          <P k="changes.p1" />
        </Block>

        <Block id="contact">
          <P k="contact.p1" />
        </Block>
      </div>
    </motion.section>
  )
}
