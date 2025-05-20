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
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <HeaderFixed
        title={title}
        mdTitle={mdTitle}
        description={description}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        showTabs={showTabs}   // <- passe la prop ici
      />
      <main id="scroll-container" className="main-content no-nav-padding flex-1 px-4 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
}
