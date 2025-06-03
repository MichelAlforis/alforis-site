
'use client'
/* components/home/HeroSection.jsx - SECTION 1: HERO */

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button' // Reusing existing Button component
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei' // OrbitControls removed as not needed for atmospheric effect

// Component to load and display the GLB model
function Model({ url }) {
  const { scene } = useGLTF(url)
  // For subtle atmospheric effect:
  // Scale it up, position it partially off-screen or very distant, make it more transparent in the viewer.
  // Add a very slow rotation.
  scene.scale.set(1.5, 1.5, 1.5) // Example: Scale slightly larger
  scene.position.set(0, -2, -5) // Example: Position it further back and lower
  return <primitive object={scene} rotation-y={Math.PI * 0.1} />; // Example: slight initial rotation
}

// GLB Viewer component for atmospheric background
function AtmosphericGLBViewer() {
  // Performance note: Even optimized GLBs can be demanding.
  // Further optimization, conditional loading (e.g., not on mobile or low-power mode),
  // or using a static image fallback might be necessary for broader compatibility.
  return (
    <div className="absolute inset-0 z-0 opacity-10 dark:opacity-15 pointer-events-none"> {/* Very subtle opacity, non-interactive */}
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}> {/* Camera further away */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 10]} intensity={0.3} />
        <Suspense fallback={null}>
          <Model url="/assets/draco/logo-draco-optimized.glb" />
        </Suspense>
        {/* <Environment preset="dawn" /> */} {/* Optional: for subtle environmental lighting */}
      </Canvas>
    </div>
  );
}

export default function HeroSection({ extraClass = '' }) {
  const h1Text = "La vérité que votre banquier ne vous dira jamais, je la connais. Et je la partage.";
  const descriptionText = "15 ans à conseiller et structurer des solutions financières complexes au plus haut niveau du secteur bancaire privé. Aujourd'hui indépendant, j'apporte à mes clients ce qu'ils recherchent vraiment : clarté, maîtrise et sérénité dans la gestion de leur patrimoine.";
  const ctaText = "Découvrez ce qu’on ne vous a jamais dit sur votre argent.";

  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Assuming 'doré' is rgb(242, 158, 76)
  const doradoColorValue = "rgba(242, 158, 76, 0.4)"; // Shadow color with opacity

  return (
    <section className={`relative w-full h-screen overflow-hidden ${extraClass}`}>
      <AtmosphericGLBViewer />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 md:px-8 py-16">
        <motion.h1
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={{ ...textAnimation.transition, delay: 0.2 }}
          // Assuming D_hero.webp/M_hero.webp are dark, text should be light.
          // text-anthracite dark:text-acier was original, using text-ivoire for better contrast on potentially dark hero images
          className="text-4xl md:text-5xl lg:text-6xl font-title font-bold text-ivoire dark:text-acier leading-tight mb-8"
        >
          {h1Text}
        </motion.h1>

        <motion.p
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={{ ...textAnimation.transition, delay: 0.5 }}
          className="text-lg md:text-xl text-ivoire/90 dark:text-acier/90 font-light mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
        >
          {descriptionText}
        </motion.p>

        <motion.div
          initial={textAnimation.initial}
          animate={textAnimation.animate}
          transition={{ ...textAnimation.transition, delay: 0.8 }}
        >
          {/* Reusing the existing Button component, assuming its styling is adaptable or classes can be added */}
          <Button
            to="/parcours" // Default link, can be changed
            className="btn-alforis-premium font-semibold" // Example class for premium feel
            // Apply hover animations directly if Button doesn't support them via props easily
            // For Framer Motion button, wrap it or ensure it forwards motion props
          >
             <motion.span
              className="inline-block" // Ensure span can be scaled
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 15px 5px ${doradoColorValue}`
              }}
              transition={{ duration: 0.3 }}
            >
              {ctaText}
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
