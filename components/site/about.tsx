import Image from 'next/image'

import authorImage from '@/public/images/authors/me.jpg'
import { capabilities, profile } from '@/lib/resume'

/** One hue per capability block. */
const TONE_TEXT = ['text-accent-3', 'text-accent-4', 'text-accent-2']
const TONE_DOT = ['bg-accent-3', 'bg-accent-4', 'bg-accent-2']
import { Reveal } from './reveal'
import { Section } from './section'

export function About() {
  return (
    <Section
      id='about'
      index='01'
      tone={1}
      label='About'
      title='Software engineer working on applied AI and web platforms.'
    >
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-10'>
        {/* Bio */}
        <div className='lg:col-span-7'>
          <div className='space-y-6'>
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className='text-base leading-relaxed text-muted-foreground'>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Capability blocks */}
          <div className='mt-14 space-y-0'>
            {capabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={i * 0.08}>
                <div className='rule grid gap-4 py-7 sm:grid-cols-12'>
                  <h3
                    className={`display flex items-center gap-2.5 text-xl sm:col-span-4 ${TONE_TEXT[i % TONE_TEXT.length]}`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[i % TONE_DOT.length]}`}
                    />
                    {capability.title}
                  </h3>
                  <div className='sm:col-span-8'>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {capability.body}
                    </p>
                    <ul className='mt-4 flex flex-wrap gap-x-4 gap-y-2'>
                      {capability.items.map(item => (
                        <li key={item} className='eyebrow text-foreground/60'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Portrait + facts */}
        <div className='lg:col-span-5 lg:pl-10'>
          <Reveal delay={0.1}>
            <div className='relative aspect-4/5 w-full overflow-hidden rounded-sm bg-surface'>
              <Image
                src={authorImage}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes='(min-width: 1024px) 32rem, 100vw'
                className='object-cover grayscale transition-[filter,transform] duration-900 ease-editorial hover:scale-[1.03] hover:grayscale-0'
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className='mt-8'>
              {[
                { term: 'Based in', detail: profile.location },
                { term: 'Timezone', detail: profile.timezone },
                { term: 'Focus', detail: 'Applied AI, web platforms' },
                {
                  term: 'Working style',
                  detail: 'Remote, async-friendly'
                }
              ].map(fact => (
                <div
                  key={fact.term}
                  className='rule flex items-baseline justify-between gap-4 py-3.5'
                >
                  <dt className='eyebrow'>{fact.term}</dt>
                  <dd className='text-right text-sm text-foreground'>
                    {fact.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
