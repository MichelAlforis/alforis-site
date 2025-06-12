'use client'
// hooks/useControlledScrollSections.js

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * @file useControlledScrollSections.js
 * @summary Custom React hook for managing scrolling between designated sections within a page or container.
 * It supports keyboard (Arrow keys, PageUp/Down, Home, End), mouse wheel, and touch swipe navigation.
 * The hook respects the user's 'prefers-reduced-motion' setting for smoother or instant scrolling.
 * It provides callbacks for section changes, allowing parent components to manage focus or ARIA attributes.
 *
 * @exports useControlledScrollSections
 *
 * @param {string[]} sectionIds - Array of unique string IDs for each scrollable section.
 *   These IDs must correspond to actual DOM element IDs in your component.
 * @param {object} [options={}] - Optional configuration options for the hook.
 * @param {number} [options.cooldown=1000] - Minimum time in milliseconds between navigation actions
 *   (e.g., multiple scroll attempts).
 * @param {React.RefObject} [options.containerRef=null] - Optional React ref object pointing to a custom scrollable
 *   container element. If null or not provided, the hook defaults to using the `window` and `document.body`
 *   for scrolling, suitable for full-page section scrolling.
 * @param {number} [options.wheelThreshold=20] - The minimum absolute `deltaY` value from a mouse wheel event
 *   required to trigger a section change. Higher values make wheel scrolling less sensitive.
 * @param {number} [options.touchThreshold=30] - The minimum absolute vertical distance in pixels from a touch swipe
 *   event required to trigger a section change. Higher values make touch scrolling less sensitive.
 * @param {function(string, HTMLElement): void} [options.onSectionScrolled=() => {}] - Optional callback function
 *   that is invoked after a scroll to a new section is completed and the section becomes active.
 *   It receives two arguments:
 *   1. `sectionId` (string): The ID of the section that has just become active.
 *   2. `sectionElement` (HTMLElement): The DOM element corresponding to the active section.
 *   This callback can be used for managing focus, updating ARIA attributes, or other side effects.
 *   Example: `(sectionId, element) => { console.log(`Scrolled to ${sectionId}`); element.focus(); }`
 *
 * @returns {object} An API object with the following properties:
 * @property {string} currentSection - The ID of the currently active section.
 * @property {number} currentSectionIndex - The zero-based index of the currently active section
 *   in the `sectionIds` array.
 * @property {boolean} isScrolling - A boolean flag that is `true` if a scroll transition to another
 *   section is currently in progress, and `false` otherwise.
 * @property {function(number): void} goToSection - A function to programmatically scroll to a section
 *   by its index in the `sectionIds` array. Takes the target index as an argument.
 *   Example: `goToSection(2);` // Scrolls to the third section.
 * @property {function(): void} goToNextSection - A function to scroll to the next section in sequence.
 *   If the current section is the last one, this function does nothing.
 * @property {function(): void} goToPrevSection - A function to scroll to the previous section in sequence.
 *   If the current section is the first one, this function does nothing.
 *
 * @example
 * ```jsx
 * // In your React component:
 * import React, { useRef } from 'react';
 * import useControlledScrollSections from './useControlledScrollSections'; // Adjust path as needed
 *
 * const App = () => {
 *   const sectionIds = ['home', 'about', 'services', 'contact'];
 *   const appContainerRef = useRef(null); // Use if your sections are inside a specific scrollable div
 *
 *   const {
 *     currentSection,
 *     currentSectionIndex,
 *     isScrolling,
 *     goToSection,
 *     goToNextSection,
 *     goToPrevSection,
 *   } = useControlledScrollSections(sectionIds, {
 *     cooldown: 1200,
 *     wheelThreshold: 25,       // Slightly less sensitive wheel scroll
 *     touchThreshold: 35,       // Slightly less sensitive touch scroll
 *     // containerRef: appContainerRef, // Uncomment if using a custom scroll container like the div below
 *     onSectionScrolled: (sectionId, sectionElement) => {
 *       console.log(`Section "${sectionId}" (index ${sectionIds.indexOf(sectionId)}) is now active.`);
 *
 *       // For accessibility, manage focus. This is a basic example.
 *       // Ensure the sectionElement itself is focusable, or focus a specific interactive element within it.
 *       // If the section div isn't naturally focusable, add tabIndex="-1".
 *       sectionElement.focus();
 *
 *       // Note on ARIA:
 *       // ARIA attributes like role="region", aria-label, or aria-labelledby
 *       // should ideally be applied directly to your section elements in your JSX markup
 *       // to define their semantic meaning and relationships.
 *       // Example: <section id="home" role="region" aria-labelledby="home-heading" tabIndex="-1">
 *     }
 *   });
 *
 *   return (
 *     <>
 *       <nav>
 *         <button onClick={() => goToSection(0)} disabled={currentSectionIndex === 0}>Home</button>
 *         <button onClick={() => goToSection(1)} disabled={currentSectionIndex === 1}>About</button>
 *         <button onClick={() => goToSection(2)} disabled={currentSectionIndex === 2}>Services</button>
 *         <button onClick={() => goToSection(3)} disabled={currentSectionIndex === 3}>Contact</button>
 *         <button onClick={goToPrevSection} disabled={currentSectionIndex === 0}>Prev</button>
 *         <button onClick={goToNextSection} disabled={currentSectionIndex === sectionIds.length - 1}>Next</button>
 *       </nav>
 *       <p>Current Section: {currentSection} (Index: {currentSectionIndex})</p>
 *       <p>{isScrolling ? 'Scrolling...' : 'Idle'}</p>
 *
 *       {/* Example with a custom scroll container:
 *       <div ref={appContainerRef} style={{ overflowY: 'auto', height: '100vh', scrollSnapType: 'y mandatory' }}>
 *         {sectionIds.map((id, index) => (
 *           <section
 *             key={id}
 *             id={id}
 *             tabIndex="-1" // Make section focusable for the onSectionScrolled example
 *             aria-labelledby={`${id}-heading`}
 *             style={{ height: '100vh', scrollSnapAlign: 'start', border: '1px solid #ccc' }}
 *           >
 *             <h1 id={`${id}-heading`}>Section {index + 1}: {id.toUpperCase()}</h1>
 *             <p>Content for section {id}.</p>
 *           </section>
 *         ))}
 *       </div>
 *       */}
 *
 *       {/* Example for full-page scrolling (no containerRef needed): */}
 *       {sectionIds.map((id, index) => (
 *          <section
 *            key={id}
 *            id={id}
 *            tabIndex="-1"
 *            aria-labelledby={`${id}-heading`}
 *            style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #eee' }}
 *          >
 *            <h1 id={`${id}-heading`}>Section {index + 1}: {id.toUpperCase()}</h1>
 *            <p>This is the {id} section.</p>
 *            {currentSectionIndex === index && <p>(Active)</p>}
 *          </section>
 *        ))}
 *     </>
 *   );
 * };
 *
 * export default App;
 * ```
 */
export default function useControlledScrollSections(
  sectionIds,
  {
    cooldown = 1000,
    containerRef = null,
    wheelThreshold = 20,
    touchThreshold = 30,
    onSectionScrolled = () => {},
  } = {}
) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const touchStartY = useRef(null)
  const cooldownTimeout = useRef(null)

  // Determine the scroll container (window or custom ref)
  const getContainer = () => {
    if (containerRef && containerRef.current) return containerRef.current
    if (typeof window !== 'undefined') return window
    return null
  }

  // Scroll to a specific section index
  const goToSection = useCallback(
    (idx) => {
      if (idx < 0 || idx >= sectionIds.length) return
      const target = document.getElementById(sectionIds[idx])
      if (!target) return

      setIsScrolling(true)
      // Respects user's motion preference for smoother or instant scrolling.
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
        block: 'start',
      })
      setCurrentSectionIndex(idx)
      onSectionScrolled(sectionIds[idx], target) // Call the callback

      clearTimeout(cooldownTimeout.current)
      cooldownTimeout.current = setTimeout(
        () => setIsScrolling(false),
        cooldown
      )
    },
    [sectionIds, cooldown, onSectionScrolled] // Add onSectionScrolled to dependencies
  )

  const goToNextSection = useCallback(
    () => goToSection(currentSectionIndex + 1),
    [currentSectionIndex, goToSection]
  )

  const goToPrevSection = useCallback(
    () => goToSection(currentSectionIndex - 1),
    [currentSectionIndex, goToSection]
  )

  useEffect(() => {
    const container = getContainer()
    if (!container || typeof window === 'undefined') return

    const handleWheel = (e) => {
      if (isScrolling) return
      // Threshold to avoid micro scrolls
      if (e.deltaY > wheelThreshold) {
        e.preventDefault()
        goToNextSection()
      } else if (e.deltaY < -wheelThreshold) {
        e.preventDefault()
        goToPrevSection()
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isScrolling || touchStartY.current == null) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (delta > touchThreshold) goToNextSection()
      else if (delta < -touchThreshold) goToPrevSection()
      touchStartY.current = null
    }

    const eventTarget = container === window ? document : container

    const handleKeyDown = (e) => {
      if (isScrolling) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          goToNextSection()
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goToPrevSection()
          break
        case 'Home':
          e.preventDefault()
          goToSection(0)
          break
        case 'End':
          e.preventDefault()
          goToSection(sectionIds.length - 1)
          break
        default:
          break
      }
    }

    eventTarget.addEventListener('wheel', handleWheel, { passive: false })
    eventTarget.addEventListener('touchstart', handleTouchStart, { passive: true })
    eventTarget.addEventListener('touchend', handleTouchEnd, { passive: false })
    eventTarget.addEventListener('keydown', handleKeyDown)

    return () => {
      eventTarget.removeEventListener('wheel', handleWheel)
      eventTarget.removeEventListener('touchstart', handleTouchStart)
      eventTarget.removeEventListener('touchend', handleTouchEnd)
      eventTarget.removeEventListener('keydown', handleKeyDown)
      clearTimeout(cooldownTimeout.current)
    }
  }, [
    isScrolling,
    goToNextSection,
    goToPrevSection,
    containerRef,
    goToSection,
    sectionIds, // Added sectionIds because sectionIds.length is used in handleKeyDown
    wheelThreshold,
    touchThreshold,
  ])

  return {
    currentSection: sectionIds[currentSectionIndex],
    currentSectionIndex,
    isScrolling,
    goToSection,
    goToNextSection,
    goToPrevSection,
  }
}
