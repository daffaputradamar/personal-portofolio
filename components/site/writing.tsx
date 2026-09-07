import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getPosts } from '@/lib/posts'
import { PostList } from './post-list'
import { Reveal } from './reveal'
import { Section } from './section'

export async function Writing() {
  const posts = await getPosts(3)
  const all = await getPosts()

  return (
    <Section
      id='writing'
      index='06'
      label='Writing'
      title='Recent posts'
      lede='Notes on the tools and stacks I use day to day.'
      meta={`${all.length} total`}
    >
      <PostList posts={posts} />

      <Reveal delay={0.08}>
        <Link
          href='/posts'
          className='link-underline mt-8 inline-flex items-center gap-2 text-sm'
        >
          All posts
          <ArrowUpRight aria-hidden className='h-4 w-4' />
        </Link>
      </Reveal>
    </Section>
  )
}
