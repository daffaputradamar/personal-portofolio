'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK } from '@/lib/gsap'

export type AskItem = {
  /** The suggested question, shown on its chip. */
  question: string
  answer: string
  /** Where the answer comes from: label and in-page anchor or route. */
  sources: { label: string; href: string }[]
  /** Lower-case words that route a typed question to this answer. */
  keywords: string[]
}

const FALLBACK =
  'I can only answer from what is written on this page. Try one of the questions below.'

/**
 * A prompt box under the hero. The answers are written ahead of time from the
 * CV and streamed word by word; nothing is sent anywhere and no model is
 * called, which the box says about itself.
 */
export function AskReadme({
  items,
  name,
  className
}: {
  items: AskItem[]
  /** First name, for the placeholder. */
  name: string
  className?: string
}) {
  const [query, setQuery] = useState('')
  /** Index into items, -1 for the fallback, null before anything is asked. */
  const [active, setActive] = useState<number | null>(null)
  const [asked, setAsked] = useState('')
  /** Words of the answer revealed so far. */
  const [count, setCount] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearInterval(timer.current), [])

  const text =
    active === null ? '' : active === -1 ? FALLBACK : items[active].answer
  const words = text.split(' ')
  const done = active !== null && count >= words.length
  const sources = active !== null && active >= 0 ? items[active].sources : []

  const answer = (index: number, question: string) => {
    window.clearInterval(timer.current)
    setActive(index)
    setAsked(question)

    const total = (index === -1 ? FALLBACK : items[index].answer).split(
      ' '
    ).length
    if (!window.matchMedia(MOTION_OK).matches) {
      setCount(total)
      return
    }
    setCount(0)
    let shown = 0
    timer.current = window.setInterval(() => {
      shown += 1
      setCount(shown)
      if (shown >= total) window.clearInterval(timer.current)
    }, 34)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const typed = query.trim()
    if (!typed) return
    const lower = typed.toLowerCase()
    const match = items.findIndex(item =>
      item.keywords.some(keyword => lower.includes(keyword))
    )
    answer(match, typed)
    setQuery('')
  }

  return (
    <div
      className={cn(
        'border-line bg-elevated rounded-md border p-4 md:p-5',
        className
      )}
    >
      <form
        onSubmit={submit}
        className='flex items-center gap-3 font-mono text-[0.875rem]'
      >
        <span aria-hidden className='text-signal'>
          &gt;
        </span>
        <label htmlFor='ask-readme' className='sr-only'>
          Ask a question about {name}
        </label>
        <input
          id='ask-readme'
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={`ask about ${name}`}
          autoComplete='off'
          className='placeholder:text-muted-foreground min-h-11 min-w-0 flex-1 bg-transparent outline-none'
        />
        <button
          type='submit'
          className='border-line hover:border-signal hover:text-signal min-h-11 rounded-md border px-3.5 transition-colors'
        >
          ask
        </button>
      </form>

      <ul className='mt-3 flex flex-wrap gap-2'>
        {items.map((item, i) => (
          <li key={item.question}>
            <button
              type='button'
              onClick={() => answer(i, item.question)}
              aria-pressed={active === i}
              className={cn(
                'min-h-9 rounded-full border px-3.5 py-1 text-left font-mono text-[0.78rem] transition-colors',
                active === i
                  ? 'border-signal bg-signal/10 text-signal'
                  : 'border-line text-muted-foreground hover:border-signal hover:text-foreground'
              )}
            >
              {item.question}
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div className='border-line mt-4 border-t pt-4' aria-live='polite'>
          <p className='eyebrow'>
            <span className='text-signal'>you</span> {asked}
          </p>
          <p className='mt-2 max-w-[38em]'>
            {words.slice(0, count).map((word, i) => (
              <span key={i}>
                <span
                  className={
                    !done && i === count - 1 ? 'stream-cur' : undefined
                  }
                >
                  {word}
                </span>{' '}
              </span>
            ))}
            {count === 0 && (
              <span className='typing-dots text-muted-foreground'>
                <i />
                <i />
                <i />
              </span>
            )}
          </p>

          {done && sources.length > 0 && (
            <ul className='log-line mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.78rem]'>
              {sources.map((source, i) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    className='text-muted-foreground hover:text-signal transition-colors'
                  >
                    <span className='text-signal'>[{i + 1}]</span>{' '}
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className='eyebrow mt-3 text-[0.72rem] opacity-80'>
        Scripted from this page. No model is called and nothing is sent.
      </p>
    </div>
  )
}
