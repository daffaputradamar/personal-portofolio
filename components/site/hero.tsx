'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { profile, socials } from '@/lib/resume'
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'
import { CvDownload } from './cv-download'
import { Field } from './field'
import { FocusCard } from './focus-card'
import { LocalTime } from './local-time'
import { Magnetic } from './magnetic'
import { Reveal } from './reveal'
import { TextReveal } from './text-reveal'
import { WordCycle } from './word-cycle'

/** Sheet revision. Bump when the CV behind the page changes. */
const REV = '2026.09'

/**
 * Closing word of the summary line, cycled. Each value is somewhere the work
 * actually lands — business insight, generated documents, the warehouse
 * integration, the teams using it — so the slot widens the claim instead of
 * decorating it.
 *
 * All four are descender-free on purpose: the slot masks at the line box, so a
 * 'p' or 'g' would be clipped on the way through.
 */
const SUBJECTS = ['business.', 'documents.', 'data.', 'teams.']

/**
 * Given names on one line, family name on the next. Split rather than written
 * out, so a longer legal name on the CV still sets correctly.
 */
const nameParts = profile.name.split(' ')
const nameLines =
  nameParts.length > 1
    ? [nameParts.slice(0, -1).join(' '), nameParts[nameParts.length - 1]]
    : nameParts

/**
 * The title block of the sheet: identity, live local time and revision across
 * the top, the headline, then the spec fields a reader actually came for.
 */
export function Hero({ cvSize }: { cvSize?: string }) {
  const section = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)

  // As the hero leaves, its layers part at different rates: the ground lags,
  // the copy drifts and dims, the card lifts fastest. Reads as depth, costs
  // nothing but three scrubbed tweens.
  useGSAP(
    () => {
      if (!section.current) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const trigger = {
          trigger: section.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
        gsap.to(grid.current, { y: 50, ease: 'none', scrollTrigger: trigger })
        gsap.to(copy.current, {
          y: -40,
          autoAlpha: 0.3,
          ease: 'none',
          scrollTrigger: trigger
        })
        gsap.to(card.current, { y: -90, ease: 'none', scrollTrigger: trigger })
      })
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className='relative isolate container pt-28 pb-12 md:pt-36'
    >
      <div
        ref={grid}
        aria-hidden
        className='blueprint-grid pointer-events-none absolute inset-0 -z-10'
      />

      {/* Title block */}
      <div className='tick-rule' />
      <div className='mt-3 flex items-baseline justify-between gap-4'>
        <span className='eyebrow'>Curriculum vitae</span>
        <span className='eyebrow hidden items-center gap-2.5 sm:inline-flex'>
          {profile.location.split(',')[0]}
          <span aria-hidden className='text-line'>
            /
          </span>
          <LocalTime />
          <span aria-hidden className='text-line'>
            /
          </span>
          {profile.timezone}
        </span>
        <span className='eyebrow'>Rev {REV}</span>
      </div>

      <div className='mt-12 grid gap-14 md:mt-16 md:grid-cols-[1.15fr_1fr]'>
        <div ref={copy}>
          <h1 className='display text-hero uppercase'>
            {nameLines.map((line, i) => (
              <TextReveal
                key={line}
                text={line}
                immediate
                delay={i * 0.12}
                block
              />
            ))}
          </h1>

          <Reveal delay={0.26} offset={10}>
            <div className='mt-7 max-w-lg'>
              <div className='rule' />
              <p className='display text-signal text-headline mt-4 uppercase'>
                {profile.role}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.36} offset={12}>
            <div className='text-muted-foreground text-lead mt-7 max-w-md'>
              <p>I build AI that works with your</p>
              <WordCycle
                words={SUBJECTS}
                delay={0.5}
                className='text-foreground leading-[1.15]'
              />
            </div>
          </Reveal>

          <Reveal delay={0.36} offset={12}>
            <dl className='border-line mt-10 max-w-lg border-t'>
              <Field label='Employer'>{profile.company}</Field>
              <Field label='Location'>
                {profile.location} &middot; {profile.timezone}
              </Field>
              <Field label='Status'>
                <span className='inline-flex items-center gap-2'>
                  <span
                    aria-hidden
                    className='bg-signal animate-pulse-dot h-1.5 w-1.5'
                  />
                  {profile.availability.label}
                </span>
              </Field>
            </dl>
          </Reveal>

          <Reveal delay={0.42} offset={12}>
            {/* The two buttons share the spec table's width and split it,
                whether they sit side by side or stack. */}
            <div className='mt-9 flex max-w-lg flex-wrap gap-3'>
              <Magnetic className='grow'>
                <a
                  href='#work'
                  className='group bg-foreground text-background flex items-center justify-center gap-4 px-6 py-3.5 text-sm'
                >
                  See what I&rsquo;ve built
                  <ArrowDown
                    aria-hidden
                    className='h-4 w-4 transition-transform group-hover:translate-y-1'
                  />
                </a>
              </Magnetic>
              <CvDownload
                variant='outline'
                size={cvSize}
                className='grow justify-center'
              />
            </div>
            <Link
              href='/contact'
              className='link-underline mt-5 inline-flex items-center gap-2 py-1 text-sm'
            >
              Discuss a project
              <ArrowUpRight aria-hidden className='h-4 w-4' />
            </Link>
          </Reveal>
        </div>

        <div ref={card}>
          <Reveal delay={0.2}>
            <FocusCard />
          </Reveal>
        </div>
      </div>

      {/* Footer row: where to find me, and a cue that the sheet continues.
          Dates live in the Experience timeline further down. */}
      <Reveal offset={8} delay={0.5}>
        <div className='mt-16'>
          <div className='tick-rule' />
          <div className='mt-4 flex flex-wrap items-center justify-between gap-x-10 gap-y-4'>
            <ul className='flex flex-wrap gap-x-7 gap-y-2'>
              {socials.map(social => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.name === 'Email' ? undefined : '_blank'}
                    rel='noreferrer'
                    className='group eyebrow hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
                  >
                    {social.name}
                    <ArrowUpRight
                      aria-hidden
                      className='h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href='#work'
              className='group eyebrow hover:text-foreground inline-flex items-center gap-2 transition-colors'
            >
              Scroll
              <ArrowDown
                aria-hidden
                className='h-3 w-3 transition-transform group-hover:translate-y-0.5'
              />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
