'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

type TextRevealProps = {
  text: string
  className?: string
  /** Seconds before the first word moves. */
  delay?: number
  /** Seconds between consecutive words. */
  stagger?: number
  /** Skip the viewport gate and play immediately — use for above-the-fold. */
  immediate?: boolean
}

/**
 * Word-by-word mask reveal: each word sits in an overflow-hidden box and slides
 * up from below the baseline. Every word keeps its trailing space inside the
 * clipping box so wrapping and word spacing match plain text.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false
}: TextRevealProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  const animation = {
    hidden: { y: '110%' },
    visible: { y: '0%' }
  }

  return (
    <motion.span
      className={cn('inline', className)}
      initial='hidden'
      {...(immediate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, margin: '-10% 0px' }
          })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className='inline-block overflow-hidden align-bottom pb-[0.12em]'
          aria-hidden
        >
          <motion.span
            className='inline-block'
            variants={animation}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
