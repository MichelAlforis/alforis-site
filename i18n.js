// i18n.js
import { getRequestConfig } from 'next-intl/server';

import fr from './messages/fr.json';
import en from './messages/en.json';
import es from './messages/es.json';
import pt from './messages/pt.json';

const ALL = { fr, en, es, pt };

export const locales = ['fr', 'en', 'es', 'pt'];
export const defaultLocale = 'fr';

export default getRequestConfig(async ({locale}) => {
  console.log('i18n.js received locale:', locale);  // ← Ajoutez
  
  const safeLocale = locales.includes(locale) ? locale : defaultLocale;
  const messages = ALL[safeLocale] ?? ALL[defaultLocale];
  
  console.log('i18n.js selected locale:', safeLocale);  // ← Ajoutez
  console.log('i18n.js hero title:', messages.hero?.title);  // ← Ajoutez
  
  return {
    locale: safeLocale,
    messages
  };
});