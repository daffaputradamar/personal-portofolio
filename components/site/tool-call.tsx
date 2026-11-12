'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK } from '@/lib/gsap'

/**
 * One line of an agent's tool use above a section: the call, a moment of
 * work, then what came back. Rendered resolved on the server; with motion
 * allowed it runs once, when the section first scrolls into view.
 */
export function ToolCall({
  call,
  result,
  className
}: {
  /** e.g. `list_dir("work/")` */
  call: string
  /** e.g. `5 projects` */
  result: string
  className?: string
}) {
  const root = useRef<HTMLParagraphElement>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia(MOTION_OK).matches) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setRunning(true)
        timer = window.setTimeout(() => setRunning(false), 900)
      },
      { threshold: 1 }
    )
    observer.observe(el)

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <p
      ref={root}
      className={cn(
        'eyebrow flex flex-wrap items-center gap-x-2 text-[0.75rem]',
        className
      )}
    >
      <span
        aria-hidden
        className={running ? 'text-muted-foreground' : 'text-signal'}
      >
        {running ? '▸' : '✓'}
      </span>
      <span>{call}</span>
      {running ? (
        <span className='typing-dots' aria-hidden>
          <i />
          <i />
          <i />
        </span>
      ) : (
        <span className='log-line text-foreground'>→ {result}</span>
      )}
    </p>
  )
}
