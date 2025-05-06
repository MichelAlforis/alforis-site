export function scrollToTop() {
    const nextRoot = document.getElementById('__next')
    if (nextRoot && nextRoot.scrollTop > 10) {
      nextRoot.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
  
    console.log('[scrollToTop] fallback: window')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  