'use client'
// app/mentionslegales/PageClient.jsx

import React, { useState } from 'react'
import PageLayout from '@/components/pageParticulier/PageLayout'           // ton layout global
import { pageConfig } from './pageConfig'                            // title, tabs, etc.
import ConfidentialiteContent from './ConfidentialiteContent'

export default function PageClient({ content }) {
  const [activeTab, setActiveTab] = useState(
    Array.isArray(pageConfig.tabs) && pageConfig.tabs.length > 0
      ? pageConfig.tabs[0].key
      : ''
  )
  return (
    <PageLayout
      title={pageConfig.title}
      description={pageConfig.description}
      tabs={pageConfig.tabs}
      activeTab={activeTab}           // ← on passe l’état au header
      onTabChange={setActiveTab}      // ← on passe le setter au header
      showTabs={pageConfig.showTabs}
    >
      <ConfidentialiteContent
        content={content}
        activeTab={activeTab}
        onTabChange={setActiveTab}    // ← et au contenu pour filtrer
      />
    </PageLayout>
  )
}
