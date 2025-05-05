import { Animated } from '@/components/animated/Animated'
import React from 'react';
import BlogStudioGrid from '@/components/blog/BlogStudioGrid';
import AlforisHead from '@/components/AlforisHead';
import { motion } from 'framer-motion';
import { fetchAllContent } from '@/lib/server/fetchAllContent'

export default function BlogStudioPage({ content }) {
  return (
    <>
        <AlforisHead
          title="Blog & Studio – Alforis"
          path="/blog-studio"
          description="Vision libre et sans filtre du patrimoine. Vidéos, réflexions, articles stratégiques."
          keywords="studio patrimoine, blog gestion de patrimoine, stratégie patrimoniale"
        />

    <Animated.Main>
      <motion.main className="bg-ivoire text-anthracite pt-[var(--nav-height)] pb-24 px-6" >
        <div className="max-w-6xl mx-auto">
          <Animated.H1 className="text-5xl font-semibold text-center">
            Blog & Studio Alforis
          </Animated.H1>

          <section className="text-center mb-16 space-y-24">
            <p className="text-lg md:text-xl mb-8 text-anthracite">
              Chez Alforis, le patrimoine se vit autant qu’il se comprend.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div>
                <h2 className="text-2xl font-title text-anthracite mb-2">🎙️ Le Studio</h2>
                <p>
                  <strong>Ce que le banquier ne vous dit pas.</strong><br />
                  Capsules vidéos, prises de parole tranchées, réflexions à contre-courant.<br />
                  Le Studio Alforis vous livre une vision libre et sans filtre du patrimoine.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-title text-anthracite mb-2">📝 Le Blog</h2>
                <p>
                  Articles, décodages, inspirations stratégiques.<br />
                  Un espace pour prendre de la hauteur et enrichir vos décisions.
                </p>
              </div>
            </div>
          </section>

          <BlogStudioGrid content={content} />
        </div>
      </motion.main>
      </Animated.Main>
    </>
  );
}

export async function getStaticProps() {
  const content = await fetchAllContent()
  console.log("📦 getStaticProps → content :", content)
  return { props: { content } }
}