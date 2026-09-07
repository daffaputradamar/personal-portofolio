'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

/** Hairline progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: 'max',
            scrub: 0.5
          }
        }
      )
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      aria-hidden
      className='bg-signal fixed inset-x-0 top-0 z-70 h-0.5 origin-left'
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
