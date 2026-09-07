import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { profile } from '@/lib/resume'
import { Magnetic } from './magnetic'
import { Reveal } from './reveal'
import { TextReveal } from './text-reveal'

/** Closing block of the sheet. The last thing a reader sees before the footer. */
export function ContactCta() {
  return (
    <section id='contact' className='container pt-10 pb-24 md:pb-32'>
      <div className='tick-rule' />

      <div className='mt-4 flex items-baseline justify-between gap-6'>
        <p className='eyebrow text-foreground'>
          <span className='text-signal'>[07]</span> Contact
        </p>
        <span className='eyebrow inline-flex items-center gap-2'>
          <span aria-hidden className='bg-signal animate-pulse-dot h-1.5 w-1.5' />
          {profile.availability.label}
        </span>
      </div>

      <h2 className='display text-display mt-12 max-w-3xl uppercase md:mt-16'>
        <TextReveal text='Let’s work' block />
        <span className='text-signal block'>
          <TextReveal text='together.' delay={0.14} block />
        </span>
      </h2>

      <Reveal delay={0.12}>
        <p className='text-muted-foreground mt-8 max-w-md text-sm leading-relaxed'>
          Building an AI platform or web application? Tell me what you have in
          mind.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className='mt-10 flex flex-wrap items-center gap-6'>
          <Magnetic>
            <Link
              href='/contact'
              className='group bg-foreground text-background inline-flex items-center gap-4 px-6 py-3.5 text-sm'
            >
              Start a conversation
              <ArrowUpRight
                aria-hidden
                className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              />
            </Link>
          </Magnetic>

          <a
            href={`mailto:${profile.email}`}
            className='link-underline py-2 font-mono text-sm'
          >
            {profile.email}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
