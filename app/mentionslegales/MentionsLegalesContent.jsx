'use client'
/* app/mentions-legales/MentionsLegalesContent.jsx */


import { useState, useEffect } from 'react'
import Animated from '@/components/animated/Animated'
import { motion } from 'framer-motion'
import CallToAction from '@/components/ui/CallToAction'

export default function MentionsLegalesContent() {
    // état thème jour/nuit
    const [dark, setDark] = useState(false)
    useEffect(() => {
      document.documentElement.classList.toggle('dark', dark)
    }, [dark])

  return (
    <Animated.Page>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="main-content bg-ivoire text-anthracite dark:bg-acier/80 text-ivoire py-16 px-6"
      >
        <div className="max-w-4xl mx-auto bg-ivoire bg-opacity-90 dark:bg-opacity-40 p-8 rounded-2xl shadow-xl space-y-8">

          {/* Éditeur */}
          <section>
            <h2>Éditeur du site</h2>
            <p>Alforis Finance, SAS au capital de 5 000 €</p>
            <p>Siège social : 15 rue de la Bourse, 75002 Paris</p>
            <p>SIRET : 123 456 789 00010</p>
            <p>RCS Paris B 123 456 789</p>
            <p>TVA : FR12 123456789</p>
            <p>Directeur de publication : Michel Marques</p>
            <p>Email : michel.marques@alforis.fr</p>
          </section>

          {/* Hébergement */}
          <section>
            <h2>Hébergement</h2>
            <p>
              Hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              USA.
            </p>
            <p>
              Site web : <a href="https://vercel.com" className="underline text-doré">vercel.com</a>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              Tous les contenus du site sont la propriété exclusive d’Alforis
              Finance. Toute reproduction ou diffusion est interdite sans
              autorisation préalable.
            </p>
          </section>

          {/* CGU */}
          <section>
            <h2>Conditions générales d’utilisation</h2>
            <p>
              L’utilisation de <strong>www.alforis.fr</strong> implique
              l’acceptation des CGU. Le formulaire “Profil de Vie” est à visée
              récréative et n’a pas de valeur contractuelle.
            </p>
          </section>

          {/* Responsabilité & Liens */}
          <section>
            <h2 >Responsabilité</h2>
            <p>
              Alforis Finance ne saurait être tenue responsable des dommages
              résultant de l’utilisation du site.
            </p>
            <h2 className="mt-4">Liens hypertextes</h2>
            <p>
              Les liens vers des sites tiers sont donnés à titre
              informatif. Alforis Finance décline toute responsabilité.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2>Droit applicable</h2>
            <p>
              Le droit français s’applique. Juridiction compétente : tribunaux
              de Paris.
            </p>
          </section>

          <div className="text-center mt-8">
            <CallToAction />
          </div>
        </div>
      </motion.main>
    </Animated.Page>
  )
}
