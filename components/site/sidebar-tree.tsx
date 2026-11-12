'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { profile, socials } from '@/lib/resume'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

export type TreeEntry = { slug: string; label: string }

export type TreeProps = {
  work: TreeEntry[]
  platform: TreeEntry[]
  cvSize?: string
}

const active = 'bg-signal/10 text-signal hover:text-signal'

/**
 * The site as a file tree. Folders link to their index page. Shared by the
 * desktop sidebar and the phone's pull-up sheet; `roomy` gives the rows a
 * finger-sized height, and `onNavigate` lets the sheet close on a tap.
 */
export function TreeNav({
  work,
  platform,
  cvSize,
  roomy = false,
  onNavigate
}: TreeProps & { roomy?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname()
  const at = (href: string) => pathname === href
  const under = (href: string) => pathname.startsWith(href)

  const row = cn(
    'block rounded-md pr-2.5 transition-colors hover:text-foreground',
    roomy ? 'py-2.5' : 'py-1.5'
  )

  return (
    <nav
      aria-label='Site'
      className={cn(
        'text-muted-foreground font-mono',
        roomy ? 'text-[0.875rem]' : 'text-[0.8125rem]'
      )}
    >
      <p className='text-foreground mb-1 px-2.5' aria-hidden>
        ▾ daffa-akbar
      </p>

      <Link
        href='/'
        onClick={onNavigate}
        aria-current={at('/') ? 'page' : undefined}
        className={cn(row, 'pl-7', at('/') && active)}
      >
        README.md
      </Link>

      <Link href='/#platform' onClick={onNavigate} className={cn(row, 'pl-7')}>
        ▾ platform/
      </Link>
      {platform.map(item => (
        <Link
          key={item.slug}
          href={`/projects/${item.slug}`}
          onClick={onNavigate}
          aria-current={at(`/projects/${item.slug}`) ? 'page' : undefined}
          className={cn(
            row,
            'truncate pl-12',
            at(`/projects/${item.slug}`) && active
          )}
        >
          {item.label}
        </Link>
      ))}

      <Link
        href='/projects'
        onClick={onNavigate}
        aria-current={at('/projects') ? 'page' : undefined}
        className={cn(row, 'pl-7', at('/projects') && active)}
      >
        ▾ work/
      </Link>
      {work.map(item => (
        <Link
          key={item.slug}
          href={`/projects/${item.slug}`}
          onClick={onNavigate}
          aria-current={at(`/projects/${item.slug}`) ? 'page' : undefined}
          className={cn(
            row,
            'truncate pl-12',
            at(`/projects/${item.slug}`) && active
          )}
        >
          {item.label}
        </Link>
      ))}

      <Link href='/#skills' onClick={onNavigate} className={cn(row, 'pl-7')}>
        skills.md
      </Link>
      <Link
        href='/#background'
        onClick={onNavigate}
        className={cn(row, 'pl-7')}
      >
        background.md
      </Link>
      <Link
        href='/posts'
        onClick={onNavigate}
        aria-current={under('/posts') ? 'page' : undefined}
        className={cn(row, 'pl-7', under('/posts') && active)}
      >
        ▸ writing/
      </Link>
      <Link
        href='/contact'
        onClick={onNavigate}
        aria-current={at('/contact') ? 'page' : undefined}
        className={cn(row, 'pl-7', at('/contact') && active)}
      >
        contact.md
      </Link>
      <a
        href={profile.resumeUrl}
        target='_blank'
        rel='noreferrer'
        onClick={onNavigate}
        className={cn(row, 'flex items-baseline justify-between gap-3 pl-7')}
      >
        cv.pdf
        {cvSize && <span className='text-xs opacity-70'>{cvSize}</span>}
      </a>
    </nav>
  )
}

/** Availability and the links out. Sits under the tree in both layouts. */
export function TreeFooter({ withToggle = true }: { withToggle?: boolean }) {
  return (
    <div>
      {profile.availability.open && (
        <p className='text-muted-foreground flex items-center gap-2.5 px-2.5 font-mono text-[0.78rem]'>
          <span
            aria-hidden
            className='animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-600'
          />
          {profile.availability.label.toLowerCase()}
        </p>
      )}

      <div className='mt-4 flex items-center justify-between'>
        <ul className='text-muted-foreground flex gap-4 px-2.5 font-mono text-[0.78rem]'>
          {socials.map(social => (
            <li key={social.name}>
              <a
                href={social.href}
                target={social.name === 'Email' ? undefined : '_blank'}
                rel='noreferrer'
                className='hover:text-foreground inline-flex min-h-9 items-center transition-colors'
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
        {withToggle && <ThemeToggle />}
      </div>
    </div>
  )
}

/** The desktop navigation: a fixed column with the tree in it. */
export function SidebarTree(props: TreeProps) {
  return (
    <aside
      data-lenis-prevent
      className='border-line sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto border-r px-7 py-10 lg:flex'
    >
      <Link href='/' className='display block text-3xl leading-none'>
        {profile.name}
      </Link>
      <p className='text-muted-foreground mt-2 text-[1.0625rem]'>
        {profile.role} &middot; {profile.location.split(',')[0]}
      </p>

      <div className='mt-8'>
        <TreeNav {...props} />
      </div>

      <div className='mt-auto pt-10'>
        <TreeFooter />
      </div>
    </aside>
  )
}
