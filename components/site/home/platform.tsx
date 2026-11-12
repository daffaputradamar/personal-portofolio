import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getProjects } from '@/lib/projects'
import { AgentBuild } from '../agent-build'
import { Cite } from '../cite'
import { DocSection } from '../doc-section'
import { PlatformMap } from '../platform-map'
import { ProjectGroups, type ProjectGroup } from '../project-groups'
import { Reveal } from '../reveal'
import { PLATFORM_GROUPS } from './featured'

/** The in-house AI platform: how it fits together, then what runs on it. */
export async function Platform() {
  const all = await getProjects()

  // Each group with the projects that have a write-up, in the listed order.
  const groups: ProjectGroup[] = PLATFORM_GROUPS.map(group => ({
    title: group.title,
    dir: group.dir,
    body: group.body,
    glyph: group.glyph,
    node: group.node,
    projects: group.slugs.flatMap(slug => {
      const project = all.find(item => item.slug === slug)
      return project?.title && project.summary
        ? [{ slug, title: project.title, summary: project.summary }]
        : []
    })
  })).filter(group => group.projects.length > 0)

  const total = groups.reduce((n, group) => n + group.projects.length, 0)

  return (
    <DocSection
      id='platform'
      file='platform/'
      title='At work: the AI platform at MPM'
      call='list_dir("platform/")'
      result={`${total} projects`}
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
          <PlatformMap />
        </div>
      </AgentBuild>

      {/* What runs on it, by kind rather than one at a time. */}
      <AgentBuild speed={2} agents={2} className='mt-10'>
        <ProjectGroups groups={groups} />
      </AgentBuild>

      <Reveal>
        <Link
          href='/projects'
          className='link-underline mt-8 inline-flex items-center gap-2 text-sm'
        >
          Every project, with its write-up
          <ArrowUpRight aria-hidden className='h-4 w-4' />
        </Link>
      </Reveal>
    </DocSection>
  )
}
