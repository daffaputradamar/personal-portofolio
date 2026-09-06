import Link from 'next/link'

import { getProjects } from '@/lib/projects'
import { Reveal } from './reveal'
import { Section } from './section'
import { WorkList } from './work-list'

export async function SelectedWork() {
  const projects = await getProjects(4)
  const all = await getProjects()

  return (
    <Section
      id='work'
      index='05'
      tone={4}
      label='Work'
      title='Selected projects.'
      lede='Client and internal work, most of it built end to end. Open any project for the details.'
    >
      <WorkList projects={projects} />

      <Reveal delay={0.1}>
        <Link
          href='/projects'
          className='group mt-10 inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <span className='link-underline'>
            All {all.length} projects
          </span>
          <svg
            aria-hidden
            viewBox='0 0 24 24'
            className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
          </svg>
        </Link>
      </Reveal>
    </Section>
  )
}
