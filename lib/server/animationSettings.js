export const animationSettings = {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    overlay: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.8, ease: 'easeOut' },
      viewport: { once: true, amount: 0.5 }
    },
    brutToPrecis: {
      initial: { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
    slideHorizontal: {
      initial: { opacity: 0, x: 100 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    typeform: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 },
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    revealZoom: {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  }

