'use client'

import { useRef, type ReactNode } from 'react'

import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** How far the element chases the cursor, as a fraction of the offset. */
  strength?: number
}

/**
 * Pulls its child a little way toward the cursor while hovered, then settles
 * back on leave. Mouse-only, and off entirely under reduced motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.18
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' })

        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect()
          xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
          yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }

        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
