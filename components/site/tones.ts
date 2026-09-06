/**
 * Accent ramp shared by every section. One hue per section (and per tech-stack
 * group) so colour marks structure instead of decorating at random.
 *
 * Class strings are written out in full because Tailwind scans source text —
 * a template-built class name like `text-accent-${n}` would never be generated.
 */
export type Tone = 1 | 2 | 3 | 4 | 5

type ToneStyles = {
  /** Foreground colour for indices and group headings. */
  text: string
  /** Solid fill for dots and markers. */
  bg: string
  /** Tinted panel used on hover. */
  hoverBg: string
  /** Border tint for chips and outlines. */
  border: string
  /** `bg-linear-to-r` stops for a fading rule. */
  gradient: string
}

export const TONES: Record<Tone, ToneStyles> = {
  1: {
    text: 'text-accent-1',
    bg: 'bg-accent-1',
    hoverBg: 'hover:bg-accent-1/10',
    border: 'border-accent-1/30',
    gradient: 'from-accent-1/80 to-transparent'
  },
  2: {
    text: 'text-accent-2',
    bg: 'bg-accent-2',
    hoverBg: 'hover:bg-accent-2/10',
    border: 'border-accent-2/30',
    gradient: 'from-accent-2/80 to-transparent'
  },
  3: {
    text: 'text-accent-3',
    bg: 'bg-accent-3',
    hoverBg: 'hover:bg-accent-3/10',
    border: 'border-accent-3/30',
    gradient: 'from-accent-3/80 to-transparent'
  },
  4: {
    text: 'text-accent-4',
    bg: 'bg-accent-4',
    hoverBg: 'hover:bg-accent-4/10',
    border: 'border-accent-4/30',
    gradient: 'from-accent-4/80 to-transparent'
  },
  5: {
    text: 'text-accent-5',
    bg: 'bg-accent-5',
    hoverBg: 'hover:bg-accent-5/10',
    border: 'border-accent-5/30',
    gradient: 'from-accent-5/80 to-transparent'
  }
}
