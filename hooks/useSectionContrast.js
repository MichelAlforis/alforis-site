// hooks/useSectionContrast.js
'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * useSectionContrast
 * Renvoie true si la section visible sous la navbar est "dark" (fond sombre → logo clair).
 *
 * Options:
 * - scrollRootSelectors: ordre de recherche du conteneur de scroll (sinon viewport)
 * - thresholds: seuils de l'IntersectionObserver
 * - watchDom: ré-attache en cas de mutations DOM (pages dynamiques)
 * - fallback: fonction booléenne si aucune section data-contrast n'est trouvée
 * - excludeHeaderOverride: bool ou fn(pathname) pour désactiver l’override header (ex: home B2B)
 */
export default function useSectionContrast({
  scrollRootSelectors = ['[data-scroll-root]', '#home-b2b-main', '#home-main'],
  thresholds = [0.2, 0.4, 0.6, 0.8],
  watchDom = true,
  fallback = null,
  excludeHeaderOverride = (pathname) => false,
} = {}) {
  const pathname = usePathname()
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    let io = null
    let mo = null
    let raf = 0
    let cancelled = false
    let cleanupScroll = null
    let currentContrast = 'light'

    // ----- helpers -----
    const headerOverrideDisabled =
      typeof excludeHeaderOverride === 'function'
        ? !!excludeHeaderOverride(pathname)
        : !!excludeHeaderOverride

    // Retourne un conteneur VRAIMENT scrollable si présent, sinon null (viewport)
    const getRootEl = () => {
      for (const sel of scrollRootSelectors) {
        const el = sel && document.querySelector(sel)
        if (!el) continue
        const cs = getComputedStyle(el)
        const scrollable =
          (cs.overflowY === 'auto' || cs.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        if (scrollable) return el
      }
      return null // viewport
    }

    const getSections = () =>
      Array.from(document.querySelectorAll('section[data-contrast]'))

    // Source de padding: l’élément marqué data-scroll-root (même s’il ne scrolle pas),
    // sinon rootEl si distinct du viewport, sinon <body>.
    const getPadSource = (rootEl) =>
      document.querySelector('[data-scroll-root]') ||
      (rootEl && rootEl !== document.scrollingElement ? rootEl : null)

    const getHeaderPad = (rootEl) => {
      if (headerOverrideDisabled) return 0
      const padSource = getPadSource(rootEl)
      const style = padSource ? getComputedStyle(padSource) : getComputedStyle(document.body)
      const pad = parseInt(style.paddingTop || '0', 10)
      return Number.isFinite(pad) ? pad + 4 : 0 // petit buffer anti-flicker
    }

    // Applique la logique "sous header clair" puis contraste de section
    const applyContrast = (rootEl) => {
      const scrollTop =
        rootEl && rootEl !== document.scrollingElement ? rootEl.scrollTop : window.scrollY
      const headerPad = getHeaderPad(rootEl)

      if (headerOverrideDisabled) {
        setOnDark(currentContrast === 'dark')
        return
      }
      if (scrollTop < headerPad) {
        // sous le header ivoire → logo foncé
        setOnDark(false)
      } else {
        setOnDark(currentContrast === 'dark')
      }
    }

    // ----- attach -----
    const attach = () => {
      if (cancelled) return

      const rootEl = getRootEl()
      const sections = getSections()

      // Si pas encore de sections, on retente au prochain frame (et on pose éventuellement un fallback)
      if (sections.length === 0) {
        if (typeof fallback === 'function') setOnDark(!!fallback())
        raf = requestAnimationFrame(attach)
        return
      }

      // Premier passage: tenir compte du header dès maintenant
      applyContrast(rootEl)

      // Observe les sections
      io = new IntersectionObserver(
        (entries) => {
          const vis = entries.filter((e) => e.isIntersecting)
          if (!vis.length) return
          const top = vis.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          currentContrast = top.target.getAttribute('data-contrast') || 'light'
          applyContrast(rootEl)
        },
        {
          root: rootEl ?? null, // viewport si null
          rootMargin: '0px 0px 0px 0px',
          thresholds,
          // NB: certains navigateurs utilisent "threshold" (singulier). On passe via param "thresholds" ci-dessus.
        }
      )

      sections.forEach((s) => io.observe(s))

      // Bascule précise au franchissement du "coussin" header
      const onScroll = () => applyContrast(rootEl)
      if (rootEl) rootEl.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })

      cleanupScroll = () => {
        if (rootEl) rootEl.removeEventListener('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
      }
    }

    attach()

    // ----- MutationObserver (optionnel) -----
    if (watchDom) {
      mo = new MutationObserver(() => {
        if (cancelled) return
        const sections = getSections()
        if (sections.length === 0) return
        if (io) io.disconnect()
        if (cleanupScroll) cleanupScroll()
        attach()
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    // ----- cleanup -----
    return () => {
      cancelled = true
      if (io) io.disconnect()
      if (cleanupScroll) cleanupScroll()
      if (mo) mo.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return onDark // true = fond sombre → logo clair
}
