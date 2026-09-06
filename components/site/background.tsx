import { achievements, education, languages } from '@/lib/resume'
import { Reveal } from './reveal'
import { Section } from './section'

/** Education, key achievements and languages — the rest of the CV. */
export function Background() {
  return (
    <Section
      id='background'
      index='04'
      tone={5}
      label='Background'
      title='Education and achievements.'
    >
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <Reveal>
            <h3 className='eyebrow text-foreground'>Education</h3>
            {education.map(item => (
              <div key={item.qualification} className='rule mt-4 pt-5'>
                <p className='display text-2xl'>{item.qualification}</p>
                <p className='mt-1.5 text-sm text-foreground'>
                  {item.institution}
                </p>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {item.period}
                  {item.note ? ` · ${item.note}` : ''}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className='eyebrow mt-12 text-foreground'>Key achievements</h3>
            <ul className='mt-4'>
              {achievements.map(item => (
                <li key={item.title} className='rule py-5'>
                  <p className='display text-2xl'>{item.title}</p>
                  <p className='mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground'>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className='lg:col-span-5 lg:pl-10'>
          <Reveal delay={0.16}>
            <h3 className='eyebrow text-foreground'>Languages</h3>
            <dl className='mt-4'>
              {languages.map(language => (
                <div
                  key={language.name}
                  className='rule flex items-baseline justify-between gap-4 py-3.5'
                >
                  <dt className='text-sm text-foreground'>{language.name}</dt>
                  <dd className='eyebrow'>{language.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
