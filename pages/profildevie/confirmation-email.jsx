'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ConfirmationEmail() {
  const router = useRouter();
  const { id } = router.query;
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function confirmEmail() {
      if (!id) return;
      try {
        const response = await fetch('/api/confirm-email', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setConfirmed(true);
        } else {
          console.error('Erreur lors de la confirmation.');
        }
      } catch (err) {
        console.error('Erreur réseau:', err);
      } finally {
        setLoading(false);
      }
    }

    confirmEmail();
  }, [id]);

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {confirmed ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Merci 🙏</h1>
          <p className="text-center text-muted">Votre email est confirmé. Nous reviendrons vers vous rapidement !</p>
        </>
      ) : (
        <p className="text-center text-red-500">Erreur lors de la confirmation.</p>
      )}
    </div>
  );
}
