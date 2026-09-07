'use client'

import { useRef } from 'react'

import { cn } from '@/lib/utils'
import { EASE, MOTION_OK, SplitText, gsap, useGSAP } from '@/lib/gsap'

type TextRevealProps = {
  text: string
  className?: string
  /** Seconds before the first line moves. */
  delay?: number
  /** Seconds between consecutive words. */
  stagger?: number
  /** Play on mount instead of waiting for the viewport — for above the fold. */
  immediate?: boolean
  /** Render as a block so the parent's `text-wrap: balance` still applies. */
  block?: boolean
}

/**
 * Line-masked word reveal. SplitText wraps each line in a clipping mask and
 * the words rise up through it. `autoSplit` re-splits after fonts load and on
 * resize, so wrapping is always measured against the real typeface.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  immediate = false,
  block = false
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'split-line',
          wordsClass: 'split-word',
          onSplit(self) {
            // Words start below their mask, so the wrapper can become visible
            // the instant the split exists without any flash of unstyled text.
            gsap.set(el, { autoAlpha: 1 })
            return gsap.from(self.words, {
              yPercent: 115,
              duration: 1.2,
              ease: EASE,
              stagger,
              delay,
              scrollTrigger: immediate
                ? undefined
                : { trigger: el, start: 'top 90%', once: true }
            })
          }
        })
        return () => split.revert()
      })
    },
    { scope: ref, dependencies: [text] }
  )

  return (
    <span
      ref={ref}
      className={cn(
        'gsap-split max-w-full',
        block ? 'block' : 'inline-block',
        className
      )}
    >
      {text}
    </span>
  )
}
