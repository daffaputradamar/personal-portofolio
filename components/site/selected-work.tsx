import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getProjects } from '@/lib/projects'
import { PlatformDiagram } from './platform-diagram'
import { Reveal } from './reveal'
import { Section } from './section'

const featured = [
  { slug: 'agent-builder', label: 'Agent platform' },
  { slug: 'rag-knowledge-base', label: 'Retrieval service' },
  { slug: 'app-consultant', label: 'Architecture documents' },
  { slug: 'successor-planning', label: 'Decision support' }
]

/**
 * Featured systems as spec entries. Each carries the problem, the outcome and
 * the stack in place, so a visitor learns what was built without opening
 * anything; the write-up link is there for whoever wants the long version.
 */
export async function SelectedWork() {
  const all = await getProjects()

  return (
    <Section
      id='work'
      index='01'
      label='Selected work'
      title='The internal AI platform at MPM'
      lede='Private systems, described in the open. Problem, outcome and stack for each.'
      meta={`${all.length} total`}
    >
      <Reveal>
        <PlatformDiagram />
      </Reveal>

      <div className='border-line mt-14 border-t md:mt-20'>
        {featured.map((item, i) => {
          const project = all.find(project => project.slug === item.slug)
          if (!project) return null

          return (
            <Reveal key={item.slug} delay={Math.min(i, 3) * 0.05}>
              <article className='border-line grid gap-6 border-b py-8 md:grid-cols-12 md:gap-8 md:py-10'>
                <div className='md:col-span-4'>
                  <div className='flex items-baseline gap-3'>
                    <span className='eyebrow text-signal'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className='eyebrow'>{item.label}</span>
                  </div>
                  <h3 className='display mt-3 text-2xl md:text-3xl'>
                    {project.title}
                  </h3>
                  {project.tech && project.tech.length > 0 && (
                    <ul className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
                      {project.tech.map(tech => (
                        <li
                          key={tech}
                          className='text-foreground/55 font-mono text-xs'
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className='md:col-span-8'>
                  <dl className='space-y-4'>
                    {project.problem && (
                      <div className='grid gap-1.5 sm:grid-cols-[5.5rem_1fr] sm:gap-4'>
                        <dt className='eyebrow sm:pt-0.5'>Problem</dt>
                        <dd className='text-muted-foreground text-sm leading-relaxed'>
                          {project.problem}
                        </dd>
                      </div>
                    )}
                    {project.outcome && (
                      <div className='grid gap-1.5 sm:grid-cols-[5.5rem_1fr] sm:gap-4'>
                        <dt className='eyebrow sm:pt-0.5'>Outcome</dt>
                        <dd className='text-sm leading-relaxed'>
                          {project.outcome}
                        </dd>
                      </div>
                    )}
                    {!project.problem && !project.outcome && (
                      <dd className='text-muted-foreground text-sm leading-relaxed'>
                        {project.summary}
                      </dd>
                    )}
                  </dl>

                  <Link
                    href={`/projects/${project.slug}`}
                    className='link-underline text-muted-foreground hover:text-foreground mt-5 inline-flex items-center gap-1.5 text-xs transition-colors'
                  >
                    Full write-up
                    <ArrowUpRight aria-hidden className='h-3.5 w-3.5' />
                  </Link>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1}>
        <Link
          href='/projects'
          className='link-underline mt-8 inline-flex items-center gap-2 text-sm'
        >
          All {all.length} projects
          <ArrowUpRight aria-hidden className='h-4 w-4' />
        </Link>
      </Reveal>
    </Section>
  )
}
