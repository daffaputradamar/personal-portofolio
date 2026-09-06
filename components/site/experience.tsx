import { experiences } from '@/lib/resume'
import { Reveal } from './reveal'
import { Section } from './section'

/**
 * The CV proper. Each role is a full-width row: period in the narrow left
 * column, the detail on the right.
 */
export function Experience() {
  return (
    <Section
      id='experience'
      index='03'
      tone={2}
      label='Experience'
      title='Where I have worked.'
    >
      <div>
        {experiences.map((role, i) => (
          <Reveal key={`${role.company}-${role.role}`} delay={i * 0.06}>
            <article className='rule group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12'>
              {/* Period */}
              <div className='md:col-span-3'>
                <p className='eyebrow text-foreground/80'>{role.period}</p>
                <div className='mt-3 flex flex-wrap items-center gap-2'>
                  <span className='rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-muted-foreground'>
                    {role.type}
                  </span>
                  {role.current && (
                    <span className='inline-flex items-center gap-1.5 rounded-full border border-accent-1/35 bg-accent-1/10 px-2.5 py-1 text-[0.6875rem] text-accent-1'>
                      <span className='h-1 w-1 animate-pulse-dot rounded-full bg-accent-1' />
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Role body */}
              <div className='md:col-span-9'>
                <h3 className='display text-2xl md:text-3xl'>{role.role}</h3>

                <p className='mt-1.5 text-sm'>
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='link-underline text-foreground'
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className='text-foreground'>{role.company}</span>
                  )}
                  <span className='text-muted-foreground'>
                    {' '}
                    &middot; {role.location}
                  </span>
                </p>

                <p className='mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
                  {role.summary}
                </p>

                <ul className='mt-6 space-y-3'>
                  {role.highlights.map(highlight => (
                    <li
                      key={highlight}
                      className='relative max-w-2xl pl-6 text-sm leading-relaxed text-muted-foreground'
                    >
                      <span
                        aria-hidden
                        className='absolute left-0 top-[0.6em] h-px w-3 bg-accent-2/70'
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className='mt-6 flex flex-wrap gap-2'>
                  {role.stack.map(tech => (
                    <li
                      key={tech}
                      className='rounded-full bg-surface px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground transition-colors group-hover:text-foreground'
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
