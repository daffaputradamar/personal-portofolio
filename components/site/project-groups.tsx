'use client'

import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export type GroupGlyph = 'chat' | 'document' | 'agents' | 'analysis'

export type ProjectGroup = {
  title: string
  /** Folder name shown on the card's tab, e.g. 'assistants'. */
  dir: string
  body: string
  glyph: GroupGlyph
  /** id of the part of the platform figure this group corresponds to. */
  node?: string
  projects: { slug: string; title: string; summary: string }[]
}

/** A small line drawing for each kind of project. */
function Glyph({ kind }: { kind: GroupGlyph }) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden
      className='text-signal h-9 w-9 shrink-0'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {kind === 'chat' && (
        <>
          <path d='M4 5h16v11H10l-5 4v-4H4z' />
          <path d='M8 9h8M8 12h5' />
        </>
      )}
      {kind === 'document' && (
        <>
          <path d='M6 3h9l4 4v14H6z' />
          <path d='M15 3v4h4' />
          <path d='M9 14.5l2.2 2.2 4.3-4.6' />
        </>
      )}
      {kind === 'agents' && (
        <>
          <circle cx='5' cy='12' r='2.2' />
          <circle cx='19' cy='6' r='2.2' />
          <circle cx='19' cy='18' r='2.2' />
          <path d='M7 11l10-4.2M7 13l10 4.2' />
        </>
      )}
      {kind === 'analysis' && (
        <>
          <path d='M3.5 20h17' />
          <path d='M7 20v-7M12 20V5M17 20v-10' />
        </>
      )}
    </svg>
  )
}

function GroupCard({ group }: { group: ProjectGroup }) {
  /** The project picked inside this card, if any. */
  const [picked, setPicked] = useState<number | null>(null)
  const shown = picked === null ? null : group.projects[picked]

  // Pointing at a card rings the matching part of the platform figure above.
  const ring = (on: boolean) => {
    if (!group.node) return
    document.getElementById(group.node)?.classList.toggle('cite-hit', on)
  }

  return (
    <li
      className='agent-place flex flex-col'
      data-agent-label='group'
      onMouseEnter={() => ring(true)}
      onMouseLeave={() => {
        ring(false)
        setPicked(null)
      }}
    >
      <p className='file-tab self-start'>platform/{group.dir}/</p>

      <div className='border-line bg-elevated hover:border-signal/60 relative -mt-px flex grow flex-col overflow-hidden rounded-md rounded-tl-none border p-5 transition-colors duration-300 md:p-6'>
        {/* The count, large and faint, as the card's backdrop. */}
        <span
          aria-hidden
          className='display text-foreground/[0.06] pointer-events-none absolute -top-3 right-3 text-[7.5rem] leading-none select-none'
        >
          {String(group.projects.length).padStart(2, '0')}
        </span>

        <div className='relative flex items-center gap-3.5'>
          <Glyph kind={group.glyph} />
          <div>
            <h3 className='display text-[1.75rem] leading-[1.15]'>
              {group.title}
            </h3>
            <p className='eyebrow'>{group.projects.length} projects</p>
          </div>
        </div>

        <p className='relative mt-4'>{group.body}</p>

        <ul className='relative mt-4 flex flex-wrap gap-1.5'>
          {group.projects.map((project, i) => (
            <li key={project.slug}>
              <button
                type='button'
                onMouseEnter={() => setPicked(i)}
                onFocus={() => setPicked(i)}
                onClick={() => setPicked(i)}
                aria-pressed={picked === i}
                className={cn(
                  'min-h-9 rounded-md border px-2.5 py-1 text-left text-[0.9375rem] leading-tight transition-colors duration-200',
                  picked === i
                    ? 'border-signal bg-signal text-primary-foreground'
                    : 'border-line bg-background hover:border-signal'
                )}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>

        {/* One line about the picked project. Fixed height, so the card
            never changes size. */}
        <p
          className='border-line relative mt-auto flex min-h-[7.25rem] flex-col justify-center border-t pt-4 text-[1.0625rem] leading-snug sm:min-h-[6.25rem]'
          aria-live='polite'
        >
          {shown ? (
            <>
              <span>{shown.summary}</span>
              <Link
                href={`/projects/${shown.slug}`}
                className='eyebrow hover:text-signal mt-1.5 self-start underline underline-offset-4'
              >
                read the write-up
              </Link>
            </>
          ) : (
            <span className='text-muted-foreground'>
              Pick a project to see what it does.
            </span>
          )}
        </p>
      </div>
    </li>
  )
}

/**
 * What runs on the platform, by kind. Each group is a folder-like card with
 * its own drawing and count; picking a project shows its one-line description
 * in place, so the page shows four groups rather than twenty-odd write-ups.
 */
export function ProjectGroups({ groups }: { groups: ProjectGroup[] }) {
  return (
    <ul className='grid gap-x-6 gap-y-8 md:grid-cols-2'>
      {groups.map(group => (
        <GroupCard key={group.dir} group={group} />
      ))}
    </ul>
  )
}
