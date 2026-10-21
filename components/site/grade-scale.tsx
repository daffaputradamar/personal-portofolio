'use client'

import { useRef } from 'react'

import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

/**
 * A grade drawn as a reading on a ruled scale: ticks every quarter point,
 * figures on the whole points, and the fill running out to the score. The
 * scale starts at zero so the bar is honest about where the score sits.
 */
export function GradeScale({ score, max }: { score: number; max: number }) {
  const root = useRef<HTMLDivElement>(null)
  const ratio = score / max
  const steps = max * 4

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-fill]',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 90%',
              once: true
            }
          }
        )
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className='mt-5 max-w-md'>
      <div className='flex items-baseline justify-between'>
        <span className='eyebrow'>Final GPA</span>
        <span className='font-mono text-sm'>
          <span className='text-signal'>{score.toFixed(2)}</span>
          <span className='text-muted-foreground'> / {max.toFixed(2)}</span>
        </span>
      </div>

      <div
        role='meter'
        aria-label='Final GPA'
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={score}
        className='relative mt-2.5'
      >
        <div className='bg-surface border-line relative h-2.5 border'>
          <span
            data-fill
            className='bg-signal absolute inset-y-0 left-0 origin-left'
            style={{ width: `${ratio * 100}%` }}
          />
        </div>

        {/* Ticks hang below the bar, longer on the whole points. */}
        <div aria-hidden className='relative h-2'>
          {Array.from({ length: steps + 1 }, (_, i) => (
            <span
              key={i}
              className='bg-line absolute top-0 w-px'
              style={{
                left: `${(i / steps) * 100}%`,
                height: i % 4 === 0 ? '0.5rem' : '0.25rem'
              }}
            />
          ))}
        </div>
        <div aria-hidden className='relative h-4'>
          {Array.from({ length: max + 1 }, (_, i) => (
            <span
              key={i}
              className='eyebrow text-foreground/40 absolute top-0.5 text-[0.625rem]'
              style={{
                left: `${(i / max) * 100}%`,
                transform:
                  i === 0
                    ? undefined
                    : i === max
                      ? 'translateX(-100%)'
                      : 'translateX(-50%)'
              }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
