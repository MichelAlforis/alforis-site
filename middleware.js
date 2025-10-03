import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['fr', 'en', 'es', 'pt'],
  
  // Langue par défaut
  defaultLocale: 'fr',
  
  // Toujours afficher la locale dans l'URL
  localePrefix: 'always'
});

export const config = {
  // Matcher pour toutes les routes sauf API, _next, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};