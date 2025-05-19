'use client'
// components/PageLayout.jsx
import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import HeaderFixed from './HeaderFixed';

export default function PageLayout({
 children,
 title,
 tabs,
 activeTab,
 onTabChange,
 description,
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
           <HeaderFixed
              title={title}
              description={description}
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
      <main className="main-content no-nav-padding flex-1 px-4 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
}