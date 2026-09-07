import Image from 'next/image'

import authorImage from '@/public/images/authors/me.jpg'
import { capabilities, profile } from '@/lib/resume'
import { Field } from './field'
import { Parallax } from './parallax'
import { Reveal } from './reveal'
import { Section } from './section'

export function About() {
  return (
    <Section
      id='about'
      index='02'
      label='About'
      title='Engineering, from backend to AI'
      lede='Five years of backend and platform work, now pointed at applied AI.'
    >
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <div className='space-y-5'>
            {[
              'I’m an AI engineer at MPM in Surabaya, building internal AI platforms and applications.',
              'Previously, I spent four and a half years modernising backend systems. I’ve also built freelance web applications since 2020.'
            ].map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Capabilities, always visible */}
          <div className='border-line mt-12 border-t'>
            {capabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={i * 0.06}>
                <div className='border-line grid gap-3 border-b py-6 sm:grid-cols-12 sm:gap-6'>
                  <div className='sm:col-span-4'>
                    <div className='flex items-baseline gap-2.5'>
                      <span className='eyebrow text-signal'>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className='display text-xl'>{capability.title}</h3>
                    </div>
                  </div>
                  <div className='sm:col-span-8'>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {capability.body}
                    </p>
                    <ul className='mt-3 flex flex-wrap gap-x-3 gap-y-1'>
                      {capability.items.map(item => (
                        <li
                          key={item}
                          className='text-foreground/55 font-mono text-xs'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className='lg:col-span-5 lg:pl-8'>
          <Reveal delay={0.1}>
            <Parallax className='bg-surface aspect-4/5 w-full' speed={0.1}>
              <Image
                src={authorImage}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes='(min-width: 1024px) 32rem, 100vw'
                className='object-cover grayscale transition-[filter] duration-700 hover:grayscale-0'
              />
            </Parallax>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className='border-line mt-8 border-t'>
              <Field label='Based in'>{profile.location}</Field>
              <Field label='Timezone'>{profile.timezone}</Field>
              <Field label='Focus'>Applied AI, web platforms</Field>
              <Field label='Working'>Remote, async-friendly</Field>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
