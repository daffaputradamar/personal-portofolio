import { cn } from '@/lib/utils'
import { profile } from '@/lib/resume'

/** Tray-and-arrow glyph, drawn to the same stroke as the site's other icons. */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('h-4 w-4 shrink-0', className)}
    >
      <path d='M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5' />
      <path d='M4.5 15.5V19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-3.5' />
    </svg>
  )
}

type Variant = 'primary' | 'outline'

const styles: Record<Variant, string> = {
  primary:
    'bg-signal text-primary-foreground hover:bg-foreground hover:text-background px-6 py-3.5 text-sm',
  outline:
    'border-signal/60 hover:bg-signal/10 text-foreground border px-6 py-3.5 text-sm'
}

/**
 * The CV download. Uses `download` so the PDF saves under a real file name
 * instead of opening in a tab, and states format and size up front so nobody
 * has to wonder what clicking it does.
 */
export function CvDownload({
  variant,
  size,
  className,
  onClick
}: {
  variant: Variant
  /** Pre-formatted file size, e.g. '236 KB'. Read on the server. */
  size?: string
  className?: string
  onClick?: () => void
}) {
  const meta = ['PDF', size].filter(Boolean).join(' · ')

  return (
    <a
      href={profile.resumeUrl}
      download={profile.resumeFileName}
      onClick={onClick}
      aria-label={`Download CV (${meta})`}
      className={cn(
        'group inline-flex items-center gap-2.5 transition-colors duration-300',
        styles[variant],
        className
      )}
    >
      <DownloadIcon className='transition-transform duration-300 group-hover:translate-y-0.5' />
      <span>Download CV</span>
      <span
        className={cn(
          'font-mono text-xs',
          variant === 'primary' ? 'opacity-75' : 'text-muted-foreground'
        )}
      >
        {meta}
      </span>
    </a>
  )
}
