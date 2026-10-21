import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Chevron, Connector, Figure } from './figure'

/**
 * Index numbers match the Selected Work list underneath, so a node in the
 * figure and its write-up point at each other.
 */
type Node = {
  name: string
  detail: string
  /** Position in the featured list, if this node is one of those projects. */
  index?: string
  slug?: string
  /** Runs outside the company network. Drawn dashed. */
  external?: boolean
}

const applications: Node[] = [
  {
    name: 'Agent Builder',
    detail: 'LangChain · LangGraph',
    index: '01',
    slug: 'agent-builder'
  },
  {
    name: 'App Consultant',
    detail: 'LangGraph state machine',
    index: '03',
    slug: 'app-consultant'
  },
  {
    name: 'Successor Planning',
    detail: 'AHP · TOPSIS + LLM',
    index: '04',
    slug: 'successor-planning'
  },
  { name: 'Other internal apps', detail: 'One shared endpoint' }
]

const gateway = {
  name: 'LiteLLM',
  detail: 'Central AI gateway',
  duties: ['Routing', 'Auth', 'Usage tracking']
}

const models: Node[] = [
  { name: 'vLLM', detail: 'Self-hosted models' },
  { name: 'Ollama', detail: 'Local models' },
  { name: 'Third-party APIs', detail: 'Hosted models', external: true }
]

const context: Node[] = [
  {
    name: 'RAG Knowledge Base',
    detail: 'Nomic embeddings · ChromaDB',
    index: '02',
    slug: 'rag-knowledge-base'
  },
  { name: 'Data warehouse', detail: 'Natural-language querying' },
  { name: 'MCP servers', detail: 'Tools shared by every agent' }
]

const GROUNDING_DELAY = { '--flow-delay': '1.6s' } as React.CSSProperties

function Tier({ label, count }: { label: string; count: number }) {
  return (
    <div className='mb-3 flex items-baseline justify-between gap-3'>
      <span className='eyebrow text-foreground'>{label}</span>
      <span className='eyebrow text-foreground/35'>
        {String(count).padStart(2, '0')}
      </span>
    </div>
  )
}

function Block({ node }: { node: Node }) {
  const body = (
    <>
      <span className='flex items-baseline gap-2'>
        {node.index && (
          <span className='eyebrow text-signal text-[0.6875rem]'>
            {node.index}
          </span>
        )}
        <span className='text-sm font-medium'>{node.name}</span>
      </span>
      <span className='text-muted-foreground mt-0.5 block font-mono text-[0.6875rem] leading-snug'>
        {node.detail}
      </span>
    </>
  )

  const className = cn(
    'bg-background block border px-3 py-2.5',
    node.external ? 'border-foreground/30 border-dashed' : 'border-line'
  )

  if (node.slug) {
    return (
      <Link
        href={`/projects/${node.slug}`}
        className={cn(
          className,
          'hover:border-signal/60 hover:bg-signal/[0.06] transition-colors duration-300'
        )}
      >
        {body}
      </Link>
    )
  }

  return <div className={className}>{body}</div>
}

/**
 * Fig. 01 — how the internal AI platform fits together. Applications call one
 * gateway, the gateway routes to models, and agents ground themselves in the
 * context services underneath. Reflows from a row into a column on phones.
 */
export function PlatformDiagram() {
  return (
    <Figure
      number='01'
      title='The internal AI platform'
      note={
        <span className='inline-flex items-center gap-4'>
          <span className='inline-flex items-center gap-1.5'>
            <span className='border-line inline-block h-2.5 w-3.5 border' />
            On-premise
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <span className='border-foreground/30 inline-block h-2.5 w-3.5 border border-dashed' />
            External
          </span>
        </span>
      }
    >
      <div className='flex flex-col'>
        <div className='order-2 grid md:order-1 md:grid-cols-[minmax(0,1.25fr)_5.5rem_minmax(0,0.9fr)_5.5rem_minmax(0,1fr)]'>
          {/* Applications */}
          <div>
            <Tier label='Applications' count={applications.length} />
            <ul className='space-y-2'>
              {applications.map(node => (
                <li key={node.name}>
                  <Block node={node} />
                </li>
              ))}
            </ul>
          </div>

          <Connector label='requests' />

          {/* Gateway */}
          <div className='flex flex-col'>
            <Tier label='Gateway' count={1} />
            <div className='border-signal/50 bg-signal/[0.05] relative flex grow flex-col justify-center border px-4 py-5'>
              <span className='display text-2xl leading-none'>
                {gateway.name}
              </span>
              <span className='text-muted-foreground mt-1.5 font-mono text-[0.6875rem]'>
                {gateway.detail}
              </span>
              <ul className='border-signal/25 mt-4 space-y-1.5 border-t pt-3'>
                {gateway.duties.map(duty => (
                  <li
                    key={duty}
                    className='text-foreground/70 flex items-center gap-2 font-mono text-xs'
                  >
                    <span aria-hidden className='bg-signal h-1 w-1 shrink-0' />
                    {duty}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Connector label='routed' delay={0.9} />

          {/* Models */}
          <div className='flex flex-col'>
            <Tier label='Models' count={models.length} />
            <ul className='flex grow flex-col justify-center space-y-2'>
              {models.map(node => (
                <li key={node.name}>
                  <Block node={node} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Context, feeding the applications. Underneath them from md up;
            on phones it leads the column so its arrow still lands on them. */}
        <div className='order-1 md:order-2'>
          <div
            aria-hidden
            className='relative hidden h-14 flex-col items-center md:flex md:w-[calc((100%-11rem)*1.25/3.15)]'
          >
            <Chevron direction='up' className='-mb-1' />
            <span className='flow-y flow-up h-full' style={GROUNDING_DELAY} />
            <span className='eyebrow text-foreground/45 absolute top-1/2 left-1/2 ml-3 -translate-y-1/2 text-[0.625rem]'>
              grounding
            </span>
          </div>

          <Tier label='Context' count={context.length} />
          <ul className='grid gap-2 sm:grid-cols-3'>
            {context.map(node => (
              <li key={node.name}>
                <Block node={node} />
              </li>
            ))}
          </ul>

          <Connector label='grounding' delay={1.6} className='md:hidden' />
        </div>
      </div>
    </Figure>
  )
}
