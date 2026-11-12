import { achievements, education, experiences, languages } from '@/lib/resume'
import { AgentBuild } from '../agent-build'
import { DocSection } from '../doc-section'
import { Reveal } from '../reveal'

type Row = {
  period: string
  title: string
  detail: string
  /** Small tag after the title: employment type, or the kind of study. */
  tag: string
  current?: boolean
}

function Rows({ rows, label }: { rows: Row[]; label: string }) {
  return (
    <AgentBuild speed={2.2}>
      <ul>
        {rows.map(row => (
          <li
            key={`${row.title}-${row.period}`}
            className='agent-place'
            data-agent-label={label}
          >
            <div className='border-line flex flex-wrap items-baseline gap-x-9 gap-y-1 border-t py-4'>
              <span className='eyebrow w-44 shrink-0'>{row.period}</span>
              <div className='flex-[1_1_15rem]'>
                <p className='text-2xl leading-tight font-medium'>
                  {row.title}
                </p>
                <p className='mt-2 flex flex-wrap items-center gap-2'>
                  <span className='border-line rounded-full border px-2.5 py-0.5 font-mono text-[0.72rem]'>
                    {row.tag}
                  </span>
                  {row.current && (
                    <span className='bg-signal/10 text-signal inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.72rem]'>
                      <span
                        aria-hidden
                        className='bg-signal animate-pulse-dot h-1.5 w-1.5 rounded-full'
                      />
                      current
                    </span>
                  )}
                </p>
              </div>
              <p className='text-muted-foreground flex-[1.4_1_19rem]'>
                {row.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </AgentBuild>
  )
}

/** Roles, education, highlights and languages: the rest of the CV. */
export function Background() {
  const professional: Row[] = experiences.map(item => ({
    period: item.period,
    title: item.role,
    detail: [item.company, item.location].join(', '),
    tag: item.type,
    current: item.current
  }))

  const study: Row[] = education.map(item => ({
    period: item.period,
    title: item.qualification,
    detail: [
      item.institution,
      item.gpa ? `GPA ${item.gpa.score} / ${item.gpa.max.toFixed(2)}` : null
    ]
      .filter(Boolean)
      .join(' · '),
    tag: 'Degree'
  }))

  return (
    <DocSection
      id='background'
      file='background.md'
      title='Background'
      call='read_file("background.md")'
      result={`${professional.length} roles, ${study.length} degree`}
    >
      <Reveal offset={12}>
        <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-3'>
          <h3 className='eyebrow text-foreground font-medium'>
            ### Professional
          </h3>
          <span className='eyebrow'>{professional.length} roles</span>
        </div>
      </Reveal>
      <Rows rows={professional} label='role' />

      <Reveal offset={12}>
        <div className='border-line mt-0 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t pt-10 pb-3'>
          <h3 className='eyebrow text-foreground font-medium'>### Education</h3>
          <span className='eyebrow'>formal study</span>
        </div>
      </Reveal>
      <Rows rows={study} label='degree' />

      <div className='border-line border-t pt-10'>
        <Reveal offset={12}>
          <h3 className='eyebrow text-foreground font-medium'>
            ### Highlights
          </h3>
        </Reveal>
        <AgentBuild speed={2}>
          <ul className='mt-4 flex flex-wrap gap-x-9 gap-y-8'>
            {achievements.map((item, i) => (
              <li
                key={item.title}
                className='agent-place border-foreground flex-[1_1_20rem] border-t-2 pt-4'
                data-agent-label='highlight'
              >
                <p className='eyebrow'>{String(i + 1).padStart(2, '0')}</p>
                <p className='display mt-1 text-[1.875rem] leading-[1.25]'>
                  <span className='hl-stroke'>{item.title}</span>
                </p>
                <p className='mt-3 max-w-[30em]'>{item.body}</p>
              </li>
            ))}
          </ul>
        </AgentBuild>
      </div>

      <Reveal>
        <div className='mt-9 flex flex-wrap items-baseline gap-x-9 gap-y-2'>
          <h3 className='eyebrow text-foreground w-44 shrink-0 font-medium'>
            ### Languages
          </h3>
          <ul className='flex flex-wrap gap-x-9 gap-y-1'>
            {languages.map(language => (
              <li key={language.name}>
                <span className='font-medium'>{language.name}</span> &mdash;{' '}
                {language.level.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </DocSection>
  )
}
