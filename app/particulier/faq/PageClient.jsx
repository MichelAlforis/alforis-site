// app/blog-studio/PageClient.jsx
'use client'

import React, { useState, useEffect } from 'react'
import PageLayout from '@/components/pageParticulier/PageLayout'           // ton layout global
import { pageConfig } from './pageConfig'                            // title, tabs, etc.
import FaqContent from './FaqContent'

export default function PageClient({ content }) {
  const [activeTab, setActiveTab] = useState(pageConfig.tabs[0]?.key || '')

  return (
    <PageLayout
      title={pageConfig.title}
      description={pageConfig.description}
      tabs={pageConfig.tabs}
      activeTab={activeTab}           // ← on passe l’état au header
      onTabChange={setActiveTab}      // ← on passe le setter au header
      showTabs={pageConfig.showTabs}
    >
      <FaqContent
        content={content}
        activeTab={activeTab}
        onTabChange={setActiveTab}    // ← et au contenu pour filtrer
      />
    </PageLayout>
  )
}
