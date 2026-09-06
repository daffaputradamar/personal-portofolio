'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds to hold before starting. Stagger siblings with 0.06–0.12 steps. */
  delay?: number
  /** Travel distance in px. Larger reads as heavier. */
  offset?: number
  as?: ElementType
}

/**
 * Scroll-triggered fade-and-rise. Fires once, on the way in only, so the page
 * never re-animates when the reader scrolls back up.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  offset = 24,
  as = 'div'
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </MotionTag>
  )
}
