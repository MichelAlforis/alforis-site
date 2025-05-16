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
  