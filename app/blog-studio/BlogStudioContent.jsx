
/* app/blog-studio/BlogStudioContent.jsx */
'use client'

import React from 'react'
import Animated from '@/components/animated/Animated'
import { motion } from 'framer-motion'
import BlogStudioGrid from '@/components/blog/BlogStudioGrid'

export default function BlogStudioContent({ content }) {
  return (
    <Animated.Page>
      <motion.main className="main-content bg-ivoire text-anthracite pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <Animated.H1 className="text-5xl font-semibold text-center">
            Blog & Studio Alforis
          </Animated.H1>

          <section className="text-center mb-16 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-anthracite"
            >
              Chez Alforis, le patrimoine se vit autant qu’il se comprend.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-title text-anthracite mb-2">🎙️ Le Studio</h2>
                <p className="leading-relaxed">
                  <strong>Ce que le banquier ne vous dit pas.</strong><br />
                  Capsules vidéos, prises de parole tranchées,
                  réflexions à contre-courant. Le Studio Alforis vous livre
                  une vision libre et sans filtre du patrimoine.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-title text-anthracite mb-2">📝 Le Blog</h2>
                <p className="leading-relaxed">
                  Articles, décodages, inspirations stratégiques. Un espace
                  pour prendre de la hauteur et enrichir vos décisions.
                </p>
              </motion.div>
            </div>
          </section>

          <section>
            <BlogStudioGrid content={content} />
          </section>
        </div>
      </motion.main>
    </Animated.Page>
  )
}
