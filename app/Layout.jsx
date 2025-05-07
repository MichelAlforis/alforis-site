'use client'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import ScrollManager from '@/components/animated/ScrollManager'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import { useRef } from 'react'

export default function Layout({ children }) {
  const layoutRef = useRef(null)
  return (
    <>
      <div ref={layoutRef} id="site-layout" className="site-layout min-h-screen flex flex-col bg-ivoire">
        <Navbar />
        <main className="flex-1 pt-16">
        <ScrollManager />
        <MobileScrollProgress containerRef={layoutRef} />
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
