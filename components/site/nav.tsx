'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from 'motion/react'

import { profile } from '@/lib/resume'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/site/theme-toggle'

const links = [
  { name: 'Work', href: '/projects' },
  { name: 'Writing', href: '/posts' },
  { name: 'Contact', href: '/contact' }
]

export function Nav() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', latest => {
    setCondensed(latest > 24)
  })

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Lock the page behind the open sheet and let Escape dismiss it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          condensed
            ? 'border-b border-line bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        )}
      >
        <div className='container'>
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500',
              condensed ? 'h-14' : 'h-20'
            )}
          >
            {/* Wordmark */}
            <Link
              href='/'
              className='group flex items-baseline gap-2'
              aria-label='Home'
            >
              <span className='display text-lg leading-none tracking-tight'>
                {profile.name}
              </span>
              <span
                aria-hidden
                className='hidden h-1 w-1 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150 sm:block'
              />
            </Link>

            {/* Desktop links */}
            <nav className='hidden items-center gap-1 md:flex'>
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'group relative px-4 py-2 text-sm transition-colors',
                    isActive(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.name}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-4 -bottom-px h-px origin-left bg-primary transition-transform duration-500',
                      isActive(link.href)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-2'>
              <ThemeToggle />

              <a
                href={profile.resumeUrl}
                target='_blank'
                rel='noreferrer'
                className='hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-primary/60 hover:bg-primary/5 sm:inline-flex'
              >
                Resume
                <svg
                  aria-hidden
                  viewBox='0 0 24 24'
                  className='h-3.5 w-3.5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.75'
                >
                  <path d='M7 17 17 7M17 7H9M17 7v8' strokeLinecap='round' />
                </svg>
              </a>

              {/* Mobile trigger */}
              <button
                type='button'
                onClick={() => setMenuOpen(true)}
                className='-mr-2 inline-flex h-10 w-10 items-center justify-center md:hidden'
                aria-label='Open menu'
                aria-expanded={menuOpen}
              >
                <span className='flex flex-col gap-1.5'>
                  <span className='block h-px w-6 bg-foreground' />
                  <span className='block h-px w-6 bg-foreground' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className='fixed inset-0 z-[65] bg-background md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='container flex h-20 items-center justify-between'>
              <span className='display text-lg'>{profile.name}</span>
              <button
                type='button'
                onClick={closeMenu}
                className='-mr-2 inline-flex h-10 w-10 items-center justify-center'
                aria-label='Close menu'
              >
                <svg
                  viewBox='0 0 24 24'
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                >
                  <path d='M6 6l12 12M18 6L6 18' strokeLinecap='round' />
                </svg>
              </button>
            </div>

            <nav className='container mt-8 flex flex-col'>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                  className='rule py-5'
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className='display flex items-baseline justify-between text-4xl'
                  >
                    {link.name}
                    <span className='eyebrow'>{`0${i + 1}`}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={profile.resumeUrl}
                target='_blank'
                rel='noreferrer'
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.07, duration: 0.5 }}
                className='rule display flex items-baseline justify-between py-5 text-4xl'
              >
                Resume
                <span className='eyebrow'>PDF</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
