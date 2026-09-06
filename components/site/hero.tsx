'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import authorImage from '@/public/images/authors/me.jpg'
import { profile, socials, stats } from '@/lib/resume'
import { Aurora } from './aurora'
import { GridLines } from './grid-lines'
import { Magnetic } from './magnetic'
import { RotatingBadge } from './rotating-badge'
import { TextReveal } from './text-reveal'

/**
 * Above-the-fold introduction: name, current role, one-line summary, and the
 * two primary actions. The stat strip at the bottom carries the CV headline
 * figures.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Gentle parallax: the portrait lags the page, the type fades as it leaves.
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const typeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={ref}
      className='relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10 md:pt-32'
    >
      <Aurora subtle />
      <GridLines />

      <div className='relative container flex flex-1 flex-col justify-center'>
        <motion.div style={reduced ? undefined : { opacity: typeOpacity }}>
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className='flex flex-wrap items-center gap-x-4 gap-y-3'
          >
            {profile.availability.open && (
              <span className='inline-flex items-center gap-2.5'>
                <span className='h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-1' />
                <span className='eyebrow text-foreground'>
                  {profile.availability.label}
                </span>
              </span>
            )}
            <span className='eyebrow'>
              {profile.location} &middot; {profile.timezone}
            </span>
          </motion.div>

          {/* Name */}
          <h1 className='mt-8 md:mt-10'>
            <span className='sr-only'>
              {profile.name} — {profile.role} and {profile.discipline}
            </span>
            <span
              aria-hidden
              className='display block text-hero text-foreground'
            >
              <TextReveal text='Daffa' immediate delay={0.15} />
            </span>
            <span
              aria-hidden
              className='display text-outline outline-primary block text-hero md:pl-[0.12em]'
            >
              <TextReveal text='Akbar' immediate delay={0.28} />
            </span>
          </h1>

          {/* Role + pitch */}
          <div className='mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10'>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className='md:col-span-5'
            >
              <p className='eyebrow'>Currently</p>
              <p className='mt-3 text-lg leading-snug'>{profile.role}</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                {profile.company}
              </p>
              <p className='mt-4 text-sm text-muted-foreground'>
                Also available for freelance work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className='md:col-span-7'
            >
              <p className='max-w-xl text-lead text-muted-foreground text-balance'>
                {profile.pitch}
              </p>

              {/* Actions */}
              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <Magnetic>
                  <a
                    href={profile.resumeUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent-1 hover:text-background'
                  >
                    View full resume
                    <svg
                      aria-hidden
                      viewBox='0 0 24 24'
                      className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.75'
                    >
                      <path d='M7 17 17 7M17 7H9M17 7v8' strokeLinecap='round' />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic>
                  <Link
                    href='/contact'
                    className='inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-foreground/5'
                  >
                    Get in touch
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Portrait — framed, sits in the right-hand column on large screens */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: portraitY }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className='absolute right-6 top-1/2 hidden w-[clamp(12rem,18vw,18rem)] -translate-y-1/2 xl:right-18 xl:block'
      >
        <div className='group relative aspect-4/5 overflow-hidden border border-accent-1/30'>
          <Image
            src={authorImage}
            alt=''
            fill
            sizes='(min-width: 1280px) 18rem, 0px'
            className='object-cover grayscale transition-[filter,transform] duration-900 ease-editorial group-hover:scale-105 group-hover:grayscale-0'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent' />
        </div>

        {/* Corner ticks */}
        <span className='absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-accent-1' />
        <span className='absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b border-r border-accent-1' />
      </motion.div>

      {/* Rotating seal — the one fixed focal point in the composition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className='pointer-events-none absolute bottom-32 right-12 hidden lg:block xl:bottom-40 xl:right-18'
      >
        <RotatingBadge label='Available for work' />
      </motion.div>

      {/* Footer strip: stats + socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.85 }}
        className='container'
      >
        <div className='rule relative grid grid-cols-3 gap-x-6 gap-y-8 pt-8 lg:grid-cols-6'>
          {stats.map(stat => (
            <div key={stat.label}>
              <p className='display text-3xl leading-none md:text-4xl'>
                {stat.figure}
              </p>
              <p className='mt-2 text-xs leading-tight text-muted-foreground'>
                {stat.label}
              </p>
            </div>
          ))}

          <div className='col-span-3 flex flex-wrap items-end gap-x-5 gap-y-2 lg:justify-end'>
            {socials.map(social => (
              <a
                key={social.name}
                href={social.href}
                target={social.name === 'Email' ? undefined : '_blank'}
                rel='noreferrer'
                className='link-underline text-xs text-muted-foreground transition-colors hover:text-foreground'
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
