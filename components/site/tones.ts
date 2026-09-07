/**
 * The site runs on a single signal colour rather than a per-section ramp — an
 * arbitrary hue per section reads as decoration, not information.
 *
 * Class strings are written out in full because Tailwind scans source text; a
 * template-built name like `text-${x}` would never be generated.
 */
export const TONE = {
  text: 'text-signal',
  bg: 'bg-signal',
  border: 'border-signal',
  hoverBg: 'hover:bg-signal/10'
} as const
