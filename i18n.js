// i18n.js
import {getRequestConfig} from 'next-intl/server';

export const locales = ['fr', 'en', 'es', 'pt'];
export const defaultLocale = 'fr';

const namespaces = ['common', 'home', 'partenaires', 'ressources', 'solutions', 'contact','footer','mentionslegal','cgu','confidentialite'];

async function loadMessages(locale) {
  const messages = {};

  await Promise.all(
    namespaces.map(async (ns) => {
      try {
        const module = await import(`./messages/${locale}/${ns}.json`);
        // Vérifie que le module chargé n'est pas vide
        messages[ns] = module.default && typeof module.default === 'object' 
          ? module.default 
          : {};
      } catch (e) {
        console.warn(`[i18n] Manquant ou invalide: messages/${locale}/${ns}.json → fallback ${defaultLocale}`);
        
        // Fallback vers la locale par défaut
        if (locale !== defaultLocale) {
          try {
            const fallbackModule = await import(`./messages/${defaultLocale}/${ns}.json`);
            messages[ns] = fallbackModule.default && typeof fallbackModule.default === 'object'
              ? fallbackModule.default
              : {};
          } catch {
            messages[ns] = {};
          }
        } else {
          messages[ns] = {};
        }
      }
    })
  );

  return messages;
}

export default getRequestConfig(async ({locale}) => {
  const safe = locales.includes(locale) ? locale : defaultLocale;
  const messages = await loadMessages(safe);

  if (process.env.NODE_ENV !== 'production') {
    console.log('[i18n] locale demandée:', locale, '→ utilisée:', safe);
    console.log('[i18n] clés home disponibles:', Object.keys(messages.home || {}));
  }

  return {locale: safe, messages};
});