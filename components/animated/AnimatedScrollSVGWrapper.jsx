import { Animated } from '@/components/animated/Animated'
'use client'

import { useRef, Children, isValidElement } from "react"
import { useScroll, useTransform } from "framer-motion"
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'

export default function AnimatedScrollSVGWrapper({
  children,
  viewBox = "0 0 328 328",
  className = ""
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const extractPaths = (element) => {
    if (!isValidElement(element)) return []
    if (element.type === "path") return [element]
    if (element.props?.children) {
      return Children.toArray(element.props.children).flatMap(extractPaths)
    }
    return []
  }

  const paths = extractPaths(children)

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[250px] mx-auto ${className}`}
    >
      <Animated.Div
        className="w-full h-auto"
        style={{
          viewBox,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
        }}
      >
        <ClientOnlyMotion.svg
          viewBox={viewBox}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {paths.map((path, i) => (
            <Animated.Path
              key={i}
              d={path.props.d}
              style={{ pathLength }}
              stroke={path.props.stroke || "currentColor"}
              strokeWidth={path.props.strokeWidth || "1.5"}
              fill={path.props.fill || "none"}
              strokeLinecap={path.props.strokeLinecap || "round"}
              strokeLinejoin={path.props.strokeLinejoin || "round"}
            />
          ))}
        </ClientOnlyMotion.svg>
      </Animated.Div>
    </div>
  )
}
