'use client'

import { useState } from 'react'

export default function ClapContent({ slug, profil, meta }) {
  const [count, setCount] = useState(meta.initialClaps || 0)

  const handleClap = async () => {
    // appel à votre API pour incrémenter le clap en base...
    await fetch(`/api/parcours/${slug}/clap`, {
      method: 'POST',
      body: JSON.stringify({ profil })
    })
    setCount(c => c + 1)
  }

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">Bravo pour ce parcours !</h1>
      <p>Profil : <strong>{profil}</strong></p>
      <button
        onClick={handleClap}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        👏 Clap ({count})
      </button>
    </div>
  )
}
