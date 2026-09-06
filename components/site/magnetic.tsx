'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** How far the element chases the cursor, as a fraction of the offset. */
  strength?: number
}

/**
 * Pulls its child a little way toward the cursor while hovered, then springs
 * back on leave. Subtle by design — past ~0.25 strength it starts to feel gimmicky.
 */
export function Magnetic({
  children,
  className,
  strength = 0.18
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.4 })

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={event => {
        const el = ref.current
        if (!el || event.pointerType !== 'mouse') return
        const rect = el.getBoundingClientRect()
        rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
