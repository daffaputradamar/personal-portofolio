import Link from 'next/link'

import { getPosts } from '@/lib/posts'
import { PostList } from './post-list'
import { Reveal } from './reveal'
import { Section } from './section'

export async function Writing() {
  const posts = await getPosts(3)

  return (
    <Section
      id='writing'
      index='06'
      tone={5}
      label='Writing'
      title='Recent posts.'
      lede='Notes on the tools and stacks I use day to day.'
    >
      <PostList posts={posts} />

      <Reveal delay={0.1}>
        <Link
          href='/posts'
          className='group mt-10 inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <span className='link-underline'>All posts</span>
          <svg
            aria-hidden
            viewBox='0 0 24 24'
            className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
          </svg>
        </Link>
      </Reveal>
    </Section>
  )
}
