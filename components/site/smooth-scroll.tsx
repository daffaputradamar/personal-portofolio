'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setLenis } from '@/lib/lenis-store'

/**
 * Inertial smooth scrolling, driven from GSAP's ticker so ScrollTrigger and
 * Lenis share one clock. Lenis honours `prefers-reduced-motion` on its own:
 * smoothing is disabled and scroll tracks the input 1:1.
 *
 * The instance is published through `lib/lenis-store` so overlays can pause it.
 */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      anchors: true,
      respectReducedMotion: true
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Route changes swap the whole page under ScrollTrigger; re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
