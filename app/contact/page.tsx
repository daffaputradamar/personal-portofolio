import type { Metadata } from 'next'

import ContactForm from '@/components/contact-form'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { CvDownload } from '@/components/site/cv-download'
import { profile, socials } from '@/lib/resume'
import { getResumeSize } from '@/lib/resume-file'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} about contract, full-time or advisory work.`,
  alternates: { canonical: '/contact' }
}

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow='Contact'
        title='Get in touch.'
        lede='I am open to contract, full-time and advisory work. Send a short note about the project and I will reply within a few days.'
      />

      <div className='container pb-32'>
        <div className='grid gap-14 lg:grid-cols-12 lg:gap-10'>
          {/* Form */}
          <div className='lg:col-span-7'>
            <ContactForm />
          </div>

          {/* Direct channels */}
          <aside className='lg:col-span-5 lg:pl-10'>
            <Reveal delay={0.1}>
              <p className='eyebrow'>Or reach me directly</p>

              <ul className='mt-5'>
                {socials.map(social => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target={social.name === 'Email' ? undefined : '_blank'}
                      rel='noreferrer'
                      className='rule group flex items-baseline justify-between gap-4 py-4'
                    >
                      <span className='text-sm text-foreground'>
                        {social.name}
                      </span>
                      <span className='flex items-center gap-2 truncate font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
                        {social.handle}
                        <svg
                          aria-hidden
                          viewBox='0 0 24 24'
                          className='h-3 w-3 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            d='M7 17 17 7M17 7H9M17 7v8'
                            strokeLinecap='round'
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className='mt-12'>
                {[
                  { term: 'Based in', detail: profile.location },
                  { term: 'Timezone', detail: profile.timezone },
                  {
                    term: 'Status',
                    detail: profile.availability.open
                      ? profile.availability.label
                      : 'Not currently available'
                  }
                ].map(fact => (
                  <div
                    key={fact.term}
                    className='rule flex items-baseline justify-between gap-4 py-3.5'
                  >
                    <dt className='eyebrow'>{fact.term}</dt>
                    <dd className='text-right text-sm'>{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.28}>
              <CvDownload
                variant='primary'
                size={getResumeSize()}
                className='mt-10'
              />
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  )
}
