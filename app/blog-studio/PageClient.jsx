// app/blog-studio/PageClient.jsx
'use client'

import React, { useState, useEffect } from 'react'
import PageLayout from '@/components/page/PageLayout'           // ton layout global
import { pageConfig } from './pageConfig'                            // title, tabs, etc.
import BlogStudioContent from './BlogStudioContent'

export default function PageClient({ content }) {
  const [activeTab, setActiveTab] = useState('All')

  // debug : tu verras bien ce log à chaque changement d’onglet
  useEffect(() => {
    console.log('PageClient activeTab:', activeTab)
  }, [activeTab])

  return (
    <PageLayout
      title={pageConfig.title}
      description={pageConfig.description}
      tabs={pageConfig.tabs}
      activeTab={activeTab}           // ← on passe l’état au header
      onTabChange={setActiveTab}      // ← on passe le setter au header
    >
      <BlogStudioContent
        content={content}
        activeTab={activeTab}
        onTabChange={setActiveTab}    // ← et au contenu pour filtrer
      />
    </PageLayout>
  )
}
