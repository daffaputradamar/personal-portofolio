'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { profile } from '@/lib/resume'
import { cn } from '@/lib/utils'
import { EASE, gsap, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/lenis-store'
import { ThemeToggle } from '@/components/site/theme-toggle'

const links = [
  { name: 'Work', href: '/projects' },
  { name: 'Writing', href: '/posts' },
  { name: 'Contact', href: '/contact' }
]

/**
 * `cvSize` is read from disk by the layout; the nav runs on the client. The CV
 * lives in the hero on desktop, so only the mobile sheet carries it here.
 */
export function Nav({ cvSize }: { cvSize?: string }) {
  const pathname = usePathname()
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)

  // Condense the bar once the page has moved. Plain listener: state is set
  // from the event callback, never synchronously inside the effect body.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    const initial = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(initial)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Pause smooth scrolling behind the sheet and let Escape dismiss it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    getLenis()?.stop()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  // The sheet stays mounted; GSAP fades it and staggers the links in.
  useGSAP(
    () => {
      const el = sheet.current
      if (!el) return
      const items = el.querySelectorAll<HTMLElement>('[data-sheet-item]')

      if (menuOpen) {
        gsap.to(el, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
        gsap.fromTo(
          items,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.06,
            delay: 0.08,
            ease: EASE
          }
        )
      } else {
        gsap.to(el, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
      }
    },
    { dependencies: [menuOpen], scope: sheet }
  )

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          condensed
            ? 'border-line bg-background/80 border-b backdrop-blur-xl'
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
            <Link
              href='/'
              className='group flex items-baseline gap-2'
              aria-label='Home'
            >
              <span className='display text-xl leading-none tracking-tight'>
                {profile.initial}
              </span>
              <span
                aria-hidden
                className='bg-signal hidden h-1.5 w-1.5 transition-transform duration-500 group-hover:scale-150 sm:block'
              />
            </Link>

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
                      'bg-signal absolute inset-x-4 -bottom-px h-px origin-left transition-transform duration-500',
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

              <button
                type='button'
                onClick={() => setMenuOpen(true)}
                className='-mr-2 inline-flex h-10 w-10 items-center justify-center md:hidden'
                aria-label='Open menu'
                aria-expanded={menuOpen}
                aria-controls='mobile-menu'
              >
                <span className='flex flex-col gap-1.5'>
                  <span className='bg-foreground block h-px w-6' />
                  <span className='bg-foreground block h-px w-6' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet — always mounted, faded by GSAP, inert while closed. */}
      <div
        ref={sheet}
        id='mobile-menu'
        data-lenis-prevent
        inert={!menuOpen}
        className='bg-background invisible fixed inset-0 z-65 opacity-0 md:hidden'
      >
        <div className='container flex h-20 items-center justify-between'>
          <span className='display text-xl'>{profile.name}</span>
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
            <div key={link.href} data-sheet-item className='rule py-5'>
              <Link
                href={link.href}
                onClick={closeMenu}
                className='display flex items-baseline justify-between text-4xl'
              >
                {link.name}
                <span className='eyebrow'>{`0${i + 1}`}</span>
              </Link>
            </div>
          ))}

          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            onClick={closeMenu}
            data-sheet-item
            className='rule display text-signal flex items-baseline justify-between py-5 text-4xl'
          >
            Download CV
            <span className='eyebrow'>
              {['PDF', cvSize].filter(Boolean).join(' · ')}
            </span>
          </a>
        </nav>
      </div>
    </>
  )
}
