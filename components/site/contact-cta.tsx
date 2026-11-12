import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { profile, socials } from '@/lib/resume'
import { AgentBuild } from './agent-build'
import { ToolCall } from './tool-call'

/** Closing block: contact.md. The last thing a reader sees before the footer. */
export function ContactCta() {
  return (
    <section id='contact' className='home-col scroll-mt-20 lg:scroll-mt-6'>
      <AgentBuild
        speed={1.8}
        className='border-line border-t pt-12 pb-24 md:pt-14 md:pb-28'
      >
        <div className='flex flex-wrap items-end justify-between gap-x-6 gap-y-2'>
          <p className='file-tab agent-place' data-agent-label='tab'>
            contact.md
          </p>
          <ToolCall
            call='read_file("contact.md")'
            result={profile.availability.label.toLowerCase()}
          />
        </div>

        <div
          className='agent-place mt-6 flex items-baseline gap-4'
          data-agent-label='heading'
        >
          <span aria-hidden className='md-mark text-lg'>
            ##
          </span>
          <h2 className='display text-display'>Say hello.</h2>
        </div>

        <div className='agent-place' data-agent-label='text'>
          <p className='mt-5 max-w-[28em]'>
            I&rsquo;m open to new roles and interesting problems. Building an AI
            platform or a web application? Tell me what you have in mind.
          </p>
        </div>

        <div className='agent-place' data-agent-label='buttons'>
          <div className='mt-8 flex flex-wrap items-center gap-x-7 gap-y-4'>
            <a
              href={`mailto:${profile.email}`}
              className='bg-foreground text-background inline-flex max-w-full flex-wrap items-center gap-3.5 rounded-lg px-6 py-4 font-mono text-[0.9375rem] break-all'
            >
              <span aria-hidden className='opacity-55'>
                $
              </span>
              mail {profile.email}
            </a>

            <Link
              href='/contact'
              className='link-underline inline-flex items-center gap-2 py-1 text-sm'
            >
              or use the contact form
              <ArrowUpRight aria-hidden className='h-4 w-4' />
            </Link>
          </div>

          <ul className='eyebrow mt-7 flex flex-wrap gap-x-6 gap-y-2'>
            {socials
              .filter(social => social.name !== 'Email')
              .map(social => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-foreground transition-colors'
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            <li>
              <a
                href={profile.resumeUrl}
                target='_blank'
                rel='noreferrer'
                className='hover:text-foreground transition-colors'
              >
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </AgentBuild>
    </section>
  )
}
