import React from 'react'
import PageLayout from '@/components/page/PageLayout'
import { pageConfig } from './page'

export default function BlogStudioLayout({ children }) {
 
  return (
    <PageLayout
      title={pageConfig.title}
      description={pageConfig.description}
      tabs={pageConfig.tabs}
    >
      {children}
    </PageLayout>
  )
}
