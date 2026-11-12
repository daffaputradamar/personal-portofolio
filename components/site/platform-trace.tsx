'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK } from '@/lib/gsap'

type NodeId =
  | 'agent-builder'
  | 'app-consultant'
  | 'successor-planning'
  | 'other-apps'
  | 'gateway'
  | 'vllm'
  | 'ollama'
  | 'third-party'
  | 'rag'
  | 'warehouse'
  | 'mcp'

type Block = {
  id: NodeId
  name: string
  detail: string
  slug?: string
  /** Runs outside the company network. Drawn dashed. */
  external?: boolean
}

const applications: Block[] = [
  {
    id: 'agent-builder',
    name: 'Agent Builder',
    detail: 'LangChain · LangGraph',
    slug: 'agent-builder'
  },
  {
    id: 'app-consultant',
    name: 'App Consultant',
    detail: 'LangGraph state machine',
    slug: 'app-consultant'
  },
  {
    id: 'successor-planning',
    name: 'Successor Planning',
    detail: 'AHP · TOPSIS + LLM',
    slug: 'successor-planning'
  },
  {
    id: 'other-apps',
    name: 'Other internal apps',
    detail: 'One shared endpoint'
  }
]

const duties = ['Auth', 'Routing', 'Usage tracking'] as const

const models: Block[] = [
  { id: 'vllm', name: 'vLLM', detail: 'Self-hosted models' },
  { id: 'ollama', name: 'Ollama', detail: 'Local models' },
  {
    id: 'third-party',
    name: 'Third-party APIs',
    detail: 'Hosted models',
    external: true
  }
]

const context: Block[] = [
  {
    id: 'rag',
    name: 'RAG Knowledge Base',
    detail: 'Nomic embeddings · ChromaDB',
    slug: 'rag-knowledge-base'
  },
  {
    id: 'warehouse',
    name: 'Data warehouse',
    detail: 'Natural-language querying'
  },
  { id: 'mcp', name: 'MCP servers', detail: 'Tools shared by every agent' }
]

/** The three connections drawn between the tiers. */
type EdgeId = 'requests' | 'routed' | 'grounding'

type Step = {
  /** Who is speaking, shown in rust at the start of the log line. */
  who: string
  text: string
  nodes: NodeId[]
  /** Edges carrying a packet during this step; `back` runs it in reverse. */
  edges?: { id: EdgeId; back?: boolean }[]
  /** Gateway duties lit during this step, by index into `duties`. */
  duties?: number[]
}

/**
 * A retrieval request followed through the platform. An illustration of the
 * path a grounded answer takes, not a recording of a real call.
 */
const RETRIEVAL: Step[] = [
  {
    who: 'agent-builder → litellm',
    text: 'Chat request, sent with the app’s own key.',
    nodes: ['agent-builder'],
    edges: [{ id: 'requests' }]
  },
  {
    who: 'litellm',
    text: 'Key checked. Routed to the self-hosted model.',
    nodes: ['gateway'],
    duties: [0, 1]
  },
  {
    who: 'litellm → vllm',
    text: 'Served on internal hardware.',
    nodes: ['gateway', 'vllm'],
    edges: [{ id: 'routed' }]
  },
  {
    who: 'vllm → agent-builder',
    text: 'The model asks for a tool: search the knowledge base.',
    nodes: ['vllm', 'agent-builder'],
    edges: [
      { id: 'routed', back: true },
      { id: 'requests', back: true }
    ]
  },
  {
    who: 'agent-builder → rag',
    text: 'Retrieve passages, embedded locally in ChromaDB.',
    nodes: ['agent-builder', 'rag'],
    edges: [{ id: 'grounding' }]
  },
  {
    who: 'rag → agent-builder',
    text: 'Passages returned. Nothing left the network.',
    nodes: ['rag', 'agent-builder'],
    edges: [{ id: 'grounding', back: true }]
  },
  {
    who: 'agent-builder → vllm',
    text: 'Second call, now grounded in the documents.',
    nodes: ['agent-builder', 'gateway', 'vllm'],
    edges: [{ id: 'requests' }, { id: 'routed' }]
  },
  {
    who: 'litellm',
    text: 'Answer returned. Usage logged against the app.',
    nodes: ['gateway', 'agent-builder'],
    edges: [
      { id: 'routed', back: true },
      { id: 'requests', back: true }
    ],
    duties: [2]
  }
]

/**
 * The other path: a plain-language question answered from the data warehouse,
 * through a tool served over MCP. Also an illustration.
 */
const WAREHOUSE: Step[] = [
  {
    who: 'internal-app → litellm',
    text: 'A business question, asked in plain language.',
    nodes: ['other-apps'],
    edges: [{ id: 'requests' }]
  },
  {
    who: 'litellm',
    text: 'Key checked. Routed to the self-hosted model.',
    nodes: ['gateway'],
    duties: [0, 1]
  },
  {
    who: 'litellm → vllm',
    text: 'The model plans a query instead of guessing a number.',
    nodes: ['gateway', 'vllm'],
    edges: [{ id: 'routed' }]
  },
  {
    who: 'vllm → internal-app',
    text: 'It asks for a tool: query the warehouse.',
    nodes: ['vllm', 'other-apps'],
    edges: [
      { id: 'routed', back: true },
      { id: 'requests', back: true }
    ]
  },
  {
    who: 'internal-app → mcp',
    text: 'The tool, served over MCP, runs the query on the data warehouse.',
    nodes: ['other-apps', 'mcp', 'warehouse'],
    edges: [{ id: 'grounding' }]
  },
  {
    who: 'warehouse → internal-app',
    text: 'Rows returned from the operational data.',
    nodes: ['warehouse', 'other-apps'],
    edges: [{ id: 'grounding', back: true }]
  },
  {
    who: 'internal-app → vllm',
    text: 'Second call: turn the rows into an answer.',
    nodes: ['other-apps', 'gateway', 'vllm'],
    edges: [{ id: 'requests' }, { id: 'routed' }]
  },
  {
    who: 'litellm',
    text: 'Answer returned. Usage logged against the app.',
    nodes: ['gateway', 'other-apps'],
    edges: [
      { id: 'routed', back: true },
      { id: 'requests', back: true }
    ],
    duties: [2]
  }
]

const TRACES = [
  { id: 'retrieval', label: 'documents', steps: RETRIEVAL },
  { id: 'warehouse', label: 'data warehouse', steps: WAREHOUSE }
] as const

const SEND_MS = 1150
const READ_MS = 1250
const REST_MS = 3600

function Tier({ label, count }: { label: string; count: number }) {
  return (
    <div className='mb-2.5 flex items-baseline justify-between gap-3'>
      <span className='eyebrow text-foreground font-medium'>{label}</span>
      <span className='eyebrow opacity-70'>
        {String(count).padStart(2, '0')}
      </span>
    </div>
  )
}

function Node({ block, lit }: { block: Block; lit: boolean }) {
  const className = cn(
    'block scroll-mt-28 rounded-md border px-3 py-2.5 transition-colors duration-300',
    block.external ? 'border-dashed' : '',
    lit
      ? 'border-signal bg-signal/10'
      : block.external
        ? 'border-foreground/35 bg-background'
        : 'border-line bg-background'
  )

  const body = (
    <>
      <span className='block text-[1.0625rem] leading-tight font-medium'>
        {block.name}
      </span>
      <span className='eyebrow mt-1 block text-[0.72rem] leading-snug'>
        {block.detail}
      </span>
    </>
  )

  if (block.slug) {
    return (
      <Link
        id={`node-${block.id}`}
        href={`/projects/${block.slug}`}
        className={cn(className, 'hover:border-signal/70')}
      >
        {body}
      </Link>
    )
  }
  return (
    <div id={`node-${block.id}`} className={className}>
      {body}
    </div>
  )
}

/**
 * A connection between two tiers. Vertical on phones, where the tiers stack;
 * `wide` makes it horizontal from the md breakpoint, where they sit in a row.
 */
function Edge({
  label,
  packet,
  wide,
  flip,
  className
}: {
  label: string
  /** null: idle. Otherwise the direction of the packet in flight. */
  packet: { key: string; back: boolean } | null
  wide?: boolean
  /** Forward runs upward on phones (the tier it leads to sits above). */
  flip?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative flex items-center justify-center py-1',
        wide && 'md:px-2 md:py-0',
        className
      )}
    >
      <span className={cn('infra-edge', wide && 'wide', flip && 'flip')}>
        {packet && (
          <span
            key={packet.key}
            className={cn('infra-packet', packet.back && 'back')}
          />
        )}
      </span>
      <span
        className={cn(
          'eyebrow bg-elevated absolute px-1.5 text-[0.68rem] transition-colors duration-300',
          packet && 'text-signal'
        )}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * How the internal AI platform fits together, with one request traced through
 * it: applications call a single gateway, the gateway routes to models, and
 * agents ground themselves in the context services.
 *
 * Rendered complete on the server, so without JavaScript or with reduced
 * motion the map and the whole trace are simply readable. With motion allowed
 * the trace plays as a loop, and only while it is on screen.
 */
export function PlatformTrace({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  /**
   * Height of the complete log, measured just before it starts playing and
   * held for as long as it plays. Without it the panel would shrink when the
   * log empties, which moves the figure, which flips the trigger below, which
   * restores the log: a loop that shows up as flicker at one scroll position.
   */
  const [reserve, setReserve] = useState<number | undefined>(undefined)
  /** Which of the two traces is on screen. */
  const [which, setWhich] = useState(0)
  const steps: readonly Step[] = TRACES[which].steps
  /** Steps fully delivered. */
  const [shown, setShown] = useState<number>(TRACES[0].steps.length)
  /** Step currently in flight, if any. */
  const [sending, setSending] = useState<number | null>(null)
  const [cycle, setCycle] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia(MOTION_OK).matches) return

    let timer: number | undefined
    let running = false

    const step = (index: number) => {
      if (!running) return
      if (index >= steps.length) {
        timer = window.setTimeout(() => {
          setCycle(value => value + 1)
          setShown(0)
          step(0)
        }, REST_MS)
        return
      }
      setSending(index)
      timer = window.setTimeout(() => {
        setSending(null)
        setShown(index + 1)
        timer = window.setTimeout(() => step(index + 1), READ_MS)
      }, SEND_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          setReserve(list.current?.offsetHeight)
          setPlaying(true)
          setShown(0)
          step(0)
        } else if (!entry.isIntersecting && running) {
          running = false
          window.clearTimeout(timer)
          setPlaying(false)
          setSending(null)
          setShown(steps.length)
        }
      },
      // Play while any part of the figure crosses the middle of the viewport.
      // A ratio threshold would never be met where the figure is far taller
      // than the screen.
      { rootMargin: '-35% 0px -35% 0px' }
    )
    observer.observe(el)

    return () => {
      running = false
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [steps])

  const choose = (index: number) => {
    if (index === which) return
    setWhich(index)
    setSending(null)
    setShown(TRACES[index].steps.length)
  }

  const flight = sending === null ? null : steps[sending]
  const lit = (id: NodeId) => flight?.nodes.includes(id) ?? false
  const packet = (id: EdgeId) => {
    const edge = flight?.edges?.find(item => item.id === id)
    return edge
      ? { key: `${cycle}-${sending}-${id}`, back: edge.back ?? false }
      : null
  }

  const lines = steps.slice(0, shown)

  return (
    <figure
      ref={root}
      className={cn('border-line bg-elevated rounded-md border', className)}
    >
      <div className='p-5 md:p-7'>
        <div className='flex flex-col'>
          {/* Applications, gateway, models: a row from md up, a column below. */}
          <div className='order-3 md:order-1 md:grid md:grid-cols-[minmax(0,1.2fr)_5.5rem_minmax(0,0.9fr)_5.5rem_minmax(0,1fr)] md:items-center'>
            <div>
              <Tier label='Applications' count={applications.length} />
              <ul className='space-y-2'>
                {applications.map(block => (
                  <li key={block.id}>
                    <Node block={block} lit={lit(block.id)} />
                  </li>
                ))}
              </ul>
            </div>

            <Edge label='requests' packet={packet('requests')} wide />

            <div>
              <Tier label='Gateway' count={1} />
              <div
                id='node-gateway'
                className={cn(
                  'rounded-md border px-4 py-5 transition-colors duration-300',
                  lit('gateway')
                    ? 'border-signal bg-signal/15'
                    : 'border-signal/50 bg-signal/[0.06]'
                )}
              >
                <span className='display block text-[1.75rem] leading-none'>
                  LiteLLM
                </span>
                <span className='eyebrow mt-1.5 block text-[0.72rem]'>
                  Central AI gateway
                </span>
                <ul className='border-signal/25 mt-4 space-y-1.5 border-t pt-3'>
                  {duties.map((duty, i) => {
                    const on = flight?.duties?.includes(i) ?? false
                    return (
                      <li
                        key={duty}
                        className={cn(
                          'flex items-center gap-2 font-mono text-[0.78rem] transition-colors duration-300',
                          on ? 'text-signal' : 'text-foreground/75'
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'bg-signal h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300',
                            on && 'scale-150'
                          )}
                        />
                        {duty}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <Edge label='routed' packet={packet('routed')} wide />

            <div>
              <Tier label='Models' count={models.length} />
              <ul className='space-y-2'>
                {models.map(block => (
                  <li key={block.id}>
                    <Node block={block} lit={lit(block.id)} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grounding runs between the applications and the context tier:
              underneath from md up, above on phones so it still meets them. */}
          <div className='order-2 md:grid md:grid-cols-[minmax(0,1.2fr)_5.5rem_minmax(0,0.9fr)_5.5rem_minmax(0,1fr)]'>
            <Edge label='grounding' packet={packet('grounding')} flip />
          </div>

          <div className='order-1 md:order-3'>
            <Tier label='Context' count={context.length} />
            <ul className='grid gap-2 sm:grid-cols-3'>
              {context.map(block => (
                <li key={block.id}>
                  <Node block={block} lit={lit(block.id)} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The trace. */}
        <div className='border-line mt-6 border-t pt-4'>
          <p className='eyebrow flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
            <span className='flex flex-wrap items-center gap-x-3 gap-y-1'>
              <span className='text-foreground font-medium'>request.trace</span>
              <span
                className='flex gap-1'
                role='group'
                aria-label='Which request'
              >
                {TRACES.map((trace, i) => (
                  <button
                    key={trace.id}
                    type='button'
                    aria-pressed={which === i}
                    onClick={() => choose(i)}
                    className={cn(
                      'min-h-8 rounded-full border px-3 transition-colors',
                      which === i
                        ? 'border-signal bg-signal/10 text-signal'
                        : 'border-line hover:border-signal hover:text-foreground'
                    )}
                  >
                    {trace.label}
                  </button>
                ))}
              </span>
            </span>
            <span>
              {playing
                ? `step ${Math.min((sending ?? shown - 1) + 1, steps.length)} of ${steps.length}`
                : `${steps.length} steps`}
            </span>
          </p>
          <ol
            ref={list}
            className='mt-3 space-y-2 font-mono text-[0.8125rem] leading-relaxed'
            style={{ minHeight: playing ? reserve : undefined }}
          >
            {lines.map((line, i) => (
              <li
                key={`${cycle}-${i}`}
                className='log-line flex flex-wrap gap-x-3'
              >
                <span className='text-signal shrink-0'>{line.who}</span>
                <span className='text-foreground/85'>{line.text}</span>
              </li>
            ))}
            {flight && (
              <li className='log-line flex gap-x-3' aria-hidden>
                <span className='text-signal shrink-0'>{flight.who}</span>
                <span className='typing-dots text-muted-foreground mt-2'>
                  <i />
                  <i />
                  <i />
                </span>
              </li>
            )}
          </ol>
        </div>
      </div>

      <figcaption className='border-line eyebrow flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t px-5 py-3 md:px-7'>
        <span>
          <span className='text-signal'>Fig. 01</span> &mdash; The internal AI
          platform, with a request traced through it (illustration)
        </span>
        <span className='inline-flex items-center gap-4'>
          <span className='inline-flex items-center gap-1.5'>
            <span className='border-line inline-block h-2.5 w-3.5 rounded-[2px] border' />
            On-premise
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <span className='border-foreground/40 inline-block h-2.5 w-3.5 rounded-[2px] border border-dashed' />
            External
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
