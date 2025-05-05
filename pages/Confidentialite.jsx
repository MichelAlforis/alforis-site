'use client'
import AlforisHead from '@/components/AlforisHead'
import React from "react"
import { Animated } from '@/components/animated/Animated'

export default function Confidentialite() {
  return (
    <Animated.Main>
    <AlforisHead title="Confidentialite – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page confidentialite." path="/Confidentialite" />

    <div className="min-h-screen bg-ivoire text-anthracite px-6 py-16 max-w-5xl mx-auto shadow-sm rounded-md">
      <h1 className="text-4xl font-title font-bold text-anthracite mb-6">Politique de confidentialité</h1>

      <p className="mb-4">Chez Alforis Finance, nous accordons une attention particulière à la confidentialité et à la sécurité de vos données personnelles. Cette politique vous informe sur les engagements que nous prenons afin de respecter votre vie privée, en conformité avec le Règlement Général sur la Protection des Données (RGPD - UE 2016/679) et la loi Informatique et Libertés du 6 janvier 1978 modifiée.</p>

      <h2 className="text-3xl font-semibold text-anthracite mt-8 mb-2">Conformité au RGPD</h2>
      <p>Chez <strong>Alforis Finance</strong>, nous mettons en œuvre une politique rigoureuse de conformité au <strong>Règlement Général sur la Protection des Données (RGPD – UE 2016/679)</strong>, applicable depuis le 25 mai 2018. Nous intégrons ces exigences dès la conception de nos services (« privacy by design ») et dans leur exploitation quotidienne (« privacy by default »).</p>

      <h3 className="text-2xl font-semibold mt-6">Principes fondamentaux appliqués :</h3>
      <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
        <li><strong>Licéité, loyauté et transparence</strong> : collecte légale, loyale et transparente. Mentions claires au moment de la collecte.</li>
        <li><strong>Limitation des finalités</strong> : aucune utilisation secondaire sans base légale ou consentement.</li>
        <li><strong>Minimisation des données</strong> : collecte strictement nécessaire. Pas de traitement superflu.</li>
        <li><strong>Exactitude</strong> : données mises à jour régulièrement. Droit de rectification garanti.</li>
        <li><strong>Limitation de la conservation</strong> : conservation limitée à la durée utile. Suppression ou anonymisation ensuite.</li>
        <li><strong>Intégrité et confidentialité</strong> : mesures techniques et organisationnelles robustes de sécurité.</li>
        <li><strong>Responsabilité et documentation (accountability)</strong> : registre des traitements, documentation et sous-traitants encadrés.</li>
      </ul>

      <p className="mt-4">Ces principes s’appliquent à tous nos traitements. Toute personne concernée est informée clairement sur ses droits et la finalité du traitement.</p>

      <h3 className="text-2xl font-semibold mt-6">Information des personnes concernées</h3>
      <p>Conformément aux articles 12 à 14 du RGPD, nous informons systématiquement chaque personne concernée des éléments suivants :</p>
      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
        <li>Identité du responsable de traitement</li>
        <li>Finalités et base légale</li>
        <li>Destinataires éventuels</li>
        <li>Durée de conservation</li>
        <li>Droits d’accès, rectification, opposition, suppression, portabilité</li>
        <li>Droit de plainte auprès de la CNIL</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6">Protection renforcée des données sensibles</h3>
      <p>Aucune donnée sensible n’est collectée de manière intentionnelle (origine raciale, santé, opinions, etc.). Si des données sensibles nous sont communiquées dans le cadre d’un accompagnement, elles ne sont ni conservées ni exploitées, sauf consentement explicite et documenté.</p>

      <h3 className="text-2xl font-semibold mt-6">Analyse d’impact (DPIA)</h3>
      <p>Une analyse d’impact est réalisée si un traitement est susceptible d’engendrer un risque élevé pour les droits et libertés des personnes concernées (profilage, grande échelle, surveillance systématique, etc.).</p>

      <h3 className="text-2xl font-semibold mt-6">Registre des traitements</h3>
      <p>Un registre des traitements est maintenu à jour. Il recense : les finalités, types de données, catégories de personnes concernées, durées de conservation, mesures de sécurité, et destinataires. Il est accessible à la CNIL en cas de contrôle.</p>

      <h3 className="text-2xl font-semibold mt-6">Sous-traitance encadrée</h3>
      <p>Tout prestataire accédant à des données fait l’objet d’un audit de conformité, de clauses RGPD signées et d’un encadrement contractuel clair, conformément à l’article 28 du RGPD.</p>

      <h3 className="text-2xl font-semibold mt-6">Transferts hors UE</h3>
      <p>Aucun transfert hors UE n’a lieu par défaut. Si un outil le nécessite (ex. Google), il est encadré par :</p>
      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
        <li>Décision d’adéquation de la Commission européenne</li>
        <li>Clauses contractuelles types (CCT)</li>
        <li>Consentement explicite si aucune autre garantie n’est possible</li>
      </ul>

      <p className="mt-4">En cas de doute, vous pouvez demander la liste complète de nos sous-traitants et pays d’hébergement.</p>
    </div>
  </Animated.Main>
  )
}
