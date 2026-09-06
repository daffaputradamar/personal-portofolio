/**
 * Circular seal with text set on a path, rotating slowly. A single fixed focal
 * point in the hero that carries no extra colour.
 */
export function RotatingBadge({ label }: { label: string }) {
  // Repeat the phrase so it fills the full circumference evenly.
  const text = `${label} \u2022 ${label} \u2022 `

  return (
    <div className='relative h-28 w-28 lg:h-32 lg:w-32'>
      <svg
        viewBox='0 0 100 100'
        className='animate-spin-slow h-full w-full'
        aria-hidden
      >
        <defs>
          <path
            id='badge-arc'
            fill='none'
            d='M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0'
          />
        </defs>
        <text className='fill-foreground/60 font-mono text-[8.2px] uppercase tracking-[0.24em]'>
          <textPath href='#badge-arc' startOffset='0'>
            {text}
          </textPath>
        </text>
      </svg>

      {/* Static centre mark */}
      <span className='absolute inset-0 flex items-center justify-center'>
        <span className='flex h-11 w-11 items-center justify-center rounded-full border border-accent-1/40 bg-accent-1/10'>
          <svg
            viewBox='0 0 24 24'
            className='h-4 w-4 text-accent-1'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.75'
            aria-hidden
          >
            <path d='M12 5v14M6 13l6 6 6-6' strokeLinecap='round' />
          </svg>
        </span>
      </span>
    </div>
  )
}
