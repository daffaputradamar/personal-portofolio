import { marqueeSkills } from '@/lib/resume'

/** Separator dots cycle the accent ramp so the ticker carries colour too. */
const DOTS = [
  'bg-accent-1',
  'bg-accent-2',
  'bg-accent-3',
  'bg-accent-4',
  'bg-accent-5'
]

/**
 * Seamless skill ticker. The list is rendered twice inside a `w-max` track and
 * the keyframe travels exactly -50%, so the second copy lands where the first
 * began and the seam is invisible.
 */
export function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills]

  return (
    <div
      aria-hidden
      className='rule relative overflow-hidden border-b border-line py-5'
    >
      <div className='flex w-max animate-marquee items-center'>
        {items.map((skill, i) => (
          <span key={`${skill}-${i}`} className='flex items-center'>
            <span className='eyebrow whitespace-nowrap px-6 text-foreground/70'>
              {skill}
            </span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOTS[i % DOTS.length]}`}
            />
          </span>
        ))}
      </div>

      {/* Feather the edges into the page background. */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent' />
    </div>
  )
}
