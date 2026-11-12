import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiFirebase,
  SiDrizzle,
  SiDotnet,
  SiApachekafka,
  SiDocker,
  SiLaravel,
  SiGooglegemini,
  SiJavascript,
  SiOllama,
  SiPython
} from 'react-icons/si'
import { FaProjectDiagram } from 'react-icons/fa'
import {
  ClaudeCode,
  Codex,
  Cursor,
  GithubCopilot,
  LangChain,
  LangGraph,
  OpenCode,
  Vllm
} from '@lobehub/icons'

import SqlServerIcon from '@/components/icons/sql-server-icon'
import { getProjects } from '@/lib/projects'
import { AgentBuild } from '../agent-build'
import { Reveal } from '../reveal'

const ICON = 16

type Category = {
  title: string
  items: { name: string; icon: React.ReactNode }[]
}

/**
 * The tools, grouped by area. Icons keep their brand colours; the few that are
 * too pale for paper get a darker tone in the light theme only.
 */
const categories: Category[] = [
  {
    title: 'Languages',
    items: [
      {
        name: 'TypeScript',
        icon: <SiTypescript className='text-[#3178C6]' size={ICON} />
      },
      {
        name: 'JavaScript',
        icon: (
          <SiJavascript
            className='text-[#b89a00] dark:text-[#F7DF1E]'
            size={ICON}
          />
        )
      },
      {
        name: 'Python',
        icon: <SiPython className='text-[#4B8BBE]' size={ICON} />
      }
    ]
  },
  {
    title: 'Frontend',
    items: [
      {
        name: 'React',
        icon: (
          <SiReact className='text-[#1c9fc4] dark:text-[#61DAFB]' size={ICON} />
        )
      },
      { name: 'Next.js', icon: <SiNextdotjs size={ICON} /> },
      {
        name: 'Vue.js',
        icon: <SiVuedotjs className='text-[#41B883]' size={ICON} />
      },
      {
        name: 'Angular',
        icon: <SiAngular className='text-[#DD0031]' size={ICON} />
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className='text-[#0ea5e9]' size={ICON} />
      }
    ]
  },
  {
    title: 'Backend & architecture',
    items: [
      {
        name: 'Node.js',
        icon: <SiNodedotjs className='text-[#5FA04E]' size={ICON} />
      },
      {
        name: '.NET',
        icon: <SiDotnet className='text-[#7a5be0]' size={ICON} />
      },
      {
        name: 'Laravel',
        icon: <SiLaravel className='text-[#FF2D20]' size={ICON} />
      },
      {
        name: 'Microservices',
        icon: <FaProjectDiagram className='text-[#d98200]' size={ICON} />
      }
    ]
  },
  {
    title: 'Data & messaging',
    items: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className='text-[#4a7fe0]' size={ICON} />
      },
      { name: 'SQL Server', icon: <SqlServerIcon className='size-4' /> },
      { name: 'Apache Kafka', icon: <SiApachekafka size={ICON} /> },
      {
        name: 'Prisma',
        icon: <SiPrisma className='text-[#6C7BF0]' size={ICON} />
      },
      {
        name: 'Drizzle',
        icon: (
          <SiDrizzle
            className='text-[#6f9a16] dark:text-[#C5F74F]'
            size={ICON}
          />
        )
      }
    ]
  },
  {
    title: 'Cloud & infrastructure',
    items: [
      {
        name: 'Docker',
        icon: <SiDocker className='text-[#2496ED]' size={ICON} />
      },
      {
        name: 'Firebase',
        icon: (
          <SiFirebase
            className='text-[#e09a00] dark:text-[#FFCA28]'
            size={ICON}
          />
        )
      }
    ]
  },
  {
    title: 'LLM infrastructure',
    items: [
      { name: 'vLLM', icon: <Vllm.Color size={ICON} /> },
      {
        name: 'LiteLLM',
        icon: <span className='text-sm leading-none'>&#128645;</span>
      },
      { name: 'LangChain', icon: <LangChain.Color size={ICON} /> },
      { name: 'LangGraph', icon: <LangGraph.Color size={ICON} /> },
      { name: 'Ollama', icon: <SiOllama size={ICON} /> }
    ]
  },
  {
    title: 'AI coding tools',
    items: [
      { name: 'Claude Code', icon: <ClaudeCode.Color size={ICON} /> },
      { name: 'Codex', icon: <Codex.Color size={ICON} /> },
      { name: 'GitHub Copilot', icon: <GithubCopilot size={ICON} /> },
      { name: 'Cursor', icon: <Cursor size={ICON} /> },
      { name: 'OpenCode', icon: <OpenCode size={ICON} /> },
      {
        name: 'Google Gemini',
        icon: <SiGooglegemini className='text-[#4285F4]' size={ICON} />
      }
    ]
  }
]

/** How many tools are listed, for labels elsewhere on the page. */
export const stackCount = categories.reduce(
  (n, category) => n + category.items.length,
  0
)

/**
 * Every tool, under the area it belongs to. Sits below the three skill areas.
 * Each chip looks itself up in the project write-ups: hover or focus one to
 * see which projects name it.
 */
export async function Stack() {
  const total = stackCount
  const projects = await getProjects()
  const usedIn = (tool: string) =>
    projects.filter(project =>
      project.tech?.some(tech => tech.toLowerCase() === tool.toLowerCase())
    )

  return (
    <div className='mt-12'>
      <Reveal offset={12}>
        <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
          <h3 className='eyebrow text-foreground font-medium'>### Stack</h3>
          <span className='eyebrow'>
            {total} tools in {categories.length} groups &middot; hover one to
            look it up
          </span>
        </div>
      </Reveal>

      <AgentBuild
        speed={2.4}
        className='mt-4 grid gap-x-9 gap-y-7 sm:grid-cols-2 xl:grid-cols-3'
      >
        {categories.map(category => (
          <div
            key={category.title}
            className='agent-place'
            data-agent-label='stack'
          >
            <div className='border-line border-t pt-3.5'>
              <h4 className='text-[1.1875rem] leading-tight font-medium'>
                {category.title}
              </h4>
              <ul className='relative mt-3 flex flex-wrap gap-2'>
                {category.items.map(item => {
                  const uses = usedIn(item.name)
                  return (
                    <li key={item.name} className='group/chip'>
                      <span
                        tabIndex={0}
                        className='border-line bg-elevated text-foreground group-hover/chip:border-signal inline-flex cursor-default items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[0.78rem] transition-colors'
                      >
                        <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                          {item.icon}
                        </span>
                        {item.name}
                        {uses.length > 0 && (
                          <span className='text-signal text-[0.7rem]'>
                            {uses.length}
                          </span>
                        )}
                      </span>

                      <span
                        role='tooltip'
                        className='border-line bg-elevated pointer-events-none invisible absolute right-0 bottom-full left-0 z-20 mb-2 block max-w-72 rounded-md border p-3 opacity-0 shadow-lg transition-opacity duration-200 group-focus-within/chip:visible group-focus-within/chip:opacity-100 group-hover/chip:visible group-hover/chip:opacity-100'
                      >
                        <span className='eyebrow block text-[0.7rem]'>
                          search(&quot;{item.name}&quot;) &rarr; {uses.length}{' '}
                          of {projects.length} write-ups
                        </span>
                        <span className='bg-line mt-2 block h-1 overflow-hidden rounded-full'>
                          <span
                            className='bg-signal block h-full'
                            style={{
                              width: `${(uses.length / projects.length) * 100}%`
                            }}
                          />
                        </span>
                        {uses.length > 0 ? (
                          <span className='mt-2.5 block text-[0.9375rem] leading-snug'>
                            {uses
                              .slice(0, 4)
                              .map(project => project.title)
                              .join(', ')}
                            {uses.length > 4 && `, +${uses.length - 4} more`}
                          </span>
                        ) : (
                          <span className='text-muted-foreground mt-2.5 block text-[0.9375rem] leading-snug'>
                            No write-up names it yet.
                          </span>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </AgentBuild>
    </div>
  )
}
