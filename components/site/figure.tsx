import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Registration mark at one corner of the frame, the way a drawing is cropped. */
function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn('border-foreground/40 absolute h-2.5 w-2.5', className)}
    />
  )
}

/**
 * A numbered figure in the datasheet: framed, on a dot grid, with the caption
 * ruled off underneath. Diagrams are written as HTML rather than images, so the
 * text in them reads, scales and gets indexed like the rest of the page.
 */
export function Figure({
  number,
  title,
  note,
  children,
  className,
  bodyClassName
}: {
  /** Two-digit figure number, e.g. '01'. */
  number: string
  title: string
  /** Right-hand caption text, e.g. a legend or a source. */
  note?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <figure className={cn('border-line relative border', className)}>
      <Corner className='-top-px -left-px border-t border-l' />
      <Corner className='-top-px -right-px border-t border-r' />
      <Corner className='-bottom-px -left-px border-b border-l' />
      <Corner className='-right-px -bottom-px border-r border-b' />

      <div className={cn('figure-grid p-5 md:p-8', bodyClassName)}>
        {children}
      </div>

      <figcaption className='border-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t px-5 py-3 md:px-8'>
        <span className='eyebrow text-foreground'>
          <span className='text-signal'>Fig. {number}</span>
          <span className='text-foreground/35'> — </span>
          {title}
        </span>
        {note && <span className='eyebrow'>{note}</span>}
      </figcaption>
    </figure>
  )
}

/**
 * One end of a connector: a small open chevron, drawn in the line colour so it
 * belongs to the rule rather than to the pulse running along it.
 */
export function Chevron({
  direction,
  className
}: {
  direction: 'right' | 'down' | 'up'
  className?: string
}) {
  const rotate = { right: 0, down: 90, up: -90 }[direction]
  return (
    <svg
      aria-hidden
      width='7'
      height='9'
      viewBox='0 0 7 9'
      fill='none'
      className={cn('stroke-foreground/45 shrink-0', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d='M1 1 L5.5 4.5 L1 8'
        strokeWidth='1.1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

/**
 * A labelled connector between two blocks. Horizontal from `md` up, vertical
 * below it, so a diagram can reflow from a row into a column without a second
 * version of itself.
 */
export function Connector({
  label,
  delay = 0,
  className
}: {
  label?: string
  /** Seconds to offset the pulse, so neighbouring edges do not fire in step. */
  delay?: number
  className?: string
}) {
  const style = { '--flow-delay': `${delay}s` } as React.CSSProperties

  return (
    <div
      aria-hidden
      className={cn(
        'relative flex items-center justify-center',
        'h-14 flex-col md:h-auto md:flex-row md:self-center',
        className
      )}
    >
      {/* Vertical, for the stacked layout. */}
      <span className='flow-y h-full md:hidden' style={style} />
      <Chevron direction='down' className='-mt-1 md:hidden' />

      {/* Horizontal, for the row layout. */}
      <span className='relative hidden w-full items-center md:flex'>
        <span className='flow-x w-full' style={style} />
        <Chevron direction='right' className='-ml-1.5' />
        {label && (
          <span className='eyebrow text-foreground/45 absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.625rem] whitespace-nowrap'>
            {label}
          </span>
        )}
      </span>
      {label && (
        <span className='eyebrow text-foreground/45 absolute top-1/2 left-1/2 ml-3 -translate-y-1/2 text-[0.625rem] md:hidden'>
          {label}
        </span>
      )}
    </div>
  )
}
