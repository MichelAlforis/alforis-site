
// Layout.jsx modifié
'use client'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Head from 'next/head'

export default function Layout({ children }) {


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="site-layout min-h-screen flex flex-col">
        <Navbar />
        <div className="fixed inset-0 -z-10 bg-ivoire" />

        <main className="main-content flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
