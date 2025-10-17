import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt']

const intlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: true
})

export default function middleware(request) {
  const url = request.nextUrl
  const { pathname } = url

  // Bypass CRM subdomain requests (no locale handling)
  if (url.hostname?.startsWith('crm.alforis.fr')) {
    return NextResponse.next()
  }

  // 0) Bypass assets & API
  const isAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    /\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|css|js|map|woff2?)$/i.test(pathname)

  if (isAsset) return NextResponse.next()

  // NOUVEAU : Exclure /particulier et /shared de l'i18n
  if (pathname.startsWith('/particulier') || pathname.startsWith('/shared')) {
    return NextResponse.next()
  }

  // 1) TPM-first : première visite → /fr/b2b + cookie
  if (pathname === '/') {
    const choice = request.cookies.get('alforis-client-type')?.value
    if (!choice) {
      const dest = url.clone()
      dest.pathname = '/fr/b2b'
      const res = NextResponse.redirect(dest, 302)
      res.cookies.set('alforis-client-type', 'b2b', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production'
      })
      return res
    }
  }

  // 2) /b2b sans locale → /{locale}/b2b (301)
  if (pathname === '/b2b') {
    let targetLocale = 'fr'

    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (preferredLocale && SUPPORTED_LOCALES.includes(preferredLocale)) {
      targetLocale = preferredLocale
    } else {
      const acceptLanguage = request.headers.get('accept-language') || ''
      const primaryLang = acceptLanguage.split(',')[0].split('-')[0]
      if (SUPPORTED_LOCALES.includes(primaryLang)) {
        targetLocale = primaryLang
      }
    }

    const dest = url.clone()
    dest.pathname = `/${targetLocale}/b2b`
    const res = NextResponse.redirect(dest, 301)
    res.cookies.set('alforis-client-type', 'b2b', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production'
    })
    return res
  }

  // 3) Le reste : déléguer à next-intl
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
