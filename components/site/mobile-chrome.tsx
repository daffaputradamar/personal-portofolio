'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { profile } from '@/lib/resume'
import { cn } from '@/lib/utils'
import { getLenis } from '@/lib/lenis-store'
import { ThemeToggle } from './theme-toggle'
import { TreeFooter, TreeNav, type TreeProps } from './sidebar-tree'

/** The open files. On the home page each one is a section to scroll to. */
const TABS = [
  { id: 'top', label: 'README.md', route: '/' },
  { id: 'platform', label: 'platform/', route: null },
  { id: 'work', label: 'work/', route: '/projects' },
  { id: 'skills', label: 'skills.md', route: null },
  { id: 'background', label: 'background.md', route: null },
  { id: 'writing', label: 'writing/', route: '/posts' },
  { id: 'contact', label: 'contact.md', route: '/contact' }
] as const

type TabId = (typeof TABS)[number]['id']

/**
 * Phone and tablet navigation, shaped like a code editor held in one hand:
 * a strip of file tabs across the top that follows the scroll, and a status
 * bar along the bottom with the current path, how far down the file you are,
 * and a button that pulls the file tree up as a sheet.
 *
 * Hidden from the lg breakpoint, where the sidebar takes over.
 */
export function MobileChrome(props: TreeProps) {
  const pathname = usePathname()
  const home = pathname === '/'
  const [section, setSection] = useState<TabId>('top')
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const strip = useRef<HTMLDivElement>(null)

  // Which tab is lit: the section under the reader's eye on the home page,
  // the matching file on the other routes.
  const current: TabId | null = home
    ? section
    : pathname.startsWith('/projects')
      ? 'work'
      : pathname.startsWith('/posts')
        ? 'writing'
        : pathname.startsWith('/contact')
          ? 'contact'
          : null

  // Follow the scroll: the last section whose top has passed the upper third
  // of the screen is the one being read. Also feeds the progress figure.
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
      if (!home) return
      const line = window.innerHeight * 0.35
      let found: TabId = 'top'
      for (const tab of TABS) {
        const el = document.getElementById(tab.id)
        if (el && el.getBoundingClientRect().top <= line) found = tab.id
      }
      setSection(found)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [home, pathname])

  // Keep the lit tab in view inside the strip, without moving the page.
  useEffect(() => {
    const bar = strip.current
    if (!bar || !current) return
    const tab = bar.querySelector<HTMLElement>(`[data-tab='${current}']`)
    if (!tab) return
    bar.scrollTo({
      left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2,
      behavior: 'smooth'
    })
  }, [current])

  // While the tree is up: hold the page still and let Escape put it away.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label = TABS.find(tab => tab.id === current)?.label
  const path = home
    ? `README.md${current && current !== 'top' ? ` › ${label}` : ''}`
    : (label ?? pathname.slice(1))

  return (
    <div className='lg:hidden'>
      {/* File tabs */}
      <header className='border-line bg-background/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl'>
        <div
          ref={strip}
          role='navigation'
          aria-label='Sections'
          className='flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {TABS.map(tab => {
            const lit = current === tab.id
            const className = cn(
              'relative flex h-12 shrink-0 items-center border-r px-4 font-mono text-[0.8125rem] transition-colors',
              lit
                ? 'bg-background text-foreground border-line'
                : 'text-muted-foreground border-line/60'
            )
            const mark = (
              <span
                aria-hidden
                className={cn(
                  'bg-signal absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300',
                  lit ? 'scale-x-100' : 'scale-x-0'
                )}
              />
            )

            // On the home page a tab scrolls to its section; elsewhere it
            // opens the matching page, or the section back on the home page.
            return home ? (
              <a
                key={tab.id}
                data-tab={tab.id}
                href={`#${tab.id}`}
                aria-current={lit ? 'location' : undefined}
                className={className}
              >
                {tab.label}
                {mark}
              </a>
            ) : (
              <Link
                key={tab.id}
                data-tab={tab.id}
                href={tab.route ?? `/#${tab.id}`}
                aria-current={lit ? 'page' : undefined}
                className={className}
              >
                {tab.label}
                {mark}
              </Link>
            )
          })}
        </div>
      </header>

      {/* Status bar */}
      <div className='border-line bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-xl'>
        <div className='flex h-12 items-center gap-1 pr-1 pl-1.5 font-mono text-[0.78rem]'>
          <button
            type='button'
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls='file-tree-sheet'
            className='bg-foreground text-background inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3'
          >
            <svg
              viewBox='0 0 16 16'
              aria-hidden
              className='h-3.5 w-3.5'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path d='M1.5 4.5h5l1.5 1.5h6.5v7h-13z' strokeLinejoin='round' />
            </svg>
            files
          </button>

          <p className='text-muted-foreground min-w-0 flex-1 truncate px-2'>
            <span className='text-foreground'>{path}</span>
          </p>

          <span
            className='text-muted-foreground w-10 shrink-0 text-right tabular-nums'
            aria-label={`${progress}% read`}
          >
            {progress}%
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* The file tree, pulled up from the status bar */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          'bg-foreground/35 fixed inset-0 z-[64] transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <div
        id='file-tree-sheet'
        role='dialog'
        aria-modal='true'
        aria-label='Files'
        inert={!open}
        data-lenis-prevent
        className={cn(
          'border-line bg-background ease-editorial fixed inset-x-0 bottom-0 z-[65] max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] transition-transform duration-500',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div
          aria-hidden
          className='bg-line mx-auto mb-4 h-1 w-10 rounded-full'
        />
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='display text-2xl leading-none'>{profile.name}</p>
            <p className='text-muted-foreground mt-1.5 text-base'>
              {profile.role} &middot; {profile.location.split(',')[0]}
            </p>
          </div>
          <button
            type='button'
            onClick={() => setOpen(false)}
            aria-label='Close files'
            className='border-line -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border'
          >
            <svg
              viewBox='0 0 24 24'
              aria-hidden
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path d='M6 6l12 12M18 6L6 18' strokeLinecap='round' />
            </svg>
          </button>
        </div>

        <div className='mt-6'>
          <TreeNav {...props} roomy onNavigate={() => setOpen(false)} />
        </div>

        <div className='border-line mt-6 border-t pt-5'>
          <TreeFooter withToggle={false} />
        </div>
      </div>
    </div>
  )
}
