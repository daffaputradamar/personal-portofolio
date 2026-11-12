'use client'

import { useEffect, useRef } from 'react'

import { MOTION_OK } from '@/lib/gsap'

export type Segment = { text: string; em?: boolean }

/**
 * Text that arrives a word at a time behind a caret, the way a model's answer
 * streams in.
 *
 * The full text is in the markup from the start, so it is read normally by
 * search engines, screen readers, and anyone with reduced motion. Streaming
 * starts when the enclosing `agent-place` block lands (AgentBuild fires
 * `agent:placed` on it), or when the text scrolls into view if there is none.
 */
export function StreamText({
  segments,
  className,
  interval = 60
}: {
  segments: Segment[]
  className?: string
  /** Milliseconds between words. */
  interval?: number
}) {
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia(MOTION_OK).matches) return

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'))
    words.forEach(word => {
      word.style.opacity = '0'
    })

    let timer: number | undefined
    let started = false

    const start = () => {
      if (started) return
      started = true
      let i = 0
      timer = window.setInterval(() => {
        words[i - 1]?.classList.remove('stream-cur')
        const word = words[i]
        if (!word) {
          window.clearInterval(timer)
          return
        }
        word.style.opacity = '1'
        // The caret rides on the newest word and leaves with the last one.
        if (i < words.length - 1) word.classList.add('stream-cur')
        i += 1
      }, interval)
    }

    const host = el.closest('.agent-place')
    let observer: IntersectionObserver | undefined
    if (host) {
      host.addEventListener('agent:placed', start, { once: true })
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) start()
        },
        { threshold: 0.6 }
      )
      observer.observe(el)
    }
    // Never leave the text hidden if the signal somehow does not arrive.
    const fallback = window.setTimeout(start, 12000)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(fallback)
      host?.removeEventListener('agent:placed', start)
      observer?.disconnect()
      words.forEach(word => {
        word.style.opacity = ''
        word.classList.remove('stream-cur')
      })
    }
  }, [interval])

  return (
    <span ref={root} className={className}>
      {segments.map((segment, s) => {
        const words = segment.text.split(' ').filter(Boolean)
        const content = words.map((word, w) => (
          <span key={`${s}-${w}`}>
            <span data-w>{word}</span>{' '}
          </span>
        ))
        return segment.em ? (
          <em key={s} className='text-signal'>
            {content}
          </em>
        ) : (
          <span key={s}>{content}</span>
        )
      })}
    </span>
  )
}
