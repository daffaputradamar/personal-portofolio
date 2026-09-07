'use client'

import { useRef } from 'react'

import { cn } from '@/lib/utils'
import { EASE, MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

/** Seconds a word holds before the slot rolls to the next. */
const HOLD = 2.9
/** Seconds the roll itself takes. */
const ROLL = 0.7

/**
 * A headline word rendered as a rolling slot: one value shows at a time and the
 * next rises into its place through a mask, the way a mechanical counter turns.
 *
 * The first word sits in normal flow so it reserves the line height and is the
 * only one in the accessible tree — the alternates are decorative repetitions
 * of the same idea, and a screen reader running them together would read as one
 * long nonsense sentence.
 *
 * The mask is only as tall as the line box, so values must be descender-free
 * (or uppercase) — a 'p' or 'g' would be clipped on the way through.
 *
 * The alternates rest at opacity 0, so a visitor who has asked for reduced
 * motion — where no tween ever runs — is left with the first word alone rather
 * than all of them stacked.
 */
export function WordCycle({
  words,
  delay = 0,
  className
}: {
  words: readonly string[]
  delay?: number
  className?: string
}) {
  const slot = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = slot.current
      if (!el) return

      const items = gsap.utils.toArray<HTMLElement>('[data-word]', el)
      if (items.length === 0) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // The wrapper is hidden by CSS until motion is set up, matching how
        // TextReveal avoids a flash of unsplit text.
        gsap.set(el, { autoAlpha: 1 })
        // autoAlpha clears the alternates' resting opacity-0 as it parks them
        // below the mask, both in the same synchronous set — they never paint
        // stacked on top of the first word.
        gsap.set(items, { yPercent: 100, autoAlpha: 1 })
        gsap.set(items[0], { yPercent: 0 })

        // Entrance mirrors the masked rise of the lines above it.
        const intro = gsap.from(items[0], {
          yPercent: 115,
          duration: 1.2,
          delay,
          ease: EASE
        })

        if (items.length < 2) return () => intro.kill()

        let current = 0
        let next: gsap.core.Tween | null = null

        const roll = () => {
          const outgoing = items[current]
          current = (current + 1) % items.length
          const incoming = items[current]

          gsap.to(outgoing, {
            yPercent: -100,
            duration: ROLL,
            ease: 'power3.inOut'
          })
          gsap.fromTo(
            incoming,
            { yPercent: 100 },
            { yPercent: 0, duration: ROLL, ease: 'power3.inOut' }
          )

          // A fresh delayedCall per step rather than a repeating timeline, so
          // each roll reads live values and nothing snaps on wrap-around.
          next = gsap.delayedCall(HOLD, roll)
        }

        next = gsap.delayedCall(delay + HOLD, roll)

        return () => {
          next?.kill()
          intro.kill()
        }
      })
    },
    { scope: slot }
  )

  return (
    <span
      ref={slot}
      className={cn('gsap-split relative block overflow-hidden', className)}
    >
      {words.map((word, i) => (
        <span
          key={word}
          data-word
          aria-hidden={i > 0 || undefined}
          className={
            i === 0 ? 'block' : 'absolute inset-x-0 top-0 block opacity-0'
          }
        >
          {word}
        </span>
      ))}
    </span>
  )
}
