import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['fr', 'en', 'es', 'pt'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: true
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Redirection intelligente pour /b2b sans locale
  if (pathname === '/b2b') {
    let targetLocale = 'fr';
    
    // 1. Priorité au cookie (préférence sauvegardée)
    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (preferredLocale && ['fr', 'en', 'es', 'pt'].includes(preferredLocale)) {
      targetLocale = preferredLocale;
    } else {
      // 2. Sinon, détecter la langue du navigateur
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const primaryLang = acceptLanguage.split(',')[0].split('-')[0];
        if (['fr', 'en', 'es', 'pt'].includes(primaryLang)) {
          targetLocale = primaryLang;
        }
      }
    }
    
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}/b2b`;
    return NextResponse.redirect(url);
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};