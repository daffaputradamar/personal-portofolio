import { cn } from '@/lib/utils'

type AuroraProps = {
  className?: string
  /**
   * `brand` keeps every field in the single accent hue, so the colour reads as
   * one light source. `spectrum` mixes three hues — reserved for the closing
   * section, where a finale is wanted.
   */
  variant?: 'brand' | 'spectrum'
  /** Halves the intensity. Use behind large type so it never competes. */
  subtle?: boolean
}

/**
 * Slow-drifting colour fields. Blurred far past the point of any visible edge,
 * so they read as ambient light rather than shapes.
 */
export function Aurora({
  className,
  variant = 'brand',
  subtle = false
}: AuroraProps) {
  const hues =
    variant === 'spectrum'
      ? ['--accent-1', '--accent-3', '--accent-4']
      : ['--accent-1', '--accent-1', '--accent-1']

  const fields = [
    {
      hue: hues[0],
      alpha: 0.5,
      className:
        'animate-float-a -left-[10%] top-[-15%] h-[45vw] w-[45vw]',
      opacity: subtle ? 'opacity-15 dark:opacity-25' : 'opacity-25 dark:opacity-35'
    },
    {
      hue: hues[1],
      alpha: 0.4,
      className: 'animate-float-b right-[-8%] top-[10%] h-[40vw] w-[40vw]',
      opacity: subtle ? 'opacity-12 dark:opacity-20' : 'opacity-20 dark:opacity-28'
    },
    {
      hue: hues[2],
      alpha: 0.4,
      className: 'animate-float-c bottom-[-20%] left-[25%] h-[42vw] w-[42vw]',
      opacity: subtle ? 'opacity-10 dark:opacity-18' : 'opacity-18 dark:opacity-25'
    }
  ]

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      {fields.map((field, i) => (
        <div
          key={i}
          className={cn(
            'absolute rounded-full blur-[120px]',
            field.className,
            field.opacity
          )}
          style={{
            background: `radial-gradient(circle, hsl(var(${field.hue}) / ${field.alpha}) 0%, transparent 70%)`
          }}
        />
      ))}
    </div>
  )
}
