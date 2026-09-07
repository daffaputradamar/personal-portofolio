'use client'

import { useRef, type ElementType, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { EASE, MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds to hold before starting. Stagger siblings with 0.06-0.12 steps. */
  delay?: number
  /** Travel distance in px. Larger reads as heavier. */
  offset?: number
  as?: ElementType
}

/**
 * Scroll-triggered fade-and-rise. Fires once, on the way in only, so the page
 * never re-animates when the reader scrolls back up.
 *
 * The element starts hidden via CSS (`.gsap-reveal`) only when the visitor has
 * not asked for reduced motion; otherwise it is simply visible and no tween is
 * created.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  offset = 24,
  as = 'div'
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Typed as 'div' purely so the ref type-checks; any element tag works.
  const Tag = as as 'div'

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: offset },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        )
      })
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={cn('gsap-reveal', className)}>
      {children}
    </Tag>
  )
}
