'use client'

import { useRef } from 'react'

import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'

const focus = [
  {
    title: 'Run models internally',
    detail: 'Model serving & shared AI gateways'
  },
  {
    title: 'Connect AI to real work',
    detail: 'Enterprise data & document workflows'
  },
  {
    title: 'Build the platform around it',
    detail: 'Web apps, APIs & deployment'
  }
]

/** Seconds each node stays lit while the chart runs on its own. */
const HOLD = 2.8
/**
 * Peak-to-peak cursor tilt, in degrees. Kept small on purpose: an isometric
 * projection was tried here and it sheared the labels onto a diagonal and blew
 * past the column width. A few degrees of tilt gives depth and stays readable.
 */
const TILT = 8
/** Seconds before the idle cycle starts, so it follows the hero entrance. */
const LEAD_IN = 1.1

const EDGE = 34 // connector between two nodes
const STUB_IN = 30 // inbound edge above the first node
const STUB_OUT = 52 // outbound edge below the last node

/**
 * There is no frame to clip against, so open-ended edges dissolve instead of
 * being cut off — it reads as "continues" without a border to hide behind.
 */
const FADE = {
  in: 'linear-gradient(to bottom, transparent 0%, #000 80%)',
  out: 'linear-gradient(to top, transparent 0%, #000 55%)'
} as const

/**
 * A connector. `arrow` draws an arrowhead into the node below; `fade` dissolves
 * an open-ended edge into the page.
 *
 * Base and flow share one path `d`, so the animated overlay traces the line and
 * its arrowhead in a single stroke.
 */
function Edge({
  height,
  arrow = true,
  fade
}: {
  height: number
  arrow?: boolean
  fade?: keyof typeof FADE
}) {
  const d = arrow
    ? `M6 0 V ${height - 6} M2.75 ${height - 9.5} L6 ${height - 5} L9.25 ${height - 9.5}`
    : `M6 0 V ${height}`

  const mask = fade ? FADE[fade] : undefined

  return (
    <div aria-hidden className='flex justify-center'>
      <svg
        width='12'
        height={height}
        viewBox={`0 0 12 ${height}`}
        fill='none'
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        <path
          d={d}
          className='stroke-line'
          strokeWidth='1'
          strokeLinecap='round'
        />
        <path
          data-flow
          d={d}
          className='stroke-signal opacity-0'
          strokeWidth='1.25'
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
}

/**
 * The hero's capability card, drawn as a cut of a flowchart: three nodes wired
 * top to bottom, floating on the page with the edges above and below dissolving
 * into it.
 *
 * It animates on its own — the flow traces each edge and lights the node it
 * arrives at — and hands over to the cursor when a mouse enters, taking control
 * back on leave. Every node is legible at rest; the animation only shifts
 * emphasis and never gates content.
 *
 * The drift and the flow need only `prefers-reduced-motion: no-preference`, so
 * touch visitors still get the ambient version. Tilt additionally requires a
 * fine pointer.
 */
export function FocusCard() {
  const float = useRef<HTMLDivElement>(null)
  const chart = useRef<HTMLDivElement>(null)
  const stack = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const floatEl = float.current
      const el = chart.current
      const stackEl = stack.current
      if (!floatEl || !el || !stackEl) return

      const mm = gsap.matchMedia()

      mm.add({ motion: MOTION_OK, fine: '(pointer: fine)' }, context => {
        const { motion, fine } = (context.conditions ?? {}) as {
          motion?: boolean
          fine?: boolean
        }
        // Reduced motion: leave the chart exactly as rendered.
        if (!motion) return

        const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', stackEl)
        const halos = gsap.utils.toArray<HTMLElement>('[data-halo]', stackEl)
        const flows = gsap.utils.toArray<SVGPathElement>('[data-flow]', stackEl)
        const last = nodes.length - 1

        // Document order puts flow i as the edge arriving at node i, and the
        // final entry as the outbound edge leaving the last node.
        const lengths = flows.map(path => path.getTotalLength())
        flows.forEach((path, i) => {
          gsap.set(path, {
            strokeDasharray: lengths[i],
            strokeDashoffset: lengths[i],
            autoAlpha: 1
          })
        })

        /** Draw an edge in, or retract it downward if it is currently drawn. */
        const drawEdge = (index: number, on: boolean, delay = 0) => {
          const path = flows[index]
          if (!path) return
          const len = lengths[index]

          if (on) {
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 0.55,
              delay,
              ease: 'power2.out'
            })
            return
          }

          // Only retract what is actually visible — an already-hidden edge
          // animated to -len would draw itself fully on the way past zero.
          const now = Number(gsap.getProperty(path, 'strokeDashoffset'))
          if (Math.abs(now) < len * 0.98) {
            gsap.to(path, {
              strokeDashoffset: -len,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => gsap.set(path, { strokeDashoffset: len })
            })
          } else {
            gsap.set(path, { strokeDashoffset: len })
          }
        }

        let active = -1

        const setActive = (index: number) => {
          if (index === active) return
          active = index

          flows.forEach((_, i) => drawEdge(i, i === index))
          // Past the last node the flow carries on out of frame.
          if (index === last) drawEdge(last + 1, true, 0.5)

          nodes.forEach((node, i) => {
            gsap.to(node, {
              x: i === index ? 6 : 0,
              opacity: i === index ? 1 : 0.55,
              duration: 0.5,
              ease: 'power3'
            })
          })
          halos.forEach((halo, i) => {
            gsap.to(halo, {
              autoAlpha: i === index ? 1 : 0,
              duration: 0.45,
              ease: 'power2.out'
            })
          })
        }

        // ---- ambient: a drift that never stops ----
        const drift = gsap.to(floatEl, {
          y: -5,
          duration: 3.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })

        // ---- ambient: walk the flow down the chart ----
        let cycle: gsap.core.Tween | null = null
        let step = 0

        const tick = () => {
          setActive(step % nodes.length)
          step += 1
          // A fresh delayedCall each step, so every tween records live start
          // values — a repeating timeline would snap on wrap-around.
          cycle = gsap.delayedCall(HOLD, tick)
        }

        const stopCycle = () => {
          cycle?.kill()
          cycle = null
        }

        const startCycle = (delay = 0) => {
          stopCycle()
          cycle = gsap.delayedCall(delay, tick)
        }

        startCycle(LEAD_IN)

        const teardown = () => {
          stopCycle()
          drift.kill()
          gsap.set([floatEl, el], { clearProps: 'all' })
          gsap.set([...nodes, ...halos], { clearProps: 'transform,opacity' })
          gsap.set(flows, {
            clearProps: 'strokeDasharray,strokeDashoffset,opacity,visibility'
          })
        }

        if (!fine) return teardown

        // ---- cursor takes over ----
        gsap.set(el, { transformPerspective: 1000 })

        const rotateX = gsap.quickTo(el, 'rotationX', {
          duration: 0.8,
          ease: 'power3'
        })
        const rotateY = gsap.quickTo(el, 'rotationY', {
          duration: 0.8,
          ease: 'power3'
        })

        /** Node whose centre is nearest the cursor. */
        const nodeAt = (clientY: number) => {
          let nearest = 0
          let best = Infinity
          nodes.forEach((node, i) => {
            const rect = node.getBoundingClientRect()
            const distance = Math.abs(clientY - (rect.top + rect.height / 2))
            if (distance < best) {
              best = distance
              nearest = i
            }
          })
          return nearest
        }

        const onEnter = () => stopCycle()

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect()
          rotateY(((event.clientX - rect.left) / rect.width - 0.5) * TILT)
          rotateX((0.5 - (event.clientY - rect.top) / rect.height) * TILT)
          setActive(nodeAt(event.clientY))
        }

        const onLeave = () => {
          rotateX(0)
          rotateY(0)
          // Force the next step to re-apply, then resume where it left off.
          active = -1
          startCycle()
        }

        el.addEventListener('pointerenter', onEnter)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)

        return () => {
          el.removeEventListener('pointerenter', onEnter)
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          teardown()
        }
      })
    },
    { scope: float }
  )

  return (
    <div ref={float}>
      <div ref={chart} className='relative'>
        <div className='mb-4 flex items-baseline justify-between gap-4'>
          <h2 className='eyebrow'>What I work on</h2>
          <span className='eyebrow text-foreground/35'>3 steps</span>
        </div>

        <div ref={stack}>
          <Edge height={STUB_IN} fade='in' />

          {focus.map((item, i) => (
            <div key={item.title}>
              {i > 0 && <Edge height={EDGE} />}

              <div
                data-node
                className='border-line bg-surface relative border px-4 py-3.5'
              >
                {/* Lit state as an overlay, so no colour has to interpolate. */}
                <span
                  data-halo
                  aria-hidden
                  className='border-signal bg-signal/[0.08] pointer-events-none invisible absolute -inset-px border opacity-0'
                />
                <div className='relative flex gap-3.5'>
                  <span className='eyebrow text-foreground/45 pt-1'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className='text-base font-medium'>{item.title}</p>
                    <p className='text-muted-foreground mt-1 text-sm leading-relaxed'>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Edge height={STUB_OUT} arrow={false} fade='out' />
        </div>
      </div>
    </div>
  )
}
