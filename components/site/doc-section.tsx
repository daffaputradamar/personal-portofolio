import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { AgentBuild } from './agent-build'
import { ToolCall } from './tool-call'

type DocSectionProps = {
  id: string
  /** File or folder name shown on the tab, e.g. 'work/' or 'skills.md'. */
  file: string
  title: ReactNode
  lede?: string
  /** The agent's tool call for this section, e.g. `list_dir("work/")`. */
  call?: string
  /** What the call returned, e.g. `5 projects`. */
  result?: string
  children: ReactNode
  className?: string
}

/**
 * One section of the home page, titled the way a README is: a file tab, then a
 * heading with its faint '##' mark in the margin. The agent cursor places the
 * tab, the heading and the lede as the section scrolls into view.
 */
export function DocSection({
  id,
  file,
  title,
  lede,
  call,
  result,
  children,
  className
}: DocSectionProps) {
  return (
    <section
      id={id}
      className={cn('home-col scroll-mt-20 lg:scroll-mt-6', className)}
    >
      <div className='border-line border-t py-12 md:py-14'>
        <AgentBuild speed={2.2}>
          <div className='flex flex-wrap items-end justify-between gap-x-6 gap-y-2'>
            <p className='file-tab agent-place' data-agent-label='tab'>
              {file}
            </p>
            {call && result && <ToolCall call={call} result={result} />}
          </div>
          <div
            className='agent-place mt-5 flex items-baseline gap-4'
            data-agent-label='heading'
          >
            <span aria-hidden className='md-mark text-lg'>
              ##
            </span>
            <h2 className='display text-headline text-balance'>{title}</h2>
          </div>
          {lede && (
            <p
              className='agent-place text-muted-foreground mt-2.5 max-w-[34em]'
              data-agent-label='text'
            >
              {lede}
            </p>
          )}
        </AgentBuild>

        <div className='mt-7'>{children}</div>
      </div>
    </section>
  )
}
