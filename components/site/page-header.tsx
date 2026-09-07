import type { ReactNode } from 'react'

import { Reveal } from './reveal'
import { TextReveal } from './text-reveal'

type PageHeaderProps = {
  eyebrow: string
  title: string
  lede?: string
  /** Right-hand metadata, e.g. a count or a filter control. */
  aside?: ReactNode
}

/** Masthead for the inner routes. Mirrors the home page's section rhythm. */
export function PageHeader({ eyebrow, title, lede, aside }: PageHeaderProps) {
  return (
    <header className='container pt-32 pb-14 md:pt-40 md:pb-20'>
      <Reveal offset={12}>
        <div className='tick-rule mb-5 w-40' />
        <p className='eyebrow text-signal'>{eyebrow}</p>
      </Reveal>

      <div className='mt-6 grid gap-8 md:grid-cols-12 md:items-end'>
        <h1 className='display text-display text-balance md:col-span-7'>
          <TextReveal text={title} immediate stagger={0.05} />
        </h1>

        <div className='md:col-span-5 md:pb-2'>
          {lede && (
            <Reveal delay={0.2}>
              <p className='max-w-md text-base leading-relaxed text-muted-foreground'>
                {lede}
              </p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={0.28}>
              <div className='mt-6'>{aside}</div>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  )
}
