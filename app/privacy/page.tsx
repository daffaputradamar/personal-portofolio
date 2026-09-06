import type { Metadata } from 'next'

import { PageHeader } from '@/components/site/page-header'
import { profile } from '@/lib/resume'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${profile.name} handles personal information submitted through this site.`,
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true }
}

const EFFECTIVE_DATE = '2024-09-20'

const sections = [
  {
    heading: 'Information collection and use',
    body: 'I do not actively collect personal information from visitors. If you contact me through the form on this site or by email, I collect and store what you send — typically your name, email address and the contents of your message.'
  },
  {
    heading: 'How the information is used',
    body: 'Anything you send is used solely to reply to your enquiry. I do not sell, rent or share your personal information with third parties, except where required by law.'
  },
  {
    heading: 'Log data',
    body: "Like most sites, this one may receive standard request data from your browser — IP address, browser type and version, the pages you visit, and the time and date of the visit. It is used in aggregate, to understand traffic."
  },
  {
    heading: 'Cookies',
    body: 'This site stores your light/dark theme preference in your browser so it persists between visits. You can clear or block that storage through your browser settings at any time.'
  },
  {
    heading: 'Third-party links',
    body: 'Pages here link out to other websites. I am not responsible for the privacy practices of those sites, and I would encourage you to read their policies.'
  },
  {
    heading: 'Data security',
    body: 'I take reasonable measures to protect what you send me. No method of transmission or electronic storage is completely secure, so I cannot guarantee absolute security.'
  },
  {
    heading: 'Changes to this policy',
    body: 'If this policy changes, the revised version will be posted on this page with an updated effective date.'
  }
]

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        eyebrow={`Effective ${formatDate(EFFECTIVE_DATE)}`}
        title='Privacy policy'
        lede='What this site collects when you get in touch, and what happens to it.'
      />

      <div className='container-prose pb-32'>
        <div className='space-y-0'>
          {sections.map((section, i) => (
            <section
              key={section.heading}
              className='rule grid gap-3 py-8 md:grid-cols-12 md:gap-8'
            >
              <p className='eyebrow md:col-span-1'>
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className='md:col-span-11'>
                <h2 className='display text-xl'>{section.heading}</h2>
                <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                  {section.body}
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className='rule mt-4 py-8'>
          <h2 className='display text-xl'>Contact</h2>
          <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
            Questions about this policy? Write to{' '}
            <a
              href={`mailto:${profile.email}`}
              className='link-underline text-foreground'
            >
              {profile.email}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  )
}
