'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { MailX, CheckCircle, AlertCircle, Loader2, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UnsubscribePage() {
  const t = useTranslations('unsubscribe')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error' | 'invalid'
  const [email, setEmail] = useState('')
  const [tokenEmail, setTokenEmail] = useState('')
  const [validatingToken, setValidatingToken] = useState(true)

  // Vérifier le token au chargement
  useEffect(() => {
    if (token) {
      validateToken(token)
    } else {
      setValidatingToken(false)
    }
  }, [token])

  const validateToken = async (tokenValue) => {
    try {
      const response = await fetch(`/api/unsubscribe?token=${tokenValue}`)
      const data = await response.json()

      if (data.valid) {
        setTokenEmail(data.email)
        setEmail(data.email)
      } else {
        setStatus('invalid')
      }
    } catch (error) {
      console.error('Token validation error:', error)
      setStatus('invalid')
    } finally {
      setValidatingToken(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          email: email
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  // États de chargement
  if (validatingToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ardoise via-anthracite to-acier flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-doré animate-spin mx-auto mb-4" />
          <p className="text-ivoire/70">{t('loading.validating')}</p>
        </div>
      </div>
    )
  }

  // Token invalide
  if (status === 'invalid') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ardoise via-anthracite to-acier flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-anthracite rounded-2xl shadow-premium p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-title font-semibold text-ardoise dark:text-ivoire mb-4">
            {t('invalid.title')}
          </h1>
          <p className="text-acier dark:text-ivoire/70 mb-8">
            {t('invalid.message')}
          </p>
          <Link
            href={`/${locale}/b2b`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-doré hover:bg-doré/90 text-white rounded-lg transition-all duration-300 hover:shadow-glow-doré"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('footer.backHome')}
          </Link>
        </div>
      </div>
    )
  }

  // Succès
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ardoise via-anthracite to-acier flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-anthracite rounded-2xl shadow-premium p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-soft">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-title font-semibold text-ardoise dark:text-ivoire mb-4">
            {t('success.title')}
          </h1>
          <p className="text-acier dark:text-ivoire/70 mb-2">
            {t('success.message')}
          </p>
          <p className="text-sm text-acier/70 dark:text-ivoire/50 mb-8">
            {email}
          </p>
          <div className="bg-ivoire/50 dark:bg-ardoise/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-acier dark:text-ivoire/70">
              {t('success.note')}
            </p>
          </div>
          <Link
            href={`/${locale}/b2b`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-doré hover:bg-doré/90 text-white rounded-lg transition-all duration-300 hover:shadow-glow-doré"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('footer.backHome')}
          </Link>
        </div>
      </div>
    )
  }

  // Erreur
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ardoise via-anthracite to-acier flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-anthracite rounded-2xl shadow-premium p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-title font-semibold text-ardoise dark:text-ivoire mb-4">
            {t('error.title')}
          </h1>
          <p className="text-acier dark:text-ivoire/70 mb-8">
            {t('error.message')}
          </p>
          <button
            onClick={() => {
              setStatus(null)
              setLoading(false)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-doré hover:bg-doré/90 text-white rounded-lg transition-all duration-300 hover:shadow-glow-doré"
          >
            {t('error.retryButton')}
          </button>
        </div>
      </div>
    )
  }

  // Formulaire de désabonnement
  return (
    <div className="min-h-screen bg-gradient-to-br from-ardoise via-anthracite to-acier flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-anthracite rounded-2xl shadow-premium p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-doré/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MailX className="w-8 h-8 text-doré" />
          </div>
          <h1 className="text-3xl font-title font-semibold text-ardoise dark:text-ivoire mb-3">
            {t('header.title')}
          </h1>
          <p className="text-acier dark:text-ivoire/70">
            {t('header.subtitle')}
          </p>
        </div>

        {/* Informations */}
        <div className="bg-ivoire/50 dark:bg-ardoise/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-acier dark:text-ivoire/70">
            {t('info.message')}
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ardoise dark:text-ivoire mb-2"
            >
              {t('form.emailLabel')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-acier/50" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={tokenEmail && loading}
                placeholder={t('form.emailPlaceholder')}
                className="w-full pl-10 pr-4 py-3 bg-ivoire/50 dark:bg-ardoise/20 border border-acier/20 dark:border-ivoire/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-doré/50 focus:border-doré transition-all duration-300 text-ardoise dark:text-ivoire placeholder:text-acier/50"
              />
            </div>
            {tokenEmail && (
              <p className="mt-2 text-xs text-acier/70 dark:text-ivoire/50">
                {t('form.emailHint')}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3 px-6 bg-doré hover:bg-doré/90 disabled:bg-acier/50 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow-doré disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('form.submitting')}
              </>
            ) : (
              <>
                <MailX className="w-5 h-5" />
                {t('form.submitButton')}
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-acier/20 dark:border-ivoire/10 text-center">
          <p className="text-sm text-acier dark:text-ivoire/70 mb-4">
            {t('footer.changed')}
          </p>
          <Link
            href={`/${locale}/b2b`}
            className="inline-flex items-center gap-2 text-sm text-doré hover:text-doré/80 font-medium transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('footer.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
