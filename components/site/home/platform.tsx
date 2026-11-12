import Link from 'next/link'

import { getProjects } from '@/lib/projects'
import { AgentBuild } from '../agent-build'
import { Cite } from '../cite'
import { DocSection } from '../doc-section'
import { PlatformTrace } from '../platform-trace'
import { PLATFORM_SLUGS } from './featured'

function Tick() {
  return (
    <svg
      viewBox='0 0 22 22'
      aria-hidden
      className='mt-2 h-[1.375rem] w-[1.375rem] shrink-0'
      fill='none'
    >
      <rect
        x='1.5'
        y='1.5'
        width='19'
        height='19'
        rx='4'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M6 11.5l3.4 3.4L16 7.8'
        className='stroke-signal'
        strokeWidth='2.2'
      />
    </svg>
  )
}

/** The in-house AI platform: how it fits together, then the systems on it. */
export async function Platform() {
  const all = await getProjects()
  const systems = PLATFORM_SLUGS.map(slug =>
    all.find(project => project.slug === slug)
  ).filter(project => project !== undefined)

  return (
    <DocSection
      id='platform'
      file='platform/'
      title='At work: the AI platform at MPM'
      call='list_dir("platform/")'
      result={`${systems.length} systems`}
    >
      <AgentBuild speed={2}>
        <blockquote
          className='agent-place border-signal max-w-[30em] border-l-[3px] py-1 pl-5 text-[1.4375rem] leading-[1.4] italic'
          data-agent-label='quote'
        >
          Private systems, described in the open. What each one does, and what
          it runs on.
        </blockquote>

        <p className='agent-place mt-7 max-w-[36em]' data-agent-label='text'>
          Every internal application calls one gateway.
          <Cite n={1} target='node-gateway' label='the LiteLLM gateway' /> The
          gateway checks the key, picks a model and logs the usage; the models
          run on our own hardware.
          <Cite
            n={2}
            target='node-vllm'
            label='vLLM, self-hosted models'
          />{' '}
          Agents ground their answers in company documents and data that never
          leave the network.
          <Cite n={3} target='node-rag' label='the RAG knowledge base' />
        </p>

        <div className='agent-place mt-7' data-agent-label='figure'>
          <PlatformTrace />
        </div>
      </AgentBuild>

      <AgentBuild speed={2.2} className='mt-9'>
        <ul>
          {systems.map(system => (
            <li
              key={system.slug}
              className='agent-place'
              data-agent-label='system'
            >
              <Link
                href={`/projects/${system.slug}`}
                className='border-line group flex gap-4 border-t py-5'
              >
                <Tick />
                <div className='flex min-w-0 flex-1 flex-wrap items-baseline gap-x-9 gap-y-1.5'>
                  <h3 className='display group-hover:text-signal flex-[1_1_15rem] text-[1.6875rem] leading-[1.2] transition-colors duration-300'>
                    {system.title}
                  </h3>
                  <div className='flex-[2_1_24rem]'>
                    <p>{system.outcome ?? system.summary}</p>
                    {system.tech && (
                      <p className='eyebrow mt-2'>{system.tech.join(' · ')}</p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </AgentBuild>
    </DocSection>
  )
}
