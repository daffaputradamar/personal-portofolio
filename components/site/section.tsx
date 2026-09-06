import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { TONES, type Tone } from './tones'

type SectionProps = {
  id?: string
  /** Two-digit running number, e.g. '02'. Part of the editorial rhythm. */
  index: string
  label: string
  /** Hue from the accent ramp. Colours the index, marker and top rule. */
  tone: Tone
  /** Large display headline. Optional — some sections need only the label. */
  title?: ReactNode
  /** Supporting paragraph beside the headline. */
  lede?: string
  children: ReactNode
  className?: string
}

/**
 * Shared section shell: a gradient top rule, a numbered label in the narrow
 * left column, and the heading and content in the wide right column.
 */
export function Section({
  id,
  index,
  label,
  tone,
  title,
  lede,
  children,
  className
}: SectionProps) {
  const t = TONES[tone]

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-20 md:py-28 lg:py-36', className)}
    >
      {/* Top rule: colour fades out across the first third of the page width. */}
      <div className='absolute inset-x-0 top-0 h-px bg-line' />
      <div
        aria-hidden
        className={cn(
          'absolute left-0 top-0 h-px w-1/3 bg-linear-to-r',
          t.gradient
        )}
      />

      <div className='container'>
        <div className='grid gap-x-10 gap-y-8 lg:grid-cols-12'>
          <Reveal className='lg:col-span-3' offset={16}>
            <div className='flex items-center gap-3 lg:sticky lg:top-28'>
              <span className={cn('eyebrow', t.text)}>{index}</span>
              <span aria-hidden className={cn('h-1 w-1 rounded-full', t.bg)} />
              <h2 className='eyebrow text-foreground'>{label}</h2>
            </div>
          </Reveal>

          <div className='lg:col-span-9'>
            {(title || lede) && (
              <div className='mb-12 max-w-3xl md:mb-16'>
                {title && (
                  <Reveal offset={20}>
                    <p className='display text-headline text-balance'>{title}</p>
                  </Reveal>
                )}
                {lede && (
                  <Reveal delay={0.1} offset={20}>
                    <p className='mt-6 max-w-xl text-base leading-relaxed text-muted-foreground'>
                      {lede}
                    </p>
                  </Reveal>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
