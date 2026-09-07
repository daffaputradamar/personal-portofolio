'use client'

import { useTheme } from 'next-themes'

/**
 * Both glyphs are always in the markup and CSS picks the visible one from the
 * `dark` class on <html>. That avoids the usual mounted-state guard, so there
 * is no hydration mismatch and no icon flash on first paint.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <button
      type='button'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='text-muted-foreground hover:bg-surface hover:text-foreground inline-flex h-10 w-10 items-center justify-center transition-colors'
    >
      {/* Light theme: offer the moon. */}
      <svg
        viewBox='0 0 24 24'
        className='h-4 w-4 dark:hidden'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
      >
        <path d='M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z' />
      </svg>

      {/* Dark theme: offer the sun. */}
      <svg
        viewBox='0 0 24 24'
        className='hidden h-4 w-4 dark:block'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
      >
        <circle cx='12' cy='12' r='4' />
        <path d='M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' />
      </svg>

      <span className='sr-only'>Toggle theme</span>
    </button>
  )
}
