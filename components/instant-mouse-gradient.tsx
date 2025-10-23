"use client"

import { useEffect, useRef } from 'react'

export function InstantMouseGradient() {
  const gradientRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const targetPosition = useRef({ x: -300, y: -300 })
  const currentPosition = useRef({ x: -300, y: -300 })

  useEffect(() => {
    const gradient = gradientRef.current
    if (!gradient) return

    const gradientSize = 600

    const updateMousePosition = (event: MouseEvent) => {
      targetPosition.current = {
        x: event.clientX - gradientSize / 2,
        y: event.clientY - gradientSize / 2,
      }
    }

    const animate = () => {
      const easing = 0.08

      currentPosition.current = {
        x: currentPosition.current.x + (targetPosition.current.x - currentPosition.current.x) * easing,
        y: currentPosition.current.y + (targetPosition.current.y - currentPosition.current.y) * easing,
      }

      gradient.style.transform = `translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)`

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        ref={gradientRef}
        className="absolute rounded-full opacity-20 blur-3xl transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(187, 247, 208, 0.1) 45%, rgba(240, 253, 244, 0.05) 100%)',
          width: '600px',
          height: '600px',
          transform: 'translate(-300px, -300px)',
        }}
      />
    </div>
  )
}