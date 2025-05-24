'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function AProposMobile() {
  return (
    <div className="flex flex-col">
      {/* Intro plein écran */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/img/me-mobile.png')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-base flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-ivoire leading-snug">
            Michel Marques
          </h1>
          <p className="mt-4 font-sans text-lg md:text-2xl text-ivoire/90">
            Une approche humaine et premium du conseil patrimonial
          </p>
        </div>
      </section>

      {/* Scroll 1 – Accroche animée */}
      <section className="bg-ivoire py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-anthracite text-center"
        >
          Et si le conseil patrimonial devenait profondément humain ?
        </motion.h2>
      </section>

      {/* Scroll 2 – Blocs narratifs */}
      <section className="bg-ivoire px-4 py-16 space-y-12">
        {/* Ma vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-ivoire/90 rounded-lg border border-anthracite/20"
        >
          <h3 className="font-semibold text-2xl mb-2">Ma vision</h3>
          <p>
            Convaincu que chaque trajectoire de vie mérite une attention
            singulière, j’ai placé au cœur de ma démarche une approche
            introspective et profondément humaine. Chaque conseil est conçu
            sur mesure, avec un soin particulier accordé à l’écoute et à la
            compréhension des besoins réels de mes clients.
          </p>
        </motion.div>

        {/* Mon parcours professionnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 bg-ivoire/90 rounded-lg border border-anthracite/20"
        >
          <h3 className="font-semibold text-2xl mb-2">Mon parcours professionnel</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Bilans patrimoniaux spécifiques :</strong> analyse détaillée
              et précise des actifs et des objectifs à atteindre.
            </li>
            <li>
              <strong>Conseil stratégique :</strong> optimisation fiscale,
              succession, investissements personnalisés.
            </li>
            <li>
              <strong>Tarification transparente :</strong> entre 0,4 % et 0,9 %
              selon les encours gérés.
            </li>
          </ul>
        </motion.div>

        {/* Méthode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-ivoire/90 rounded-lg border border-anthracite/20"
        >
          <h3 className="font-semibold text-2xl mb-2">Une méthode unique</h3>
          <p>
            Le concept de « design de trajectoire de vie » est l’ADN d’Alforis :
            modéliser et visualiser clairement les choix possibles pour mes
            clients, les guidant vers des décisions sereines et informées.
          </p>
          <p className="mt-3">
            Grâce à des outils innovants (Airtable, parcours digitaux
            interactifs, intégrations personnalisées), je rends la gestion
            patrimoniale plus accessible, humaine et agréable.
          </p>
        </motion.div>

        {/* Mes engagements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 bg-ivoire/90 rounded-lg border border-anthracite/20"
        >
          <h3 className="font-semibold text-2xl mb-2">Mes engagements</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Excellence et discrétion :</strong> accompagnement discret
              et rigoureux.
            </li>
            <li>
              <strong>Innovation constante :</strong> toujours à la pointe des
              nouvelles pratiques.
            </li>
            <li>
              <strong>Transparence et intégrité :</strong> conseils en toute
              indépendance, sans conflits d’intérêts.
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Scroll 3 – Logo & signature */}
      <section className="relative bg-ardoise flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Remplacez par votre SVG animé */}
          <svg width="120" height="120" viewBox="0 0 100 100" className="stroke-doré fill-transparent">
            <motion.path
              d="M10,80 L50,20 L90,80 Z"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 font-handwriting text-2xl text-doré"
        >
          Michel Marques
        </motion.p>
      </section>

      {/* Scroll 4 – Call to Action */}
      <section className="bg-ivoire py-16 px-4 text-center">
        <p className="mb-6 text-lg text-anthracite">
          Je vous reçois dans un cadre premium et serein. Prenons rendez-vous
          dès aujourd’hui pour construire ensemble votre trajectoire de vie.
        </p>
        <a
          href="/prendre-rendez-vous"
          className="inline-block px-8 py-4 font-semibold border-2 border-doré rounded-full hover:shadow-lg transition-shadow"
        >
          Découvrir l’approche Alforis
        </a>
      </section>
    </div>
  )
}
