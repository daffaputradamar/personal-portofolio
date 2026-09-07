import Image from 'next/image'
import Link from 'next/link'

import type { ProjectMetadata } from '@/lib/projects'
import { Reveal } from './reveal'

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      aria-hidden
    >
      <rect x='4' y='10.5' width='16' height='10' rx='2' />
      <path d='M8 10.5V7a4 4 0 0 1 8 0v3.5' />
    </svg>
  )
}

/** Strips protocol and www so a URL can sit in a small label. */
function hostname(url?: string) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/**
 * Stand-in preview for projects with no screenshot. Typographic rather than a
 * placeholder image — an obviously empty grey box would read as a broken asset.
 */
function PreviewCard({ project }: { project: ProjectMetadata }) {
  const host = hostname(project.link)

  return (
    <div className='bg-surface flex h-full w-full flex-col justify-between p-5'>
      <div className='flex items-center gap-2'>
        {project.confidential ? (
          <>
            <LockIcon className='text-muted-foreground h-3.5 w-3.5' />
            <span className='eyebrow'>Private</span>
          </>
        ) : (
          <span className='eyebrow truncate'>{host ?? 'Case study'}</span>
        )}
      </div>

      <p className='display text-2xl leading-tight'>{project.title}</p>

      <ul className='flex flex-wrap gap-1.5'>
        {project.tech?.slice(0, 4).map(tech => (
          <li
            key={tech}
            className='border-line text-muted-foreground border px-2 py-0.5 font-mono text-xs'
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Project index. Every row shows its preview, summary and stack up front — no
 * hover or click is needed to learn what a project is. The row itself links to
 * the full write-up.
 */
export function WorkList({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <ul>
      {projects.map((project, i) => (
        <li key={project.slug}>
          <Reveal delay={Math.min(i, 4) * 0.04}>
            <Link
              href={`/projects/${project.slug}`}
              className='rule group grid gap-6 py-8 md:grid-cols-12 md:gap-8 md:py-10'
            >
              {/* Preview — always visible */}
              <div className='bg-surface relative aspect-video overflow-hidden rounded-sm md:col-span-4 md:aspect-4/3'>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title || ''}
                    fill
                    sizes='(min-width: 768px) 24rem, 100vw'
                    className='ease-editorial object-cover transition-transform duration-900 group-hover:scale-[1.03]'
                  />
                ) : (
                  <PreviewCard project={project} />
                )}
              </div>

              {/* Copy */}
              <div className='flex min-w-0 flex-col md:col-span-8'>
                <div className='flex flex-wrap items-baseline gap-x-4 gap-y-1'>
                  <span className='eyebrow text-signal'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {project.publishedAt && (
                    <span className='eyebrow text-foreground/55'>
                      {new Date(project.publishedAt).getFullYear()}
                    </span>
                  )}
                  {project.confidential && (
                    <span className='border-line text-muted-foreground inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-xs'>
                      <LockIcon className='h-2.5 w-2.5' />
                      Private
                    </span>
                  )}
                </div>

                <h3 className='display ease-editorial mt-3 text-2xl leading-tight transition-transform duration-600 md:text-4xl md:group-hover:translate-x-2'>
                  {project.title}
                </h3>

                <p className='text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed'>
                  {project.outcome ?? project.summary}
                </p>

                {project.tech && project.tech.length > 0 && (
                  <ul className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
                    {project.tech.slice(0, 6).map(tech => (
                      <li key={tech} className='text-foreground/60 font-mono text-xs'>
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <span className='text-muted-foreground group-hover:text-foreground mt-auto inline-flex items-center gap-2 pt-6 text-xs transition-colors'>
                  Read the write-up
                  <svg
                    aria-hidden
                    viewBox='0 0 24 24'
                    className='h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  >
                    <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
