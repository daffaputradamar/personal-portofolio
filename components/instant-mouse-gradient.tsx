"use client"

import { useEffect, useRef } from 'react'

export function InstantMouseGradient() {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gradient = gradientRef.current
    if (!gradient) return

    const updateMousePosition = (ev: MouseEvent) => {
      const x = ev.clientX - 400
      const y = ev.clientY - 400
      gradient.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        ref={gradientRef}
        className="absolute rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(187, 247, 208, 0.1) 50%, rgba(240, 253, 244, 0.1) 100%)',
          width: '800px',
          height: '800px',
          transform: 'translate(-400px, -400px)',
        }}
      />
    </div>
  )
}