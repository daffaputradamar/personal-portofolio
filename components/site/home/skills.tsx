import { capabilities } from '@/lib/resume'
import { AgentBuild } from '../agent-build'
import { DocSection } from '../doc-section'
import { Stack, stackCount } from './stack'

/** The three areas of work to be hired for. */
export function Skills() {
  return (
    <DocSection
      id='skills'
      file='skills.md'
      title='What I do'
      call='read_file("skills.md")'
      result={`${capabilities.length} areas, ${stackCount} tools`}
      lede='Five years of backend and platform work, now pointed at applied AI.'
    >
      <AgentBuild speed={1.7}>
        <ul className='flex flex-wrap gap-x-9 gap-y-8'>
          {capabilities.map(capability => (
            <li
              key={capability.title}
              className='agent-place border-foreground min-w-0 flex-[1_1_14.5rem] border-t-2 pt-4.5'
              data-agent-label='skill'
            >
              <h3 className='display text-[1.6875rem] leading-[1.2]'>
                {capability.title}
              </h3>
              <p className='mt-2'>{capability.body}</p>
              <p className='eyebrow mt-3 leading-[1.7]'>
                {capability.items.join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </AgentBuild>

      <Stack />
    </DocSection>
  )
}
