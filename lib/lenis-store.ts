import type Lenis from 'lenis'

let instance: Lenis | null = null

/** Set by SmoothScroll on mount; cleared on unmount. */
export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

/** The live Lenis instance, or null before hydration / under SSR. */
export function getLenis() {
  return instance
}
