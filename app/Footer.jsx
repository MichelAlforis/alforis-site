'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ardoise text-ivoire py-12 px-6 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + baseline */}
        <div>
          <h3 className="text-2xl font-title font-bold mb-3 text-doré">Alforis</h3>
          <p className="text-sm font-light text-vertSauge max-w-xs">
            Le patrimoine commence par l’humain.
          </p>
        </div>

        {/* Mentions + contact */}
        <div className="flex flex-col text-sm text-vertSauge md:col-start-3 md:items-end text-right">
          <p className="mb-2">&copy; {new Date().getFullYear()} Alforis. Tous droits réservés.</p>
          <Link href="/mentionslegales" className="hover:text-doré mb-1">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-doré mb-1">Politique de confidentialité</Link>
          <Link href="/faq" className="hover:text-doré mb-1">FAQ du Patrimoine</Link>
          <a href="mailto:michel.marques@alforis.fr" className="hover:text-doré">michel.marques@alforis.fr</a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex gap-4 mt-4 text-doré md:col-span-3">
          <a href="https://www.linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M4.98 3.5C4.98 5.43 3.43 7 1.5 7S-2 5.43-2 3.5 0.57 0 2.5 0 4.98 1.57 4.98 3.5zM0 8h5v16H0V8zm7 0h4.66v2.34h.06c.65-1.23 2.23-2.54 4.59-2.54 4.91 0 5.81 3.23 5.81 7.43V24h-5v-7.61c0-1.82-.03-4.15-2.53-4.15-2.53 0-2.92 1.98-2.92 4.02V24h-5V8z"/>
            </svg>
          </a>

          <a href="https://www.youtube.com/@alforis" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5">
              <path d="M549.655 124.083C534.322 81.068 491.515 64 432.3 64H143.7C84.485 64 41.678 81.068 26.345 124.083 16 156.417 16 256 16 256s0 99.583 10.345 131.917C41.678 430.932 84.485 448 143.7 448h288.6c59.215 0 101.922-17.068 117.255-60.083C560 355.583 560 256 560 256s0-99.583-10.345-131.917zM232 336V176l142 80-142 80z"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/alforis" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="w-5 h-5">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 190.6c-41.8 0-75.7-33.9-75.7-75.7s33.9-75.7 75.7-75.7 75.7 33.9 75.7 75.7-33.9 75.7-75.7 75.7zm146.4-194.3c0 14.9-12 27-27 27-14.9 0-27-12-27-27s12-27 27-27 27 12.1 27 27zm76.1 27.2c-.9-19.6-5.2-37-18.1-50.9s-31.3-17.2-50.9-18.1c-20.1-1.1-80.4-1.1-100.5 0-19.6.9-37 5.2-50.9 18.1s-17.2 31.3-18.1 50.9c-1.1 20.1-1.1 80.4 0 100.5.9 19.6 5.2 37 18.1 50.9s31.3 17.2 50.9 18.1c20.1 1.1 80.4 1.1 100.5 0 19.6-.9 37-5.2 50.9-18.1s17.2-31.3 18.1-50.9c1.1-20.1 1.1-80.4 0-100.5z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
