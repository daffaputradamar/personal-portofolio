import type { Metadata } from 'next'

import { PageHeader } from '@/components/site/page-header'
import PostsWithSearch from '@/components/posts-with-search'
import { getPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on web development, applied AI and the tools I use.',
  alternates: { canonical: '/posts' }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <>
      <PageHeader
        eyebrow='Writing'
        title='Writing.'
        lede='Short, practical notes on the stacks I work in.'
      />

      <div className='container pb-32'>
        <PostsWithSearch posts={posts} />
      </div>
    </>
  )
}
