'use client'

import { useEffect, useRef } from 'react'

/**
 * A soft accent glow that trails the cursor. Written against a ref with rAF
 * lerping rather than React state so it never triggers a re-render, and it
 * bails out entirely for touch input and reduced-motion users.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    const SIZE = 640
    let frame = 0
    const target = { x: -SIZE, y: -SIZE }
    const current = { x: -SIZE, y: -SIZE }

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX - SIZE / 2
      target.y = event.clientY - SIZE / 2
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.07
      current.y += (target.y - current.y) * 0.07
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-0 overflow-hidden'
    >
      <div
        ref={ref}
        className='absolute h-[640px] w-[640px] rounded-full opacity-0 blur-[100px] transition-opacity duration-1000 dark:opacity-100'
        style={{
          background:
            'radial-gradient(circle, hsl(var(--accent-1) / 0.12) 0%, hsl(var(--accent-1) / 0.04) 45%, transparent 70%)',
          transform: 'translate3d(-640px, -640px, 0)'
        }}
      />
    </div>
  )
}
