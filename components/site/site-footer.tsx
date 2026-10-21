import Link from 'next/link'

import { profile, socials } from '@/lib/resume'

const columns = [
  {
    heading: 'Site',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Work', href: '/projects' },
      { name: 'Writing', href: '/posts' },
      { name: 'Contact', href: '/contact' }
    ]
  }
]

export function SiteFooter() {
  return (
    <footer className='rule'>
      <div className='container py-14'>
        <div className='grid gap-12 md:grid-cols-12'>
          {/* Identity */}
          <div className='md:col-span-5'>
            <p className='display text-2xl'>{profile.name}</p>
            <p className='mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground'>
              {profile.role} and {profile.discipline}, based in{' '}
              {profile.location}. Available for remote work.
            </p>
            {profile.availability.open && (
              <p className='mt-5 inline-flex items-center gap-2.5'>
                <span aria-hidden className='bg-signal animate-pulse-dot h-1.5 w-1.5' />
                <span className='eyebrow text-foreground'>
                  {profile.availability.label}
                </span>
              </p>
            )}
          </div>

          {columns.map(column => (
            <nav key={column.heading} className='md:col-span-3'>
              <p className='eyebrow'>{column.heading}</p>
              <ul className='mt-4 space-y-2.5'>
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='link-underline text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className='md:col-span-4'>
            <p className='eyebrow'>Elsewhere</p>
            <ul className='mt-4 space-y-2.5'>
              {socials.map(social => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.name === 'Email' ? undefined : '_blank'}
                    rel='noreferrer'
                    className='group flex items-baseline justify-between gap-4 text-sm text-muted-foreground transition-colors hover:text-foreground'
                  >
                    <span className='link-underline'>{social.name}</span>
                    <span className='truncate font-mono text-xs text-foreground/35'>
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-baseline justify-between gap-4 text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  <span className='link-underline'>View CV</span>
                  <span className='font-mono text-xs text-foreground/35'>
                    PDF
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='rule mt-14 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='eyebrow'>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className='flex items-center gap-6'>
            <Link
              href='/privacy'
              className='eyebrow transition-colors hover:text-foreground'
            >
              Privacy
            </Link>
            <p className='eyebrow'>Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
