'use client'

import { useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { EASE, MOTION_OK, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap'

type AgentBuildProps = {
  children: ReactNode
  className?: string
  /** Start on load instead of when the block scrolls into view. */
  immediate?: boolean
  /** Multiplier on each cursor's pace. Sections further down run quicker. */
  speed?: number
  /**
   * How many cursors work at once. The blocks are dealt out between them in
   * turn, so three agents finish a build in about a third of the time.
   */
  agents?: number
}

/**
 * Builds its children in the way computer-use agents would: each cursor
 * travels to a block, drags a dashed frame around where it goes, and the block
 * is placed. Every descendant with the class `agent-place` is one step, in
 * document order; `data-agent-label` names it on the cursor's tag.
 *
 * The blocks start hidden through CSS only when motion is allowed, so with
 * reduced motion, or without JavaScript, the content is simply there.
 */
export function AgentBuild({
  children,
  className,
  immediate = false,
  speed = 1,
  agents = 1
}: AgentBuildProps) {
  const root = useRef<HTMLDivElement>(null)
  const frames = useRef<(HTMLDivElement | null)[]>([])
  const cursors = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      const boxes = frames.current.filter(item => item !== null)
      const pointers = cursors.current.filter(item => item !== null)
      if (boxes.length === 0 || pointers.length !== boxes.length) return

      const targets = Array.from(
        el.querySelectorAll<HTMLElement>('.agent-place')
      )
      if (targets.length === 0) return
      if (!window.matchMedia(MOTION_OK).matches) return

      let stopped = false
      let done = false

      /** Tell a block's own animations (streaming text) that it has landed. */
      const announce = (items: HTMLElement[]) =>
        items.forEach(item =>
          item.dispatchEvent(new CustomEvent('agent:placed'))
        )

      /** Put everything in its final state and retire the cursors. */
      const finish = () => {
        if (done) return
        done = true
        stopped = true
        gsap.killTweensOf([...boxes, ...pointers, ...targets])
        gsap.set(targets, { autoAlpha: 1, y: 0 })
        gsap.set([...boxes, ...pointers], { autoAlpha: 0 })
        announce(targets)
      }

      /** One cursor working through its share of the blocks. */
      const work = async (index: number, share: HTMLElement[]) => {
        const pointer = pointers[index]
        const box = boxes[index]
        const tag = pointer.querySelector('span')

        // Enter from a different spot along the right-hand side for each one.
        const origin = el.getBoundingClientRect()
        gsap.set(pointer, {
          x: origin.width * (0.55 + 0.14 * index),
          y:
            Math.min(origin.height, window.innerHeight) *
            (0.3 + 0.22 * (index % 3)),
          scale: 1
        })
        await gsap.to(pointer, {
          autoAlpha: 1,
          duration: 0.25,
          delay: index * 0.12
        })

        for (const target of share) {
          if (stopped) return
          const base = el.getBoundingClientRect()
          const rect = target.getBoundingClientRect()
          const x = rect.left - base.left
          const y = rect.top - base.top
          if (tag) tag.textContent = target.dataset.agentLabel ?? 'place'

          // Travel to the block's top-left corner.
          await gsap.to(pointer, {
            x: x - 4,
            y: y - 4,
            duration: 0.42 / speed,
            ease: 'power3.inOut'
          })
          if (stopped) return

          // Drag the frame out to the opposite corner.
          gsap.set(box, {
            x: x - 6,
            y: y - 6,
            width: 0,
            height: 0,
            autoAlpha: 1
          })
          await Promise.all([
            gsap.to(box, {
              width: rect.width + 12,
              height: rect.height + 12,
              duration: 0.36 / speed,
              ease: 'power2.out'
            }),
            gsap.to(pointer, {
              x: x + rect.width + 2,
              y: y + rect.height + 2,
              duration: 0.36 / speed,
              ease: 'power2.out'
            })
          ])
          if (stopped) return

          // Click: the block lands, the frame lets go.
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE }
          )
          announce([target])
          gsap.to(box, { autoAlpha: 0, duration: 0.3, delay: 0.1 })
          await gsap.to(pointer, {
            scale: 0.82,
            duration: 0.08,
            yoyo: true,
            repeat: 1
          })
        }

        if (stopped) return
        await gsap.to(pointer, {
          autoAlpha: 0,
          x: '+=36',
          y: '+=28',
          duration: 0.4
        })
      }

      const run = async () => {
        // Deal the blocks out in turn, so neighbours go to different cursors
        // and the page fills in evenly rather than top to bottom.
        const count = Math.min(pointers.length, targets.length)
        const shares = Array.from({ length: count }, (_, index) =>
          targets.filter((_, i) => i % count === index)
        )
        await Promise.all(shares.map((share, index) => work(index, share)))
        if (!stopped) done = true
      }

      const cleanups: Array<() => void> = []

      if (immediate) {
        const start = window.setTimeout(run, 350)

        // Skip to the finished page only on a clear intent to move on: a real
        // scroll away from the top, or Escape. A stray wheel tick, a key held
        // from the reload shortcut, or a restored scroll position of a few
        // pixels must not cancel it.
        const onScroll = () => {
          if (window.scrollY > 160) finish()
        }
        const onKey = (event: KeyboardEvent) => {
          if (event.key === 'Escape') finish()
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('keydown', onKey)
        cleanups.push(() => {
          window.clearTimeout(start)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('keydown', onKey)
        })
      } else {
        const enter = ScrollTrigger.create({
          trigger: el,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            run()
          }
        })
        // Scrolled well past before the cursors got there: just show it.
        const overtake = ScrollTrigger.create({
          trigger: el,
          start: 'top 22%',
          once: true,
          onEnter: finish
        })
        cleanups.push(() => {
          enter.kill()
          overtake.kill()
        })
      }

      return () => {
        stopped = true
        gsap.killTweensOf([...boxes, ...pointers, ...targets])
        cleanups.forEach(cleanup => cleanup())
      }
    },
    { scope: root }
  )

  return (
    <div ref={root} className={cn('relative', className)}>
      {children}

      <div className='agent-layer' aria-hidden>
        {Array.from({ length: Math.max(1, agents) }, (_, i) => (
          <div key={i} className='contents'>
            <div
              ref={node => {
                frames.current[i] = node
              }}
              className='agent-frame'
            />
            <div
              ref={node => {
                cursors.current[i] = node
              }}
              className='agent-cursor'
            >
              <svg viewBox='0 0 20 20'>
                <path
                  d='M3 2.5l13.5 6-5.6 1.9-1.9 5.6L3 2.5z'
                  fill='currentColor'
                  stroke='hsl(var(--background))'
                  strokeWidth='1.2'
                  strokeLinejoin='round'
                />
              </svg>
              <span>agent</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
