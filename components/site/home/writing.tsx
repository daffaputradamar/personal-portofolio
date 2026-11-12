import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { AgentBuild } from '../agent-build'
import { DocSection } from '../doc-section'
import { Reveal } from '../reveal'

export async function Writing() {
  const all = await getPosts()
  const posts = all.slice(0, 4)

  return (
    <DocSection
      id='writing'
      file='writing/'
      title='Writing'
      call='list_dir("writing/")'
      result={`${all.length} posts`}
      lede='Notes on the tools and stacks I use day to day.'
    >
      <AgentBuild speed={2.2}>
        <ul>
          {posts.map(post => (
            <li key={post.slug} className='agent-place' data-agent-label='post'>
              <Link
                href={`/posts/${post.slug}`}
                className='border-line group flex flex-wrap items-baseline gap-x-9 gap-y-1 border-t py-4'
              >
                <span className='eyebrow w-44 shrink-0'>
                  {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                </span>
                <span className='group-hover:text-signal flex-[1_1_22rem] text-2xl leading-tight font-medium transition-colors duration-300'>
                  {post.title}
                </span>
                <span
                  aria-hidden
                  className='text-signal transition-transform duration-500 group-hover:translate-x-1.5'
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </AgentBuild>

      <Reveal>
        <Link
          href='/posts'
          className='link-underline mt-6 inline-flex items-center gap-2 text-sm'
        >
          All posts
          <ArrowUpRight aria-hidden className='h-4 w-4' />
        </Link>
      </Reveal>
    </DocSection>
  )
}
