'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ClapDeFin({
  profilPrincipal,
  profilSecondaire,
  meta,
  slug,
}) {
  const data = meta.profilesData?.[profilPrincipal]
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-ivoire text-acier dark:bg-acier/60 dark:text-ivoire">
        <p className="text-center text-lg">
          Désolé, nous n’avons pas trouvé votre profil.
        </p>
      </div>
    )
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data
  let href = cta?.href || ''
  if (href && !href.startsWith('http') && !href.startsWith('/')) {
    href = `/${href}`
  }
  const isExternal = href.startsWith('http')

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.15 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="pt-[calc(var(--nav-height)+1rem)] pb-16 bg-white dark:bg-acier"
    >
      <motion.div
        variants={item}
        className="mx-auto max-w-3xl px-4 md:px-8 py-10 bg-ivoire/90 dark:bg-acier/80 rounded-2xl shadow-2xl backdrop-blur-lg flex flex-col items-center space-y-8 border-2"
        style={{ borderColor: color }}
      >
        {/* Icône (modérée) */}
        <motion.div variants={item} className="text-[3rem] mt-2">
          {icon}
        </motion.div>

        {/* Titre */}
        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl font-title text-acier dark:text-ivoire leading-tight text-center"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-xl text-base md:text-lg text-acier/80 dark:text-ivoire/80 text-center"
        >
          {description}
        </motion.p>

        {/* Paragraphes */}
        <motion.div variants={item} className="w-full space-y-4 text-left">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className="text-base leading-relaxed text-acier/90 dark:text-ivoire/90"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* Citation */}
        {citation && (
          <motion.blockquote
            variants={item}
            className="italic text-acier/70 dark:text-ivoire/70 self-start pl-4 border-l-4"
            style={{ borderColor: color }}
          >
            <span className="mr-2">{citation.emoji}</span>
            {citation.text}
          </motion.blockquote>
        )}

        {/* CTA principal — version bouton "nul" */}
        {cta?.label && (
          <motion.div variants={item}>
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 btn-alforis-retro"
              >
                {cta.label}
              </a>
            ) : (
              <Link href={href} className="inline-block mt-4 btn-alforis-retro">
                {cta.label}
              </Link>
            )}
          </motion.div>
        )}

        {/* Badge profil secondaire */}
        {profilSecondaire && (
          <motion.span
            variants={item}
            className="inline-block px-4 py-1 text-sm bg-doré/20 text-doré dark:text-ivoire dark:bg-doré/60 rounded-full"
          >
            Profil secondaire : <strong>{profilSecondaire}</strong>
          </motion.span>
        )}

        {/* Bouton retour — version "nul" */}
        <motion.div variants={item} className="mt-4 w-full">
          <Link href="/parcours" className="block mt-4 text-sm text-anthracite">
            ← Revenir à la sélection
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
