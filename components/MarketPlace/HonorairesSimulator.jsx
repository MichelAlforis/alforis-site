import React, { useState } from 'react'

export default function HonorairesSimulator() {
  const [encours, setEncours] = useState('250000')
  const value = parseFloat(encours)
  const getFee = (pct) => ((value * pct) / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  return (
    <section className="px-6 py-12 bg-ivoire rounded-2xl shadow-md max-w-4xl mx-auto">
      <h3 className="text-3xl font-title text-ardoise mb-4">Simulation d’honoraires</h3>
      <p className="mb-6">Entrez votre encours :</p>
      <input
        type="number"
        value={encours}
        onChange={e => setEncours(e.target.value)}
        className="w-full md:w-1/2 p-2 border border-acier rounded mb-4"
      />
      <ul className="list-disc list-inside space-y-2">
        <li>0,90 % (&lt; 250 000 €) : {getFee(0.9)}</li>
        <li>0,60 % (250 000 €–1 M€) : {getFee(0.6)}</li>
        <li>0,40 % (&gt; 1 M€) : {getFee(0.4)}</li>
      </ul>
    </section>
  )
}

