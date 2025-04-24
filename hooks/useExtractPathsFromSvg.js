'use client'
import { Children, isValidElement } from "react"

/**
 * Extrait tous les éléments `<path />` d’un composant SVG React.
 * Fonctionne avec des SVG importés via @svgr/webpack.
 */
export function extractPathsFromReactSvg(element) {
  if (!isValidElement(element)) return []

  // Si l'élément est un <path />
  if (element.type === "path") {
    return [element]
  }

  // Si c’est un composant React (ex: <MonSVG /> importé via SVGR)
  if (typeof element.type === "function") {
    try {
      const rendered = element.type(element.props)
      return extractPathsFromReactSvg(rendered)
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("⛔️ Failed to render subcomponent", e)
      }
      return []
    }
  }

  // S’il a des enfants, on les analyse récursivement
  const children = element.props?.children
  if (!children) return []

  return Children.toArray(children).flatMap(extractPathsFromReactSvg)
}


export function extractPathsFromSvgString(svgString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, "image/svg+xml")
  const pathElements = Array.from(doc.querySelectorAll("path"))
  return pathElements.map(el => {
    const d = el.getAttribute("d")
    const fillRule = el.getAttribute("fill-rule")
    return { d, fillRule }
  })
}