'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function CountriesSection({ extraClass = '' }) {
  const [activeCountry, setActiveCountry] = useState(null)

  const countries = [
    {
      code: 'FR',
      name: 'France',
      flag: '🇫🇷',
      description: 'Marché CGP & institutionnels exigeant conformité et pédagogie produit',
      highlights: ['CNCGP aligned', 'CGP networks', 'Institutional focus']
    },
    {
      code: 'LU',
      name: 'Luxembourg',
      flag: '🇱🇺',
      description: 'Hub paneuropéen, UCITS & private assets, point d\'ancrage international',
      highlights: ['UCITS expertise', 'Pan-European hub', 'Private assets']
    },
    {
      code: 'ES',
      name: 'Espagne',
      flag: '🇪🇸',
      description: 'Réseaux bancaires puissants, private banking et plateformes unit-linked',
      highlights: ['Banking networks', 'Private banking', 'Unit-linked platforms']
    },
    {
      code: 'PT',
      name: 'Portugal',
      flag: '🇵🇹',
      description: 'Marché agile, forte croissance des family offices et investisseurs privés',
      highlights: ['Family offices', 'Growth market', 'Private investors']
    }
  ]

  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4 text-ivoire">Zones couvertes</h2>
          <p className="text-ivoire/70 text-center mb-16 text-lg">4 marchés stratégiques en Europe</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                onHoverStart={() => setActiveCountry(country.code)}
                onHoverEnd={() => setActiveCountry(null)}
                className="bg-acier/30 backdrop-blur-sm p-6 rounded-2xl border-2 border-doré/20 hover:border-doré transition-all cursor-pointer"
              >
                <div className="text-6xl mb-4 text-center">{country.flag}</div>
                <h3 className="text-2xl font-bold mb-3 text-center text-doré">{country.name}</h3>
                <p className="text-ivoire/80 text-sm mb-6 text-center leading-relaxed">{country.description}</p>
                
                <div className="space-y-2">
                  {country.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ivoire/90">
                      <CheckCircle className="w-4 h-4 text-doré flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
