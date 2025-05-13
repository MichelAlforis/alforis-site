'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import AlforisHead from '@/components/AlforisHead'

export default function DesinscriptionPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [status, setStatus] = useState('pending') // pending | success | error

  useEffect(() => {
    async function unsubscribe() {
      if (!email) {
        setStatus('error')
        return
      }

      try {
        const response = await fetch('/api/desinscription', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })

        if (response.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (err) {
        setStatus('error')
      }
    }

    unsubscribe()
  }, [email])

  return (
    <>
    <AlforisHead title="ApprochePersonnalisee – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee." path="/index" />
    
    <main className="main-content min-h-screen flex items-center justify-center bg-ivoire p-8">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg space-y-6">
        
        {/* Icone dynamique */}
        {status === 'pending' && <Loader2 className="mx-auto animate-spin text-doré" size={48} />}
        {status === 'success' && <CheckCircle className="mx-auto text-green-500" size={48} />}
        {status === 'error' && <XCircle className="mx-auto text-red-500" size={48} />}

        {/* Texte dynamique */}
        {status === 'pending' && <p className="text-lg font-semibold">Traitement de votre demande...</p>}

        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold text-anthracite">Désinscription réussie 🎉</h1>
            <p className="text-muted">Vous avez été retiré de notre liste d'envoi.  
              Merci pour votre intérêt envers Alforis.</p>
            <p className="text-sm text-steel italic">
              Vous pouvez toujours revenir quand vous voulez 🚀
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-red-600">Erreur de traitement ❌</h1>
            <p className="text-muted">
              Impossible de trouver votre email ou de traiter votre demande.<br />
              Vérifiez votre lien ou contactez-nous.
            </p>
            <a href="/" className="inline-block mt-4 bg-doré text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition">
              Revenir à l'accueil
            </a>
          </>
        )}
      </div>
    </main>
    </>
  )
}
