'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from 'motion/react'

import type { ProjectMetadata } from '@/lib/projects'

/** Row indices cycle the accent ramp, one hue per project. */
const INDEX_TONES = [
  'text-accent-1',
  'text-accent-2',
  'text-accent-3',
  'text-accent-4',
  'text-accent-5'
]

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
    <div className='flex h-full w-full flex-col justify-between bg-surface p-5'>
      <div className='flex items-center gap-2'>
        {project.confidential ? (
          <>
            <LockIcon className='h-3.5 w-3.5 text-muted-foreground' />
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
            className='rounded-full border border-line px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground'
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Project index. On a mouse, hovering a row shows a preview that follows the
 * cursor. Touch and reduced-motion users get the plain list with an inline
 * preview instead.
 */
export function WorkList({ projects }: { projects: ProjectMetadata[] }) {
  const [active, setActive] = useState<number | null>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 28, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 260, damping: 28, mass: 0.5 })

  const trackCursor = (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    rawX.set(event.clientX)
    rawY.set(event.clientY)
  }

  const activeProject = active !== null ? projects[active] : null

  return (
    <div
      onPointerMove={trackCursor}
      onPointerLeave={() => setActive(null)}
      className='relative'
    >
      <ul>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              onPointerEnter={event => {
                if (event.pointerType === 'mouse') setActive(i)
              }}
              onFocus={() => setActive(i)}
              className='rule group block py-7 md:py-9'
            >
              <div className='flex items-baseline gap-5 md:gap-8'>
                <span
                  className={`eyebrow shrink-0 pt-1 opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${INDEX_TONES[i % INDEX_TONES.length]}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-baseline gap-x-4 gap-y-1'>
                    <h3 className='display text-2xl leading-tight transition-transform duration-600 ease-editorial md:text-4xl md:group-hover:translate-x-2'>
                      {project.title}
                    </h3>
                    {project.publishedAt && (
                      <span className='eyebrow text-foreground/35'>
                        {new Date(project.publishedAt).getFullYear()}
                      </span>
                    )}
                    {project.confidential && (
                      <span className='inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[0.625rem] text-muted-foreground'>
                        <LockIcon className='h-2.5 w-2.5' />
                        Private
                      </span>
                    )}
                  </div>

                  <p className='mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground transition-transform duration-600 ease-editorial md:group-hover:translate-x-2'>
                    {project.summary}
                  </p>

                  {project.tech && project.tech.length > 0 && (
                    <ul className='mt-3 flex flex-wrap gap-x-3 gap-y-1'>
                      {project.tech.slice(0, 5).map(tech => (
                        <li
                          key={tech}
                          className='font-mono text-[0.6875rem] text-foreground/40'
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Inline preview for touch / narrow viewports */}
                  <div className='relative mt-5 aspect-video w-full overflow-hidden rounded-sm bg-surface md:hidden'>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title || ''}
                        fill
                        sizes='100vw'
                        className='object-cover'
                      />
                    ) : (
                      <PreviewCard project={project} />
                    )}
                  </div>
                </div>

                <span
                  aria-hidden
                  className='shrink-0 self-center text-muted-foreground transition-all duration-500 group-hover:text-foreground md:group-hover:translate-x-1'
                >
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.25'
                  >
                    <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview */}
      {!reduced && (
        <AnimatePresence>
          {activeProject && (
            <motion.div
              key='preview'
              className='pointer-events-none fixed left-0 top-0 z-40 hidden md:block'
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className='relative -translate-x-1/2 -translate-y-1/2'>
                <div className='relative h-[13rem] w-[20rem] overflow-hidden rounded-sm border border-line bg-surface shadow-2xl shadow-black/30'>
                  {activeProject.image ? (
                    <Image
                      src={activeProject.image}
                      alt=''
                      fill
                      sizes='20rem'
                      className='object-cover'
                    />
                  ) : (
                    <PreviewCard project={activeProject} />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
