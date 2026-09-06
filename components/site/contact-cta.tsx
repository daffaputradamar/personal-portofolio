import Link from 'next/link'

import { profile } from '@/lib/resume'
import { Aurora } from './aurora'
import { Magnetic } from './magnetic'
import { Reveal } from './reveal'
import { TextReveal } from './text-reveal'

/** Closing call to action. The last thing a reader sees before the footer. */
export function ContactCta() {
  return (
    <section id='contact' className='rule relative overflow-hidden py-24 md:py-36'>
      <Aurora variant='spectrum' />

      <div className='container relative'>
        <div className='mx-auto max-w-4xl text-center'>

          <h2 className='display mt-7 text-display text-balance'>
            <TextReveal text={'Let’s work'} stagger={0.05} />{' '}
            <span className='text-primary/90'>
              <TextReveal text='together.' delay={0.18} stagger={0.05} />
            </span>
          </h2>

          <Reveal delay={0.15}>
            <p className='mx-auto mt-8 max-w-lg text-base leading-relaxed text-muted-foreground'>
              I am open to contract, full-time and advisory work. Send a short
              note about the project and I will reply within a few days.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className='mt-11 flex flex-wrap items-center justify-center gap-3'>
              <Magnetic>
                <Link
                  href='/contact'
                  className='group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground'
                >
                  Start a conversation
                  <svg
                    aria-hidden
                    viewBox='0 0 24 24'
                    className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.75'
                  >
                    <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
                  </svg>
                </Link>
              </Magnetic>

              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className='inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-foreground/5'
                >
                  {profile.email}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
