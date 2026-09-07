import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionProps = {
  id?: string
  /** Two-digit block number, e.g. '02'. */
  index: string
  label: string
  /** Large display headline. Optional — some blocks need only the label. */
  title?: ReactNode
  /** Supporting paragraph beside the headline. */
  lede?: string
  /** Right-hand figure in the block header, e.g. a count. */
  meta?: string
  children: ReactNode
  className?: string
}

/**
 * A block in the datasheet: a ruled scale across the full width, the block
 * number and name bracketed on the left, and an optional figure on the right —
 * the way a spec sheet titles a section.
 */
export function Section({
  id,
  index,
  label,
  title,
  lede,
  meta,
  children,
  className
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 pt-10 pb-20 md:pb-28', className)}
    >
      <div className='container'>
        <div className='tick-rule' />

        <div className='mt-4 flex items-baseline justify-between gap-6'>
          <h2 className='eyebrow text-foreground'>
            <span className='text-signal'>[{index}]</span> {label}
          </h2>
          {meta && <span className='eyebrow'>{meta}</span>}
        </div>

        {(title || lede) && (
          <div className='mt-10 grid gap-6 md:mt-14 md:grid-cols-12'>
            {title && (
              <Reveal offset={16} className='md:col-span-7'>
                <p className='display text-headline text-balance uppercase'>
                  {title}
                </p>
              </Reveal>
            )}
            {lede && (
              <Reveal delay={0.1} offset={16} className='md:col-span-5'>
                <p className='text-muted-foreground max-w-md text-sm leading-relaxed'>
                  {lede}
                </p>
              </Reveal>
            )}
          </div>
        )}

        <div className='mt-12 md:mt-16'>{children}</div>
      </div>
    </section>
  )
}
