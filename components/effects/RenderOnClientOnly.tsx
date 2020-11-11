import React, { ReactChildren } from 'react'
import { useEffect, useState } from "react"

/**
 * RenderOnClientOnly
 *
 * Further info 👉🏼 https://joshwcomeau.com/react/the-perils-of-rehydration/
 */

interface RenderOnClientOnlyProps {
  children: ReactChildren
}

const RenderOnClientOnly = ({ children, ...delegated }: RenderOnClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <div {...delegated}>
      { children}
    </div>

  )
}

export default RenderOnClientOnly
