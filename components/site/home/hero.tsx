import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

import authorImage from '@/public/images/authors/me.jpg'
import { profile } from '@/lib/resume'
import { AgentBuild } from '../agent-build'
import { AskReadme, type AskItem } from '../ask-readme'
import { CvDownload } from '../cv-download'
import { StreamText } from '../stream-text'

/**
 * The top of README.md. On a first visit an agent cursor places each block in
 * turn; see AgentBuild for how that degrades.
 */
export function Hero({ cvSize }: { cvSize?: string }) {
  const city = profile.location.split(',')[0]

  // Written ahead of time from the CV. The box streams them; no model is called.
  const ask: AskItem[] = [
    {
      question: 'What do you run at MPM?',
      answer:
        'I built and operate the company’s LLM serving on vLLM, put LiteLLM in front of it as one gateway for every internal app, and build agent applications on top with LangChain and LangGraph. The data warehouse can now be asked questions in plain language.',
      sources: [
        { label: 'platform/', href: '#platform' },
        { label: 'background.md', href: '#background' }
      ],
      keywords: ['mpm', 'infra', 'platform', 'llm', 'gateway', 'company', 'run']
    },
    {
      question: 'What is your stack?',
      answer:
        'For AI: vLLM, LiteLLM, LangChain and LangGraph, mostly in Python. Underneath: Node.js, .NET, Docker, PostgreSQL and SQL Server. For the web: Next.js, React and TypeScript.',
      sources: [{ label: 'skills.md', href: '#skills' }],
      keywords: ['stack', 'tech', 'tool', 'language', 'framework', 'skill']
    },
    {
      question: 'What have you built on your own?',
      answer:
        'The newest is The Job Looker, which gathers job listings and reads each one against your CV with an LLM. Before that, freelance web apps for schools, sales teams and families, since 2020.',
      sources: [{ label: 'work/', href: '#work' }],
      keywords: [
        'own',
        'personal',
        'side',
        'freelance',
        'project',
        'built',
        'build'
      ]
    },
    {
      question: 'Are you available?',
      answer: `Yes. I am ${profile.availability.label.toLowerCase()}, based in ${city} (${profile.timezone}). Email is the fastest way to reach me.`,
      sources: [{ label: 'contact.md', href: '#contact' }],
      keywords: [
        'available',
        'hire',
        'hiring',
        'open',
        'contact',
        'email',
        'reach',
        'role',
        'remote'
      ]
    }
  ]

  return (
    <header id='top' className='home-col pt-24 pb-14 md:pb-16 lg:pt-12'>
      <AgentBuild immediate agents={3}>
        <p className='file-tab agent-place' data-agent-label='tab'>
          README.md
        </p>

        <div className='mt-10 flex flex-wrap items-end gap-x-14 gap-y-10'>
          <div className='min-w-0 flex-[3_1_26rem]'>
            <div
              className='agent-place flex items-baseline gap-4'
              data-agent-label='heading'
            >
              <span aria-hidden className='md-mark text-2xl'>
                #
              </span>
              <h1 className='display text-hero'>
                Hi, I&rsquo;m {profile.firstName}.
              </h1>
            </div>

            <p
              className='agent-place text-lead mt-7 max-w-[24em]'
              data-agent-label='paragraph'
            >
              <StreamText
                segments={[
                  {
                    text: `I’m an AI engineer in ${city}. I build AI that works with your`
                  },
                  { text: 'business, documents, data and teams.', em: true }
                ]}
              />
            </p>

            <ul
              className='agent-place mt-8 flex flex-wrap gap-2.5'
              data-agent-label='badges'
            >
              <li className='badge'>
                <span>role</span>
                <span>{profile.role}</span>
              </li>
              <li className='badge'>
                <span>based in</span>
                <span>
                  {city}, {profile.timezone}
                </span>
              </li>
              {profile.availability.open && (
                <li className='badge badge-signal'>
                  <span>status</span>
                  <span>{profile.availability.label.toLowerCase()}</span>
                </li>
              )}
            </ul>

            <div
              className='agent-place mt-9 flex flex-wrap gap-3'
              data-agent-label='buttons'
            >
              <a
                href='#platform'
                className='group bg-foreground text-background inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-sm'
              >
                See what I&rsquo;ve built
                <ArrowDown
                  aria-hidden
                  className='h-4 w-4 transition-transform group-hover:translate-y-1'
                />
              </a>
              <CvDownload
                variant='outline'
                size={cvSize}
                className='rounded-md'
              />
            </div>
          </div>

          <figure
            className='agent-place max-w-[17rem] flex-[1_1_12.5rem]'
            data-agent-label='image'
          >
            <div className='bg-surface relative aspect-[4/5] overflow-hidden rounded-md'>
              <Image
                src={authorImage}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes='(min-width: 768px) 17rem, 60vw'
                className='object-cover grayscale sepia-[.18]'
              />
            </div>
            <figcaption className='eyebrow mt-2.5 text-xs'>
              me.jpg &mdash; {city}
            </figcaption>
          </figure>
        </div>

        <div className='agent-place mt-12' data-agent-label='prompt'>
          <AskReadme items={ask} name={profile.firstName} />
        </div>
      </AgentBuild>
    </header>
  )
}
