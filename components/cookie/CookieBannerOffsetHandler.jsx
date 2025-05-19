'use client'
import { useEffect } from 'react'

export default function CookieBannerOffsetHandler({ onChange }) {
  useEffect(() => {
    let resizeObs = null

    const reportHeight = () => {
      const ccBanner = document.querySelector('.cc-window')
      const height = ccBanner?.offsetHeight ?? 0
      onChange?.(height)
    }

    const observeBanner = () => {
      const ccBanner = document.querySelector('.cc-window')
      if (!ccBanner) {
        onChange?.(0)
        return
      }

      reportHeight()

      if (resizeObs) resizeObs.disconnect()

      if (typeof ResizeObserver !== 'undefined') {
        resizeObs = new ResizeObserver(() => reportHeight())
        resizeObs.observe(ccBanner)
      }
    }

    const domObs = new MutationObserver(() => {
      const ccBanner = document.querySelector('.cc-window')
      if (!ccBanner) {
        onChange?.(0)
        if (resizeObs) resizeObs.disconnect()
      } else {
        observeBanner()
      }
    })

    domObs.observe(document.body, { childList: true, subtree: true })

    if (typeof window !== 'undefined') {
      // CookieConsent event handling
      window.addEventListener('cookieconsent:allow', handleConsent)
      window.addEventListener('cookieconsent:deny', handleConsent)

      // Initial check
      window.addEventListener('resize', reportHeight)
      setTimeout(observeBanner, 150)
    }

    function handleConsent() {
      onChange?.(0)
      if (resizeObs) resizeObs.disconnect()
    }

    return () => {
      domObs.disconnect()
      if (resizeObs) resizeObs.disconnect()

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', reportHeight)
        window.removeEventListener('cookieconsent:allow', handleConsent)
        window.removeEventListener('cookieconsent:deny', handleConsent)
      }
    }
  }, [onChange])

  return null
}
