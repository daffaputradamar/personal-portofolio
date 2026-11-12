import Link from 'next/link'

import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'
import { profile, socials } from '@/lib/resume'
import { stackCount } from './home/stack'

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

export async function SiteFooter() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()])
  // An API-style receipt for the page: every figure is counted, none invented.
  const usage = {
    projects: projects.length,
    posts: posts.length,
    tools: stackCount,
    built: new Date().toISOString().slice(0, 10)
  }

  return (
    <footer className='rule'>
      <div className='container py-14'>
        <div className='grid gap-12 md:grid-cols-12'>
          {/* Identity */}
          <div className='md:col-span-5'>
            <p className='display text-2xl'>{profile.name}</p>
            <p className='text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed'>
              {profile.role} and {profile.discipline}, based in{' '}
              {profile.location}. Available for remote work.
            </p>
            {profile.availability.open && (
              <p className='mt-5 inline-flex items-center gap-2.5'>
                <span
                  aria-hidden
                  className='bg-signal animate-pulse-dot h-1.5 w-1.5'
                />
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
                      className='link-underline text-muted-foreground hover:text-foreground text-sm transition-colors'
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
                    className='group text-muted-foreground hover:text-foreground flex items-baseline justify-between gap-4 text-sm transition-colors'
                  >
                    <span className='link-underline'>{social.name}</span>
                    <span className='text-foreground/35 truncate font-mono text-xs'>
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
                  className='text-muted-foreground hover:text-foreground flex items-baseline justify-between gap-4 text-sm transition-colors'
                >
                  <span className='link-underline'>View CV</span>
                  <span className='text-foreground/35 font-mono text-xs'>
                    PDF
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className='eyebrow mt-14 break-words'>
          <span className='text-signal'>usage</span> {JSON.stringify(usage)}
        </p>

        <div className='rule mt-4 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='eyebrow'>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className='flex items-center gap-6'>
            <Link
              href='/privacy'
              className='eyebrow hover:text-foreground transition-colors'
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
