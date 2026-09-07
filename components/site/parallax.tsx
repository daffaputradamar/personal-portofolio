'use client'

import { useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

type ParallaxProps = {
  children: ReactNode
  className?: string
  /**
   * Fraction of the wrapper height the content drifts while the wrapper
   * crosses the viewport. 0.12 is gentle; past 0.25 it starts to feel loose.
   */
  speed?: number
}

/**
 * Scroll-scrubbed drift for imagery. The wrapper clips; the child is scaled up
 * just enough to cover the travel so no edge is ever exposed.
 */
export function Parallax({ children, className, speed = 0.12 }: ParallaxProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrapper.current || !inner.current) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      })
    },
    { scope: wrapper }
  )

  return (
    <div ref={wrapper} className={cn('relative overflow-hidden', className)}>
      <div
        ref={inner}
        className='absolute inset-0'
        style={{ scale: String(1 + speed * 2) }}
      >
        {children}
      </div>
    </div>
  )
}
