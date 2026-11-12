'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { MOTION_OK } from '@/lib/gsap'

type AppId = 'assistants' | 'documents' | 'agents'
type NodeId =
  | AppId
  | 'gateway'
  | 'vllm'
  | 'ollama'
  | 'hosted'
  | 'rag'
  | 'warehouse'
  | 'mcp'

type Block = {
  id: NodeId
  name: string
  detail: string
  /** One sentence on what this part does, shown when it is pointed at. */
  role: string
  /** Runs outside the company network. Drawn dashed. */
  external?: boolean
}

const applications: (Block & { id: AppId })[] = [
  {
    id: 'assistants',
    name: 'Assistants',
    detail: 'Answer from company knowledge',
    role: 'Chat assistants that answer staff and dealer questions from the company’s own documents and data.'
  },
  {
    id: 'documents',
    name: 'Document checks',
    detail: 'Read, extract, validate',
    role: 'Readers that turn photos and scans into structured data, then check it against the rules.'
  },
  {
    id: 'agents',
    name: 'Agents & tools',
    detail: 'Multi-step workflows',
    role: 'Agent workflows and internal tools that plan, call tools and produce a finished result.'
  }
]

const gateway: Block = {
  id: 'gateway',
  name: 'LiteLLM',
  detail: 'Central AI gateway',
  role: 'The one door every app goes through: it checks the key, picks the model and records the usage.'
}

const models: Block[] = [
  {
    id: 'vllm',
    name: 'vLLM',
    detail: 'Self-hosted models',
    role: 'Serves the main models on the company’s own hardware, so prompts and data stay inside.'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    detail: 'Local models',
    role: 'Runs smaller local models alongside the main ones.'
  },
  {
    id: 'hosted',
    name: 'Third-party APIs',
    detail: 'Hosted models',
    role: 'Hosted models, reached through the same gateway when a task calls for one. The only part outside the network.',
    external: true
  }
]

const context: Block[] = [
  {
    id: 'rag',
    name: 'RAG Knowledge Base',
    detail: 'Nomic embeddings · ChromaDB',
    role: 'Company documents, embedded locally, so answers are grounded in them and nothing is sent out.'
  },
  {
    id: 'warehouse',
    name: 'Data warehouse',
    detail: 'Natural-language querying',
    role: 'Operational data that an app can ask about in plain language.'
  },
  {
    id: 'mcp',
    name: 'MCP servers',
    detail: 'Tools shared by every agent',
    role: 'Tools defined once and offered to every agent, instead of being rebuilt per app.'
  }
]

const duties = ['Auth', 'Routing', 'Usage tracking']

type EdgeId = 'requests' | 'routed' | 'grounding'

/** One moment of a request's journey: what lights up, and the line that says so. */
type Stage = {
  text: string
  nodes: NodeId[]
  edge?: EdgeId
  back?: boolean
  /** Gateway duties lit, by index into `duties`. */
  duties?: number[]
}

const ENTER: Stage = {
  text: 'The gateway checks the key and picks a model.',
  nodes: ['gateway'],
  duties: [0, 1]
}
const LEAVE: Stage = {
  text: 'The answer goes back through the gateway, and the usage is logged.',
  nodes: ['gateway'],
  edge: 'requests',
  back: true,
  duties: [2]
}

/**
 * The route each kind of app takes through the platform. An illustration of
 * the path, not a recording of a real call.
 */
const JOURNEYS: Record<AppId, Stage[]> = {
  assistants: [
    {
      text: 'An assistant sends a question, with its own key.',
      nodes: ['assistants'],
      edge: 'requests'
    },
    ENTER,
    {
      text: 'The self-hosted model reads the question.',
      nodes: ['vllm'],
      edge: 'routed'
    },
    {
      text: 'It needs facts, so the assistant pulls passages from the knowledge base.',
      nodes: ['assistants', 'rag'],
      edge: 'grounding'
    },
    {
      text: 'The passages come back. Nothing left the network.',
      nodes: ['assistants', 'rag'],
      edge: 'grounding',
      back: true
    },
    LEAVE
  ],
  documents: [
    {
      text: 'A document check sends a photo of a document.',
      nodes: ['documents'],
      edge: 'requests'
    },
    ENTER,
    {
      text: 'A self-hosted vision model reads it into fields.',
      nodes: ['vllm'],
      edge: 'routed'
    },
    {
      text: 'The fields come back in a fixed shape.',
      nodes: ['vllm'],
      edge: 'routed',
      back: true
    },
    {
      text: 'The app checks them against the rules and flags what does not fit.',
      nodes: ['documents']
    },
    LEAVE
  ],
  agents: [
    {
      text: 'An agent sends a task, with its own key.',
      nodes: ['agents'],
      edge: 'requests'
    },
    ENTER,
    {
      text: 'The model plans the next step and asks for a tool.',
      nodes: ['vllm'],
      edge: 'routed'
    },
    {
      text: 'The agent calls a shared tool, which queries the data warehouse.',
      nodes: ['agents', 'mcp', 'warehouse'],
      edge: 'grounding'
    },
    {
      text: 'The rows come back, and the agent carries on.',
      nodes: ['agents', 'mcp', 'warehouse'],
      edge: 'grounding',
      back: true
    },
    LEAVE
  ]
}

const ORDER: AppId[] = ['assistants', 'documents', 'agents']
const STAGE_MS = 1700
const REST_MS = 1400

function Tier({ label, hint }: { label: string; hint?: string }) {
  return (
    <p className='eyebrow mb-2.5 flex items-baseline justify-between gap-3'>
      <span className='text-foreground font-medium'>{label}</span>
      {hint && <span className='text-[0.72rem]'>{hint}</span>}
    </p>
  )
}

/**
 * A connection between two tiers. Vertical by default, because the tiers stack
 * on phones; `wide` turns it horizontal from md up. `flip` reverses forward on
 * phones, for the edge whose far end sits above there.
 */
function Edge({
  label,
  packet,
  wide,
  flip
}: {
  label: string
  packet: { key: string; back: boolean } | null
  wide?: boolean
  flip?: boolean
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative flex items-center justify-center py-1',
        wide && 'md:px-2 md:py-0'
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
 * The internal AI platform, drawn as it is built: applications call one
 * gateway, the gateway routes to models, and apps ground themselves in the
 * context services underneath. It shows the shape of the system, not a list
 * of what runs on it.
 *
 * Press one of the three kinds of application and its request travels the
 * diagram, one part lighting up at a time, with a single line saying what is
 * happening. Left alone, the three take turns. Pointing at any other part
 * says what that part is for.
 *
 * With reduced motion or without JavaScript it is a still diagram, and
 * pointing at a part still explains it.
 */
export function PlatformMap({ className }: { className?: string }) {
  const root = useRef<HTMLElement>(null)
  /** The part being pointed at. */
  const [focus, setFocus] = useState<Block | null>(null)
  /** Which journey is playing, and a counter that restarts it. */
  const [run, setRun] = useState<{ app: AppId; n: number }>({
    app: 'assistants',
    n: 0
  })
  /** The stage on screen; null while resting or off screen. */
  const [stage, setStage] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  /** Set once the reader presses an app: stay on it instead of taking turns. */
  const pinned = useRef(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia(MOTION_OK).matches) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Walk the current journey one stage at a time, rest, then go again:
  // the same app if the reader chose it, otherwise the next one.
  useEffect(() => {
    if (!inView) return
    const stages = JOURNEYS[run.app]
    let index = 0
    let timer = window.setTimeout(function advance() {
      if (index < stages.length) {
        setStage(index)
        index += 1
        timer = window.setTimeout(advance, STAGE_MS)
        return
      }
      setStage(null)
      timer = window.setTimeout(() => {
        setRun(current => ({
          app: pinned.current
            ? current.app
            : ORDER[(ORDER.indexOf(current.app) + 1) % ORDER.length],
          n: current.n + 1
        }))
      }, REST_MS)
    }, 250)
    return () => {
      window.clearTimeout(timer)
      setStage(null)
    }
  }, [run, inView])

  const send = (app: AppId) => {
    pinned.current = true
    setFocus(null)
    setRun(current => ({ app, n: current.n + 1 }))
  }

  const stages = JOURNEYS[run.app]
  const now = stage === null ? null : stages[stage]
  const lit = (id: NodeId) =>
    focus?.id === id || (now?.nodes.includes(id) ?? false)
  const packet = (edge: EdgeId) =>
    now && now.edge === edge
      ? { key: `${run.n}-${stage}`, back: now.back ?? false }
      : null

  const box = (block: Block, on: boolean) =>
    cn(
      'block w-full scroll-mt-28 rounded-md border px-3 py-2.5 text-left transition-colors duration-300',
      block.external && 'border-dashed',
      on
        ? 'border-signal bg-signal/10'
        : block.external
          ? 'border-foreground/35 bg-background hover:border-signal'
          : 'border-line bg-background hover:border-signal'
    )

  const label = (block: Block) => (
    <>
      <span className='block text-[1.0625rem] leading-tight font-medium'>
        {block.name}
      </span>
      <span className='eyebrow mt-1 block text-[0.72rem] leading-snug'>
        {block.detail}
      </span>
    </>
  )

  /** A part that only explains itself. */
  const part = (block: Block) => (
    <button
      key={block.id}
      type='button'
      id={`node-${block.id}`}
      onMouseEnter={() => setFocus(block)}
      onMouseLeave={() => setFocus(null)}
      onFocus={() => setFocus(block)}
      onBlur={() => setFocus(null)}
      onClick={() => setFocus(block)}
      className={box(block, lit(block.id))}
    >
      {label(block)}
    </button>
  )

  return (
    <figure
      ref={root}
      className={cn('border-line bg-elevated rounded-md border', className)}
    >
      <div className='p-5 md:p-7'>
        <div className='flex flex-col'>
          {/* Applications, gateway, models: a row from md up, a column below. */}
          <div className='order-3 md:order-1 md:grid md:grid-cols-[minmax(0,1.1fr)_5.5rem_minmax(0,0.95fr)_5.5rem_minmax(0,1fr)] md:items-center'>
            <div>
              <Tier label='Applications' />
              <div className='space-y-2'>
                {applications.map(app => (
                  <button
                    key={app.id}
                    id={`node-${app.id}`}
                    type='button'
                    onClick={() => send(app.id)}
                    aria-pressed={run.app === app.id && stage !== null}
                    aria-label={`${app.name}: send a request`}
                    className={cn(
                      box(app, lit(app.id)),
                      'flex items-center justify-between gap-3'
                    )}
                  >
                    <span>{label(app)}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.72rem] transition-colors duration-300',
                        run.app === app.id && stage !== null
                          ? 'border-signal bg-signal text-primary-foreground'
                          : 'border-line text-muted-foreground'
                      )}
                    >
                      ▸
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Edge label='requests' packet={packet('requests')} wide />

            <div>
              <Tier label='Gateway' />
              <button
                type='button'
                id='node-gateway'
                onMouseEnter={() => setFocus(gateway)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(gateway)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus(gateway)}
                className={cn(
                  'block w-full scroll-mt-28 rounded-md border px-4 py-5 text-left transition-colors duration-300',
                  lit('gateway')
                    ? 'border-signal bg-signal/15'
                    : 'border-signal/50 bg-signal/[0.06] hover:border-signal'
                )}
              >
                <span className='display block text-[1.75rem] leading-none'>
                  {gateway.name}
                </span>
                <span className='eyebrow mt-1.5 block text-[0.72rem]'>
                  {gateway.detail}
                </span>
                <span className='border-signal/25 mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3 md:block md:space-y-1.5'>
                  {duties.map((duty, i) => {
                    const on = now?.duties?.includes(i) ?? false
                    return (
                      <span
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
                            on && 'scale-[1.7]'
                          )}
                        />
                        {duty}
                      </span>
                    )
                  })}
                </span>
              </button>
            </div>

            <Edge label='routed' packet={packet('routed')} wide />

            <div>
              <Tier label='Models' />
              <div className='space-y-2'>{models.map(part)}</div>
            </div>
          </div>

          {/* Grounding runs between the applications and the context tier:
              underneath from md up, above on phones so it still meets them. */}
          <div className='order-2 md:grid md:grid-cols-[minmax(0,1.1fr)_5.5rem_minmax(0,0.95fr)_5.5rem_minmax(0,1fr)]'>
            <Edge label='grounding' packet={packet('grounding')} flip />
          </div>

          <div className='order-1 md:order-3'>
            <Tier label='Context' />
            <div className='grid gap-2 sm:grid-cols-3'>{context.map(part)}</div>
          </div>
        </div>

        {/* One line: what is happening now, or what the pointed-at part is
            for. Fixed height, so nothing jumps. */}
        <div className='border-line mt-6 flex min-h-[6.5rem] items-center gap-4 border-t pt-4 sm:min-h-[4.75rem]'>
          <p className='flex-1' aria-live='off'>
            {focus ? (
              <>
                <span className='font-medium'>{focus.name}.</span> {focus.role}
              </>
            ) : now ? (
              <span key={`${run.n}-${stage}`} className='log-line block'>
                {now.text}
              </span>
            ) : (
              <span className='text-muted-foreground'>
                Press an application to send a request, or point at any part to
                see what it does.
              </span>
            )}
          </p>
          <span
            aria-hidden
            className={cn(
              'flex shrink-0 gap-1.5 transition-opacity duration-300',
              now && !focus ? 'opacity-100' : 'opacity-0'
            )}
          >
            {stages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                  stage !== null && i <= stage ? 'bg-signal' : 'bg-line'
                )}
              />
            ))}
          </span>
        </div>
      </div>

      <figcaption className='border-line eyebrow flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t px-5 py-3 md:px-7'>
        <span>
          <span className='text-signal'>Fig. 01</span> &mdash; The internal AI
          platform (the requests shown are an illustration)
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
