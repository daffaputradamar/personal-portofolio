import { cn } from '@/lib/utils'
import { profile } from '@/lib/resume'

/** Page with an outward arrow — "opens elsewhere", at the site's stroke. */
function OpenIcon({ className }: { className?: string }) {
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
      <path d='M14 4h6v6M20 4l-9 9' />
      <path d='M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5' />
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
 * The CV link. Opens the PDF in a new tab, where the browser's viewer offers
 * its own save button, and states format and size up front so nobody has to
 * wonder what clicking it does.
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
      target='_blank'
      rel='noreferrer'
      onClick={onClick}
      aria-label={`View CV (${meta}, opens in a new tab)`}
      className={cn(
        'group inline-flex items-center gap-2.5 transition-colors duration-300',
        styles[variant],
        className
      )}
    >
      <OpenIcon className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
      <span>View CV</span>
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
