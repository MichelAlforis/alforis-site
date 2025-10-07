// utils/cookieConsent.js
export const openCookieSettings = () => {
  if (typeof window === 'undefined') return;
  
  if (window.cc_popup?.revokeChoice) {
    window.cc_popup.revokeChoice();
  } else {
    setTimeout(() => {
      if (window.cc_popup?.revokeChoice) {
        window.cc_popup.revokeChoice();
      }
    }, 300);
  }
};