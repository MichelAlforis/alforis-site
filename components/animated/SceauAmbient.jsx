import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

function Sceau({ active }) {
  const group = useRef()
  const hovered = useRef(false)
  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    if (!group.current || !active) return
    if (hovered.current) {
      group.current.rotation.y = mouse.x * 0.2
      group.current.rotation.x = mouse.y * 0.1
    } else {
      group.current.rotation.y *= 0.95
      group.current.rotation.x *= 0.95
    }
  })

  useEffect(() => {
    const loader = new SVGLoader()
    loader.load('/Vector-7.svg', (data) => {
      const paths = data.paths
      const material = new THREE.MeshStandardMaterial({
        color: '#C8A765',
        roughness: 0.3,
        metalness: 0.8,
        side: THREE.DoubleSide,
      })
      const shapes = []
      paths.forEach((path) => {
        const shapesInPath = SVGLoader.createShapes(path)
        shapes.push(...shapesInPath)
      })
      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 6,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.6,
        bevelSegments: 1,
      })
      geometry.center()
      const logo = new THREE.Mesh(geometry, material)
      group.current.add(logo)
    })
  }, [])

  return (
    <group
      ref={group}
      scale={0.32}
      position={[0, 0, 0]}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    />
  )
}

export default function SceauAmbient({ targetId = 'bg-guard' }) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [scrollBlocked, setScrollBlocked] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem('sceauIntro')
    if (!shown) {
      setShouldAnimate(true)
      sessionStorage.setItem('sceauIntro', 'true')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const t = document.getElementById(targetId)
      if (!t) return
      const rect = t.getBoundingClientRect()
      setScrollBlocked(rect.top < window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [targetId])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 200], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <Sceau active={!scrollBlocked} />
      </Canvas>
    </div>
  )
}