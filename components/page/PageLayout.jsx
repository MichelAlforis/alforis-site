// components/PageLayout.jsx
'use client'
import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import HeaderFixed from './HeaderFixed';

export default function PageLayout({
  children,
  title,
  mdTitle,
  tabs,
  activeTab,
  onTabChange,
  description,
  showTabs = true, // <- nouveau
}) {
  return (
    <>
      <HeaderFixed
        title={title}
        mdTitle={mdTitle}
        description={description}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        showTabs={showTabs}   // <- passe la prop ici
      />
      <div id="PageLayoutG" className="flex-1">
        {children}
      </div>
    </>
  );
}
