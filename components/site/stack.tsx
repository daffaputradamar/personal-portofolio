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
import { Reveal } from './reveal'
import { Section } from './section'

const ICON = 17

type Category = {
  title: string
  items: { name: string; icon: React.ReactNode }[]
}

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
        icon: <SiJavascript className='text-[#F7DF1E]' size={ICON} />
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
        icon: <SiReact className='text-[#61DAFB]' size={ICON} />
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
        icon: <SiTailwindcss className='text-[#38BDF8]' size={ICON} />
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
        icon: <SiDotnet className='text-[#8A6DF1]' size={ICON} />
      },
      {
        name: 'Laravel',
        icon: <SiLaravel className='text-[#FF2D20]' size={ICON} />
      },
      {
        name: 'Microservices',
        icon: <FaProjectDiagram className='text-[#F59E0B]' size={ICON} />
      }
    ]
  },
  {
    title: 'Data & messaging',
    items: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className='text-[#5B8DEF]' size={ICON} />
      },
      { name: 'SQL Server', icon: <SqlServerIcon className='size-4' /> },
      {
        name: 'Apache Kafka',
        icon: <SiApachekafka className='text-[#D8D4CE]' size={ICON} />
      },
      {
        name: 'Prisma',
        icon: <SiPrisma className='text-[#6C7BF0]' size={ICON} />
      },
      {
        name: 'Drizzle',
        icon: <SiDrizzle className='text-[#C5F74F]' size={ICON} />
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
        icon: <SiFirebase className='text-[#FFCA28]' size={ICON} />
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
      {
        name: 'GitHub Copilot',
        icon: (
          <span className='text-foreground'>
            <GithubCopilot size={ICON} />
          </span>
        )
      },
      {
        name: 'Cursor',
        icon: (
          <span className='text-foreground'>
            <Cursor size={ICON} />
          </span>
        )
      },
      { name: 'OpenCode', icon: <OpenCode size={ICON} /> },
      {
        name: 'Google Gemini',
        icon: <SiGooglegemini className='text-[#4285F4]' size={ICON} />
      }
    ]
  }
]

/**
 * Tech stack, grouped by area. Each group takes one hue from the accent ramp
 * for its heading and rule; the tool icons keep their own brand colours.
 */
export function Stack() {
  return (
    <Section
      id='stack'
      index='03'
      label='Tech stack'
      title='Tools I work with'
      lede='Grouped by area. Most current work sits in the first three groups.'
      meta={`${categories.reduce((n, c) => n + c.items.length, 0)} entries`}
    >
      <div className='grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
        {categories.map((category, i) => (
          <Reveal key={category.title} delay={Math.min(i, 5) * 0.05}>
            <div>
              <div className='border-line flex items-baseline justify-between border-t pt-3'>
                <h3 className='eyebrow text-foreground'>{category.title}</h3>
                <span className='eyebrow text-foreground/35'>
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className='mt-3'>
                {category.items.map(item => (
                  <li
                    key={item.name}
                    className='hover:bg-surface -mx-2 flex items-center gap-3 px-2 py-1.5 transition-colors duration-300'
                  >
                    <span className='flex h-5 w-5 shrink-0 items-center justify-center'>
                      {item.icon}
                    </span>
                    <span className='text-muted-foreground text-sm'>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
