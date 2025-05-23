// components/PageLayout.jsx
'use client';

import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import HeaderFixed from './HeaderFixed';
import usePaddingTop from '@/hooks/usePaddingTop';

/**
 * PageLayout: wrapper centralisé pour les pages Alforis
 * - Gère padding-top dynamique via hook
 * - Expose une largeur max (maxWidth) paramétrable
 * - Applique un padding horizontal uniforme
 * - Utilise <div> pour éviter la duplication de <main>
 */
export default function PageLayout({
  children,
  title,
  mdTitle,
  description,
  tabs,
  activeTab,
  onTabChange,
  showTabs = true,
  // Contrôle de la largeur max du contenu
  maxWidth = 'max-w-xl md:max-w-2xl lg:max-w-3xl',
}) {
  const paddingTop = usePaddingTop();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ paddingTop }}
    >
      <HeaderFixed
        title={title}
        mdTitle={mdTitle}
        description={description}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        showTabs={showTabs}
      />
      <div
        id="PageLayoutG"
        className={`flex-1 w-full mx-auto ${maxWidth} px-2 md:px-4 mt-2 md:mt-4`}
      >
        {children}
      </div>
    </div>
  );
}
