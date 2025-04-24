'use client'

import { useEffect, useState } from "react"
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

export default function AnimatedSVG({
  file,
  viewBox = "0 0 328 328",
  className = "",
  duration = 2.5,
}) {
  const [svgContent, setSvgContent] = useState(null)

  useEffect(() => {
    async function loadSVG() {
      try {
        const rawModule = await import(`@/assets/${file}?raw`)
        setSvgContent(rawModule.default)
      } catch (error) {
        console.error(`❌ Impossible de charger le fichier SVG : ${file}`, error)
        setSvgContent(null)
      }
    }

    loadSVG()
  }, [file])

  if (!svgContent) return null

  return (
    <ClientOnlyMotion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      preserveAspectRatio="xMidYMid meet"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={`w-full h-auto ${className}`}
    >
      <g dangerouslySetInnerHTML={{ __html: svgContent }} />
    </ClientOnlyMotion.svg>
  )
}
