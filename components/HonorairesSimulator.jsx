'use client'

import React, { useState } from 'react'
import { couleurs } from '@/public/styles/generated-colors'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'
import Image from 'next/image'
import Button from './ui/Button'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Formatter monétaire FR
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

export default function HonorairesModal() {
  const [encours, setEncours] = useState(250_000)
  const [show, setShow] = useState(false)

  // Calcul du pourcentage selon barème
  const pct = encours < 250_000 ? 0.9 : encours < 1_000_000 ? 0.6 : 0.4
  const honoraires = (encours * pct) / 100
  const reste = encours - honoraires

  const data = [
    { name: 'Honoraires', value: honoraires },
    { name: 'Capital restant', value: reste },
  ]

  return (
    <>
      {/* IMAGE ILLUSTRATIVE */}
      <div className="mt-16 text-center">
        <div className="hidden sm:block mx-auto mb-8 max-w-lg">
          <Image
            src="/assets/img/marketplace/lordenargent_simul.webp"
            alt="Simulation d’honoraires"
            width={1200}
            height={675}
            quality={80}
            loading="lazy"
            decoding="async"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        <button
          onClick={() => setShow(true)}
          className="inline-flex items-center gap-2 bg-doré text-ardoise font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition"
        >
          Lancer ma simulation
        </button>
      </div>

      {/* MODALE */}
      <AnimatePresence>
        {show && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Conteneur modale */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* En-tête */}
                <div className="flex items-center justify-between bg-doré px-6 py-4">
                  <h2 className="text-xl font-semibold text-ardoise flex items-center gap-2">
                    Simulation d’honoraires <Info size={20} className="text-ardoise/70" />
                  </h2>
                  <button onClick={() => setShow(false)}>
                    <X size={24} className="text-ardoise hover:text-ardoise/70" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Données graphiques */}
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        innerRadius="60%"
                        outerRadius="80%"
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                      >
                        <Cell fill={couleurs.doré}/>   {/* doré */}
                        <Cell fill={couleurs.ivoire} />   {/* ivoire clair */}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Valeurs + curseur */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-acier">
                      <span>Capital investi</span>
                      <span className="font-medium">{currencyFormatter.format(encours)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={2_000_000}
                      step={50_000}
                      value={encours}
                      onChange={(e) => setEncours(+e.target.value)}
                      className="w-full h-2 bg-ardoise/20 rounded-lg accent-doré cursor-pointer"
                    />

                    <label className="block text-sm text-acier">
                      Ou saisissez un montant :
                      <input
                        type="number"
                        min={0}
                        max={2_000_000}
                        step={1_000}
                        value={encours}
                        onChange={(e) => setEncours(+e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-ardoise/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-doré"
                      />
                    </label>
                  </div>

                  {/* Résultat */}
                  <div className="text-center">
                    <p className="text-sm text-acier">Honoraires estimés</p>
                    <p className="mt-1 text-2xl font-bold text-doré">
                      {currencyFormatter.format(honoraires)}
                    </p>
                    <p className="mt-2 text-xs text-ardoise/70">
                      ({pct}% du montant investi)
                    </p>
                  </div>

                  {/* Bouton de fermeture */}
                  <button
                    onClick={() => setShow(false)}
                    className="w-full bg-ardoise text-white font-semibold py-2 rounded-2xl shadow hover:bg-ardoise/90 transition"
                  >
                    Fermer la simulation
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
