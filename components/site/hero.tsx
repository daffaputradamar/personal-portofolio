'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { profile, socials } from '@/lib/resume'
import { MOTION_OK, gsap, useGSAP } from '@/lib/gsap'
import { DimensionLine } from './dimension-line'
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

const milestones = [
  { figure: '2020', label: 'Freelance' },
  { figure: '2021', label: 'Joined MPM' },
  { figure: '2026', label: 'Applied AI' }
]

/** Span the dimension line measures, derived so it stays true if dates move. */
const years =
  Number(milestones[milestones.length - 1].figure) -
  Number(milestones[0].figure)

/**
 * The title block of the sheet: identity, live local time and revision across
 * the top, the headline, then the spec fields a reader actually came for.
 */
export function Hero() {
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
            <div className='mt-9 flex flex-wrap items-center gap-6'>
              <Magnetic>
                <a
                  href='#work'
                  className='group bg-foreground text-background inline-flex items-center gap-4 px-6 py-3.5 text-sm'
                >
                  See what I&rsquo;ve built
                  <ArrowDown
                    aria-hidden
                    className='h-4 w-4 transition-transform group-hover:translate-y-1'
                  />
                </a>
              </Magnetic>
              <Link
                href='/contact'
                className='link-underline inline-flex items-center gap-2 py-2 text-sm'
              >
                Discuss a project
                <ArrowUpRight aria-hidden className='h-4 w-4' />
              </Link>
            </div>
          </Reveal>
        </div>

        <div ref={card}>
          <Reveal delay={0.2}>
            <FocusCard />
          </Reveal>
        </div>
      </div>

      {/* Footer scale — the milestones set the width the dimension measures. */}
      <Reveal offset={8} delay={0.5}>
        <div className='mt-16'>
          <div className='tick-rule' />
          <div className='mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-8'>
            <div>
              <DimensionLine value={`${String(years).padStart(2, '0')} yrs`} />
              <dl className='mt-3 flex gap-9 md:gap-16'>
                {milestones.map(stat => (
                  <div key={stat.label}>
                    <dt className='eyebrow'>{stat.label}</dt>
                    <dd className='mt-1 font-mono text-lg'>{stat.figure}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className='flex gap-6'>
              {socials.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name === 'Email' ? undefined : '_blank'}
                  rel='noreferrer'
                  className='eyebrow hover:text-foreground transition-colors'
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
