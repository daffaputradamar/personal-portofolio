import { achievements, education, languages } from '@/lib/resume'
import { Field } from './field'
import { Reveal } from './reveal'
import { Section } from './section'

/** Education, key achievements and languages — the rest of the CV. */
export function Background() {
  return (
    <Section
      id='background'
      index='05'
      label='Background'
      title='Education and achievements'
    >
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-7'>
          <Reveal>
            <h3 className='eyebrow text-foreground'>Education</h3>
            <div className='border-line mt-3 border-t'>
              {education.map(item => (
                <div
                  key={item.qualification}
                  className='border-line border-b py-5'
                >
                  <p className='display text-2xl'>{item.qualification}</p>
                  <p className='mt-1.5 text-sm'>{item.institution}</p>
                  <p className='text-muted-foreground mt-1 font-mono text-xs'>
                    {item.period}
                    {item.note ? ` · ${item.note}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className='eyebrow text-foreground mt-11'>Key achievements</h3>
            <ul className='border-line mt-3 border-t'>
              {achievements.map((item, i) => (
                <li key={item.title} className='border-line border-b py-5'>
                  <div className='flex items-baseline gap-2.5'>
                    <span className='eyebrow text-signal'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className='display text-xl'>{item.title}</p>
                  </div>
                  <p className='text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed'>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className='lg:col-span-5 lg:pl-8'>
          <Reveal delay={0.14}>
            <h3 className='eyebrow text-foreground'>Languages</h3>
            <dl className='border-line mt-3 border-t'>
              {languages.map(language => (
                <Field key={language.name} label={language.name}>
                  {language.level}
                </Field>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
