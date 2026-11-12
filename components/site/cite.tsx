'use client'

import { useEffect, useRef } from 'react'

/**
 * A numbered citation after a claim, the way a grounded answer marks its
 * sources. Hovering or focusing it rings the element it points at; activating
 * it jumps there and keeps the ring on for a moment.
 */
export function Cite({
  n,
  target,
  label
}: {
  n: number
  /** id of the element that backs the claim. */
  target: string
  /** What the source is, for assistive technology. */
  label: string
}) {
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const mark = (on: boolean) => {
    document.getElementById(target)?.classList.toggle('cite-hit', on)
  }

  return (
    <sup>
      <a
        href={`#${target}`}
        className='cite'
        aria-label={`Source ${n}: ${label}`}
        onMouseEnter={() => mark(true)}
        onMouseLeave={() => mark(false)}
        onFocus={() => mark(true)}
        onBlur={() => mark(false)}
        onClick={() => {
          mark(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => mark(false), 2200)
        }}
      >
        [{n}]
      </a>
    </sup>
  )
}
