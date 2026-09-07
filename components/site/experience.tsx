import { experiences } from '@/lib/resume'
import { DrawLine } from './draw-line'
import { Reveal } from './reveal'
import { Section } from './section'

/**
 * The CV proper. Each role is a row on a timeline whose rule draws itself as
 * the reader scrolls. Every highlight is visible — nothing to expand.
 */
export function Experience() {
  return (
    <Section
      id='experience'
      index='04'
      label='Experience'
      title='Where I have worked'
      meta={`${experiences.length} roles`}
    >
      <div className='relative pl-7 md:pl-10'>
        {/* Static track, then the signal line draws over it with scroll. */}
        <span
          aria-hidden
          className='bg-line absolute top-0 bottom-0 left-0 w-px'
        />
        <DrawLine className='bg-signal left-0' />

        {experiences.map((role, i) => (
          <Reveal key={`${role.company}-${role.role}`} delay={i * 0.05}>
            <article className='border-line relative grid gap-6 border-b py-9 md:grid-cols-12 md:gap-8 md:py-11'>
              {/* Timeline node — a square, to match the rest of the sheet. */}
              <span
                aria-hidden
                className='bg-background border-signal absolute top-11 -left-[calc(1.75rem+3.5px)] h-[7px] w-[7px] border md:top-12 md:-left-[calc(2.5rem+3.5px)]'
              />

              <div className='md:col-span-3'>
                <p className='eyebrow text-foreground'>{role.period}</p>
                <div className='mt-2.5 flex flex-wrap items-center gap-2'>
                  <span className='border-line text-muted-foreground border px-2 py-0.5 font-mono text-xs'>
                    {role.type}
                  </span>
                  {role.current && (
                    <span className='border-signal/40 bg-signal/10 text-signal inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-xs'>
                      <span className='animate-pulse-dot bg-signal h-1 w-1' />
                      Current
                    </span>
                  )}
                </div>
              </div>

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

                <p className='text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed'>
                  {role.summary}
                </p>

                <ul className='mt-6 space-y-3.5'>
                  {role.highlights.map(highlight => (
                    <li
                      key={highlight}
                      className='text-muted-foreground relative max-w-2xl pl-6 text-sm leading-relaxed'
                    >
                      <span
                        aria-hidden
                        className='bg-signal/80 absolute top-[0.65em] left-0 h-px w-3'
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className='mt-6 flex flex-wrap gap-x-3 gap-y-1'>
                  {role.stack.map(tech => (
                    <li
                      key={tech}
                      className='text-foreground/55 font-mono text-xs'
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
