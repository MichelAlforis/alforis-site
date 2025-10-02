// hooks/usePaddingTop.js
import { useState, useLayoutEffect } from 'react';

/**
 * Hook that returns the header height (paddingTop) including extra pt-2 (8px), measured once on initial render.
 * Detects the <header> element directly to handle dynamic mobile/tablet/desktop heights.
 */
export default function usePaddingTop() {
  const [paddingTop, setPaddingTop] = useState(0);

  useLayoutEffect(() => {
    // Select the header element (with class site-header or any header)
    const headerEl = document.querySelector('header.site-header') || document.querySelector('header');
    const height = headerEl ? headerEl.offsetHeight : 0;
    // Add 8px (Tailwind pt-2) for top spacing
    setPaddingTop(height + 8);
  }, []);

  return paddingTop;
}
