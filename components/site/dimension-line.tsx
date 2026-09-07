import { cn } from '@/lib/utils'

/** Arrowhead for a dimension line. Points outward, toward its extension tick. */
function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      width='6'
      height='7'
      viewBox='0 0 6 7'
      fill='none'
      className='stroke-line shrink-0'
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d='M5.5 0.5 L0.5 3.5 L5.5 6.5'
        strokeWidth='1'
        strokeLinejoin='round'
      />
    </svg>
  )
}

/**
 * A drafting dimension: extension ticks at each end, arrowheads turned outward
 * and the measured value broken into the middle of the line.
 *
 * It stretches to its container, so put it directly above whatever it measures
 * and let that content set the width.
 */
export function DimensionLine({
  value,
  className
}: {
  value: string
  className?: string
}) {
  return (
    <div aria-hidden className={cn('flex items-center', className)}>
      <span className='bg-line h-2.5 w-px shrink-0' />
      <Arrow />
      <span className='bg-line h-px flex-1' />
      <span className='eyebrow text-foreground shrink-0 px-3'>{value}</span>
      <span className='bg-line h-px flex-1' />
      <Arrow flip />
      <span className='bg-line h-2.5 w-px shrink-0' />
    </div>
  )
}
