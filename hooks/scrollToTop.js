// hooks/scrollToTop.js
export function scrollToTop() {
  if (typeof window === 'undefined') return;

  // Désactive la restauration automatique du navigateur
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // Scroll du conteneur __next s’il existe, ou du document
  const root = document.getElementById('__next') ||
               document.scrollingElement ||
               document.documentElement;
  root.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
