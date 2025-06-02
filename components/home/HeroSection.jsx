
'use client'
/* components/home/HeroSection.jsx */

import { Suspense } from 'react' // For fallback while model loads
import { motion } from 'framer-motion'
// import Image from 'next/image' // No longer used
// import { GoldLink } from '@/hooks/useGoldEffect' // No longer used with new H1
import Button from '@/components/ui/Button'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

// Component to load and display the GLB model
function Model({ url }) {
  const { scene } = useGLTF(url)
  // Potentially scale and position the model here if needed
  // scene.scale.set(0.5, 0.5, 0.5);
  // scene.position.set(0, -1, 0);
  return <primitive object={scene} />;
}

// This component will wrap the Canvas and Model for better structure
// It also includes a note about performance for large GLB files.
function GLBModelViewer() {
  // Performance note: Large GLB files (like the ~40MB logo-draco.glb) can significantly
  // impact load times and performance, especially on mobile or slower connections.
  // Consider further optimization of the GLB (e.g., using logo-draco-optimized.glb if smaller),
  // implementing more aggressive LOD (Level of Detail), or using techniques like
  // progressive loading or conditional rendering based on connection speed or device capabilities.
  // Draco compression is good, but the initial file size still matters.

  return (
    <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50"> {/* Positioned behind text, adjust opacity as needed */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}> {/* Simple fallback, consider a Drei <Loader /> for better UX */}
          <Model url="/assets/draco/logo-draco-optimized.glb" /> {/* Changed to optimized version for testing */}
        </Suspense>
        {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
        {/* Environment can add nice reflections/lighting if your model has metallic properties */}
        {/* <Environment preset="sunset" /> */}
      </Canvas>
    </div>
  );
}


export default function HeroSection({ extraClass = '' }) {
  return (
    <section className={`relative w-full h-screen overflow-hidden ${extraClass}`}> {/* Ensure h-screen for Canvas to fill */}
      <GLBModelViewer /> {/* Add the GLB viewer here */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-20 md:py-32"> {/* Ensure content is above GLB and centered */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} // Updated initial state
          animate={{ opacity: 1, y: 0 }}   // Changed to animate for load animation
          viewport={{ once: true, amount: 0.3 }} // Keeps triggering once when in view
          transition={{ duration: 0.8, ease: "easeOut" }} // Adjusted duration and ease
          className="text-3xl md:text-5xl font-title font-bold text-anthracite dark:text-acier leading-snug mb-6" // Removed excessive top padding
        >
          La vérité que votre banquier ne vous dira jamais, je la connais. Et je la partage.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Changed to animate for load animation (can be staggered)
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }} // Delayed after H1
          className="text-base md:text-lg text-acier dark:text-gray-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed" // Adjusted dark mode color for better contrast on dark GLB
        >
          Le patrimoine ne dit rien par lui-même. Il prend sens s’il raconte une histoire : <strong>la vôtre</strong>.
        </motion.p>
        <motion.div
          initial={{ opacity:0, y: 20}}
          animate={{ opacity:1, y: 0}}
          transition={{duration: 0.6, delay: 0.8}}
        >
          <Button to="/parcours" className="btn-alforis-rdv" index={1}>
            Commencer mon diagnostic
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
