'use client'

/* app/confidentialite/ConfidentialiteContent.jsx */
import { useEffect, useState } from 'react'
import Animated from '@/components/animated/Animated'
import { motion } from 'framer-motion'

export default function ConfidentialiteContent() {
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
        className="main-content bg-ivoire text-acier dark:bg-acier text-ivoire py-16 px-6"
      >
        <div className="max-w-3xl mx-auto bg-ivoire bg-opacity-90 dark:bg-opacity-40 rounded-2xl shadow-xl p-8 space-y-6">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-anthracite dark:text-ivoire leading-relaxed"
          >
            Chez Alforis Finance, nous accordons une attention particulière à la
            confidentialité et à la sécurité de vos données personnelles. Cette
            politique décrit nos engagements pour protéger votre vie privée,
            conformément au RGPD (UE 2016/679) et à la loi Informatique et Libertés.
          </motion.p>

          {/* ... autres sections similaires, avec motion.div wrappers si souhaité ... */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-anthracite dark:text-ivoire space-y-4"
          >
            <h2 className="mt-6">Conformité au RGPD</h2>
            <p>
              Nous appliquons les principes de « privacy by design » et « privacy by
              default », assurant collecte licite, minimisation des données,
              transparence et sécurité.
            </p>

            <h3 className="mt-4">Principes fondamentaux :</h3>
            <ul className="text-anthracite dark:text-ivoire list-disc list-inside ml-4 space-y-2">
              <li><strong>Licéité, loyauté et transparence</strong> : collecte légale, loyale et transparente. Mentions claires au moment de la collecte.</li>
              <li><strong>Limitation des finalités</strong> : aucune utilisation secondaire sans base légale ou consentement.</li>
              <li><strong>Minimisation des données</strong> : collecte strictement nécessaire. Pas de traitement superflu.</li>
              <li><strong>Exactitude</strong> : données mises à jour régulièrement. Droit de rectification garanti.</li>
              <li><strong>Limitation de la conservation</strong> : conservation limitée à la durée utile. Suppression ou anonymisation ensuite.</li>
              <li><strong>Intégrité et confidentialité</strong> : mesures techniques et organisationnelles robustes de sécurité.</li>
              <li><strong>Responsabilité et documentation (accountability)</strong> : registre des traitements, documentation et sous-traitants encadrés.</li>
            </ul>
          </motion.div>
     <p className="mt-4">Ces principes s’appliquent à tous nos traitements. Toute personne concernée est informée clairement sur ses droits et la finalité du traitement.</p>

      <h3 className="mt-6">Information des personnes concernées</h3>
      <p>Conformément aux articles 12 à 14 du RGPD, nous informons systématiquement chaque personne concernée des éléments suivants :</p>
      <ul className="text-anthracite dark:text-ivoire list-disc list-inside ml-4 mt-2 space-y-1">
        <li>Identité du responsable de traitement</li>
        <li>Finalités et base légale</li>
        <li>Destinataires éventuels</li>
        <li>Durée de conservation</li>
        <li>Droits d’accès, rectification, opposition, suppression, portabilité</li>
        <li>Droit de plainte auprès de la CNIL</li>
      </ul>

      <h3 className="mt-6">Protection renforcée des données sensibles</h3>
      <p>Aucune donnée sensible n’est collectée de manière intentionnelle (origine raciale, santé, opinions, etc.). Si des données sensibles nous sont communiquées dans le cadre d’un accompagnement, elles ne sont ni conservées ni exploitées, sauf consentement explicite et documenté.</p>

      <h3 className="mt-6">Analyse d’impact (DPIA)</h3>
      <p>Une analyse d’impact est réalisée si un traitement est susceptible d’engendrer un risque élevé pour les droits et libertés des personnes concernées (profilage, grande échelle, surveillance systématique, etc.).</p>

      <h3 className="mt-6">Registre des traitements</h3>
      <p>Un registre des traitements est maintenu à jour. Il recense : les finalités, types de données, catégories de personnes concernées, durées de conservation, mesures de sécurité, et destinataires. Il est accessible à la CNIL en cas de contrôle.</p>

      <h3 className="mt-6">Sous-traitance encadrée</h3>
      <p>Tout prestataire accédant à des données fait l’objet d’un audit de conformité, de clauses RGPD signées et d’un encadrement contractuel clair, conformément à l’article 28 du RGPD.</p>

      <h3 className="mt-6">Transferts hors UE</h3>
      <p>Aucun transfert hors UE n’a lieu par défaut. Si un outil le nécessite (ex. Google), il est encadré par :</p>
      <ul className="text-anthracite dark:text-ivoire list-disc list-inside ml-4 mt-2 space-y-1">
        <li>Décision d’adéquation de la Commission européenne</li>
        <li>Clauses contractuelles types (CCT)</li>
        <li>Consentement explicite si aucune autre garantie n’est possible</li>
      </ul>

      <p className="mt-4">En cas de doute, vous pouvez demander la liste complète de nos sous-traitants et pays d’hébergement.</p>


        </div>
      </motion.main>
    </Animated.Page>
  )
}
