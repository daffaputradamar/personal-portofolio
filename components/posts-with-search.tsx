'use client'

import { useMemo, useState } from 'react'

import { PostMetadata } from '@/lib/posts'
import { PostList } from '@/components/site/post-list'

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return posts
    // Search titles and summaries — title-only felt too strict in practice.
    return posts.filter(post =>
      `${post.title ?? ''} ${post.summary ?? ''}`
        .toLowerCase()
        .includes(needle)
    )
  }, [posts, query])

  return (
    <div>
      <div className='rule flex items-center gap-3 py-4'>
        <svg
          aria-hidden
          viewBox='0 0 24 24'
          className='h-4 w-4 shrink-0 text-muted-foreground'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <circle cx='11' cy='11' r='7' />
          <path d='m16.5 16.5 4 4' strokeLinecap='round' />
        </svg>

        <input
          type='search'
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder='Search posts'
          aria-label='Search posts'
          className='w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus:outline-none'
        />

        <span className='eyebrow shrink-0'>
          {filtered.length}/{posts.length}
        </span>
      </div>

      <div className='mt-2'>
        {filtered.length === 0 ? (
          <p className='py-16 text-center text-sm text-muted-foreground'>
            No posts match{' '}
            <span className='text-foreground'>&ldquo;{query}&rdquo;</span>.
          </p>
        ) : (
          <PostList posts={filtered} />
        )}
      </div>
    </div>
  )
}
