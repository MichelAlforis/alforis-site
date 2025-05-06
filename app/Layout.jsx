'use client'
import Head from 'next/head'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import ScrollManager from '@/components/animated/ScrollManager'


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="site-layout min-h-screen flex flex-col bg-ivoire">
        <Navbar />
        <main className="flex-1 pt-16">
        <ScrollManager />
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
