import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

function SceauMesh({ scrollY }) {
  const group = useRef()
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    if (group.current) {
      group.current.rotation.y = mouse.x * 0.3
      group.current.rotation.x = mouse.y * 0.2
      group.current.position.y = -scrollY.current * 0.1
    }
  })

  useEffect(() => {
    const loader = new SVGLoader()
    loader.load('/Vector-7.svg', (data) => {
      const paths = data.paths
      const material = new THREE.MeshStandardMaterial({
        color: '#C8A765',
        roughness: 0.4,
        metalness: 0.6,
        side: THREE.DoubleSide,
      })

      const shapes = []
      paths.forEach((path) => {
        const shapesInPath = SVGLoader.createShapes(path)
        shapes.push(...shapesInPath)
      })

      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 8,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.8,
        bevelSegments: 2,
      })

      geometry.center()
      const logo = new THREE.Mesh(geometry, material)
      group.current.add(logo)
    })
  }, [])

  return <group ref={group} scale={0.9} />
}

import { useRef as useReactRef } from 'react'

export default function IntroSceau3D() {
  const scrollY = useReactRef({ current: 0 })

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 200], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <SceauMesh scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
