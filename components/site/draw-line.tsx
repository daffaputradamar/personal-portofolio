'use client'

import { useRef } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

/**
 * A vertical rule that draws itself top-to-bottom as its parent scrolls
 * through the viewport. Place it absolutely inside a `relative` container;
 * the parent is the scroll trigger.
 */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !el.parentElement) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6
            }
          }
        )
      })
    },
    { scope: ref }
  )

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn('absolute top-0 bottom-0 w-px origin-top', className)}
    />
  )
}
