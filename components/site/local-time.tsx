'use client'

import { useEffect, useRef } from 'react'

import { profile } from '@/lib/resume'

const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: profile.timezoneId,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})

/**
 * Live local time where the work happens. Written straight to the DOM rather
 * than held in state: it changes every second and nothing else depends on it,
 * so there is no reason to re-render the hero for it. The server renders the
 * placeholder, which also keeps hydration honest.
 */
export function LocalTime() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const paint = () => {
      el.textContent = clock.format(new Date())
    }
    paint()
    const id = window.setInterval(paint, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span ref={ref} className='tabular-nums'>
      --:--:--
    </span>
  )
}
