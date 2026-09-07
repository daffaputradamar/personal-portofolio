'use client'

/**
 * Single registration point for GSAP. Import `gsap`, `ScrollTrigger`,
 * `SplitText` and `useGSAP` from here rather than from the packages, so the
 * plugins are registered exactly once and the defaults below apply everywhere.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  gsap.defaults({ ease: 'power4.out', duration: 1 })
}

/** Media query used to gate every non-essential animation. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/** The house easing — a long, decelerating settle. */
export const EASE = 'power4.out'

export { gsap, ScrollTrigger, SplitText, useGSAP }
