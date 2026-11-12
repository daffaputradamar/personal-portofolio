import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getClientProjects, getProjectsBySlugs } from '@/lib/projects'
import { AgentBuild } from '../agent-build'
import { DocSection } from '../doc-section'
import { Reveal } from '../reveal'
import { WORK_SLUGS } from './featured'

/** Strips protocol and www so a URL can sit in a small label. */
function hostname(url?: string) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/** Freelance and personal work, newest first. */
export async function Work() {
  const [all, projects] = await Promise.all([
    getClientProjects(),
    getProjectsBySlugs(WORK_SLUGS)
  ])

  return (
    <DocSection
      id='work'
      file='work/'
      title='On my own time'
      call='list_dir("work/")'
      result={`${all.length} projects`}
      lede='Personal projects and freelance work for schools, sales teams and families, alongside the day job since 2020.'
    >
      <AgentBuild speed={1.7}>
        <ul>
          {projects.map(project => (
            <li
              key={project.slug}
              className='agent-place'
              data-agent-label='project'
            >
              <Link
                href={`/projects/${project.slug}`}
                className='border-line group flex flex-wrap items-center gap-x-10 gap-y-5 border-t py-7'
              >
                <div className='border-line bg-surface relative aspect-[16/10] w-full max-w-[18.5rem] shrink-0 overflow-hidden rounded-md border'>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=''
                      fill
                      sizes='(min-width: 768px) 18.5rem, 90vw'
                      className='object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]'
                    />
                  ) : (
                    // No screenshot yet: a typographic tile, so it never
                    // reads as a broken image.
                    <div className='flex h-full flex-col justify-between p-4'>
                      <span className='eyebrow text-xs'>
                        {project.role ?? 'Project'}
                      </span>
                      <span className='display text-2xl leading-tight'>
                        {project.title}
                      </span>
                      <span className='eyebrow text-xs'>
                        {project.tech?.slice(0, 3).join(' · ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className='min-w-0 flex-[2_1_20rem]'>
                  <p className='eyebrow'>work/{project.slug}</p>
                  <h3 className='display mt-0.5 text-[2.125rem] leading-[1.1]'>
                    {project.title}{' '}
                    <span
                      aria-hidden
                      className='text-signal inline-block transition-transform duration-500 group-hover:translate-x-1.5'
                    >
                      →
                    </span>
                  </h3>
                  <p className='mt-2 max-w-[30em]'>{project.summary}</p>
                  <p className='eyebrow mt-2.5'>
                    {project.tech?.join(' · ') ?? hostname(project.link)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </AgentBuild>

      <Reveal>
        <Link
          href='/projects'
          className='link-underline border-line mt-0 inline-flex items-center gap-2 pt-6 text-sm'
        >
          All {all.length} personal and freelance projects
          <ArrowUpRight aria-hidden className='h-4 w-4' />
        </Link>
      </Reveal>
    </DocSection>
  )
}
