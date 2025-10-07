'use client'
/* app/mentions-legales/MentionsLegalesContent.jsx */

import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import CallToAction from '@/components/ui/CallToAction'

export default function MentionsLegalesContent() {
  return (
    <Animated.Page>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-anthracite dark:bg-acier/80 text-ivoire py-6 px-3"
      >
        <div className="max-w-4xl mx-auto bg-ivoire bg-opacity-90 dark:bg-opacity-40 p-8 rounded-2xl shadow-xl space-y-8">

          {/* ─── ÉDITEUR DU SITE ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Éditeur du site</h2>
            <p>Alforis Finance, SAS au capital social de 5 000 €</p>
            <p>Siège social : 15 rue de la Bourse, 75002 Paris – France</p>
            <p>Immatriculée au RCS de Paris sous le numéro : 943 007 229</p>
            <p>Numéro de TVA intracommunautaire : FR 159 430 072 29</p>
            <p>Directeur de publication : Michel Marques</p>
            <p>
              Contact : <a href="mailto:michel.marques@alforis.fr" className="underline text-doré">michel.marques@alforis.fr</a>
            </p>
          </section>

          {/* ─── ACTIVITÉ ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Activité</h2>
            <p>
              Alforis Finance exerce une activité de <strong>Third-Party Marketing (TPM)</strong> indépendant, 
              consistant à représenter et promouvoir, sur les marchés français et européens, des sociétés de gestion 
              et acteurs institutionnels internationaux.
            </p>
            <p className="mt-3">
              Alforis n’exerce aucune activité de conseil en investissement, de gestion de portefeuille ou d’intermédiation 
              financière au sens du Code monétaire et financier. Le site <strong>www.alforis.fr</strong> a une vocation 
              exclusivement institutionnelle, informative et commerciale B2B.
            </p>
            <p className="mt-3">
              Alforis Finance est membre de l’<strong>AFTPM</strong> (Association Française des Third-Party Marketers), 
              association professionnelle regroupant les acteurs indépendants de la distribution institutionnelle.
            </p>
          </section>

          {/* ─── HÉBERGEMENT ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Hébergement</h2>
            <p>
              Le site est hébergé sur un serveur dédié administré par Alforis Finance et opéré par <strong>Hetzner Online GmbH</strong>, 
              Gunzenhausen, Allemagne.
            </p>
            <p>
              Site web : <a href="https://www.hetzner.com" className="underline text-doré">hetzner.com</a>
            </p>
            <p>
              L’ensemble des données est stocké sur des serveurs situés au sein de l’Union européenne, conformément 
              aux exigences du Règlement (UE) 2016/679 (RGPD).
            </p>
          </section>

          {/* ─── PROPRIÉTÉ INTELLECTUELLE ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Propriété intellectuelle</h2>
            <p>
              Le site <strong>www.alforis.fr</strong> ainsi que l’ensemble de ses éléments (textes, visuels, logo, 
              photographies, vidéos, structure, code source, design, contenus éditoriaux) sont la propriété exclusive 
              d’Alforis Finance ou de ses partenaires contractuels.
            </p>
            <p>
              Toute reproduction, représentation, modification, diffusion ou exploitation, totale ou partielle, 
              sans autorisation écrite préalable d’Alforis Finance est strictement interdite et constitue 
              une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          {/* ─── DONNÉES PERSONNELLES & COOKIES ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Données personnelles & cookies</h2>
            <p>
              Les données collectées via les formulaires (prise de contact, prise de rendez-vous ou inscription à une présentation) 
              sont strictement confidentielles et utilisées uniquement par Alforis Finance pour la gestion de la relation professionnelle.
            </p>
            <p>
              Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, 
              vous disposez d’un droit d’accès, de rectification, d’opposition, de suppression et de portabilité de vos données.
            </p>
            <p>
              Ces droits peuvent être exercés en écrivant à : <a href="mailto:dpo@alforis.fr" className="underline text-doré">dpo@alforis.fr</a>
            </p>
            <p>
              Le site utilise des cookies techniques et analytiques pour améliorer la navigation et mesurer l’audience. 
              Vous pouvez gérer vos préférences via le module « Préférences de cookies ».
            </p>
          </section>

          {/* ─── RESPONSABILITÉ ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Responsabilité</h2>
            <p>
              Alforis Finance s’efforce d’assurer la disponibilité et la fiabilité des informations présentées sur le site. 
              Toutefois, aucune garantie n’est donnée quant à leur exactitude, leur exhaustivité ou leur mise à jour.
            </p>
            <p>
              Le contenu du site a une vocation strictement informative et ne constitue ni un conseil en investissement, 
              ni une offre, ni une sollicitation à souscrire à un produit financier.
            </p>
            <p>
              L’utilisateur reconnaît utiliser le site sous sa seule responsabilité. Alforis Finance décline toute responsabilité 
              pour tout dommage direct ou indirect résultant de la consultation ou de l’utilisation du site.
            </p>
          </section>

          {/* ─── LIENS HYPERTEXTES ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. Alforis Finance n’exerce aucun contrôle 
              sur ces sites externes et décline toute responsabilité quant à leur contenu, leurs pratiques 
              ou leur conformité légale.
            </p>
          </section>

          {/* ─── DROIT APPLICABLE ───────────────────────────────────── */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Droit applicable</h2>
            <p>
              Le présent site est régi par le droit français. En cas de litige, la juridiction compétente 
              sera celle du ressort de la Cour d’appel de Paris.
            </p>
          </section>

          <div className="text-center mt-8">
            <CallToAction />
          </div>
        </div>
      </motion.section>
    </Animated.Page>
  )
}
